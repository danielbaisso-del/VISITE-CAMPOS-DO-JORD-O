import React, { useState, useEffect } from 'react';
import { APP_CONFIG, DEFAULT_ACTIONS } from '../../config/app';
import { geminiService } from '../../services/gemini';
import { useLanguage } from '../../contexts';

// Imagens de capa do Hero
const HERO_IMAGES = [
  APP_CONFIG.hero.image,
  'https://images.pexels.com/photos/28530398/pexels-photo-28530398.jpeg?auto=compress&cs=tinysrgb&w=2400',
];

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [resultCard, setResultCard] = useState<{ text: string; actions?: Array<{ label?: string; url?: string }> } | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Troca automática de imagem a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Placeholders e textos por idioma
  const heroTexts = {
    pt: {
      title: 'Campos do Jordão, destino de experiências',
      subtitle: 'Turismo, eventos, gastronomia e hospedagem com curadoria local para valorizar o destino o ano todo.',
      placeholder: 'Pergunte sobre Campos do Jordão ou sobre o nosso site',
      search: 'Pesquisar',
      loading: 'Carregando...',
      defaultText: 'Faça uma pergunta para ver a resposta aqui.',
      error: 'Desculpe, não foi possível obter resposta no momento.',
    },
    en: {
      title: 'Campos do Jordão, a destination of experiences',
      subtitle: 'Tourism, events, gastronomy and accommodation with local curation to enhance the destination all year round.',
      placeholder: 'Ask about Campos do Jordão or about our website',
      search: 'Search',
      loading: 'Loading...',
      defaultText: 'Ask a question to see the answer here.',
      error: 'Sorry, we could not get a response at this time.',
    },
    es: {
      title: 'Campos do Jordão, destino de experiencias',
      subtitle: 'Turismo, eventos, gastronomía y alojamiento con curaduría local para valorizar el destino todo el año.',
      placeholder: 'Pregunta sobre Campos do Jordão o sobre nuestro sitio',
      search: 'Buscar',
      loading: 'Cargando...',
      defaultText: 'Haz una pregunta para ver la respuesta aquí.',
      error: 'Lo sentimos, no fue posible obtener una respuesta en este momento.',
    },
  };

  const texts = heroTexts[language];

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
      setTimeout(() => setCardVisible(true), 80);
    } catch (e) {
      setResultCard({ text: texts.error });
      setCardVisible(true);
    }

    setSearching(false);
    setLoadingResult(false);
  };

  const displayActions = resultCard?.actions?.length ? resultCard.actions : DEFAULT_ACTIONS;

  return (
    <div className="relative h-[68vh] min-h-[520px] flex items-center justify-center">
      {/* Background com múltiplas imagens */}
      <div className="absolute inset-0 transform-gpu will-change-transform overflow-hidden rounded-b-[3rem]">
        {HERO_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-center bg-cover animate-kenburns transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-900/60" />
      </div>

      {/* Sombra suave inferior */}
      <div 
        className="absolute -bottom-4 left-4 right-4 h-16 z-0 pointer-events-none rounded-[2rem]"
        style={{ 
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)',
          filter: 'blur(12px)'
        }}
      />

      {/* Content */}
      <div className="relative z-20 text-center px-6 w-full">
        {/* Logo */}
        <img
          src={APP_CONFIG.logo.local}
          alt="Logo Campos do Jordão"
          onClick={() => setCelebrate((s) => !s)}
          onError={(e: any) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = APP_CONFIG.logo.fallback;
          }}
          className={`mx-auto mb-4 w-40 max-w-full transition-transform duration-700 ${
            celebrate ? 'animate-spin-slow scale-105' : 'floaty hover:scale-105'
          }`}
          style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.6))' }}
        />

        {/* Title & Subtitle */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white font-bold tracking-tight leading-tight mb-4">
          {texts.title}
        </h1>
        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-8">
          {texts.subtitle}
        </p>

        {/* Search Input */}
        <div className="mx-auto max-w-2xl px-4">
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-3xl blur-xl opacity-30"
              style={{ background: 'linear-gradient(90deg, rgba(99,102,241,0.12), rgba(14,165,233,0.08))' }}
            />
            <div className="relative flex items-center gap-3 bg-white/6 backdrop-blur-md border border-white/10 rounded-3xl px-4 py-3 shadow-lg">
              <input
                aria-label={texts.placeholder}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="flex-grow bg-transparent placeholder-slate-200 text-white outline-none text-sm md:text-base"
                placeholder={texts.placeholder}
              />
              <button
                onClick={() => handleSearch()}
                className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition"
              >
                {searching ? '...' : texts.search}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Result Card - Sobrepondo a capa */}
      {cardVisible && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-[85%] z-50 w-full max-w-4xl px-4">
          <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-[2rem] p-6 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-slate-50">
            {/* Header do Card */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                <span className="text-sm font-semibold text-white/90">Guia Virtual</span>
              </div>
              <button 
                onClick={() => setCardVisible(false)}
                className="text-white/60 hover:text-white/90 transition-colors text-lg"
              >
                ✕
              </button>
            </div>
            
            {/* Conteúdo da Resposta */}
            <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
              <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                {loadingResult ? (
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></div>
                    {texts.loading}
                  </div>
                ) : (
                  <div className="whitespace-pre-wrap text-slate-100">
                    {resultCard ? resultCard.text : texts.defaultText}
                  </div>
                )}
              </div>
            </div>
            
            {/* Botões de Ação */}
            <div className="mt-5 pt-4 border-t border-white/10">
              <div className="flex flex-wrap gap-2">
                {displayActions.map((a, i) => (
                  <a
                    key={i}
                    href={a.url || '#'}
                    onClick={(e) => {
                      const url = a.url || '';
                      // Links externos - deixa o comportamento padrão
                      if (url.startsWith('http')) {
                        return;
                      }
                      e.preventDefault();
                      setCardVisible(false);
                      
                      // Extrai o target da URL (ex: /#ondecomer -> ondecomer)
                      const target = url.replace('/#', '').replace('#', '').replace('/', '');
                      
                      if (target) {
                        // Dispara evento de navegação para mudar de página
                        setTimeout(() => {
                          window.dispatchEvent(new CustomEvent('site:navigate', { detail: { target } }));
                        }, 100);
                      }
                    }}
                    target={a.url?.startsWith('http') ? '_blank' : undefined}
                    rel={a.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-medium hover:from-indigo-500 hover:to-blue-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 cursor-pointer"
                  >
                    <span>{a.label}</span>
                    {a.url?.startsWith('http') && <span className="opacity-70">↗</span>}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animations CSS */}
      <style>{`
        .font-serif { font-family: 'Playfair Display', serif; }
        @keyframes kenburns { 0% { transform: scale(1) translateZ(0); } 50% { transform: scale(1.06); } 100% { transform: scale(1); } }
        .animate-kenburns { animation: kenburns 40s ease-in-out infinite both; }
        @keyframes floaty { 0% { transform: translateY(0px); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0px); } }
        .floaty { animation: floaty 4s ease-in-out infinite; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spinSlow 1.2s linear; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
};

export default Hero;
