import React, { useState } from 'react';
import { APP_CONFIG, DEFAULT_ACTIONS } from '../../config/app';
import { geminiService } from '../../services/gemini';
import { useLanguage } from '../../contexts';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [resultCard, setResultCard] = useState<{ text: string; actions?: Array<{ label?: string; url?: string }> } | null>(null);
  const [cardVisible, setCardVisible] = useState(false);
  const [loadingResult, setLoadingResult] = useState(false);

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
    <div className="relative h-[68vh] min-h-[520px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 transform-gpu will-change-transform">
        <div
          className="absolute inset-0 bg-center bg-cover animate-kenburns"
          style={{ backgroundImage: `url('${APP_CONFIG.hero.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 to-slate-950/60" />
      </div>

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

        {/* Result Card */}
        <div className="mt-6 flex justify-center">
          <div className={`w-full max-w-3xl transition-all duration-400 ${
            cardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="bg-slate-900/60 rounded-[2rem] p-6 backdrop-blur-xl border border-white/10 shadow-2xl text-slate-50">
              <div className="flex items-start justify-between gap-4">
                <div className="prose prose-invert max-w-none text-sm whitespace-pre-wrap">
                  {loadingResult ? texts.loading : (resultCard ? resultCard.text : texts.defaultText)}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {displayActions.map((a, i) => (
                  <a
                    key={i}
                    href={a.url || '#'}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-xs hover:bg-white/20 transition"
                  >
                    {a.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations CSS */}
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

export default Hero;
