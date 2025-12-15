'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import ProjectionTimer from '../components/ProjectionTimer';
import { useTimerSync } from '../hooks/useTimerSync';

export default function ProjectionPage() {
  const { timers, updateTimerTime } = useTimerSync();

  // Prevenir que a tela durma
  useEffect(() => {
    let wakeLock: any = null;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await (navigator as any).wakeLock.request('screen');
        }
      } catch (err) {
        console.log('Wake Lock não suportado:', err);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, []);

  const activeTimers = timers.filter(t => t.status !== 'finished');
  const finishedTimers = timers.filter(t => t.status === 'finished');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6 md:p-12">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">📊 Projeção de Cronómetros</h1>
            <p className="text-xl text-gray-300">Atualização automática em tempo real</p>
          </div>
          <Link
            href="/"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-semibold transition-all border border-white/20"
          >
            ⚙️ Controlo
          </Link>
        </div>

        {timers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="text-9xl mb-8">⏱️</div>
            <h2 className="text-4xl font-bold mb-4">Nenhum Cronómetro Ativo</h2>
            <p className="text-2xl text-gray-300 mb-8">Adicione cronómetros na página de controlo</p>
            <Link
              href="/"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-xl transition-all transform hover:scale-105"
            >
              Ir para Controlo
            </Link>
          </div>
        ) : (
          <>
            {/* Cronómetros Ativos */}
            {activeTimers.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-green-400">
                  ✅ Cronómetros Ativos ({activeTimers.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeTimers.map((timer) => (
                    <ProjectionTimer
                      key={timer.id}
                      timer={timer}
                      onUpdateTime={updateTimerTime}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Cronómetros Terminados */}
            {finishedTimers.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-red-400">
                  ⏹️ Cronómetros Terminados ({finishedTimers.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {finishedTimers.map((timer) => (
                    <ProjectionTimer
                      key={timer.id}
                      timer={timer}
                      onUpdateTime={updateTimerTime}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer com informações */}
        <div className="fixed bottom-4 right-4 bg-black/40 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20">
          <div className="text-sm">
            <span className="font-semibold">Total:</span> {timers.length} | 
            <span className="font-semibold ml-2 text-green-400">Ativos:</span> {activeTimers.length} | 
            <span className="font-semibold ml-2 text-red-400">Terminados:</span> {finishedTimers.length}
          </div>
        </div>
      </div>
    </div>
  );
}
