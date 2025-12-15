'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Clock, Plus, LogIn, RotateCcw, Lightbulb } from 'lucide-react';

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Clock className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold text-foreground">Cronómetros</h1>
          </div>
          <p className="text-xl text-muted-foreground">Gestão de Múltiplos Temporizadores</p>
          <p className="text-sm text-muted-foreground">Sincronização em tempo real entre dispositivos</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nova Sessão
            </CardTitle>
            <CardDescription>
              Cria uma nova sessão com código único para partilhar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createNewSession}
              className="w-full"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Criar Nova Sessão
            </Button>
          </CardContent>
        </Card>

        <Separator />

        <Card className="shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              Entrar numa Sessão
            </CardTitle>
            <CardDescription>
              Entre numa sessão existente usando o código partilhado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="session-code">Código da Sessão</Label>
              <Input
                id="session-code"
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value.toUpperCase())}
                placeholder="Ex: ABC123XY"
                className="text-center text-lg font-mono tracking-wider"
                maxLength={8}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') joinSession(sessionId);
                }}
              />
            </div>
            <Button
              onClick={() => joinSession(sessionId)}
              disabled={!sessionId.trim()}
              className="w-full"
              size="lg"
              variant="secondary"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Entrar na Sessão
            </Button>
          </CardContent>
        </Card>

        {existingSessionId && (
          <>
            <Separator />
            
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Sessão Recente
                </CardTitle>
                <CardDescription>
                  Continue de onde parou
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={continueLastSession}
                  className="w-full"
                  size="lg"
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Continuar Sessão {existingSessionId}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        <div className="text-center">
          <p className="text-sm text-muted-foreground leading-relaxed flex items-center justify-center gap-2">
            <Lightbulb className="w-4 h-4" /> 
            Partilhe o código da sessão com outros dispositivos para sincronização em tempo real
          </p>
        </div>
      </div>
    </div>
  );
}
