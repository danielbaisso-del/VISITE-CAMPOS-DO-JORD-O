import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções completas
const translations: Record<Language, Record<string, string>> = {
  pt: {
    // Navbar
    'nav.cidade': 'A cidade',
    'nav.mapa': 'Mapa e roteiros',
    'nav.passeios': 'Passeios',
    'nav.ondecomer': 'Onde comer',
    'nav.eventos': 'Eventos',
    'nav.ondeficar': 'Onde ficar',
    'nav.quemsomos': 'CJRC&VB',
    'nav.associe': 'Associe-se',
    
    // Hero
    'hero.title': 'Campos do Jordão',
    'hero.subtitle': 'A Suíça Brasileira aos seus pés',
    'hero.description': 'Descubra a magia da cidade mais charmosa do Brasil. Clima de montanha, gastronomia refinada e experiências inesquecíveis te esperam.',
    'hero.cta': 'Explorar Agora',
    'hero.altitude': 'Altitude',
    'hero.temperature': 'Temperatura Média',
    'hero.attractions': 'Atrações',
    
    // Home/Cidade
    'home.explore.title': 'Explore Campos do Jordão',
    'home.explore.subtitle': 'Descubra tudo o que a Suíça Brasileira tem a oferecer',
    'home.discover.title': 'Descubra a cidade',
    'home.discover.description': 'Campos do Jordão é uma estância turística localizada na Serra da Mantiqueira, conhecida por seu clima europeu e arquitetura alpina.',
    
    // Categorias/Filtros
    'filter.all': 'Todos',
    'filter.culture': 'Cultura',
    'filter.nature': 'Natureza',
    'filter.leisure': 'Lazer',
    'filter.gastronomy': 'Gastronomia',
    'filter.hotels': 'Hotéis',
    'filter.restaurants': 'Restaurantes',
    'filter.attractions': 'Atrações',
    'filter.services': 'Serviços',
    
    // Roteiros/Mapa
    'map.search': 'Buscar hotéis, restaurantes, atrações...',
    'map.routes': 'Roteiros',
    'map.center': 'Centralizar',
    'map.zoomIn': 'Aumentar Zoom',
    'map.zoomOut': 'Diminuir Zoom',
    'map.myLocation': 'Minha Localização',
    'map.directions': 'Como chegar',
    'map.moreInfo': 'Mais informações',
    'map.close': 'Fechar',
    
    // Passeios
    'tours.title': 'Passeios em Campos do Jordão',
    'tours.subtitle': 'Experiências únicas na Serra da Mantiqueira',
    'tours.filter': 'Filtrar por categoria',
    'tours.viewMore': 'Ver mais',
    'tours.book': 'Reservar',
    
    // Gastronomia
    'food.title': 'Gastronomia',
    'food.subtitle': 'Sabores únicos na Serra da Mantiqueira',
    'food.description': 'Descubra os melhores restaurantes, cafés e experiências gastronômicas de Campos do Jordão.',
    
    // Hospedagens
    'stay.title': 'Onde Ficar',
    'stay.subtitle': 'Hospedagens selecionadas para você',
    'stay.description': 'Encontre a hospedagem perfeita para sua estadia em Campos do Jordão.',
    'stay.reserve': 'Reservar',
    'stay.seeMore': 'Ver mais',
    
    // Eventos
    'events.title': 'Eventos',
    'events.subtitle': 'O que está acontecendo',
    'events.noEvents': 'Nenhum evento programado no momento.',
    'events.moreInfo': 'Mais informações',
    
    // Quem Somos
    'about.title': 'Quem Somos',
    'about.subtitle': 'Conheça nossa história',
    'about.description': 'Somos o portal oficial de turismo de Campos do Jordão, conectando visitantes às melhores experiências da cidade.',
    
    // Virtual Guide
    'guide.title': 'Guia Virtual',
    'guide.placeholder': 'Como posso ajudar você?',
    'guide.send': 'Enviar',
    'guide.thinking': 'Pensando...',
    
    // Footer
    'footer.rights': 'Todos os direitos reservados',
    'footer.contact': 'Contato',
    'footer.follow': 'Siga-nos',
    
    // Geral
    'general.loading': 'Carregando...',
    'general.error': 'Erro ao carregar',
    'general.tryAgain': 'Tentar novamente',
    'general.seeAll': 'Ver todos',
    'general.back': 'Voltar',
    'general.next': 'Próximo',
    'general.previous': 'Anterior',
  },
  
  en: {
    // Navbar
    'nav.cidade': 'The City',
    'nav.mapa': 'Map & Routes',
    'nav.passeios': 'Tours',
    'nav.ondecomer': 'Where to Eat',
    'nav.eventos': 'Events',
    'nav.ondeficar': 'Where to Stay',
    'nav.quemsomos': 'About Us',
    'nav.associe': 'Join Us',
    
    // Hero
    'hero.title': 'Campos do Jordão',
    'hero.subtitle': 'The Brazilian Switzerland at your feet',
    'hero.description': 'Discover the magic of the most charming city in Brazil. Mountain climate, refined gastronomy and unforgettable experiences await you.',
    'hero.cta': 'Explore Now',
    'hero.altitude': 'Altitude',
    'hero.temperature': 'Average Temperature',
    'hero.attractions': 'Attractions',
    
    // Home/Cidade
    'home.explore.title': 'Explore Campos do Jordão',
    'home.explore.subtitle': 'Discover everything the Brazilian Switzerland has to offer',
    'home.discover.title': 'Discover the city',
    'home.discover.description': 'Campos do Jordão is a tourist resort located in Serra da Mantiqueira, known for its European climate and alpine architecture.',
    
    // Categorias/Filtros
    'filter.all': 'All',
    'filter.culture': 'Culture',
    'filter.nature': 'Nature',
    'filter.leisure': 'Leisure',
    'filter.gastronomy': 'Gastronomy',
    'filter.hotels': 'Hotels',
    'filter.restaurants': 'Restaurants',
    'filter.attractions': 'Attractions',
    'filter.services': 'Services',
    
    // Roteiros/Mapa
    'map.search': 'Search hotels, restaurants, attractions...',
    'map.routes': 'Routes',
    'map.center': 'Center',
    'map.zoomIn': 'Zoom In',
    'map.zoomOut': 'Zoom Out',
    'map.myLocation': 'My Location',
    'map.directions': 'Get directions',
    'map.moreInfo': 'More information',
    'map.close': 'Close',
    
    // Passeios
    'tours.title': 'Tours in Campos do Jordão',
    'tours.subtitle': 'Unique experiences in Serra da Mantiqueira',
    'tours.filter': 'Filter by category',
    'tours.viewMore': 'View more',
    'tours.book': 'Book now',
    
    // Gastronomia
    'food.title': 'Gastronomy',
    'food.subtitle': 'Unique flavors in Serra da Mantiqueira',
    'food.description': 'Discover the best restaurants, cafes and gastronomic experiences in Campos do Jordão.',
    
    // Hospedagens
    'stay.title': 'Where to Stay',
    'stay.subtitle': 'Selected accommodations for you',
    'stay.description': 'Find the perfect accommodation for your stay in Campos do Jordão.',
    'stay.reserve': 'Book now',
    'stay.seeMore': 'See more',
    
    // Eventos
    'events.title': 'Events',
    'events.subtitle': 'What\'s happening',
    'events.noEvents': 'No events scheduled at the moment.',
    'events.moreInfo': 'More information',
    
    // Quem Somos
    'about.title': 'About Us',
    'about.subtitle': 'Know our history',
    'about.description': 'We are the official tourism portal of Campos do Jordão, connecting visitors to the best experiences in the city.',
    
    // Virtual Guide
    'guide.title': 'Virtual Guide',
    'guide.placeholder': 'How can I help you?',
    'guide.send': 'Send',
    'guide.thinking': 'Thinking...',
    
    // Footer
    'footer.rights': 'All rights reserved',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow us',
    
    // Geral
    'general.loading': 'Loading...',
    'general.error': 'Error loading',
    'general.tryAgain': 'Try again',
    'general.seeAll': 'See all',
    'general.back': 'Back',
    'general.next': 'Next',
    'general.previous': 'Previous',
  },
  
  es: {
    // Navbar
    'nav.cidade': 'La Ciudad',
    'nav.mapa': 'Mapa y Rutas',
    'nav.passeios': 'Paseos',
    'nav.ondecomer': 'Dónde Comer',
    'nav.eventos': 'Eventos',
    'nav.ondeficar': 'Dónde Alojarse',
    'nav.quemsomos': 'Quiénes Somos',
    'nav.associe': 'Únete',
    
    // Hero
    'hero.title': 'Campos do Jordão',
    'hero.subtitle': 'La Suiza Brasileña a tus pies',
    'hero.description': 'Descubre la magia de la ciudad más encantadora de Brasil. Clima de montaña, gastronomía refinada y experiencias inolvidables te esperan.',
    'hero.cta': 'Explorar Ahora',
    'hero.altitude': 'Altitud',
    'hero.temperature': 'Temperatura Media',
    'hero.attractions': 'Atracciones',
    
    // Home/Cidade
    'home.explore.title': 'Explora Campos do Jordão',
    'home.explore.subtitle': 'Descubre todo lo que la Suiza Brasileña tiene para ofrecer',
    'home.discover.title': 'Descubre la ciudad',
    'home.discover.description': 'Campos do Jordão es un destino turístico ubicado en Serra da Mantiqueira, conocido por su clima europeo y arquitectura alpina.',
    
    // Categorias/Filtros
    'filter.all': 'Todos',
    'filter.culture': 'Cultura',
    'filter.nature': 'Naturaleza',
    'filter.leisure': 'Ocio',
    'filter.gastronomy': 'Gastronomía',
    'filter.hotels': 'Hoteles',
    'filter.restaurants': 'Restaurantes',
    'filter.attractions': 'Atracciones',
    'filter.services': 'Servicios',
    
    // Roteiros/Mapa
    'map.search': 'Buscar hoteles, restaurantes, atracciones...',
    'map.routes': 'Rutas',
    'map.center': 'Centrar',
    'map.zoomIn': 'Acercar',
    'map.zoomOut': 'Alejar',
    'map.myLocation': 'Mi Ubicación',
    'map.directions': 'Cómo llegar',
    'map.moreInfo': 'Más información',
    'map.close': 'Cerrar',
    
    // Passeios
    'tours.title': 'Paseos en Campos do Jordão',
    'tours.subtitle': 'Experiencias únicas en Serra da Mantiqueira',
    'tours.filter': 'Filtrar por categoría',
    'tours.viewMore': 'Ver más',
    'tours.book': 'Reservar',
    
    // Gastronomia
    'food.title': 'Gastronomía',
    'food.subtitle': 'Sabores únicos en Serra da Mantiqueira',
    'food.description': 'Descubre los mejores restaurantes, cafés y experiencias gastronómicas de Campos do Jordão.',
    
    // Hospedagens
    'stay.title': 'Dónde Alojarse',
    'stay.subtitle': 'Alojamientos seleccionados para ti',
    'stay.description': 'Encuentra el alojamiento perfecto para tu estadía en Campos do Jordão.',
    'stay.reserve': 'Reservar',
    'stay.seeMore': 'Ver más',
    
    // Eventos
    'events.title': 'Eventos',
    'events.subtitle': 'Qué está pasando',
    'events.noEvents': 'No hay eventos programados en este momento.',
    'events.moreInfo': 'Más información',
    
    // Quem Somos
    'about.title': 'Quiénes Somos',
    'about.subtitle': 'Conoce nuestra historia',
    'about.description': 'Somos el portal oficial de turismo de Campos do Jordão, conectando visitantes con las mejores experiencias de la ciudad.',
    
    // Virtual Guide
    'guide.title': 'Guía Virtual',
    'guide.placeholder': '¿Cómo puedo ayudarte?',
    'guide.send': 'Enviar',
    'guide.thinking': 'Pensando...',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    'footer.contact': 'Contacto',
    'footer.follow': 'Síguenos',
    
    // Geral
    'general.loading': 'Cargando...',
    'general.error': 'Error al cargar',
    'general.tryAgain': 'Intentar de nuevo',
    'general.seeAll': 'Ver todos',
    'general.back': 'Volver',
    'general.next': 'Siguiente',
    'general.previous': 'Anterior',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Componente de seletor de idioma com bandeiras SVG
export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string }[] = [
    { code: 'pt', name: 'Português' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
  ];

  // SVGs das bandeiras
  const flags: Record<Language, React.ReactNode> = {
    pt: (
      <svg viewBox="0 0 512 512" className="w-6 h-6 rounded-sm">
        <rect width="512" height="512" fill="#009739"/>
        <polygon points="256,64 488,256 256,448 24,256" fill="#FEDD00"/>
        <circle cx="256" cy="256" r="80" fill="#002776"/>
        <path d="M176,256 Q256,200 336,256 Q256,312 176,256" fill="#fff" strokeWidth="0"/>
      </svg>
    ),
    en: (
      <svg viewBox="0 0 512 512" className="w-6 h-6 rounded-sm">
        <rect width="512" height="512" fill="#bd3d44"/>
        <g fill="#fff">
          <rect y="39.4" width="512" height="39.4"/>
          <rect y="118.2" width="512" height="39.4"/>
          <rect y="197" width="512" height="39.4"/>
          <rect y="275.8" width="512" height="39.4"/>
          <rect y="354.6" width="512" height="39.4"/>
          <rect y="433.4" width="512" height="39.4"/>
        </g>
        <rect width="204.8" height="275.7" fill="#192f5d"/>
        <g fill="#fff">
          {[...Array(9)].map((_, row) => (
            [...Array(row % 2 === 0 ? 6 : 5)].map((_, col) => (
              <circle key={`${row}-${col}`} cx={17 + (row % 2 === 0 ? col * 34 : 17 + col * 34)} cy={15 + row * 30} r="8"/>
            ))
          )).flat()}
        </g>
      </svg>
    ),
    es: (
      <svg viewBox="0 0 512 512" className="w-6 h-6 rounded-sm">
        <rect width="512" height="512" fill="#c60b1e"/>
        <rect y="128" width="512" height="256" fill="#ffc400"/>
      </svg>
    ),
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 overflow-hidden border-2 ${
            language === lang.code
              ? 'border-blue-500 ring-2 ring-blue-500/50'
              : 'border-transparent opacity-70 hover:opacity-100'
          }`}
          title={lang.name}
        >
          {flags[lang.code]}
        </button>
      ))}
    </div>
  );
};

export default LanguageContext;
