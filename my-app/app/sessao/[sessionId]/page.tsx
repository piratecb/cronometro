'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import ControlTimer from '../../components/ControlTimer';
import { useTimerSyncSupabase } from '../../hooks/useTimerSyncSupabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Share2, Monitor, Plus, PauseCircle, RotateCcw, Copy, Clock, Play, Pause, CheckCircle2, XCircle } from 'lucide-react';

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;

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
    isConnected,
  } = useTimerSyncSupabase(sessionId);

  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerMinutes, setNewTimerMinutes] = useState(5);
  const [showForm, setShowForm] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleAddTimer = () => {
    if (newTimerName.trim() && newTimerMinutes > 0) {
      addTimer(newTimerName.trim(), newTimerMinutes);
      setNewTimerName('');
      setNewTimerMinutes(5);
      setShowForm(false);
    }
  };

  const copySessionLink = () => {
    const link = `${window.location.origin}/sessao/${sessionId}`;
    navigator.clipboard.writeText(link);
    alert('Link copiado! Partilhe com outros dispositivos.');
  };

  const copySessionId = () => {
    navigator.clipboard.writeText(sessionId);
    alert('Código da sessão copiado!');
  };

  const runningTimers = timers.filter((t) => t.status === 'running').length;
  const finishedTimers = timers.filter((t) => t.status === 'finished').length;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Link>
          </Button>
          
          <Badge variant={isConnected ? "default" : "destructive"} className="gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-white animate-pulse' : 'bg-white'}`} />
            {isConnected ? 'Sincronizado' : 'Offline'}
          </Badge>
        </div>

        {/* Título e Ações Principais */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl md:text-4xl flex items-center justify-center gap-3">
              <Clock className="w-8 h-8" />
              Página de Controlo
            </CardTitle>
            <CardDescription className="text-lg">
              Sessão: <span className="font-mono font-bold">{sessionId}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="lg">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partilhar Sessão
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Partilhar Sessão</DialogTitle>
                  <DialogDescription>
                    Partilhe o código ou link com outros dispositivos
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Código da Sessão</Label>
                    <div className="flex gap-2">
                      <Input
                        value={sessionId}
                        readOnly
                        className="text-center font-mono text-lg font-bold"
                      />
                      <Button variant="secondary" size="icon" onClick={copySessionId}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Link Direto</Label>
                    <div className="flex gap-2">
                      <Input
                        value={`${typeof window !== 'undefined' ? window.location.origin : ''}/sessao/${sessionId}`}
                        readOnly
                        className="text-sm"
                      />
                      <Button variant="secondary" size="icon" onClick={copySessionLink}>
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button asChild size="lg">
              <Link href={`/projecao/${sessionId}`} target="_blank">
                <Monitor className="w-4 h-4 mr-2" />
                Abrir Projeção
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-bold text-center text-foreground">
                {timers.length}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">Total</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-bold text-center text-primary">
                {runningTimers}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Play className="w-3 h-3" />
                Em Execução
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-bold text-center text-muted-foreground">
                {timers.length - runningTimers - finishedTimers}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <Pause className="w-3 h-3" />
                Pausados
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-3xl font-bold text-center text-destructive">
                {finishedTimers}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Terminados
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Controlos Gerais */}
        <div className="flex flex-wrap gap-3 justify-center">
          {!showForm && (
            <Button onClick={() => setShowForm(true)} size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Cronómetro
            </Button>
          )}

          {timers.length > 0 && (
            <>
              <Button onClick={pauseAllTimers} size="lg" variant="secondary">
                <PauseCircle className="w-4 h-4 mr-2" />
                Pausar Todos
              </Button>
              <Button onClick={resetAllTimers} size="lg" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Geral
              </Button>
            </>
          )}
        </div>

        {/* Formulário de Novo Cronómetro */}
        {showForm && (
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Novo Cronómetro</CardTitle>
              <CardDescription>Configure um novo cronómetro para a sessão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timer-name">Nome/Identificador</Label>
                <Input
                  id="timer-name"
                  type="text"
                  value={newTimerName}
                  onChange={(e) => setNewTimerName(e.target.value)}
                  placeholder="Ex: Equipa A, Orador 1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddTimer();
                    if (e.key === 'Escape') setShowForm(false);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timer-minutes">Tempo (minutos)</Label>
                <Input
                  id="timer-minutes"
                  type="number"
                  value={newTimerMinutes}
                  onChange={(e) => setNewTimerMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddTimer} className="flex-1">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Criar
                </Button>
                <Button
                  onClick={() => {
                    setShowForm(false);
                    setNewTimerName('');
                    setNewTimerMinutes(5);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Lista de Cronómetros */}
        {timers.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent className="space-y-4">
              <Clock className="w-20 h-20 mx-auto text-muted-foreground" />
              <div>
                <p className="text-xl font-semibold">Nenhum cronómetro criado</p>
                <p className="text-muted-foreground mt-2">
                  Clique em &quot;Adicionar Cronómetro&quot; para começar
                </p>
              </div>
            </CardContent>
          </Card>
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
