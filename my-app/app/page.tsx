'use client';

import Link from 'next/link';
import { useState } from 'react';
import ControlTimer from './components/ControlTimer';
import { useTimerSync } from './hooks/useTimerSync';

export default function Home() {
  const {
    timers,
    addTimer,
    removeTimer,
    updateTimerName,
    toggleTimer,
    resetTimer,
    resetAllTimers,
    pauseAllTimers,
    updateTimerTime,
  } = useTimerSync();

  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerMinutes, setNewTimerMinutes] = useState(5);
  const [showForm, setShowForm] = useState(false);

  const handleAddTimer = () => {
    if (newTimerName.trim() && newTimerMinutes > 0) {
      addTimer(newTimerName.trim(), newTimerMinutes);
      setNewTimerName('');
      setNewTimerMinutes(5);
      setShowForm(false);
    }
  };

  const runningTimers = timers.filter(t => t.status === 'running').length;
  const finishedTimers = timers.filter(t => t.status === 'finished').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            🎯 Página de Controlo
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            Gestão de múltiplos cronómetros
          </p>
          <Link
            href="/projecao"
            target="_blank"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
          >
            🖥️ Abrir Página de Projeção
          </Link>
        </header>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{timers.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{runningTimers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Em Execução</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
            <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">{timers.length - runningTimers - finishedTimers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Pausados</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{finishedTimers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Terminados</div>
          </div>
        </div>

        {/* Controlos Gerais */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
            >
              ➕ Adicionar Cronómetro
            </button>
          ) : null}
          
          {timers.length > 0 && (
            <>
              <button
                onClick={pauseAllTimers}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold shadow-lg transition-all"
              >
                ⏸️ Pausar Todos
              </button>
              <button
                onClick={resetAllTimers}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold shadow-lg transition-all"
              >
                🔄 Reset Geral
              </button>
            </>
          )}
        </div>

        {/* Formulário de Novo Cronómetro */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 mb-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Novo Cronómetro
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome/Identificador
                </label>
                <input
                  type="text"
                  value={newTimerName}
                  onChange={(e) => setNewTimerName(e.target.value)}
                  placeholder="Ex: Equipa A, Orador 1"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddTimer();
                    if (e.key === 'Escape') setShowForm(false);
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tempo (minutos)
                </label>
                <input
                  type="number"
                  value={newTimerMinutes}
                  onChange={(e) => setNewTimerMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddTimer}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold transition-colors"
                >
                  Criar
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setNewTimerName('');
                    setNewTimerMinutes(5);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md font-semibold transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Cronómetros */}
        {timers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⏱️</div>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Nenhum cronómetro criado
            </p>
            <p className="text-gray-500 dark:text-gray-500 mt-2">
              Clique em "Adicionar Cronómetro" para começar
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timers.map((timer) => (
              <ControlTimer
                key={timer.id}
                timer={timer}
                onToggle={toggleTimer}
                onReset={resetTimer}
                onDelete={removeTimer}
                onUpdateName={updateTimerName}
                onUpdateTime={updateTimerTime}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
