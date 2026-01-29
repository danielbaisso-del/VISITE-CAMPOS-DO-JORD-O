
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { TOURS } from './constants';
import SITE_CONTENT from './data/siteContent';
import Gastronomia from './components/Gastronomia';
import Passeios from './components/Passeios';
import Roteiros from './components/Roteiros';
import { TourItem, ChatMessage } from './types';
import Accommodations from './components/Accommodations';
import ACCOMMODATIONS from './components/accommodationsData';
import Hospedagens from './components/Hospedagens';
import QuemSomos from './components/QuemSomos';
import TourCard from './components/TourCard';
import { geminiService } from './services/gemini';

const Navbar: React.FC<{ current: string; onNavigate: (p: string) => void }> = ({ current, onNavigate }) => (
  <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
          <img
            src="https://visitecamposdojordao.org.br/wp-content/uploads/2019/11/logo-branco.png"
            alt="Logo Campos do Jordão"
            className="w-full h-full object-contain p-1"
          />
        </div>
        <span className="text-white font-bold text-lg hidden md:block tracking-tight">VISITE CAMPOS DO JORDÃO</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium text-sm">
        <button onClick={() => onNavigate('home')} className={`hover:text-blue-400 transition-colors ${current === 'home' ? 'text-white' : ''}`}>A Cidade</button>
        <button onClick={() => onNavigate('passeios')} className={`hover:text-blue-400 transition-colors ${current === 'passeios' ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>Passeios</button>
        <button onClick={() => onNavigate('roteiros')} className={`hover:text-blue-400 transition-colors ${current === 'roteiros' ? 'text-white border-b-2 border-blue-500 pb-1' : ''}`}>Roteiros</button>
        <button onClick={() => onNavigate('ondecomer')} className={`hover:text-blue-400 transition-colors ${current === 'ondecomer' ? 'text-white' : ''}`}>Onde Comer</button>
        <button onClick={() => onNavigate('eventos')} className={`hover:text-blue-400 transition-colors ${current === 'eventos' ? 'text-white' : ''}`}>Eventos</button>
        <button onClick={() => onNavigate('hospedagens')} className={`hover:text-blue-400 transition-colors ${current === 'hospedagens' ? 'text-white' : ''}`}>Onde Ficar</button>
        <button onClick={() => onNavigate('quemsomos')} className={`hover:text-blue-400 transition-colors ${current === 'quemsomos' ? 'text-white' : ''}`}>Quem somos</button>
      </div>
      <button onClick={() => onNavigate('associe')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all">
        Associe-se
      </button>
    </div>
  </nav>
);

const Hero: React.FC = () => {
  // use a known public hero image so the Hero appears immediately
  const HERO_IMAGE = 'https://s3.netcampos.com/imgs/20220417182615/portal-campos.jpg';

  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  const [resultCard, setResultCard] = useState<{ text: string; actions?: Array<{ label?: string; url?: string }> } | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

  const handleSearch = async (q?: string) => {
    const text = (q ?? query).trim();
    if (!text) return;
    setSearching(true);
    setLoadingResult(true);
    setCardVisible(false);
    try {
      const resp = await geminiService.sendMessage(text, { tone: 'friendly' });
      const parsedText = typeof resp.text === 'string' ? resp.text : JSON.stringify(resp.text);
      setResultCard({ text: parsedText, actions: resp.actions });
      // small delay to allow entry animation
      setTimeout(() => setCardVisible(true), 80);
    } catch (e) {
      setResultCard({ text: 'Desculpe, não foi possível obter resposta no momento.' });
      setCardVisible(true);
    }
    setSearching(false);
    setLoadingResult(false);
  };

  return (
    <div className="relative h-[68vh] min-h-[520px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 transform-gpu will-change-transform">
        <div
          className="absolute inset-0 bg-center bg-cover animate-kenburns"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950/60" />
      </div>

      <div className="relative z-20 text-center px-6 w-full">
        <img
          src="https://visitecamposdojordao.org.br/wp-content/uploads/2019/11/logo-branco.png"
          alt="Logo Campos do Jordão"
          onClick={() => setCelebrate((s) => !s)}
          className={`mx-auto mb-4 w-40 max-w-full transition-transform duration-700 ${celebrate ? 'animate-spin-slow scale-105' : 'floaty hover:scale-105'}`}
          style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.6))' }}
        />
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white font-bold tracking-tight leading-tight mb-4">Campos do Jordão, destino de experiências</h1>
        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-8">Turismo, eventos, gastronomia e hospedagem com curadoria local para valorizar o destino o ano todo.</p>

        <div className="mx-auto max-w-2xl px-4">
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl blur-xl opacity-30" style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.12), rgba(14,165,233,0.08))' }} />
            <div className="relative flex items-center gap-3 bg-white/6 backdrop-blur-md border border-white/10 rounded-3xl px-4 py-3 shadow-lg">
              <input
                aria-label="Pesquisar sobre Campos do Jordão"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="flex-grow bg-transparent placeholder-slate-200 text-white outline-none text-sm md:text-base"
                placeholder="Pergunte sobre Campos do Jordão ou sobre o nosso site"
              />
              <button
                onClick={() => handleSearch()}
                className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition"
              >
                {searching ? '...' : 'Pesquisar'}
              </button>
            </div>
          </div>
        </div>

        {/* Integrated result card (glassmorphism) */}
        <div className="mt-6 flex justify-center">
          <div className={`w-full max-w-3xl transition-all duration-400 ${cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="bg-slate-900/60 rounded-[2rem] p-6 backdrop-blur-xl border border-white/10 shadow-2xl text-slate-50">
              <div className="flex items-start justify-between gap-4">
                <div className="prose prose-invert max-w-none text-sm whitespace-pre-wrap">{loadingResult ? 'Carregando...' : (resultCard ? resultCard.text : 'Faça uma pergunta para ver a resposta aqui.')}</div>
                <div className="flex-shrink-0 text-xs text-slate-300">{loadingResult ? '' : ''}</div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(resultCard && resultCard.actions && resultCard.actions.length > 0 ? resultCard.actions : [
                  { label: 'Passeios', url: '/#explore' },
                  { label: 'Onde Comer', url: '/#ondecomer' },
                  { label: 'Onde Ficar', url: '/#hospedagens' }
                ]).map((a, i) => (
                  <a key={i} href={a.url || '#'} className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs hover:bg-white/20 transition">{a.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes kenburns { 0% { transform: scale(1) translateZ(0); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
        .animate-kenburns { animation: kenburns 40s ease-in-out infinite both; }
        @keyframes floaty { 0% { transform: translateY(0px); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0px); } }
        .floaty { animation: floaty 4s ease-in-out infinite; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 1.2s linear; }
      `}</style>
    </div>
  );
};

// TourCard moved to components/TourCard.tsx

const VirtualGuide: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tone, setTone] = useState<string>('friendly');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [ctaStyle, setCtaStyle] = useState<React.CSSProperties | undefined>(undefined);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [messages, isOpen]);

  // listen for a global event to open the guide (CTA is rendered in the Hero)
  useEffect(() => {
    function onOpen() { setIsOpen(true); }
    window.addEventListener('virtualguide:open', onOpen as EventListener);
    return () => window.removeEventListener('virtualguide:open', onOpen as EventListener);
  }, []);

  // listen for direct search queries dispatched from the Hero (open guide and run query)
  useEffect(() => {
    async function onOpenQuery(e: any) {
      const q = e && e.detail && e.detail.query;
      if (!q) return;
      setIsOpen(true);
      setMessages(prev => [...prev, { role: 'user', text: q }]);
      setIsLoading(true);
      try {
        const response = await geminiService.sendMessage(q, { tone });
        setMessages(prev => [...prev, { role: 'model', text: response.text, actions: response.actions }]);
      } catch (err) {
        setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, ocorreu um erro ao obter resposta.' }]);
      }
      setIsLoading(false);
    }
    window.addEventListener('virtualguide:open-query', onOpenQuery as EventListener);
    return () => window.removeEventListener('virtualguide:open-query', onOpenQuery as EventListener);
  }, [tone]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;
    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const response = await geminiService.sendMessage(userMsg, { tone });
      setMessages(prev => [...prev, { role: 'model', text: response.text, actions: response.actions }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, ocorreu um erro ao obter resposta.' }]);
    }
    setIsLoading(false);
  };

  const handleActionNav = (a: { label?: string; url?: string }) => {
    const url = (a.url || '').toString();
    if (/^https?:\/\//i.test(url)) return window.open(url, '_blank', 'noopener');
    if (url.includes('#')) {
      const hash = url.split('#')[1] || '';
      if (hash) {
        window.location.hash = `#${hash}`;
        window.dispatchEvent(new CustomEvent('site:navigate', { detail: { target: hash } }));
        setIsOpen(false);
        return;
      }
    }
    if (url.startsWith('/')) {
      const path = url.replace(/^\//, '').split('/')[0];
      window.dispatchEvent(new CustomEvent('site:navigate', { detail: { target: path } }));
      setIsOpen(false);
      return;
    }
    // fallback
    window.location.hash = url;
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[120] pointer-events-none">
      {/* Floating CTA with glow */}
      <div className="absolute -bottom-3 -right-3 w-64 h-64 pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-10 blur-3xl animate-pulse" />
      </div>
      {/* CTA moved to Hero; VirtualGuide will open when it receives 'virtualguide:open' */}

      {isOpen && (
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-4xl h-[70vh] bg-white rounded-3xl shadow-[0_30px_80px_rgba(2,6,23,0.6)] border border-slate-200 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
            <div className="flex items-center gap-3">
              <img src="https://visitecamposdojordao.org.br/wp-content/uploads/2019/11/logo-branco.png" alt="logo" className="w-9 h-9 rounded-md object-contain" />
              <div>
                <div className="font-bold text-sm">Guia Virtual Inteligente</div>
                <div className="text-[11px] opacity-90">Respostas rápidas sobre Campos do Jordão</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select value={tone} onChange={(e) => setTone(e.target.value)} className="text-xs bg-white/20 text-white rounded px-2 py-1">
                <option value="friendly">Padrão</option>
                <option value="formal">Formal</option>
                <option value="mice">Eventos (MICE)</option>
              </select>
              <button onClick={() => setIsOpen(false)} className="text-white/90 text-lg">✕</button>
            </div>
          </div>

          <div className="flex-grow p-6 overflow-y-auto" ref={scrollRef}>
            {messages.length === 0 && (
              <div className="text-center text-slate-400 py-8 bg-white/4 backdrop-blur-md rounded-lg px-4">Olá! Em que posso ajudar hoje?</div>
            )}
            <div className="space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${msg.role === 'user' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' : 'bg-white/6 backdrop-blur-md border border-white/10 text-slate-100'} max-w-[85%] p-4 rounded-3xl text-sm`}> 
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.actions.map((a, idx) => (
                          <button key={idx} onClick={() => handleActionNav(a)} className="bg-white/10 border border-white/20 text-white/90 px-3 py-1 rounded-full text-xs hover:brightness-110 transition-colors">
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && <div className="text-sm text-slate-500">Digitando...</div>}
            </div>
          </div>

          <div className="px-6 py-4 border-t border-slate-100 bg-white">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Pergunte sobre Campos do Jordão ou sobre o nosso site"
                className="flex-grow rounded-full px-4 py-3 text-sm border border-slate-200 bg-slate-50 focus:outline-none"
              />
              <button onClick={handleSend} className="bg-slate-900 text-white px-5 py-2 rounded-full">Enviar</button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [filter, setFilter] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState<'home'|'passeios'|'roteiros'|'ondecomer'|'eventos'|'hospedagens'|'quemsomos'|'associe'>('home');

  useEffect(() => {
    if (page === 'associe') {
      window.open('https://www.visitecamposdojordao.org.br/associados/associe-se/', '_blank');
      setPage('home');
    }
  }, [page]);

  // listen to navigation events from other components (e.g. VirtualGuide actions)
  useEffect(() => {
    function onNav(e: any) {
      const t = e && e.detail && e.detail.target;
      if (!t) return;
      const map: Record<string, any> = {
        explore: 'home',
        passeios: 'passeios',
        roteiros: 'roteiros',
        ondecomer: 'ondecomer',
        hospedagens: 'hospedagens',
        quemsomos: 'quemsomos',
        eventos: 'eventos',
        associe: 'associe'
      };
      const normalized = String(t).toLowerCase();
      if (map[normalized]) setPage(map[normalized]);
      if (normalized === 'explore' || normalized === 'home') {
        setPage('home');
        setTimeout(() => {
          const el = document.getElementById('explore');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
    window.addEventListener('site:navigate', onNav as EventListener);
    return () => window.removeEventListener('site:navigate', onNav as EventListener);
  }, []);

  const filteredTours = useMemo(() => {
    const searchLower = (searchQuery || '').trim().toLowerCase();

    const base = TOURS.filter(tour => {
      const matchesFilter = filter === 'Todos' || tour.category === filter;
      const matchesSearch = !searchLower || (tour.title && tour.title.toLowerCase().includes(searchLower)) || (tour.description && tour.description.toLowerCase().includes(searchLower));
      return matchesFilter && matchesSearch;
    });

    if (filter === 'Gastronomia') {
      const restos = (SITE_CONTENT.restaurants || []).map(r => ({
        id: r.id || (r.name || '').replace(/\s+/g, '-').toLowerCase(),
        title: r.name,
        category: 'Gastronomia',
        description: r.specialty || '',
        address: r.address || '',
        phone: r.phone || '',
        imageUrl: r.image || `/images/gastronomia/${r.id}.jpg`,
        website: r.website || undefined
      }));
      const existingIds = new Set(base.map(b => b.id));
      return [...base, ...restos.filter(r => !existingIds.has(r.id))];
    }

    if (filter === 'Todos') {
      const fromAttractions = (SITE_CONTENT.attractions || []).map(a => ({ id: a.id || a.title, title: a.title, category: a.category || 'Attraction', description: a.description || '', imageUrl: '' }));
      const fromHotels = (SITE_CONTENT.hotels || []).map(h => {
        const acc = ACCOMMODATIONS.find(a => a.id === h.id);
        const image = acc?.images?.[0] || (h as any).image || `/images/hospedagens/${h.id}.jpg`;
        const description = acc?.description || (h as any).description || '';
        const address = acc?.address || (h as any).address || '';
        const phone = acc?.phone || (h as any).phone || '';
        const website = acc?.website || (h as any).website || '';
        const status = '';
        const tags = acc?.tags || (h as any).tags || [];
        return {
          id: h.id || h.name,
          title: acc?.name || h.name,
          category: 'Hospedagem',
          description,
          imageUrl: image,
          address,
          phone,
          website,
          status,
          tags
        };
      });
      const combined = [...base, ...fromAttractions, ...fromHotels];
      const seen = new Set<string>();
      return combined.filter(item => {
        if (!item || !item.id) return false;
        if (seen.has(item.id)) return false;
        const match = !searchLower || (item.title && item.title.toLowerCase().includes(searchLower)) || (item.description && item.description.toLowerCase().includes(searchLower));
        if (!match) return false;
        seen.add(item.id);
        return true;
      }) as any;
    }

    return base as any;
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar current={page} onNavigate={setPage} />

      {page === 'home' && (
        <>
          <Hero />
          <main className="flex-grow max-w-7xl mx-auto px-6 py-12" id="explore">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-serif text-slate-800 mb-6 italic">
                "A cidade perfeita para quem quer apenas relaxar, agitar ou se aventurar."
              </h2>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
              <div className="flex flex-wrap gap-2">
                {['Todos', 'Cultura', 'Natureza', 'Lazer', 'Gastronomia'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                      filter === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <input 
                type="text" 
                placeholder="Buscar passeio..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map(tour => <TourCard key={tour.id} item={tour} />)}
            </div>
          </main>
        </>
      )}

      {page === 'passeios' && <Passeios />}

      {page === 'roteiros' && <Roteiros />}

      {page === 'ondecomer' && <Gastronomia />}

      {page === 'hospedagens' && <Hospedagens />}

      {page === 'quemsomos' && <QuemSomos />}

      {page === 'eventos' && (
        <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6">Eventos</h2>
          <p className="text-slate-600">Confira nossa seção de eventos em breve.</p>
        </main>
      )}

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
           <p className="text-sm mb-4">© 2026 CJRC & VB - Campos. Todos os direitos reservados.</p>
           <p className="text-xs">Desenvolvido por Concept ONE Tecnologia</p>
        </div>
      </footer>
      <VirtualGuide />
    </div>
  );
}
