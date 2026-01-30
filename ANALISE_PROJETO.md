# 📊 ANÁLISE COMPLETA DO PROJETO: VISITE CAMPOS DO JORDÃO

**Data da Análise:** 30 de Janeiro de 2026  
**Repositório:** https://github.com/danielbaisso-del/VISITE-CAMPOS-DO-JORD-O.git

---

## **1. 🎯 O QUE FOI FEITO**

Este é um **portal turístico inteligente** para Campos do Jordão, desenvolvido como um **SPA (Single Page Application)** moderno com integração de IA.

### **Funcionalidades Principais:**
- ✅ **Site institucional** com navegação por seções (Passeios, Roteiros, Gastronomia, Hospedagens)
- ✅ **Guia Virtual com IA** (Google Gemini) para responder perguntas sobre a cidade
- ✅ **Mapa interativo** com marcadores de hotéis, restaurantes e atrações (Leaflet.js)
- ✅ **Catálogo de pontos turísticos** com filtros por categoria
- ✅ **Sistema de busca inteligente** integrado no hero
- ✅ **Páginas dedicadas**: Gastronomia, Hospedagens, Roteiros, Quem Somos
- ✅ **Servidor proxy local** para chamadas de IA (desenvolvimento)

---

## **2. 🛠️ TECNOLOGIAS UTILIZADAS**

### **Frontend:**
- **React 19** (versão mais recente) com TypeScript
- **Vite** como bundler (build rápido)
- **Tailwind CSS** (inline, via classes utility)
- **Leaflet.js** para mapas interativos
- **Font Awesome** para ícones

### **Backend/Serviços:**
- **Google Gemini AI** (via SDK `@google/genai`)
- **Node.js** (servidores proxy em CommonJS)
- **Servidores locais** para desenvolvimento:
  - `genai-proxy.cjs` - Proxy para API do Gemini
  - `mock-ai.cjs` - Mock server para testes sem API key
  - `static-serve.cjs` - Servidor estático
  - `run-local.cjs` - Runner para desenvolvimento local

### **Scripts Python:**
- Scripts de teste para modelos locais (GPT4All)
- Experimentação com LLMs locais

---

## **3. 📁 ESTRUTURA DO PROJETO**

```
├── App.tsx                  # Componente principal + roteamento
├── index.tsx                # Entry point
├── constants.ts             # Dados dos passeios (TOURS)
├── types.ts                 # TypeScript interfaces
├── components/              # Componentes React
│   ├── Gastronomia.tsx     # Página de restaurantes
│   ├── Hospedagens.tsx     # Página de hotéis
│   ├── Roteiros.tsx        # Mapa interativo + roteiros
│   ├── Passeios.tsx        # Lista de passeios
│   ├── QuemSomos.tsx       # Página institucional
│   ├── TourCard.tsx        # Card de passeio
│   ├── Accommodations.tsx  # Componente de acomodações
│   ├── accommodationsData.ts # Dados de hospedagens
│   └── InteractiveMap.tsx  # Mapa interativo
├── data/                    
│   └── siteContent.ts      # Conteúdo estruturado do site
├── services/
│   └── gemini.ts           # Serviço de IA (Gemini)
├── server/                  # Servidores de desenvolvimento
│   ├── genai-proxy.cjs     # Proxy para Gemini API
│   ├── mock-ai.cjs         # Mock de IA
│   ├── run-local.cjs       # Runner local
│   ├── static-serve.cjs    # Servidor estático
│   └── *.py                # Scripts experimentais Python
├── public/
│   └── images/             # Imagens do projeto
├── package.json            # Dependências
├── tsconfig.json           # Configuração TypeScript
├── vite.config.ts          # Configuração Vite
└── README_GENAI.md         # Guia de setup do Gemini
```

---

## **4. 🚀 O QUE PODE SER MELHORADO**

### **🔴 CRÍTICO/ALTO IMPACTO:**

