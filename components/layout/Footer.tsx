import React from 'react';
import { useLanguage } from '../../contexts';

export const Footer: React.FC = () => {
  const { language } = useLanguage();
  
  const texts = {
    pt: 'Desenvolvido por Codedev',
    en: 'Developed by Codedev',
    es: 'Desarrollado por Codedev',
  };

  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-xs">{texts[language]}</p>
      </div>
    </footer>
  );
};

export default Footer;
