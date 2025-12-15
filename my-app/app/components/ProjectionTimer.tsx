'use client';

import { useEffect, useRef } from 'react';
import { TimerState } from '../hooks/useTimerSync';
import { Play, Pause, Square, Bell } from 'lucide-react';

interface ProjectionTimerProps {
  timer: TimerState;
  onUpdateTime: (id: string, time: number) => void;
}

export default function ProjectionTimer({ timer, onUpdateTime }: ProjectionTimerProps) {
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

  const getBackgroundColor = () => {
    if (timer.status === 'finished') {
      return 'bg-destructive/90 border-destructive';
    }
    if (timer.status === 'running') {
      const percentage = (timer.currentTime / timer.initialTime) * 100;
      if (percentage > 50) return 'bg-primary/90 border-primary';
      if (percentage > 20) return 'bg-orange-500/90 border-orange-500';
      return 'bg-red-500/90 border-red-500';
    }
    return 'bg-secondary/90 border-secondary';
  };

  const getStatusIcon = () => {
    if (timer.status === 'running') return <Play className="w-10 h-10" />;
    if (timer.status === 'finished') return <Square className="w-10 h-10" />;
    return <Pause className="w-10 h-10" />;
  };

  return (
    <div className={`${getBackgroundColor()} border-2 rounded-2xl p-8 shadow-lg transition-all duration-500 transform ${timer.status === 'finished' ? 'animate-pulse scale-105' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold truncate flex-1">{timer.name}</h2>
        <div className="ml-4">{getStatusIcon()}</div>
      </div>
      
      <div className="text-center">
        <div className={`text-7xl md:text-8xl lg:text-9xl font-bold font-mono tracking-wider ${timer.status === 'finished' ? 'animate-pulse' : ''}`}>
          {formatTime(timer.currentTime)}
        </div>
        
        {timer.status === 'finished' && (
          <div className="text-3xl md:text-4xl font-bold mt-6 animate-bounce flex items-center justify-center gap-3">
            <Bell className="w-10 h-10" />
            TEMPO ESGOTADO!
          </div>
        )}
        
        {timer.status === 'running' && (
          <div className="mt-4 text-xl opacity-80">
            Em execução...
          </div>
        )}
        
        {timer.status === 'paused' && (
          <div className="mt-4 text-xl opacity-80">
            Pausado
          </div>
        )}
      </div>
    </div>
  );
}
