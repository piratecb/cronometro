'use client';

import { useEffect, useRef } from 'react';
import { TimerState } from '../hooks/useTimerSync';

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
      return 'bg-gradient-to-br from-red-500 to-red-700';
    }
    if (timer.status === 'running') {
      const percentage = (timer.currentTime / timer.initialTime) * 100;
      if (percentage > 50) return 'bg-gradient-to-br from-green-500 to-green-700';
      if (percentage > 20) return 'bg-gradient-to-br from-yellow-500 to-yellow-700';
      return 'bg-gradient-to-br from-orange-500 to-orange-700';
    }
    return 'bg-gradient-to-br from-gray-500 to-gray-700';
  };

  const getStatusIcon = () => {
    if (timer.status === 'running') return '▶️';
    if (timer.status === 'finished') return '⏹️';
    return '⏸️';
  };

  return (
    <div className={`${getBackgroundColor()} rounded-3xl p-8 shadow-2xl text-white transition-all duration-500 transform ${timer.status === 'finished' ? 'animate-pulse scale-105' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl md:text-4xl font-bold truncate flex-1">{timer.name}</h2>
        <span className="text-4xl ml-4">{getStatusIcon()}</span>
      </div>
      
      <div className="text-center">
        <div className={`text-7xl md:text-8xl lg:text-9xl font-bold font-mono tracking-wider ${timer.status === 'finished' ? 'animate-pulse' : ''}`}>
          {formatTime(timer.currentTime)}
        </div>
        
        {timer.status === 'finished' && (
          <div className="text-3xl md:text-4xl font-bold mt-6 animate-bounce">
            ⏰ TEMPO ESGOTADO!
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
