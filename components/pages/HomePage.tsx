import React, { useState } from 'react';
import { Hero } from '../layout';
import TourCard from '../TourCard';
import ImageCarousel from '../ImageCarousel';
import { useFilteredTours } from '../../hooks';
import { FILTER_CATEGORIES, FilterCategory } from '../../config';
import { useLanguage } from '../../contexts';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<FilterCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTours = useFilteredTours(filter, searchQuery);

  const texts = {
    pt: {
      quote: '"A cidade perfeita para quem quer apenas relaxar, agitar ou se aventurar."',
      search: 'Buscar passeio...',
    },
    en: {
      quote: '"The perfect city for those who just want to relax, have fun or adventure."',
      search: 'Search tour...',
    },
    es: {
      quote: '"La ciudad perfecta para quien quiere simplemente relajarse, divertirse o aventurarse."',
      search: 'Buscar paseo...',
    },
  };

  const categoryTranslations: Record<string, Record<FilterCategory, string>> = {
    pt: { Todos: 'Todos', Cultura: 'Cultura', Natureza: 'Natureza', Lazer: 'Lazer', Gastronomia: 'Gastronomia' },
    en: { Todos: 'All', Cultura: 'Culture', Natureza: 'Nature', Lazer: 'Leisure', Gastronomia: 'Gastronomy' },
    es: { Todos: 'Todos', Cultura: 'Cultura', Natureza: 'Naturaleza', Lazer: 'Ocio', Gastronomia: 'Gastronomía' },
  };

  const txt = texts[language];

  return (
    <>
      <Hero />
      {/* Espaço extra para o card de resposta que sobrepõe */}
      <div className="h-2 md:h-4"></div>
      <main className="flex-grow max-w-7xl mx-auto px-6 py-6" id="explore">
        {/* Quote Section */}
        <div className="text-center mb-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-slate-800 mb-6 italic">
            {txt.quote}
          </h2>
        </div>

        {/* Modern Image Carousel */}
        <div className="mb-16 -mx-6 md:-mx-0">
          <ImageCarousel />
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
          <div className="flex flex-wrap gap-2">
            {FILTER_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                  filter === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {categoryTranslations[language][cat]}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder={txt.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Tour Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map(tour => (
            <TourCard key={tour.id} item={tour} />
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
