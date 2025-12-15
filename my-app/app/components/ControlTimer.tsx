'use client';

import { useState, useEffect, useRef } from 'react';
import { TimerState } from '../hooks/useTimerSync';

interface ControlTimerProps {
  timer: TimerState;
  onToggle: (id: string) => void;
  onReset: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onUpdateTime: (id: string, time: number) => void;
}

export default function ControlTimer({
  timer,
  onToggle,
  onReset,
  onDelete,
  onUpdateName,
  onUpdateTime,
}: ControlTimerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(timer.name);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Atualizar cronómetro quando está em execução
  useEffect(() => {
    if (timer.status === 'running' && timer.currentTime > 0) {
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - timer.lastUpdate) / 1000);
        const newTime = Math.max(0, timer.currentTime - elapsed);
        
        if (newTime !== timer.currentTime) {
          onUpdateTime(timer.id, newTime);
        }
      }, 100);
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
  }, [timer.status, timer.currentTime, timer.lastUpdate, timer.id, onUpdateTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateName(timer.id, tempName.trim());
      setIsEditing(false);
    }
  };

  const getStatusColor = () => {
    if (timer.status === 'finished') {
      return 'bg-red-100 border-red-500 dark:bg-red-950 dark:border-red-700';
    }
    const percentage = (timer.currentTime / timer.initialTime) * 100;
    if (percentage > 50) return 'bg-green-100 border-green-500 dark:bg-green-950 dark:border-green-700';
    if (percentage > 20) return 'bg-yellow-100 border-yellow-500 dark:bg-yellow-950 dark:border-yellow-700';
    return 'bg-orange-100 border-orange-500 dark:bg-orange-950 dark:border-orange-700';
  };

  const getStatusBadge = () => {
    if (timer.status === 'running') return <span className="text-xs font-semibold px-2 py-1 bg-blue-500 text-white rounded">▶️ EM EXECUÇÃO</span>;
    if (timer.status === 'finished') return <span className="text-xs font-semibold px-2 py-1 bg-red-500 text-white rounded">⏹️ TERMINADO</span>;
    return <span className="text-xs font-semibold px-2 py-1 bg-gray-500 text-white rounded">⏸️ PAUSADO</span>;
  };

  return (
    <div className={`rounded-lg border-2 p-4 shadow-lg transition-all ${getStatusColor()}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName();
                  if (e.key === 'Escape') setIsEditing(false);
                }}
              />
              <button onClick={handleSaveName} className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">✓</button>
              <button onClick={() => setIsEditing(false)} className="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">✕</button>
            </div>
          ) : (
            <h3
              onClick={() => setIsEditing(true)}
              className="text-lg font-semibold text-gray-800 dark:text-gray-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              title="Clique para editar"
            >
              {timer.name}
            </h3>
          )}
        </div>
        {getStatusBadge()}
      </div>

      <div className="text-center mb-3">
        <div className={`text-4xl font-bold font-mono ${timer.status === 'finished' ? 'text-red-600 dark:text-red-400 animate-pulse' : 'text-gray-800 dark:text-gray-200'}`}>
          {formatTime(timer.currentTime)}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          Tempo inicial: {formatTime(timer.initialTime)}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onToggle(timer.id)}
          disabled={timer.status === 'finished'}
          className={`flex-1 px-3 py-2 rounded text-sm font-semibold transition-colors ${
            timer.status === 'running'
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
          }`}
        >
          {timer.status === 'running' ? '⏸️ Pausar' : '▶️ Iniciar'}
        </button>
        <button
          onClick={() => onReset(timer.id)}
          className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded text-sm font-semibold transition-colors"
        >
          🔄 Reset
        </button>
        <button
          onClick={() => onDelete(timer.id)}
          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-semibold transition-colors"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
