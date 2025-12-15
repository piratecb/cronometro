'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectionTimer from '../../components/ProjectionTimer';
import { useTimerSyncSupabase } from '../../hooks/useTimerSyncSupabase';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Settings, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export default function ProjectionPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

  const { timers, updateTimerTime, isConnected } = useTimerSyncSupabase(sessionId);

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

  const activeTimers = timers.filter((t) => t.status !== 'finished');
  const finishedTimers = timers.filter((t) => t.status === 'finished');

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-12">
      <div className="max-w-[1920px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-10 h-10" />
              <h1 className="text-4xl md:text-5xl font-bold">Projeção de Cronómetros</h1>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-xl text-muted-foreground">
                Sessão: <span className="font-mono font-bold">{sessionId}</span>
              </p>
              <Badge variant={isConnected ? "default" : "destructive"} className="gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-white animate-pulse' : 'bg-white'}`} />
                {isConnected ? 'Sincronizado' : 'Offline'}
              </Badge>
            </div>
          </div>
          <Button variant="secondary" size="lg" asChild>
            <Link href={`/sessao/${sessionId}`}>
              <Settings className="w-5 h-5 mr-2" />
              Controlo
            </Link>
          </Button>
        </div>

        {timers.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-20 space-y-6">
              <Clock className="w-32 h-32 text-muted-foreground" />
              <div className="text-center space-y-3">
                <h2 className="text-4xl font-bold">Nenhum Cronómetro Ativo</h2>
                <p className="text-2xl text-muted-foreground">Adicione cronómetros na página de controlo</p>
              </div>
              <Button size="lg" asChild className="mt-4">
                <Link href={`/sessao/${sessionId}`}>
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Ir para Controlo
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Cronómetros Ativos */}
            {activeTimers.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-primary">
                  <CheckCircle2 className="w-6 h-6" />
                  Cronómetros Ativos ({activeTimers.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeTimers.map((timer) => (
                    <ProjectionTimer key={timer.id} timer={timer} onUpdateTime={updateTimerTime} />
                  ))}
                </div>
              </div>
            )}

            {/* Cronómetros Terminados */}
            {finishedTimers.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-destructive">
                  <XCircle className="w-6 h-6" />
                  Cronómetros Terminados ({finishedTimers.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {finishedTimers.map((timer) => (
                    <ProjectionTimer key={timer.id} timer={timer} onUpdateTime={updateTimerTime} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer com informações */}
        <Card className="fixed bottom-4 right-4 border-border backdrop-blur-md">
          <CardContent className="py-3 px-6">
            <div className="text-sm flex items-center gap-4">
              <span className="font-semibold">Total: {timers.length}</span>
              <span className="flex items-center gap-1 text-primary">
                <CheckCircle2 className="w-3 h-3" />
                Ativos: {activeTimers.length}
              </span>
              <span className="flex items-center gap-1 text-destructive">
                <XCircle className="w-3 h-3" />
                Terminados: {finishedTimers.length}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
