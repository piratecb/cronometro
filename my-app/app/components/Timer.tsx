'use client';

import { useState, useEffect, useRef } from 'react';

export interface TimerProps {
  id: string;
  name: string;
  initialTime: number;
  onDelete: (id: string) => void;
  onUpdate: (id: string, name: string) => void;
}

export default function Timer({ id, name, initialTime, onDelete, onUpdate }: TimerProps) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdate(id, tempName.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setTempName(name);
    setIsEditing(false);
  };

  const getTimerColor = () => {
    const percentage = (time / initialTime) * 100;
    if (percentage > 50) return 'bg-green-100 border-green-500 dark:bg-green-950 dark:border-green-700';
    if (percentage > 20) return 'bg-yellow-100 border-yellow-500 dark:bg-yellow-950 dark:border-yellow-700';
    return 'bg-red-100 border-red-500 dark:bg-red-950 dark:border-red-700';
  };

  return (
    <div className={`rounded-lg border-2 p-6 shadow-lg transition-all ${getTimerColor()}`}>
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="flex-1 px-3 py-1 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSaveName();
                if (e.key === 'Escape') handleCancelEdit();
              }}
            />
            <button
              onClick={handleSaveName}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              ✓
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        ) : (
          <h3
            onClick={() => setIsEditing(true)}
            className="text-xl font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Clique para editar"
          >
            {name}
          </h3>
        )}
        <button
          onClick={() => onDelete(id)}
          className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
        >
          Eliminar
        </button>
      </div>

      <div className="text-center mb-4">
        <div className={`text-6xl font-bold ${time === 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-gray-200'} font-mono`}>
          {formatTime(time)}
        </div>
        {time === 0 && (
          <div className="text-red-600 dark:text-red-400 font-semibold mt-2 animate-pulse">
            Tempo Esgotado!
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={handleStartPause}
          disabled={time === 0}
          className={`px-6 py-2 rounded-md font-semibold transition-colors ${
            isRunning
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
          }`}
        >
          {isRunning ? 'Pausar' : 'Iniciar'}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-semibold transition-colors"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
