# 🎯 Sistema de Gestão de Cronómetros Múltiplos

Aplicação web para gerir múltiplos cronómetros simultaneamente, ideal para apresentações de equipa, debates ou assembleias onde é necessário controlar o tempo de intervenção de diferentes participantes.

## ✨ Funcionalidades

### 📋 Página de Controlo
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
  - ⚡ Qualquer alteração na página de controlo reflete imediatamente na projeção
  - 📱 Múltiplos dispositivos podem visualizar simultaneamente
  - 🔄 Sincronização automática entre abas e janelas
  - 💾 Estado persistente (mantém dados após atualizar página)

## 🚀 Como Usar

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
   - Página de Controlo: http://localhost:3000
   - Página de Projeção: http://localhost:3000/projecao

### Fluxo de Trabalho Recomendado

1. **Preparação**
   - Abra a página de controlo no seu computador/tablet
   - Abra a página de projeção num segundo monitor ou projete para o público

2. **Adicionar Cronómetros**
   - Clique em "➕ Adicionar Cronómetro"
   - Insira o nome do participante (ex: "Equipa A", "Orador 1")
   - Configure o tempo em minutos
   - Clique em "Criar"

3. **Controlar Sessão**
   - Use os botões individuais para iniciar/pausar cada cronómetro
   - A página de projeção atualiza automaticamente
   - Use "Pausar Todos" para uma pausa geral
   - Use "Reset Geral" para reiniciar todos os cronómetros

4. **Durante Apresentação**
   - O público vê apenas a página de projeção (design limpo)
   - Você controla tudo pela página de controlo
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
- **LocalStorage API** - Sincronização entre abas
- **React Hooks** - Gestão de estado

## 📱 Compatibilidade

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablet (iPad, Android)
- ✅ Modo claro e escuro automático
- ✅ Múltiplas abas/janelas sincronizadas
- ✅ Atualização em tempo real

## 🔒 Privacidade

- Todos os dados são armazenados localmente no navegador
- Não há envio de informações para servidores externos
- Funciona offline após carregamento inicial

## 📝 Notas

- Os cronómetros continuam a contar mesmo com a página de controlo fechada
- A sincronização funciona em tempo real entre todas as abas abertas
- O estado é preservado ao atualizar a página
- Para redefinir tudo, limpe o localStorage do navegador

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