#### **1. Roteamento inadequado**
- **Problema**: Usa hash navigation manual (`window.location.hash`) em vez de um router
- **Impacto**: URLs não amigáveis, problemas de SEO, navegação inconsistente
- **Solução**: Implementar **React Router** para URLs limpas e SEO
```bash
npm install react-router-dom
```
```tsx
// Exemplo de implementação
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/passeios" element={<Passeios />} />
        <Route path="/roteiros" element={<Roteiros />} />
        {/* ... */}
      </Routes>
    </BrowserRouter>
  );
}
```

#### **2. Componentes muito grandes**
- **Problema**: `App.tsx` tem 485 linhas, mistura lógica de negócio com UI
- **Impacto**: Dificulta manutenção, testes e reusabilidade
- **Solução**: Separar em componentes menores:
  - `Hero.tsx`, `VirtualGuide.tsx`, `Navbar.tsx`, `Footer.tsx`
  - Criar contextos para estado global

```
components/
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── MainLayout.tsx
├── home/
│   ├── Hero.tsx
│   └── TourGrid.tsx
└── chat/
    └── VirtualGuide.tsx
```

#### **3. Gerenciamento de estado**
- **Problema**: Tudo em `useState` local, sem persistência
- **Impacto**: Estado se perde ao navegar, sem cache de dados
- **Solução**: Adicionar **Context API** ou **Zustand** para:
  - Filtros de busca
  - Estado do chat de IA
  - Preferências do usuário

```bash
npm install zustand
```

```tsx
// store/useChatStore.ts
import create from 'zustand';

export const useChatStore = create((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ 
    messages: [...state.messages, msg] 
  })),
  clearMessages: () => set({ messages: [] })
}));
```

#### **4. Segurança da API Key**
- **⚠️ URGENTE**: API keys no frontend (`vite.config.ts` expõe no `define`)
- **Impacto**: Qualquer pessoa pode ver a chave e usar sua quota
- **Solução**: 
  - Sempre usar o proxy server em produção
  - Adicionar autenticação no proxy
  - Usar variáveis de ambiente apenas no backend

```javascript
// vite.config.ts - REMOVER:
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY), // ❌ NUNCA FAZER
}

// Usar apenas o proxy:
// frontend -> http://seu-servidor.com/api/generate -> Gemini API
```

#### **5. SEO inexistente**
- **Problema**: SPA sem meta tags dinâmicas, sem SSR
- **Impacto**: Google não indexa corretamente, baixa visibilidade
- **Solução**: 
  - Adicionar **React Helmet** para meta tags
  - Considerar migrar para **Next.js** (SSR/SSG)
  - Adicionar sitemap e robots.txt

```bash
npm install react-helmet-async
```

```tsx
import { Helmet } from 'react-helmet-async';

function Passeios() {
  return (
    <>
      <Helmet>
        <title>Passeios em Campos do Jordão | Visite Campos</title>
        <meta name="description" content="Conheça os melhores passeios..." />
        <meta property="og:title" content="Passeios em Campos do Jordão" />
      </Helmet>
      {/* ... */}
    </>
  );
}
```

#### **6. Performance**
- **Problema**: 
  - Carrega Leaflet dinamicamente mas sem code splitting
  - Imagens sem lazy loading
  - Sem cache de respostas da IA
- **Impacto**: Carregamento lento, experiência ruim em conexões lentas
- **Solução**:

```tsx
// Lazy load de componentes
import { lazy, Suspense } from 'react';
const Roteiros = lazy(() => import('./components/Roteiros'));

function App() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Roteiros />
    </Suspense>
  );
}

// Lazy loading de imagens
<img loading="lazy" src="..." alt="..." />

// Cache de respostas da IA
const cacheKey = `chat-${hash(message)}`;
const cached = localStorage.getItem(cacheKey);
if (cached) return JSON.parse(cached);
```

---

### **🟡 MÉDIO IMPACTO:**

