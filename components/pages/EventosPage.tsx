import React from 'react';
import { useLanguage } from '../../contexts';

export const EventosPage: React.FC = () => {
  const { language } = useLanguage();

  const texts = {
    pt: {
      title: 'Eventos em Campos do Jordão',
      subtitle: 'A cidade que nunca para de celebrar',
      description: 'Campos do Jordão é conhecida por sua intensa programação cultural durante todo o ano. O famoso Festival de Inverno, shows, feiras gastronômicas, eventos esportivos e festivais temáticos fazem da cidade um destino vibrante em qualquer estação.',
      calendarTitle: 'Calendário Oficial de Eventos',
      calendarDescription: 'Acesse o calendário oficial da Prefeitura de Campos do Jordão para conferir todos os eventos programados, datas, locais e informações detalhadas sobre a programação cultural da cidade.',
      buttonText: 'Ver Calendário de Eventos',
      highlights: [
        { icon: '🎵', title: 'Festival de Inverno', desc: 'O maior festival de música clássica da América Latina' },
        { icon: '🍺', title: 'Festival da Cerveja', desc: 'Celebração das cervejarias artesanais locais' },
        { icon: '🌸', title: 'Festival das Flores', desc: 'Exposições e decorações florais pela cidade' },
        { icon: '🎄', title: 'Natal Iluminado', desc: 'Decoração especial e eventos natalinos' },
      ]
    },
    en: {
      title: 'Events in Campos do Jordão',
      subtitle: 'The city that never stops celebrating',
      description: 'Campos do Jordão is known for its intense cultural programming throughout the year. The famous Winter Festival, concerts, gastronomic fairs, sports events and themed festivals make the city a vibrant destination in any season.',
      calendarTitle: 'Official Events Calendar',
      calendarDescription: 'Access the official calendar of the Campos do Jordão City Hall to check all scheduled events, dates, locations and detailed information about the city\'s cultural program.',
      buttonText: 'View Events Calendar',
      highlights: [
        { icon: '🎵', title: 'Winter Festival', desc: 'The largest classical music festival in Latin America' },
        { icon: '🍺', title: 'Beer Festival', desc: 'Celebration of local craft breweries' },
        { icon: '🌸', title: 'Flower Festival', desc: 'Floral exhibitions and decorations throughout the city' },
        { icon: '🎄', title: 'Illuminated Christmas', desc: 'Special decoration and Christmas events' },
      ]
    },
    es: {
      title: 'Eventos en Campos do Jordão',
      subtitle: 'La ciudad que nunca deja de celebrar',
      description: 'Campos do Jordão es conocida por su intensa programación cultural durante todo el año. El famoso Festival de Invierno, conciertos, ferias gastronómicas, eventos deportivos y festivales temáticos hacen de la ciudad un destino vibrante en cualquier estación.',
      calendarTitle: 'Calendario Oficial de Eventos',
      calendarDescription: 'Acceda al calendario oficial de la Municipalidad de Campos do Jordão para consultar todos los eventos programados, fechas, lugares e información detallada sobre la programación cultural de la ciudad.',
      buttonText: 'Ver Calendario de Eventos',
      highlights: [
        { icon: '🎵', title: 'Festival de Invierno', desc: 'El mayor festival de música clásica de América Latina' },
        { icon: '🍺', title: 'Festival de la Cerveza', desc: 'Celebración de las cervecerías artesanales locales' },
        { icon: '🌸', title: 'Festival de las Flores', desc: 'Exposiciones y decoraciones florales por la ciudad' },
        { icon: '🎄', title: 'Navidad Iluminada', desc: 'Decoración especial y eventos navideños' },
      ]
    },
  };

  const t = texts[language];

  return (
    <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4">{t.title}</h1>
        <p className="text-xl text-slate-600 italic">{t.subtitle}</p>
      </div>

      {/* Descrição */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-lg text-slate-600 leading-relaxed">{t.description}</p>
      </div>

      {/* Destaques de eventos */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {t.highlights.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow text-center">
            <span className="text-4xl mb-3 block">{item.icon}</span>
            <h3 className="font-semibold text-slate-800 mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Card do Calendário Oficial */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl">
        <div className="max-w-2xl mx-auto">
          <span className="text-5xl mb-4 block">📅</span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.calendarTitle}</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">{t.calendarDescription}</p>
          <a
            href="https://camposdojordao.sp.gov.br/calendario-de-eventos/?mes=Julho"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
          >
            <span>{t.buttonText}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
};

export default EventosPage;
