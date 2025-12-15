# 🎯 Sistema de Gestão de Cronómetros Múltiplos

Aplicação web para gerir múltiplos cronómetros simultaneamente, ideal para apresentações de equipa, debates ou assembleias onde é necessário controlar o tempo de intervenção de diferentes participantes.

## 🌐 Sincronização entre Dispositivos

✅ **Funciona entre múltiplos dispositivos** (computador, tablet, telemóvel)
- Sincronização em tempo real via Supabase
- Cada sessão tem um código único para partilhar
- Vários dispositivos podem controlar e visualizar simultaneamente
- Perfeito para projetar numa tela enquanto controla de outro dispositivo

⚠️ **Requer configuração do Supabase** - veja [my-app/SUPABASE_SETUP.md](my-app/SUPABASE_SETUP.md)

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
  - 🌈 Cores dinâmicas baseadas no tempo restante

- **Sincronização**
  - ⚡ Sincronização em tempo real via Supabase Realtime (WebSocket)
  - 📱 Funciona entre qualquer número de dispositivos diferentes
  - 🔄 Atualização instantânea quando qualquer dispositivo faz alterações
  - 💾 Backup local no localStorage de cada dispositivo
  - 🟢 Indicador visual de status de conexão

## 🚀 Como Usar

### Configuração Inicial

**⚠️ IMPORTANTE: Configure o Supabase primeiro!**

1. Siga o guia completo em [my-app/SUPABASE_SETUP.md](my-app/SUPABASE_SETUP.md)
2. Crie um projeto gratuito no Supabase
3. Configure as variáveis de ambiente

### Instalação e Execução

```bash
cd my-app
npm install
npm run dev
```

Abra http://localhost:3000 no navegador

### Fluxo de Trabalho

1. **Criar ou Entrar numa Sessão**
   - Na página inicial, clique em "Criar Nova Sessão"
   - Ou insira o código de uma sessão existente para entrar

2. **Partilhar com Outros Dispositivos**
   - Clique no botão "Partilhar" na página de controlo
   - Copie o código ou link da sessão
   - Abra em outros dispositivos
   - Todos os dispositivos ficarão sincronizados em tempo real!

3. **Adicionar Cronómetros**
   - Clique em "Adicionar Cronómetro"
   - Insira o nome do participante
   - Configure o tempo em minutos

4. **Abrir Página de Projeção**
   - Clique em "Abrir Projeção"
   - Projete esta página numa tela para o público ver
   - Controle tudo de qualquer dispositivo conectado à sessão

## 🎨 Recursos Visuais

- **Design Moderno**: Interface limpa usando shadcn/ui
- **Tema Neutro**: Cores profissionais e não intrusivas
- **Ícones Lucide**: Ícones modernos e consistentes
- **Responsivo**: Funciona em qualquer tamanho de ecrã

### Indicadores de Cor
- **Branco**: Tempo abundante (>50%)
- **Laranja**: Tempo crítico (20-50%)
- **Vermelho**: Tempo esgotado (<20%)

## 💡 Casos de Uso

- **Apresentações de Equipa**: Gerir tempo de múltiplas equipas
- **Debates**: Controlar tempo de fala de cada orador
- **Assembleias**: Gestão de múltiplas intervenções

## 🛠️ Tecnologias

- **Next.js 16** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização
- **shadcn/ui** - Componentes UI
- **Lucide React** - Ícones
- **Supabase** - Backend e sincronização em tempo real
- **Supabase Realtime** - WebSocket para updates instantâneos

## 📱 Compatibilidade

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Smartphone (iOS, Android)
- ✅ Modo claro e escuro automático
- ✅ Sincronização entre dispositivos diferentes

## 🔒 Privacidade e Segurança

- Cada sessão tem um código único gerado aleatoriamente
- Apenas quem tem o código pode acessar a sessão
- Dados sincronizados via Supabase com conexão segura
- Backup local no navegador de cada dispositivo

---

Desenvolvido com Next.js e Supabase