#### **7. TypeScript não está sendo aproveitado**
- **Problema**: Muitos `any`, faltam tipos explícitos
- **Solução**: Habilitar `strict: true` no tsconfig.json

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,              // ✅ Adicionar
    "noImplicitAny": true,       // ✅ Adicionar
    "strictNullChecks": true,    // ✅ Adicionar
    // ...
  }
}
```

#### **8. Acessibilidade**
- **Problema**: Faltam labels ARIA, navegação por teclado limitada
- **Solução**: Adicionar `aria-label`, `role`, foco visível

```tsx
// Antes
<button onClick={() => setIsOpen(false)}>✕</button>

// Depois
<button 
  onClick={() => setIsOpen(false)}
  aria-label="Fechar guia virtual"
  className="focus:ring-2 focus:ring-blue-500"
>
  ✕
</button>
```

#### **9. Design System**
- **Problema**: Cores e espaçamentos hardcoded repetidos
- **Solução**: Criar arquivo de design tokens:

```ts
// styles/theme.ts
export const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6366f1',
    success: '#10b981',
    danger: '#ef4444',
    slate: {
      50: '#f8fafc',
      // ...
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    // ...
  }
};
```

#### **10. Testes**
- **Problema**: Zero testes (unit, integration, e2e)
- **Solução**: Adicionar:

```bash
# Unit tests
npm install -D vitest @testing-library/react @testing-library/jest-dom

# E2E tests
npm install -D playwright
```

```tsx
// App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renderiza o título principal', () => {
    render(<App />);
    expect(screen.getByText(/Campos do Jordão/i)).toBeInTheDocument();
  });
});
```

#### **11. Dados hardcoded**
- **Problema**: Restaurantes, hotéis em arrays estáticos
- **Solução**: Migrar para:
  - Strapi/Sanity (headless CMS)
  - Ou JSON files + API REST
  - Supabase (banco + API)

```bash
npm install @supabase/supabase-js
```

#### **12. Servidor proxy em produção**
- **Problema**: `genai-proxy.cjs` não está production-ready
- **Solução**: 
  - Adicionar rate limiting
  - CORS configurável
  - Logs estruturados
  - Deploy separado (Vercel Serverless Functions, Railway, Render)

```javascript
// Melhorias no proxy:
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite por IP
}));
```

---

### **🟢 BAIXO IMPACTO (Nice to have):**

#### **13. UI/UX Enhancements**
- Adicionar skeleton loaders
- Animações mais suaves (Framer Motion)
- Dark mode
- Internacionalização (i18n)

```bash
npm install framer-motion
npm install react-i18next i18next
```

#### **14. Analytics**
- Adicionar Google Analytics ou Plausible
- Trackear interações com IA

```bash
npm install @vercel/analytics
# ou
npm install plausible-tracker
```

#### **15. PWA**
- Adicionar Service Worker
- Manifest.json para instalação
- Offline support

```bash
npm install vite-plugin-pwa -D
```

#### **16. Documentação**
- README com setup completo
- JSDoc nos componentes
- Storybook para UI components

```bash
npx storybook@latest init
```

---

## **5. 📋 RECOMENDAÇÕES PRIORITÁRIAS**

### **Semana 1: Segurança & Estrutura**
```bash
# 1. Adicionar React Router
npm install react-router-dom

# 2. Refatorar componentes grandes
# Criar pastas: components/layout, components/home, components/chat

# 3. Remover API key do frontend
# Editar vite.config.ts - remover define com API_KEY
# Garantir que só o proxy tenha acesso via variáveis de ambiente
```

**Arquivos a modificar:**
- [ ] `vite.config.ts` - remover exposição de API key
- [ ] `App.tsx` - implementar React Router
- [ ] Criar `components/layout/Navbar.tsx`
- [ ] Criar `components/layout/Footer.tsx`
- [ ] Criar `components/home/Hero.tsx`
- [ ] Criar `components/chat/VirtualGuide.tsx`

### **Semana 2: Performance & SEO**
```bash
# 4. Adicionar lazy loading nos componentes
# 5. Implementar React Helmet
npm install react-helmet-async

