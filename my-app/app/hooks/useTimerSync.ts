'use client';

import { useState, useEffect, useCallback } from 'react';

export interface TimerState {
  id: string;
  name: string;
  initialTime: number;
  currentTime: number;
  status: 'paused' | 'running' | 'finished';
  lastUpdate: number;
}

const STORAGE_KEY = 'timers_state';

export function useTimerSync() {
  const [timers, setTimers] = useState<TimerState[]>([]);

  // Carregar estado inicial do localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTimers(parsed);
      } catch (e) {
        console.error('Erro ao carregar timers:', e);
      }
    }
  }, []);

  // Sincronizar com outras abas/janelas
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setTimers(parsed);
        } catch (error) {
          console.error('Erro ao sincronizar:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Salvar no localStorage sempre que houver mudança
  const saveTimers = useCallback((newTimers: TimerState[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTimers));
    setTimers(newTimers);
    // Disparar evento customizado para sincronizar na mesma aba
    window.dispatchEvent(new CustomEvent('timers-updated', { detail: newTimers }));
  }, []);

  // Adicionar novo cronómetro
  const addTimer = useCallback((name: string, minutes: number) => {
    const newTimer: TimerState = {
      id: Date.now().toString(),
      name,
      initialTime: minutes * 60,
      currentTime: minutes * 60,
      status: 'paused',
      lastUpdate: Date.now(),
    };
    saveTimers([...timers, newTimer]);
  }, [timers, saveTimers]);

  // Remover cronómetro
  const removeTimer = useCallback((id: string) => {
    saveTimers(timers.filter(t => t.id !== id));
  }, [timers, saveTimers]);

  // Atualizar nome do cronómetro
  const updateTimerName = useCallback((id: string, name: string) => {
    saveTimers(timers.map(t => t.id === id ? { ...t, name } : t));
  }, [timers, saveTimers]);

  // Iniciar/pausar cronómetro
  const toggleTimer = useCallback((id: string) => {
    saveTimers(timers.map(t => {
      if (t.id === id) {
        if (t.status === 'running') {
          return { ...t, status: 'paused', lastUpdate: Date.now() };
        } else if (t.currentTime > 0) {
          return { ...t, status: 'running', lastUpdate: Date.now() };
        }
      }
      return t;
    }));
  }, [timers, saveTimers]);

  // Resetar cronómetro individual
  const resetTimer = useCallback((id: string) => {
    saveTimers(timers.map(t => 
      t.id === id 
        ? { ...t, currentTime: t.initialTime, status: 'paused', lastUpdate: Date.now() }
        : t
    ));
  }, [timers, saveTimers]);

  // Resetar todos os cronómetros
  const resetAllTimers = useCallback(() => {
    saveTimers(timers.map(t => ({
      ...t,
      currentTime: t.initialTime,
      status: 'paused',
      lastUpdate: Date.now(),
    })));
  }, [timers, saveTimers]);

  // Pausar todos os cronómetros
  const pauseAllTimers = useCallback(() => {
    saveTimers(timers.map(t => ({
      ...t,
      status: 'paused',
      lastUpdate: Date.now(),
    })));
  }, [timers, saveTimers]);

  // Atualizar tempo de um cronómetro
  const updateTimerTime = useCallback((id: string, newTime: number) => {
    saveTimers(timers.map(t => {
      if (t.id === id) {
        const status = newTime <= 0 ? 'finished' : t.status;
        return { ...t, currentTime: newTime, status, lastUpdate: Date.now() };
      }
      return t;
    }));
  }, [timers, saveTimers]);

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
  };
}
