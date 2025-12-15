# 🎯 Sistema de Gestão de Cronómetros Múltiplos

Aplicação web para gerir múltiplos cronómetros simultaneamente, ideal para apresentações de equipa, debates ou assembleias onde é necessário controlar o tempo de intervenção de diferentes participantes.

## 🌐 Sincronização entre Dispositivos

✅ **Funciona entre múltiplos dispositivos** (computador, tablet, telemóvel)
- Sincronização em tempo real via Supabase
- Cada sessão tem um código único para partilhar
- Vários dispositivos podem controlar e visualizar simultaneamente
- Perfeito para projetar numa tela enquanto controla de outro dispositivo

⚠️ **Requer configuração do Supabase** - veja [SUPABASE_SETUP.md](SUPABASE_SETUP.md)

## ✨ Funcionalidades

### 📋 Página de Controlo
- **Sistema de Sessões**
  - 🆕 Criar sessões únicas com código para partilhar
  - 🔗 Entrar em sessões existentes usando código
  - 📤 Partilhar código/link da sessão com outros dispositivos
  - 🔄 Continuar última sessão automaticamente

- **Gestão de Cronómetros**
  - ➕ Criar múltiplos cronómetros numa mesma sessão
  - 🏷️ Nome/identificador personalizável (ex: "Equipa A", "Orador 1")
  - ⏱️ Tempo configurável em minutos
  - 🎨 Estados visuais: pausado, em execução, terminado
  
- **Controlos Individuais**
  - ▶️ Iniciar/pausar cada cronómetro individualmente
  - 🔄 Reset individual
  - ✏️ Editar nome do participante (clique no nome)
  - 🗑️ Remover cronómetros dinamicamente

- **Controlos Gerais**
  - ⏸️ Pausar todos os cronómetros de uma vez
  - 🔄 Reset geral de todos os cronómetros
  - 📊 Estatísticas em tempo real (total, em execução, pausados, terminados)

### 🖥️ Página de Projeção
- **Visualização em Tempo Real**
  - 📺 Mostrar todos os cronómetros ativos
  - 🔄 Atualização automática sincronizada com a página de controlo
  - 🎨 Design limpo e legível à distância (otimizado para projeção)
  - 🚨 Indicação visual clara quando o tempo termina
  - 🌈 Cores dinâmicas baseadas no tempo restante:
    - Verde: >50% do tempo
    - Amarelo: 20-50% do tempo
    - Laranja: <20% do tempo
    - Vermelho pulsante: Tempo esgotado

- **Sincronização**
  - ⚡ Sincronização em tempo real via Supabase Realtime (WebSocket)
  - 📱 Funciona entre qualquer número de dispositivos diferentes
  - 🔄 Atualização instantânea quando qualquer dispositivo faz alterações
  - 💾 Backup local no localStorage de cada dispositivo
  - 🟢 Indicador visual de status de conexão

## 🚀 Como Usar

### Configuração Inicial

**⚠️ IMPORTANTE: Configure o Supabase primeiro!**

1. Siga o guia completo em [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
2. Crie um projeto gratuito no Supabase
3. Configure as variáveis de ambiente

### Instalação e Execução

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

3. **Abrir no navegador**
   - Página Inicial: http://localhost:3000

### Fluxo de Trabalho

1. **Criar ou Entrar numa Sessão**
   - Na página inicial, clique em "Criar Nova Sessão"
   - Ou insira o código de uma sessão existente para entrar

2. **Partilhar com Outros Dispositivos**
   - Clique no botão "📤 Partilhar" na página de controlo
   - Copie o código ou link da sessão
   - Abra em outros dispositivos (computador, tablet, telemóvel)
   - Todos os dispositivos ficarão sincronizados em tempo real!

3. **Adicionar Cronómetros**
   - Clique em "➕ Adicionar Cronómetro"
   - Insira o nome do participante (ex: "Equipa A", "Orador 1")
   - Configure o tempo em minutos
   - Clique em "Criar"

4. **Abrir Página de Projeção**
   - Clique em "🖥️ Abrir Página de Projeção"
   - Projete esta página numa tela para o público ver
   - Controle tudo de qualquer dispositivo conectado à sessão

5. **Controlar Sessão**
   - Use os botões individuais para iniciar/pausar cada cronómetro
   - Todos os dispositivos veem as mudanças instantaneamente
   - Use "Pausar Todos" para uma pausa geral
   - Use "Reset Geral" para reiniciar todos os cronómetros

6. **Visualização**
   - A página de projeção mostra apenas os cronómetros (design limpo)
   - Qualquer dispositivo pode controlar
   - Indicadores visuais claros para tempo restante
   - Alerta pulsante quando tempo esgota

## 🎨 Recursos Visuais

### Indicadores de Cor
- **Verde**: Tempo abundante (>50%)
- **Amarelo**: Atenção (20-50%)
- **Laranja**: Tempo crítico (<20%)
- **Vermelho**: Tempo esgotado (animação pulsante)

### Estados
- **▶️ Em Execução**: Cronómetro contando
- **⏸️ Pausado**: Cronómetro parado
- **⏹️ Terminado**: Tempo esgotado

## 💡 Casos de Uso

### Apresentações de Equipa
- Gerir tempo de apresentação de múltiplas equipas
- Garantir equidade no tempo disponível
- Alertas visuais claros para todos

### Debates
- Controlar tempo de fala de cada orador
- Alternância justa entre participantes
- Visibilidade clara do tempo restante

### Assembleias
- Gestão de múltiplas intervenções
- Controlo centralizado do moderador
- Transparência visual para todos os participantes

## 🛠️ Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Supabase** - Backend e sincronização em tempo real
- **Supabase Realtime** - WebSocket para updates instantâneos
- **LocalStorage API** - Backup local

## 📱 Compatibilidade

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Smartphone (iOS, Android)
- ✅ Modo claro e escuro automático
- ✅ Sincronização entre dispositivos diferentes
- ✅ Múltiplas sessões simultâneas
- ✅ Atualização em tempo real via WebSocket

## 🔒 Privacidade e Segurança

- Cada sessão tem um código único gerado aleatoriamente
- Apenas quem tem o código pode acessar a sessão
- Dados sincronizados via Supabase com conexão segura
- Backup local no navegador de cada dispositivo
- Sem rastreamento ou análise de dados pessoais

## 📝 Notas

- **Sessões**: Múltiplas sessões podem acontecer simultaneamente
- **Sincronização**: Funciona entre qualquer número de dispositivos
- **Offline**: Dados mantidos localmente como fallback
- **Performance**: WebSocket garante latência mínima
- **Limites**: Plano gratuito Supabase tem limites generosos para uso normal

---

## Learn More (Next.js)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