# 6. Otimizar imagens (WebP, lazy load)
# Converter imagens para WebP: https://squoosh.app/
```

**Arquivos a modificar:**
- [ ] `App.tsx` - adicionar lazy loading
- [ ] Todos os componentes - adicionar Helmet com meta tags
- [ ] `index.html` - adicionar meta tags base
- [ ] Criar `public/sitemap.xml`
- [ ] Criar `public/robots.txt`

### **Semana 3: Qualidade**
```bash
# 7. Adicionar testes básicos
npm install -D vitest @testing-library/react @testing-library/jest-dom

# 8. Configurar ESLint + Prettier
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react

# 9. Adicionar CI/CD (GitHub Actions)
# Criar arquivo .github/workflows/ci.yml
```

**Arquivos a criar:**
- [ ] `vitest.config.ts`
- [ ] `.eslintrc.json`
- [ ] `.prettierrc`
- [ ] `App.test.tsx`
- [ ] `services/gemini.test.ts`
- [ ] `.github/workflows/ci.yml`

---

## **6. 🎯 MELHORIAS ESPECÍFICAS SUGERIDAS**

### **Para o `App.tsx`:**
```tsx
// ❌ ANTES: 485 linhas, tudo junto
function App() {
  const [page, setPage] = useState('home');
  const [filter, setFilter] = useState('Todos');
  // ... 400+ linhas
}

