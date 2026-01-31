import React, { useState } from 'react';
import { Hero } from '../layout';
import TourCard from '../TourCard';
import { useFilteredTours } from '../../hooks';
import { FILTER_CATEGORIES, FilterCategory } from '../../config';

export const HomePage: React.FC = () => {
  const [filter, setFilter] = useState<FilterCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTours = useFilteredTours(filter, searchQuery);

  return (
    <>
      <Hero />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12" id="explore">
        {/* Quote Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif text-slate-800 mb-6 italic">
            "A cidade perfeita para quem quer apenas relaxar, agitar ou se aventurar."
          </h2>
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
