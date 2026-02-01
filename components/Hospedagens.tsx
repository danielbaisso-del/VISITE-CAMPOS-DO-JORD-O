import React, { useState } from 'react';
import ACCOMMODATIONS from './accommodationsData';
import { Accommodation } from '../types';
import { useLanguage, Language } from '../contexts';
import { getTranslatedAccommodation, getTranslatedTag } from '../data/translations';

const Card: React.FC<{ a: Accommodation; onDetails: (a: Accommodation) => void; texts: any; language: Language }> = ({ a, onDetails, texts, language }) => {
  // Get translated content
  const translation = getTranslatedAccommodation(a.id, language);
  const name = translation?.name || a.name;
  const description = translation?.description || a.description;
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
      <div className="relative h-44 bg-slate-200">
        <img src={a.images?.[0] ?? 'https://picsum.photos/800/450'} alt={name} className="w-full h-full object-cover" />
        {a.tags && a.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {a.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-white/90 text-slate-700 rounded-full">
                {getTranslatedTag(tag, language)}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-slate-800">{name}</h4>
            <div className="text-xs text-slate-500 mt-1">{a.address}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-slate-700">{a.priceRange}</div>
            <div className="text-xs text-slate-400">{a.stars ?? ''} ★</div>
          </div>
        </div>

        <p className="text-sm text-slate-600 mt-3 line-clamp-3">{description}</p>

        <div className="mt-4 flex gap-2">
          {a.website && (
            <a href={a.website} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold py-2 rounded-lg transition-colors">
              {texts.website}
            </a>
          )}
          {a.bookingLink ? (
            <a href={a.bookingLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
              {texts.reserve}
            </a>
          ) : (
            <button onClick={() => onDetails(a)} className="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold py-2 rounded-lg transition-colors border border-blue-100">
              {texts.details}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Hospedagens: React.FC = () => {
  const { language } = useLanguage();
  const [items] = useState<Accommodation[]>(ACCOMMODATIONS);
  const [selected, setSelected] = useState<Accommodation | null>(null);

  const texts = {
    pt: {
      title: 'Onde se Hospedar',
      subtitle: 'Selecione entre pousadas, hotéis e chalés recomendados.',
      website: 'Site Oficial',
      reserve: 'Reservar',
      details: 'Detalhes',
      phone: 'Telefone',
      visitSite: 'Visitar site',
    },
    en: {
      title: 'Where to Stay',
      subtitle: 'Choose from recommended inns, hotels and chalets.',
      website: 'Official Website',
      reserve: 'Book Now',
      details: 'Details',
      phone: 'Phone',
      visitSite: 'Visit website',
    },
    es: {
      title: 'Dónde Alojarse',
      subtitle: 'Seleccione entre posadas, hoteles y chalets recomendados.',
      website: 'Sitio Oficial',
      reserve: 'Reservar',
      details: 'Detalles',
      phone: 'Teléfono',
      visitSite: 'Visitar sitio',
    },
  };

  const t = texts[language];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-serif text-slate-800">{t.title}</h3>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => <Card key={item.id} a={item} onDetails={setSelected} texts={t} language={language} />)}
      </div>

      {selected && (() => {
        const translation = getTranslatedAccommodation(selected.id, language);
        const selectedName = translation?.name || selected.name;
        const selectedDescription = translation?.description || selected.description;
        
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden z-10">
              <div className="flex justify-between items-center p-4 border-b border-slate-100">
                <h4 className="font-semibold text-lg">{selectedName}</h4>
                <button className="text-slate-500" onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <img src={selected.images?.[0] ?? 'https://picsum.photos/800/450'} alt={selectedName} className="w-full h-56 object-cover rounded-lg" />
                  <div className="mt-4 text-sm text-slate-600">{selected.address}</div>
                  {selected.phone && <div className="mt-1 text-sm text-slate-600">{t.phone}: {selected.phone}</div>}
                  {selected.tags && selected.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {selected.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                          {getTranslatedTag(tag, language)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-700">{selectedDescription}</p>
                  <div className="mt-4">
                    {selected.website && <a href={selected.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t.visitSite}</a>}
                  </div>
                  <div className="mt-6">
                    <button onClick={() => { if (selected.bookingLink) window.open(selected.bookingLink, '_blank'); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg">{t.reserve}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

export default Hospedagens;
