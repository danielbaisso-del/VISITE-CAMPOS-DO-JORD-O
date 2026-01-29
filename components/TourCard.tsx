import React from 'react';
import { TourItem } from '../types';

const TourCard: React.FC<{ item: TourItem }> = ({ item }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
    <div className="relative h-56 overflow-hidden">
      <img 
        src={item.imageUrl} 
        alt={item.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4">
        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider ${
          item.category === 'Cultura' ? 'bg-purple-600' : 
          item.category === 'Natureza' ? 'bg-emerald-600' : 
          item.category === 'Gastronomia' ? 'bg-amber-600' : 'bg-blue-600'
        }`}>
          {item.category}
        </span>
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
      <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">{item.description}</p>
      
      <div className="mt-auto space-y-2 border-t pt-4 border-slate-100">
        <div className="flex items-start gap-2 text-slate-500 text-xs">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span>{item.address}</span>
        </div>
        {item.phone && (
          <div className="flex items-center gap-2 text-slate-500 text-xs">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <span>{item.phone}</span>
          </div>
        )}
        {item.status && (
          <p className="text-red-500 text-[10px] font-bold uppercase italic">{item.status}</p>
        )}
      </div>
      
      <div className="mt-4 flex gap-2">
        {item.website && (
          <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold py-2 rounded-lg transition-colors">
            Site Oficial
          </a>
        )}
        <button className="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold py-2 rounded-lg transition-colors border border-blue-100">
          Detalhes
        </button>
      </div>
    </div>
  </div>
);

export default TourCard;
