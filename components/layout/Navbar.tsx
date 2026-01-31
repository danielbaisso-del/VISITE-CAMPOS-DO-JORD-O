import React, { useState } from 'react';
import { NAV_ITEMS, PageType } from '../../config';
import { APP_CONFIG } from '../../config/app';

interface NavbarProps {
  current: PageType;
  onNavigate: (page: PageType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ current, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const getButtonClass = (item: typeof NAV_ITEMS[0]) => {
    const isActive = current === item.id;
    const baseClass = 'hover:text-blue-400 transition-colors';
    
    if (isActive) {
      return item.hasUnderline 
        ? `${baseClass} text-white border-b-2 border-blue-500 pb-1`
        : `${baseClass} text-white`;
    }
    return baseClass;
  };

  const getMobileButtonClass = (itemId: PageType) => {
    const isActive = current === itemId;
    return `text-left px-4 py-3 hover:bg-slate-800 rounded transition-colors ${
      isActive ? 'text-white bg-slate-800' : ''
    }`;
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={APP_CONFIG.logo.local}
              alt="Logo Campos do Jordão"
              onError={(e: any) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = APP_CONFIG.logo.fallback;
              }}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-white font-bold text-lg hidden md:block tracking-tight">
            VISITE CAMPOS DO JORDÃO
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium text-sm">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className={getButtonClass(item)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Hamburger Button - Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-slate-800 rounded transition-colors"
          aria-label="Menu"
        >
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {/* Associe-se Button - Desktop */}
        <button
          onClick={() => handleNavigate('associe')}
          className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-xs font-semibold transition-all"
        >
          Associe-se
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4 animate-fade-in">
          <div className="flex flex-col gap-3 text-slate-300 font-medium">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={getMobileButtonClass(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('associe')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all mt-2"
            >
              Associe-se
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
