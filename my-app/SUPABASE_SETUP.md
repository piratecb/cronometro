# 🚀 Configuração do Supabase para Sincronização em Tempo Real

Este guia mostra como configurar o Supabase para permitir sincronização entre múltiplos dispositivos.

## Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: cronometros (ou nome à sua escolha)
   - **Database Password**: escolha uma senha segura
   - **Region**: escolha a região mais próxima (ex: Europe West)
4. Clique em **"Create new project"** (leva ~2 minutos)

## Passo 2: Obter Credenciais

1. No painel do seu projeto, vá para **Settings** (⚙️) → **API**
2. Copie os seguintes valores:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon/public key** (chave longa começando com `eyJ...`)

**✅ PRONTO! Não precisa criar tabelas ou configurar banco de dados.**

Esta aplicação usa **Supabase Realtime Broadcast**, que funciona apenas com WebSocket para transmitir dados em tempo real entre dispositivos. Os dados NÃO são salvos no servidor do Supabase, apenas sincronizados em tempo real e guardados localmente no navegador de cada dispositivo.

## Passo 3: Configurar Variáveis de Ambiente

1. Na pasta `my-app`, crie um arquivo `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

2. Substitua os valores pelos que você copiou no Passo 2

## Passo 4: Testar Localmente

```bash
npm run dev
```

Abra http://localhost:3000 e:
1. Crie uma nova sessão
2. Abra o link da sessão em outra aba ou dispositivo
3. As mudanças devem sincronizar instantaneamente!

## Passo 5: Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Importe seu repositório do GitHub
3. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`: seu URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: sua chave anon do Supabase
4. Clique em **Deploy**

## ✅ Pronto!

Agora você pode:
- Criar sessões únicas com códigos
- Partilhar códigos entre dispositivos
- Sincronização em tempo real entre todos os dispositivos
- Controlar cronómetros de qualquer dispositivo
- Visualizar em modo projeção

## 🔒 Segurança

- Cada sessão tem um código único
- Apenas quem tem o código pode acessar
- Dados são sincronizados via Supabase Realtime (WebSocket)
- **Dados NÃO ficam salvos no Supabase** - apenas transmitidos em tempo real
- Backup local no localStorage de cada dispositivo

## 💾 Armazenamento

A aplicação usa uma arquitetura híbrida:
- **Supabase Realtime Broadcast**: Apenas para sincronização em tempo real (não salva dados)
- **LocalStorage**: Cada dispositivo guarda seus próprios dados localmente
- **Sem banco de dados**: Não há persistência no servidor, mantendo privacidade total

## 💡 Dicas

- **Plano gratuito**: 500MB de dados, 2GB de transferência/mês, Realtime ilimitado
- **Performance**: WebSocket mantém conexão aberta para updates instantâneos
- **Offline**: Dados são mantidos no localStorage como fallback

## 🆘 Resolução de Problemas

### "Não conecta / não sincroniza"
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o projeto Supabase está ativo
- Abra o console do navegador e procure por erros

### "Authentication error"
- Certifique-se de usar a chave **anon/public**, não a chave service
- Verifique se não há espaços extras nas variáveis de ambiente

### "Sincronização lenta"
- Supabase tem limites no plano gratuito
- Considere upgrade se precisar de performance máxima
