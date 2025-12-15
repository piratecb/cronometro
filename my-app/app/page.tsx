'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [sessionId, setSessionId] = useState('');
  const [existingSessionId, setExistingSessionId] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verificar se já tem uma sessão ativa
    const lastSession = localStorage.getItem('lastSessionId');
    if (lastSession) {
      setExistingSessionId(lastSession);
    }
  }, []);

  const createNewSession = () => {
    const newSessionId = Math.random().toString(36).substring(2, 10).toUpperCase();
    localStorage.setItem('lastSessionId', newSessionId);
    router.push(`/sessao/${newSessionId}`);
  };

  const joinSession = (id: string) => {
    if (id.trim()) {
      const sessionIdClean = id.trim().toUpperCase();
      localStorage.setItem('lastSessionId', sessionIdClean);
      router.push(`/sessao/${sessionIdClean}`);
    }
  };

  const continueLastSession = () => {
    if (existingSessionId) {
      router.push(`/sessao/${existingSessionId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3">⏱️ Cronómetros</h1>
          <p className="text-xl text-blue-100">Gestão de Múltiplos Temporizadores</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Criar Nova Sessão */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Nova Sessão</h2>
            <button
              onClick={createNewSession}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold shadow-lg transition-all transform hover:scale-105"
            >
              ➕ Criar Nova Sessão
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Cria uma nova sessão com código único para partilhar
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Entrar em Sessão Existente */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Entrar numa Sessão</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value.toUpperCase())}
                placeholder="Digite o código da sessão"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-center text-lg font-mono tracking-wider"
                maxLength={8}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') joinSession(sessionId);
                }}
              />
              <button
                onClick={() => joinSession(sessionId)}
                disabled={!sessionId.trim()}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold shadow-lg transition-all disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
              >
                🔗 Entrar na Sessão
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Entre numa sessão existente usando o código partilhado
            </p>
          </div>

          {/* Continuar Última Sessão */}
          {existingSessionId && (
            <>
              <div className="border-t border-gray-200"></div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Sessão Recente</h2>
                <button
                  onClick={continueLastSession}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transition-all"
                >
                  🔄 Continuar Sessão {existingSessionId}
                </button>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-blue-100">
            💡 Partilhe o código da sessão com outros dispositivos para sincronização em tempo real
          </p>
        </div>
      </div>
    </div>
  );
}