// ✅ DEPOIS: Componentizar
// App.tsx (50 linhas - só roteamento)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { PasseiosPage } from './pages/PasseiosPage';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/passeios" element={<PasseiosPage />} />
          {/* ... */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

// pages/HomePage.tsx (componente dedicado)
// layouts/MainLayout.tsx (Navbar + Footer)
```

### **Para o serviço Gemini:**
```typescript
// services/gemini.ts - Adicionar cache
class GeminiService {
  private cache = new Map<string, {text: string, timestamp: number}>();
  private CACHE_TTL = 3600000; // 1 hora

  async sendMessage(message: string, opts?: { tone?: string }) {
    // Verificar cache
    const cacheKey = `${message}-${opts?.tone || 'friendly'}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      console.log('Resposta do cache');
      return { text: cached.text };
    }

    // Chamar API
    const response = await this.callAPI(message, opts);
    
    // Salvar no cache
    this.cache.set(cacheKey, { 
      text: response.text, 
      timestamp: Date.now() 
    });
    
    return response;
  }

  clearCache() {
    this.cache.clear();
  }
}
```

### **Para os mapas (Roteiros.tsx):**
```tsx
// ❌ ANTES: Manipulação manual do DOM
const loadLeaflet = () => new Promise<void>((resolve) => {
  const s = document.createElement('script');
  s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
  document.body.appendChild(s);
  // ...
});

// ✅ DEPOIS: Usar React Leaflet
npm install react-leaflet leaflet

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Roteiros() {
  return (
    <MapContainer center={[-22.739, -45.588]} zoom={13}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {locations.map(loc => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

### **Melhorar a experiência com IA:**
```tsx
// Adicionar sugestões de perguntas
const SUGGESTED_QUESTIONS = [
  "Qual a altitude de Campos do Jordão?",
  "Onde comer fondue?",
  "Melhores hotéis para casais",
  "Roteiro de 2 dias na cidade",
  "Como chegar de São Paulo?"
];

// Adicionar feedback nas respostas
function VirtualGuide() {
  const [feedback, setFeedback] = useState<'good' | 'bad' | null>(null);

  return (
    <>
      {/* Resposta da IA */}
      <div className="flex gap-2 mt-2">
        <button 
          onClick={() => handleFeedback('good')}
          aria-label="Resposta útil"
        >
          👍
        </button>
        <button 
          onClick={() => handleFeedback('bad')}
          aria-label="Resposta não útil"
        >
          👎
        </button>
      </div>
    </>
  );
}
```

---

## **7. 🏆 PONTOS FORTES DO PROJETO**

- ✅ **Interface moderna e atraente** - Design limpo com Tailwind CSS
- ✅ **Integração funcional com IA** - Gemini respondendo perguntas relevantes
- ✅ **Boa organização de dados** - Separação em constants, siteContent
- ✅ **Experiência mobile-friendly** - Responsive design implementado
- ✅ **Animações sutis e polidas** - Ken Burns effect, floaty logo
- ✅ **Mapa interativo funcional** - Leaflet com marcadores customizados
- ✅ **Proxy bem estruturado** - Suporta tanto API key quanto service account
- ✅ **Conteúdo rico** - Informações detalhadas sobre a cidade

---

## **8. 📊 MÉTRICAS E MONITORAMENTO (Futuro)**

### **Para implementar:**
```javascript
// Trackear uso da IA
analytics.track('ai_query', {
  query: message,
  response_time: responseTime,
  user_satisfied: feedback
});

// Trackear navegação
analytics.page('Passeios', {
  filter: currentFilter,
  search: searchQuery
});

// Trackear conversões
analytics.track('booking_click', {
  hotel: hotelName,
  source: 'website'
});
```

---

## **9. 🔒 CHECKLIST DE SEGURANÇA**

- [ ] API keys nunca expostas no frontend
- [ ] CORS configurado corretamente no proxy
- [ ] Rate limiting implementado
- [ ] Validação de inputs do usuário
- [ ] Sanitização de conteúdo HTML (XSS protection)
- [ ] HTTPS em produção
- [ ] Variáveis de ambiente protegidas
- [ ] Dependências atualizadas (npm audit)

```bash
# Verificar vulnerabilidades
npm audit
npm audit fix

# Atualizar dependências
npm outdated
npm update
```

---

## **10. 📝 COMANDOS ÚTEIS**

### **Desenvolvimento:**
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Iniciar proxy GenAI
npm run genai-proxy

# Iniciar servidor mock (sem API key)
npm run local-ai

# Build para produção
npm run build

# Preview do build
npm run preview
```

### **Git Workflow:**
```bash
# Puxar atualizações do colega
git pull

# Fazer alterações e commitar
git add .
git commit -m "feat: adiciona React Router"
git push

# Criar branch para feature
git checkout -b feature/nova-funcionalidade
git push -u origin feature/nova-funcionalidade
```

### **Testes (após implementar):**
```bash
# Rodar testes
npm test

# Testes com coverage
npm test -- --coverage

# Testes E2E
npx playwright test
```

---

## **11. 🚢 DEPLOY (Sugestões)**

### **Frontend (Vercel - Recomendado):**
```bash
npm install -g vercel
vercel login
vercel
```

**Vantagens:**
- Deploy automático via GitHub
- HTTPS grátis
- CDN global
- Preview de PRs

### **Backend/Proxy (Railway/Render):**
```bash
# Railway
npm install -g @railway/cli
railway login
railway init
railway up
```

**Configurar variáveis de ambiente:**
- `API_KEY` ou `GOOGLE_APPLICATION_CREDENTIALS`
- `PORT=5051`
- `NODE_ENV=production`

### **Alternativas:**
- **Netlify** (frontend)
- **Fly.io** (backend)
- **Google Cloud Run** (se já usa GCP)

---

## **12. 📚 RECURSOS E REFERÊNCIAS**

### **Documentação:**
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [Google Gemini API](https://ai.google.dev/docs)
- [Leaflet](https://leafletjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### **Ferramentas úteis:**
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditar performance
- [BundlePhobia](https://bundlephobia.com/) - Verificar tamanho de dependências
- [Can I Use](https://caniuse.com/) - Compatibilidade de browsers

---

## **13. 🎯 ROADMAP SUGERIDO**

### **Q1 2026 (Janeiro - Março)**
- ✅ Setup do repositório Git
- ⏳ Refatoração arquitetural (React Router, componentes)
- ⏳ Melhorias de segurança (API key)
- ⏳ Implementar testes básicos

### **Q2 2026 (Abril - Junho)**
- [ ] SEO completo (meta tags, sitemap)
- [ ] Performance optimization (lazy load, caching)
- [ ] Analytics e monitoramento
- [ ] PWA features

### **Q3 2026 (Julho - Setembro)**
- [ ] Migrar para headless CMS (Strapi/Sanity)
- [ ] Sistema de reservas integrado
- [ ] Painel administrativo
- [ ] Multi-idioma (PT/EN/ES)

### **Q4 2026 (Outubro - Dezembro)**
- [ ] Dark mode
- [ ] App mobile (React Native)
- [ ] Programa de fidelidade
- [ ] Integração com redes sociais

---

## **14. 💡 IDEIAS PARA FUTURAS FEATURES**

### **Alto Impacto:**
1. **Sistema de avaliações** - Usuários avaliarem passeios/hotéis
2. **Favoritos salvos** - Salvar lugares preferidos (localStorage ou login)
3. **Comparador de hotéis** - Comparar preços e facilidades
4. **Previsão do tempo** - Integração com API de clima
5. **Eventos em tempo real** - Calendário de eventos da cidade

### **Médio Impacto:**
6. **Chat em tempo real** - Suporte via WhatsApp/Chat
7. **Blog/Notícias** - Conteúdo sobre a cidade
8. **Calculadora de custos** - Estimar gastos da viagem
9. **Modo offline** - PWA com cache de conteúdo
10. **Compartilhar roteiros** - Gerar link único de roteiro personalizado

### **Inovações com IA:**
11. **Roteiro personalizado com IA** - "Crie um roteiro romântico de 2 dias"
12. **Assistente de voz** - Interação por voz com o guia virtual
13. **Reconhecimento de imagens** - Upload de foto → IA identifica local
14. **Tradutor automático** - Traduzir todo o site dinamicamente
15. **Recomendações personalizadas** - ML baseado em comportamento

---

## **15. ⚠️ PROBLEMAS CRÍTICOS A RESOLVER IMEDIATAMENTE**

### **1. API Key exposta (URGENTE)**
**Arquivo:** `vite.config.ts` linhas 10-11

```typescript
// ❌ REMOVER IMEDIATAMENTE:
define: {
  'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
  'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
}
```

**Ação:**
1. Remover essas linhas
2. Verificar se `.env` está no `.gitignore`
3. Garantir que todas as chamadas vão pelo proxy
4. Revogar a API key atual se já foi commitada

### **2. Falta de .gitignore adequado**
Verificar se existe e se inclui:
```gitignore
# Dependências
node_modules/
.pnp
.pnp.js

# Produção
dist/
build/

# Ambiente
.env
.env.local
.env.production

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db
```

### **3. README desatualizado**
Criar um README.md completo com:
- Descrição do projeto
- Como rodar localmente
- Como configurar variáveis de ambiente
- Como contribuir
- Licença

---

## **RESUMO EXECUTIVO**

### **Status Atual:** ⚠️ Funcional mas precisa de refatoração antes de produção

### **Prioridade Máxima (Fazer HOJE):**
1. ❗ Remover API key do vite.config.ts
2. ❗ Adicionar/verificar .gitignore
3. ❗ Documentar setup no README

### **Próximos Passos (Esta Semana):**
1. Implementar React Router
2. Refatorar App.tsx em componentes menores
3. Adicionar error boundaries
4. Começar testes básicos

### **Objetivos de Médio Prazo:**
- SEO completo
- Performance otimizada (>90 no Lighthouse)
- Cobertura de testes >70%
- Deploy em produção

---

**Desenvolvido com ❤️ para Campos do Jordão**

---

*Documento gerado em: 30 de Janeiro de 2026*  
*Última atualização: 30 de Janeiro de 2026*
