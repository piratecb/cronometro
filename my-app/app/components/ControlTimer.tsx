'use client';

import { useState, useEffect, useRef } from 'react';
import { TimerState } from '../hooks/useTimerSync';
import { Play, Pause, Square, RotateCcw, Trash2, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const [displayTime, setDisplayTime] = useState(timer.currentTime);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastSyncRef = useRef<number>(Date.now());

  // Atualizar o display time localmente sem broadcast
  useEffect(() => {
    if (timer.status === 'running' && timer.currentTime > 0) {
      const startTime = Date.now();
      const initialTime = timer.currentTime;
      
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const newTime = Math.max(0, initialTime - elapsed);
        setDisplayTime(newTime);
        
        // Sincronizar a cada 1 segundo
        if (newTime !== initialTime && Date.now() - lastSyncRef.current >= 1000) {
          lastSyncRef.current = Date.now();
          onUpdateTime(timer.id, newTime);
        }
        
        // Quando chegar a zero, parar
        if (newTime === 0 && initialTime !== 0) {
          onUpdateTime(timer.id, 0);
        }
      }, 100);
    } else {
      setDisplayTime(timer.currentTime);
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
  }, [timer.status, timer.currentTime, timer.id, onUpdateTime]);

  // Sincronizar displayTime quando timer.currentTime mudar externamente
  useEffect(() => {
    if (timer.status !== 'running') {
      setDisplayTime(timer.currentTime);
    }
  }, [timer.currentTime, timer.status]);

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
      return 'bg-destructive/5 border-destructive';
    }
    const percentage = (timer.currentTime / timer.initialTime) * 100;
    if (percentage > 50) return 'bg-primary/5 border-primary';
    if (percentage > 20) return 'bg-orange-500/5 border-orange-500';
    return 'bg-red-500/5 border-red-500';
  };

  const getStatusBadge = () => {
    if (timer.status === 'running') {
      return (
        <Badge variant="default">
          <Play className="w-3 h-3 mr-1" />
          EM EXECUÇÃO
        </Badge>
      );
    }
    if (timer.status === 'finished') {
      return (
        <Badge variant="destructive">
          <Square className="w-3 h-3 mr-1" />
          TERMINADO
        </Badge>
      );
    }
    return (
      <Badge variant="secondary">
        <Pause className="w-3 h-3 mr-1" />
        PAUSADO
      </Badge>
    );
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
                className="flex-1 px-2 py-1 text-sm border-2 border-input rounded focus:outline-none focus:border-primary bg-background text-foreground"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveName();
                  if (e.key === 'Escape') setIsEditing(false);
                }}
              />
              <button onClick={handleSaveName} className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 flex items-center justify-center">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={() => setIsEditing(false)} className="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <h3
              onClick={() => setIsEditing(true)}
              className="text-lg font-semibold text-foreground cursor-pointer hover:text-primary"
              title="Clique para editar"
            >
              {timer.name}
            </h3>
          )}
        </div>
        {getStatusBadge()}
      </div>

      <div className="text-center mb-3">
        <div className={`text-4xl font-bold font-mono ${timer.status === 'finished' ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
          {formatTime(displayTime)}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Tempo inicial: {formatTime(timer.initialTime)}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onToggle(timer.id)}
          disabled={timer.status === 'finished'}
          className={`flex-1 px-3 py-2 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
            timer.status === 'running'
              ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
              : 'bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
          }`}
        >
          {timer.status === 'running' ? (
            <>
              <Pause className="w-4 h-4" /> Pausar
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> Iniciar
            </>
          )}
        </button>
        <button
          onClick={() => onReset(timer.id)}
          className="px-3 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded text-sm font-semibold transition-colors flex items-center justify-center gap-1"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={() => onDelete(timer.id)}
          className="px-3 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded text-sm font-semibold transition-colors flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
