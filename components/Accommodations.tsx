import React, { useState } from 'react';
import { Accommodation } from '../types';
import ACCOMMODATIONS from './accommodationsData';

const Badge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full mr-2">{children}</span>
);

const Accommodations: React.FC = () => {
  const [items] = useState<Accommodation[]>(ACCOMMODATIONS);
  const [selected, setSelected] = useState<Accommodation | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12" id="accommodations">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-serif text-slate-800">Onde se Hospedar</h3>
          <p className="text-sm text-slate-500">Selecione entre pousadas, hotéis e chalés recomendados.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
            <div className="relative h-44 bg-slate-200">
              <img src={item.images?.[0] ?? 'https://picsum.photos/800/450'} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold text-slate-800">{item.name}</h4>
                  <div className="text-xs text-slate-500 mt-1">{item.address}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-700">{item.priceRange}</div>
                  <div className="text-xs text-slate-400">{item.stars} ★</div>
                </div>
              </div>

              <p className="text-sm text-slate-600 mt-3 line-clamp-3">{item.description}</p>

              <div className="mt-4 flex gap-2">
                {item.website && (
                  <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold py-2 rounded-lg transition-colors">
                    Site Oficial
                  </a>
                )}
                {item.bookingLink ? (
                  <a href={item.bookingLink} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                    Reservar
                  </a>
                ) : (
                  <button onClick={() => setSelected(item)} className="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold py-2 rounded-lg transition-colors border border-blue-100">
                    Detalhes
                  </button>
                )}
              </div>

              <div className="mt-3">
                {item.tags?.slice(0,3).map(t => <Badge key={t}>{t}</Badge>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden z-10">
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h4 className="font-semibold text-lg">{selected.name}</h4>
              <button className="text-slate-500" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={selected.images?.[0] ?? 'https://picsum.photos/800/450'} alt={selected.name} className="w-full h-56 object-cover rounded-lg" />
                <div className="mt-4 text-sm text-slate-600">{selected.address}</div>
                {selected.phone && <div className="mt-1 text-sm text-slate-600">Telefone: {selected.phone}</div>}
              </div>
              <div>
                <p className="text-sm text-slate-700">{selected.description}</p>
                <div className="mt-4">
                  {selected.website && <a href={selected.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visitar site</a>}
                </div>
                <div className="mt-6">
                  <button onClick={() => { if (selected.bookingLink) window.open(selected.bookingLink, '_blank'); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Reservar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Accommodations;
