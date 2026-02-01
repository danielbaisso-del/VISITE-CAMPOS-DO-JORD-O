import React from 'react';
import { useLanguage } from '../../contexts';

export const EventosPage: React.FC = () => {
  const { language } = useLanguage();

  const texts = {
    pt: {
      title: 'Eventos',
      description: 'Confira nossa seção de eventos em breve.',
    },
    en: {
      title: 'Events',
      description: 'Check our events section soon.',
    },
    es: {
      title: 'Eventos',
      description: 'Consulte nuestra sección de eventos pronto.',
    },
  };

  const t = texts[language];

  return (
    <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">{t.title}</h2>
      <p className="text-slate-600">{t.description}</p>
    </main>
  );
};

export default EventosPage;
