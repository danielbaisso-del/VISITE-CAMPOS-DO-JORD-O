import React, { useState } from 'react';
import { useLanguage } from '../../contexts';

export const EventosPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'captacao' | 'calendario'>('captacao');

  const texts = {
    pt: {
      tabs: {
        captacao: 'Captação de Eventos',
        calendario: 'Calendário',
      },
      captacao: {
        title: 'Captação de Eventos',
        subtitle: 'Realize seu evento no destino mais encantador do Brasil',
        intro: 'Atuando no segmento de Viagens e Eventos há 22 anos, o CJRC&VB têm mais de 105 empresas mantenedoras e associadas, dos segmentos mais representativos do turismo na cidade, como hotéis, pousadas, restaurantes, atrativos turísticos, comércio e serviços especializados, para que o seu evento seja realizado com sucesso e profissionalismo.',
        technicalTitle: 'Capacidade Técnica e Profissionalismo',
        technicalSubtitle: 'Para o sucesso do seu evento',
        technicalDesc: 'O CJRC&VB atua na prospecção de eventos, com capacidade técnica e conhecimento para oferecer assessoria e suporte profissional para promotores de eventos, agentes de viagens, gestores corporativos e imprensa, além de apresentar a infraestrutura do destino e todo seu potencial. Esse suporte inclui a indicação de uma rede de fornecedores associados, além de acompanhamento completo do início ao fim do evento.',
        supportTitle: 'Nossos Serviços',
        supportItems: [
          { icon: '📋', title: 'Dossiê de Candidatura', text: 'Elaboração do dossiê da candidatura do destino' },
          { icon: '🔍', title: 'Visitas Técnicas', text: 'Organização e recepção de visitas técnicas e de inspeção para a escolha do espaço e equipamentos' },
          { icon: '🤝', title: 'Fornecedores', text: 'Indicação de fornecedores e serviços especializados' },
          { icon: '🏨', title: 'Hospedagem', text: 'Organização e negociação de Allotment de hospedagem de acordo com o perfil e necessidades do evento' },
          { icon: '🗺️', title: 'Bleisure', text: 'Customização de roteiros e atividades para os participantes dos eventos' },
          { icon: '🍽️', title: 'Gastronomia', text: 'Coordenação e negociação de cardápios especiais dentro da Campanha "Restaurante Amigo do Evento"' },
          { icon: '📚', title: 'Hospitalidade', text: 'Serviço de hospitalidade com profissional e material turísticos' },
          { icon: '✅', title: 'Acompanhamento', text: 'Acompanhamento completo do evento (pré, trans e pós-evento)' },
        ],
        stats: [
          { number: '22', suffix: 'anos', label: 'de Experiência', icon: '🏆' },
          { number: '105', suffix: '+', label: 'Empresas Associadas', icon: '🤝' },
          { number: '', suffix: '', label: 'Hotéis, Restaurantes, Atrativos, Comércio e Serviços', icon: '🏘️' },
        ],
        ctaTitle: 'Pronto para realizar seu evento?',
        ctaSubtitle: 'Entre em contato conosco e descubra como podemos tornar seu evento inesquecível',
        ctaButton: 'Fale Conosco',
        whyTitle: 'Por que Campos do Jordão?',
        whyItems: [
          { icon: '🏔️', title: 'Clima Único', desc: 'Temperatura agradável durante todo o ano' },
          { icon: '🏰', title: 'Infraestrutura', desc: 'Hotéis e espaços de alto padrão' },
          { icon: '✨', title: 'Charme Europeu', desc: 'Arquitetura e gastronomia sofisticadas' },
          { icon: '🚗', title: 'Acessibilidade', desc: 'Fácil acesso a partir de São Paulo' },
        ],
      },
      calendario: {
        title: 'Calendário de Eventos',
        subtitle: 'Programação cultural durante todo o ano',
        description: 'Campos do Jordão é conhecida por sua intensa programação cultural durante todo o ano. O famoso Festival de Inverno, shows, feiras gastronômicas, eventos esportivos e festivais temáticos fazem da cidade um destino vibrante em qualquer estação.',
        calendarTitle: 'Calendário Oficial',
        calendarDescription: 'Acesse o calendário oficial da Prefeitura de Campos do Jordão para conferir todos os eventos programados, datas, locais e informações detalhadas.',
        buttonText: 'Acessar Calendário Oficial',
        seasonTitle: 'Eventos por Temporada',
        highlights: [
          { icon: '🎵', title: 'Festival de Inverno', desc: 'O maior festival de música clássica da América Latina', color: 'from-blue-500 to-cyan-500' },
          { icon: '🍺', title: 'Festival da Cerveja', desc: 'Celebração das cervejarias artesanais locais', color: 'from-amber-500 to-orange-500' },
          { icon: '🌸', title: 'Festival das Flores', desc: 'Exposições e decorações florais pela cidade', color: 'from-pink-500 to-rose-500' },
          { icon: '🎄', title: 'Natal Iluminado', desc: 'Decoração especial e eventos natalinos', color: 'from-red-500 to-green-500' },
        ],
      },
    },
    en: {
      tabs: {
        captacao: 'Event Acquisition',
        calendario: 'Calendar',
      },
      captacao: {
        title: 'Event Acquisition',
        subtitle: 'Host your event in Brazil\'s most charming destination',
        intro: 'Working in the Travel and Events segment for 22 years, CJRC&VB has more than 105 supporting and associated companies, from the most representative segments of tourism in the city, such as hotels, inns, restaurants, tourist attractions, commerce and specialized services, so that your event is carried out with success and professionalism.',
        technicalTitle: 'Technical Capacity and Professionalism',
        technicalSubtitle: 'For the success of your event',
        technicalDesc: 'CJRC&VB works in event prospecting, with technical capacity and knowledge to offer advice and professional support for event promoters, travel agents, corporate managers and press, in addition to presenting the destination\'s infrastructure and its full potential.',
        supportTitle: 'Our Services',
        supportItems: [
          { icon: '📋', title: 'Candidacy Dossier', text: 'Preparation of the destination candidacy dossier' },
          { icon: '🔍', title: 'Technical Visits', text: 'Organization and reception of technical and inspection visits' },
          { icon: '🤝', title: 'Suppliers', text: 'Indication of suppliers and specialized services' },
          { icon: '🏨', title: 'Accommodation', text: 'Organization and negotiation of accommodation allotment' },
          { icon: '🗺️', title: 'Bleisure', text: 'Customization of itineraries and activities for participants' },
          { icon: '🍽️', title: 'Gastronomy', text: 'Coordination of special menus within "Event-Friendly Restaurant" Campaign' },
          { icon: '📚', title: 'Hospitality', text: 'Hospitality service with professional and tourist materials' },
          { icon: '✅', title: 'Follow-up', text: 'Complete event follow-up (pre, during and post-event)' },
        ],
        stats: [
          { number: '22', suffix: 'years', label: 'of Experience', icon: '🏆' },
          { number: '105', suffix: '+', label: 'Associated Companies', icon: '🤝' },
          { number: '', suffix: '', label: 'Hotels, Restaurants, Attractions, Commerce & Services', icon: '🏘️' },
        ],
        ctaTitle: 'Ready to host your event?',
        ctaSubtitle: 'Contact us and discover how we can make your event unforgettable',
        ctaButton: 'Contact Us',
        whyTitle: 'Why Campos do Jordão?',
        whyItems: [
          { icon: '🏔️', title: 'Unique Climate', desc: 'Pleasant temperature year-round' },
          { icon: '🏰', title: 'Infrastructure', desc: 'High-standard hotels and venues' },
          { icon: '✨', title: 'European Charm', desc: 'Sophisticated architecture and cuisine' },
          { icon: '🚗', title: 'Accessibility', desc: 'Easy access from São Paulo' },
        ],
      },
      calendario: {
        title: 'Events Calendar',
        subtitle: 'Cultural programming throughout the year',
        description: 'Campos do Jordão is known for its intense cultural programming throughout the year. The famous Winter Festival, concerts, gastronomic fairs, sports events and themed festivals make the city a vibrant destination in any season.',
        calendarTitle: 'Official Calendar',
        calendarDescription: 'Access the official calendar of the Campos do Jordão City Hall to check all scheduled events, dates, locations and detailed information.',
        buttonText: 'Access Official Calendar',
        seasonTitle: 'Events by Season',
        highlights: [
          { icon: '🎵', title: 'Winter Festival', desc: 'The largest classical music festival in Latin America', color: 'from-blue-500 to-cyan-500' },
          { icon: '🍺', title: 'Beer Festival', desc: 'Celebration of local craft breweries', color: 'from-amber-500 to-orange-500' },
          { icon: '🌸', title: 'Flower Festival', desc: 'Floral exhibitions throughout the city', color: 'from-pink-500 to-rose-500' },
          { icon: '🎄', title: 'Illuminated Christmas', desc: 'Special decoration and Christmas events', color: 'from-red-500 to-green-500' },
        ],
      },
    },
    es: {
      tabs: {
        captacao: 'Captación de Eventos',
        calendario: 'Calendario',
      },
      captacao: {
        title: 'Captación de Eventos',
        subtitle: 'Realiza tu evento en el destino más encantador de Brasil',
        intro: 'Actuando en el segmento de Viajes y Eventos hace 22 años, el CJRC&VB tiene más de 105 empresas mantenedoras y asociadas, de los segmentos más representativos del turismo en la ciudad.',
        technicalTitle: 'Capacidad Técnica y Profesionalismo',
        technicalSubtitle: 'Para el éxito de tu evento',
        technicalDesc: 'El CJRC&VB actúa en la prospección de eventos, con capacidad técnica y conocimiento para ofrecer asesoría y soporte profesional para promotores de eventos.',
        supportTitle: 'Nuestros Servicios',
        supportItems: [
          { icon: '📋', title: 'Dosier de Candidatura', text: 'Elaboración del dosier de candidatura del destino' },
          { icon: '🔍', title: 'Visitas Técnicas', text: 'Organización y recepción de visitas técnicas e inspección' },
          { icon: '🤝', title: 'Proveedores', text: 'Indicación de proveedores y servicios especializados' },
          { icon: '🏨', title: 'Hospedaje', text: 'Organización y negociación de Allotment de hospedaje' },
          { icon: '🗺️', title: 'Bleisure', text: 'Personalización de itinerarios y actividades para participantes' },
          { icon: '🍽️', title: 'Gastronomía', text: 'Coordinación de menús especiales "Restaurante Amigo del Evento"' },
          { icon: '📚', title: 'Hospitalidad', text: 'Servicio de hospitalidad con materiales turísticos' },
          { icon: '✅', title: 'Acompañamiento', text: 'Acompañamiento completo del evento (pre, durante y post)' },
        ],
        stats: [
          { number: '22', suffix: 'años', label: 'de Experiencia', icon: '🏆' },
          { number: '105', suffix: '+', label: 'Empresas Asociadas', icon: '🤝' },
          { number: '', suffix: '', label: 'Hoteles, Restaurantes, Atractivos, Comercio y Servicios', icon: '🏘️' },
        ],
        ctaTitle: '¿Listo para realizar tu evento?',
        ctaSubtitle: 'Contáctanos y descubre cómo podemos hacer tu evento inolvidable',
        ctaButton: 'Contáctanos',
        whyTitle: '¿Por qué Campos do Jordão?',
        whyItems: [
          { icon: '🏔️', title: 'Clima Único', desc: 'Temperatura agradable todo el año' },
          { icon: '🏰', title: 'Infraestructura', desc: 'Hoteles y espacios de alto nivel' },
          { icon: '✨', title: 'Encanto Europeo', desc: 'Arquitectura y gastronomía sofisticadas' },
          { icon: '🚗', title: 'Accesibilidad', desc: 'Fácil acceso desde São Paulo' },
        ],
      },
      calendario: {
        title: 'Calendario de Eventos',
        subtitle: 'Programación cultural durante todo el año',
        description: 'Campos do Jordão es conocida por su intensa programación cultural durante todo el año. El famoso Festival de Invierno, conciertos, ferias gastronómicas y festivales temáticos.',
        calendarTitle: 'Calendario Oficial',
        calendarDescription: 'Acceda al calendario oficial de la Municipalidad para consultar todos los eventos programados, fechas, lugares e información detallada.',
        buttonText: 'Acceder al Calendario Oficial',
        seasonTitle: 'Eventos por Temporada',
        highlights: [
          { icon: '🎵', title: 'Festival de Invierno', desc: 'El mayor festival de música clásica de América Latina', color: 'from-blue-500 to-cyan-500' },
          { icon: '🍺', title: 'Festival de la Cerveza', desc: 'Celebración de cervecerías artesanales', color: 'from-amber-500 to-orange-500' },
          { icon: '🌸', title: 'Festival de las Flores', desc: 'Exposiciones florales por la ciudad', color: 'from-pink-500 to-rose-500' },
          { icon: '🎄', title: 'Navidad Iluminada', desc: 'Decoración especial y eventos navideños', color: 'from-red-500 to-green-500' },
        ],
      },
    },
  };

  const t = texts[language];

  return (
    <main className="flex-grow bg-slate-50">
      {/* Tabs Elegantes */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('captacao')}
              className={`px-8 py-5 text-sm font-semibold uppercase tracking-wider transition-all relative ${
                activeTab === 'captacao'
                  ? 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {t.tabs.captacao}
              {activeTab === 'captacao' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('calendario')}
              className={`px-8 py-5 text-sm font-semibold uppercase tracking-wider transition-all relative ${
                activeTab === 'calendario'
                  ? 'text-slate-900'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {t.tabs.calendario}
              {activeTab === 'calendario' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900"></span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Captação Content */}
      {activeTab === 'captacao' && (
        <>
          {/* Hero com CTA */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 relative overflow-hidden">
            {/* Elementos decorativos */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-500 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                {t.captacao.ctaTitle}
              </h1>
              <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                {t.captacao.ctaSubtitle}
              </p>
              <a
                href="https://visitecamposdojordao.org.br/turismo/fale-conosco/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-10 py-5 rounded-full hover:from-amber-400 hover:to-orange-400 transition-all hover:scale-105 shadow-2xl shadow-amber-500/30 text-lg"
              >
                <span>{t.captacao.ctaButton}</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="bg-white py-12 border-b">
            <div className="max-w-5xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {t.captacao.stats.map((stat, i) => (
                  <div 
                    key={i} 
                    className="relative group"
                  >
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-amber-500/20">
                          {stat.icon}
                        </div>
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-4xl md:text-5xl font-bold text-slate-900">{stat.number}</span>
                            <span className="text-xl md:text-2xl font-bold text-amber-600">{stat.suffix}</span>
                          </div>
                          <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Título da Seção */}
          <div className="bg-white py-16 border-b">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                {t.captacao.title}
              </h2>
              <p className="text-lg text-slate-500">
                {t.captacao.subtitle}
              </p>
            </div>
          </div>

          {/* Intro Section */}
          <div className="py-16">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-lg text-slate-600 leading-relaxed text-center">
                {t.captacao.intro}
              </p>
            </div>
          </div>

          {/* Why Campos Section */}
          <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900 text-center mb-12">
                {t.captacao.whyTitle}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {t.captacao.whyItems.map((item, i) => (
                  <div key={i} className="text-center group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-slate-900 group-hover:scale-110 transition-all duration-300">
                      <span className="group-hover:grayscale group-hover:brightness-200 transition-all">{item.icon}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Section */}
          <div className="py-16">
            <div className="max-w-4xl mx-auto px-6">
              <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{t.captacao.technicalTitle}</h2>
                    <p className="text-sm text-slate-500">{t.captacao.technicalSubtitle}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed">{t.captacao.technicalDesc}</p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900 text-center mb-12">
                {t.captacao.supportTitle}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {t.captacao.supportItems.map((item, i) => (
                  <div 
                    key={i} 
                    className="bg-slate-50 rounded-xl p-6 hover:bg-slate-900 hover:text-white transition-all duration-300 group cursor-default"
                  >
                    <span className="text-3xl mb-4 block group-hover:grayscale group-hover:brightness-200 transition-all">{item.icon}</span>
                    <h3 className="font-semibold mb-2 text-slate-900 group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Calendário Content */}
      {activeTab === 'calendario' && (
        <>
          {/* Hero */}
          <div className="bg-white py-16 border-b">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
                {t.calendario.title}
              </h1>
              <p className="text-lg text-slate-500 mb-10">
                {t.calendario.subtitle}
              </p>
              
              {/* Calendário Oficial - Card Destacado */}
              <div className="max-w-xl mx-auto">
                <a
                  href="https://camposdojordao.sp.gov.br/calendario-de-eventos/?mes=Julho"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-1 shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative bg-white rounded-xl px-8 py-6 flex items-center justify-between gap-6 group-hover:bg-orange-50 transition-colors">
                    {/* Ícone animado */}
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    {/* Texto */}
                    <div className="flex-grow text-left">
                      <div className="text-xs uppercase tracking-wider text-orange-600 font-bold mb-1">
                        {t.calendario.calendarTitle}
                      </div>
                      <div className="text-lg font-bold text-slate-900 group-hover:text-orange-700 transition-colors">
                        {t.calendario.buttonText}
                      </div>
                    </div>
                    
                    {/* Seta */}
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
                      <svg className="w-6 h-6 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Brilho animado */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </a>
                
                {/* Badge de destaque */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Atualizado
                  </span>
                  <span>Calendário oficial da Prefeitura</span>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="py-16">
            <div className="max-w-3xl mx-auto px-6">
              <p className="text-lg text-slate-600 leading-relaxed text-center">
                {t.calendario.description}
              </p>
            </div>
          </div>

          {/* Eventos por Temporada */}
          <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900 text-center mb-12">
                {t.calendario.seasonTitle}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {t.calendario.highlights.map((item, i) => (
                  <div 
                    key={i} 
                    className="group cursor-default"
                  >
                    <div className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 mb-4 text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <span className="text-5xl block relative z-10">{item.icon}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-slate-600 transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default EventosPage;
