import React from 'react';
import { TOURS } from '../constants';
import TourCard from './TourCard';
import { useLanguage } from '../contexts';

const Passeios: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-semibold mb-6">{t('nav.passeios')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TOURS.map(item => <TourCard key={item.id} item={item} />)}
      </div>
    </main>
  );
};

export default Passeios;
