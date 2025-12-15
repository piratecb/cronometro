'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface TimerState {
  id: string;
  name: string;
  initialTime: number;
  currentTime: number;
  status: 'paused' | 'running' | 'finished';
  lastUpdate: number;
}

export function useTimerSyncSupabase(sessionId: string) {
  const [timers, setTimers] = useState<TimerState[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  // Carregar timers iniciais e configurar realtime
  useEffect(() => {
    if (!sessionId) return;

    let realtimeChannel: RealtimeChannel;

    const setupRealtimeSync = async () => {
      // Carregar dados iniciais do localStorage como fallback
      const stored = localStorage.getItem(`timers_${sessionId}`);
      if (stored) {
        try {
          setTimers(JSON.parse(stored));
        } catch (e) {
          console.error('Erro ao carregar timers:', e);
        }
      }

      // Configurar canal Realtime
      realtimeChannel = supabase.channel(`session:${sessionId}`, {
        config: {
          broadcast: { self: true },
        },
      });

      // Escutar atualizações
      realtimeChannel
        .on('broadcast', { event: 'timer-update' }, ({ payload }) => {
          setTimers(payload.timers);
          // Salvar também no localStorage como backup
          localStorage.setItem(`timers_${sessionId}`, JSON.stringify(payload.timers));
        })
        .subscribe((status) => {
          setIsConnected(status === 'SUBSCRIBED');
        });

      setChannel(realtimeChannel);
    };

    setupRealtimeSync();

    return () => {
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
      }
    };
  }, [sessionId]);

  // Broadcast de mudanças
  const broadcastTimers = useCallback(
    async (newTimers: TimerState[]) => {
      setTimers(newTimers);
      localStorage.setItem(`timers_${sessionId}`, JSON.stringify(newTimers));

      if (channel) {
        await channel.send({
          type: 'broadcast',
          event: 'timer-update',
          payload: { timers: newTimers },
        });
      }
    },
    [channel, sessionId]
  );

  // Adicionar novo cronómetro
  const addTimer = useCallback(
    (name: string, minutes: number) => {
      const newTimer: TimerState = {
        id: Date.now().toString(),
        name,
        initialTime: minutes * 60,
        currentTime: minutes * 60,
        status: 'paused',
        lastUpdate: Date.now(),
      };
      broadcastTimers([...timers, newTimer]);
    },
    [timers, broadcastTimers]
  );

  // Remover cronómetro
  const removeTimer = useCallback(
    (id: string) => {
      broadcastTimers(timers.filter((t) => t.id !== id));
    },
    [timers, broadcastTimers]
  );

  // Atualizar nome do cronómetro
  const updateTimerName = useCallback(
    (id: string, name: string) => {
      broadcastTimers(timers.map((t) => (t.id === id ? { ...t, name } : t)));
    },
    [timers, broadcastTimers]
  );

  // Iniciar/pausar cronómetro
  const toggleTimer = useCallback(
    (id: string) => {
      broadcastTimers(
        timers.map((t) => {
          if (t.id === id) {
            if (t.status === 'running') {
              return { ...t, status: 'paused', lastUpdate: Date.now() };
            } else if (t.currentTime > 0) {
              return { ...t, status: 'running', lastUpdate: Date.now() };
            }
          }
          return t;
        })
      );
    },
    [timers, broadcastTimers]
  );

  // Resetar cronómetro individual
  const resetTimer = useCallback(
    (id: string) => {
      broadcastTimers(
        timers.map((t) =>
          t.id === id
            ? { ...t, currentTime: t.initialTime, status: 'paused', lastUpdate: Date.now() }
            : t
        )
      );
    },
    [timers, broadcastTimers]
  );

  // Resetar todos os cronómetros
  const resetAllTimers = useCallback(() => {
    broadcastTimers(
      timers.map((t) => ({
        ...t,
        currentTime: t.initialTime,
        status: 'paused',
        lastUpdate: Date.now(),
      }))
    );
  }, [timers, broadcastTimers]);

  // Pausar todos os cronómetros
  const pauseAllTimers = useCallback(() => {
    broadcastTimers(
      timers.map((t) => ({
        ...t,
        status: 'paused',
        lastUpdate: Date.now(),
      }))
    );
  }, [timers, broadcastTimers]);

  // Atualizar tempo de um cronómetro
  const updateTimerTime = useCallback(
    (id: string, newTime: number) => {
      broadcastTimers(
        timers.map((t) => {
          if (t.id === id) {
            const status = newTime <= 0 ? 'finished' : t.status;
            return { ...t, currentTime: newTime, status, lastUpdate: Date.now() };
          }
          return t;
        })
      );
    },
    [timers, broadcastTimers]
  );

  return {
    timers,
    addTimer,
    removeTimer,
    updateTimerName,
    toggleTimer,
    resetTimer,
    resetAllTimers,
    pauseAllTimers,
    updateTimerTime,
    isConnected,
  };
}
