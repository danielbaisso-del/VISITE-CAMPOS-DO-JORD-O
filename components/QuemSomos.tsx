import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts';

// Ícones SVG inline
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Imagens do Conselho
const councilImages = [
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0002-1024x818.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0001-1024x768.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0003-1024x904.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0006-1024x1004.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0005-919x1024.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0004-1024x941.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0007-1024x674.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0008-1024x768.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0009-1024x768.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0010-1024x610.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/IMG-20250820-WA0011-882x1024.jpg',
  'https://visitecamposdojordao.org.br/wp-content/uploads/2025/08/Imagem-do-WhatsApp-de-2025-08-20-as-12.49.33_91ba5e95-1024x768.jpg',
];

// Dados do Conselho
const councilData = {
  mandate: '2025-2028',
  slate: 'Conexão Campos',
  electionDate: '10 de julho de 2025',
  president: {
    name: 'Ricardo Villares Lenz Cesar',
    company: 'Tarundu',
  },
  vicePresident: {
    name: 'Maria Gloria Alvarez Bravin',
    company: 'Pousada das Hortênsias',
  },
  deliberativeCouncil: [
    { name: 'Luiz de Oliveira Rozette Filho', company: 'Pousada Chateau La Villette' },
    { name: 'Luiz Geraldo Tedesco Padovan', company: 'CJ Convention Center' },
    { name: 'Silvio da Matta', company: 'Pousada do Conde' },
    { name: 'Gabriel Henrique Debiagi Costa', company: 'Pousadas Villa D\'Biagy' },
    { name: 'Sidney Isidro Marcandali da Silva Júnior', company: 'Hotel Boutique Quebra-Noz' },
    { name: 'Rafael Montenegro Ahmed', company: 'Parque Capivari' },
    { name: 'Ricardo Elcheino', company: 'Restaurante Mercearia' },
    { name: 'Jorge Artur Girelli Ribeiro', company: 'Hotel Vila Inglesa' },
  ],
  deliberativeSubstitutes: [
    { name: 'Renata Marques Henrique Carneiro', company: 'Pousada La Toscana' },
    { name: 'José Carlos Rebello de Carvalho', company: 'Caras de Malte' },
    { name: 'Marina Sandoval Jacintho', company: 'Pousada da Pedra' },
  ],
  fiscalCouncil: [
    { name: 'Sergio Luiz Salvador Filho', company: 'Restaurante Trattoria Salvador' },
    { name: 'Eder Luiz da Cruz', company: 'Hotel Leão da Montanha' },
    { name: 'Fausto Pinto de Moura Magalhães', company: 'Ludwig Restaurant' },
  ],
  fiscalSubstitute: {
    name: 'Luis Fernando Peretti',
    company: 'Iceland',
  },
};

interface CouncilMember {
  name: string;
  company: string;
}

const MemberCard: React.FC<{ member: CouncilMember; isSubstitute?: boolean }> = ({ member, isSubstitute }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.02] ${
    isSubstitute 
      ? 'bg-slate-50 border border-slate-200' 
      : 'bg-white border border-slate-100 shadow-sm'
  }`}>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
      isSubstitute ? 'bg-slate-200 text-slate-500' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'
    }`}>
      <UserIcon />
    </div>
    <div className="flex-1 min-w-0">
      <p className={`font-medium truncate ${isSubstitute ? 'text-slate-600' : 'text-slate-800'}`}>
        {member.name}
      </p>
      <p className="text-xs text-slate-500 flex items-center gap-1">
        <BuildingIcon />
        <span className="truncate">{member.company}</span>
      </p>
    </div>
  </div>
);

const QuemSomos: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'about' | 'council'>('council');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  const nextImage = useCallback(() => {
    setSlideDirection('left');
    setCurrentImageIndex((prev) => (prev + 1) % councilImages.length);
  }, []);

  const prevImage = useCallback(() => {
    setSlideDirection('right');
    setCurrentImageIndex((prev) => (prev - 1 + councilImages.length) % councilImages.length);
  }, []);

  // Auto-play a cada 2 segundos
  useEffect(() => {
    if (!isAutoPlaying || activeTab !== 'council') return;
    const interval = setInterval(nextImage, 2000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextImage, activeTab]);

  // Reset direction after animation
  useEffect(() => {
    const timer = setTimeout(() => setSlideDirection(null), 500);
    return () => clearTimeout(timer);
  }, [currentImageIndex]);

  const content = {
    pt: {
      title: 'Conheça o Campos do Jordão e Região Convention & Visitors Bureau',
      intro: 'O Campos do Jordão e Região Convention & Visitors Bureau é uma organização apolítica e sem fins lucrativos, fundada em 2003, que tem um papel estratégico no desenvolvimento socioeconômico da cidade, construindo parcerias entre o público e o privado, ampliando os negócios e o mercado de consumo através do turismo, apoiando a melhoria dos serviços e oferecendo atendimento aos visitantes.',
      mission: 'Missão',
      missionText: 'Promover e ampliar o potencial turístico de Campos do Jordão e região, aumentando o fluxo de turistas a negócios ou a lazer, apoiando a captação de eventos, promovendo os equipamentos turísticos, projetos e parcerias, com foco no aumento da qualidade e competitividade desse destino.',
      vision: 'Visão',
      visionText: 'Ser um destino turístico de referência internacional em qualidade de infraestrutura e serviços de hospitalidade e promover experiências agregadoras aos visitantes de lazer, negócios e eventos.',
      values: 'Valores',
      valuesText: 'Desenvolver um turismo sustentável, com foco turístico no negócio coletivo, seguindo o padrão internacional dos Convention Bureaux e agindo dentro dos conceitos de boas práticas que organizam o mercado.',
      cta: 'Associe-se agora',
      tabAbout: 'Sobre Nós',
      tabCouncil: 'Conselho',
      councilTitle: 'Conselho Diretivo',
      councilSubtitle: 'Gestão eleita por aclamação na Assembleia Geral Ordinária',
      mandate: 'Triênio',
      slate: 'Chapa',
      president: 'Presidente',
      vicePresident: 'Vice-Presidente',
      deliberativeCouncil: 'Conselho Deliberativo',
      substitutes: 'Suplentes',
      fiscalCouncil: 'Conselho Fiscal',
      fiscalSubstitute: 'Suplente',
      councilDescription: 'Visando um maior engajamento de empresários, com foco no turismo de negócios e captação de eventos, a nova diretoria está realizando encontros e reuniões e participando de ações que envolvem o nosso destino.',
    },
    en: {
      title: 'Meet the Campos do Jordão and Region Convention & Visitors Bureau',
      intro: 'The Campos do Jordão and Region Convention & Visitors Bureau is a non-political and non-profit organization, founded in 2003, which plays a strategic role in the socioeconomic development of the city, building partnerships between public and private sectors, expanding business and the consumer market through tourism, supporting the improvement of services and offering assistance to visitors.',
      mission: 'Mission',
      missionText: 'To promote and expand the tourism potential of Campos do Jordão and the region, increasing the flow of business and leisure tourists, supporting the capture of events, promoting tourist facilities, projects and partnerships, with a focus on increasing the quality and competitiveness of this destination.',
      vision: 'Vision',
      visionText: 'To be a tourist destination of international reference in quality of infrastructure and hospitality services and to promote enriching experiences for leisure, business and event visitors.',
      values: 'Values',
      valuesText: 'To develop sustainable tourism, with a tourist focus on collective business, following the international standard of Convention Bureaux and acting within the concepts of good practices that organize the market.',
      cta: 'Join us now',
      tabAbout: 'About Us',
      tabCouncil: 'Council',
      councilTitle: 'Executive Council',
      councilSubtitle: 'Board elected by acclamation at the Ordinary General Assembly',
      mandate: 'Term',
      slate: 'Slate',
      president: 'President',
      vicePresident: 'Vice-President',
      deliberativeCouncil: 'Deliberative Council',
      substitutes: 'Substitutes',
      fiscalCouncil: 'Fiscal Council',
      fiscalSubstitute: 'Substitute',
      councilDescription: 'Aiming for greater engagement of entrepreneurs, with a focus on business tourism and event capture, the new board is holding meetings and participating in actions involving our destination.',
    },
    es: {
      title: 'Conozca el Convention & Visitors Bureau de Campos do Jordão y Región',
      intro: 'El Convention & Visitors Bureau de Campos do Jordão y Región es una organización apolítica y sin fines de lucro, fundada en 2003, que tiene un papel estratégico en el desarrollo socioeconómico de la ciudad, construyendo alianzas entre el sector público y privado, ampliando los negocios y el mercado de consumo a través del turismo, apoyando la mejora de los servicios y ofreciendo atención a los visitantes.',
      mission: 'Misión',
      missionText: 'Promover y ampliar el potencial turístico de Campos do Jordão y región, aumentando el flujo de turistas de negocios o de ocio, apoyando la captación de eventos, promoviendo los equipamientos turísticos, proyectos y alianzas, con enfoque en el aumento de la calidad y competitividad de este destino.',
      vision: 'Visión',
      visionText: 'Ser un destino turístico de referencia internacional en calidad de infraestructura y servicios de hospitalidad y promover experiencias enriquecedoras a los visitantes de ocio, negocios y eventos.',
      values: 'Valores',
      valuesText: 'Desarrollar un turismo sostenible, con enfoque turístico en el negocio colectivo, siguiendo el estándar internacional de los Convention Bureaux y actuando dentro de los conceptos de buenas prácticas que organizan el mercado.',
      cta: 'Únete ahora',
      tabAbout: 'Sobre Nosotros',
      tabCouncil: 'Consejo',
      councilTitle: 'Consejo Directivo',
      councilSubtitle: 'Junta elegida por aclamación en la Asamblea General Ordinaria',
      mandate: 'Trienio',
      slate: 'Chapa',
      president: 'Presidente',
      vicePresident: 'Vicepresidente',
      deliberativeCouncil: 'Consejo Deliberativo',
      substitutes: 'Suplentes',
      fiscalCouncil: 'Consejo Fiscal',
      fiscalSubstitute: 'Suplente',
      councilDescription: 'Con el objetivo de un mayor compromiso de los empresarios, con enfoque en el turismo de negocios y captación de eventos, la nueva directiva está realizando encuentros y reuniones y participando en acciones que involucran nuestro destino.',
    },
  };

  const t = content[language];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Tabs de navegação */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-slate-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab('council')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'council'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {t.tabCouncil}
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'about'
                ? 'bg-white text-slate-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-800'
            }`}
          >
            {t.tabAbout}
          </button>
        </div>
      </div>

      {/* Conteúdo Sobre Nós */}
      {activeTab === 'about' && (
        <div className="animate-fadeIn">
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-serif text-slate-800 mb-3">{t.title}</h1>
            <p className="text-slate-600 max-w-3xl mx-auto">{t.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2">{t.mission}</h3>
              <p className="text-sm text-slate-600">{t.missionText}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2">{t.vision}</h3>
              <p className="text-sm text-slate-600">{t.visionText}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="font-semibold text-slate-800 mb-2">{t.values}</h3>
              <p className="text-sm text-slate-600">{t.valuesText}</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a 
              href="https://www.visitecamposdojordao.org.br/associados/associe-se/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              {t.cta}
            </a>
          </div>
        </div>
      )}

      {/* Conteúdo Conselho */}
      {activeTab === 'council' && (
        <div className="animate-fadeIn">
          {/* Header do Conselho */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <StarIcon />
              <span>{t.slate}: {councilData.slate}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-slate-800 mb-2">{t.councilTitle}</h2>
            <p className="text-slate-500 text-sm">{t.councilSubtitle}</p>
            <div className="flex justify-center gap-4 mt-3">
              <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                📅 {t.mandate}: {councilData.mandate}
              </span>
            </div>
          </div>

          {/* Presidente e Vice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Presidente */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl">👔</span>
                </div>
                <div>
                  <p className="text-blue-200 text-sm font-medium">{t.president}</p>
                  <h3 className="text-xl font-bold">{councilData.president.name}</h3>
                  <p className="text-blue-200 text-sm flex items-center gap-1 mt-1">
                    <BuildingIcon />
                    {councilData.president.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Vice-Presidente */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl">💼</span>
                </div>
                <div>
                  <p className="text-purple-200 text-sm font-medium">{t.vicePresident}</p>
                  <h3 className="text-xl font-bold">{councilData.vicePresident.name}</h3>
                  <p className="text-purple-200 text-sm flex items-center gap-1 mt-1">
                    <BuildingIcon />
                    {councilData.vicePresident.company}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Conselho Deliberativo */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <UsersIcon />
              </div>
              <h3 className="font-semibold text-slate-800">{t.deliberativeCouncil}</h3>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                {councilData.deliberativeCouncil.length} membros
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {councilData.deliberativeCouncil.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </div>
            
            {/* Suplentes do Conselho Deliberativo */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">{t.substitutes}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {councilData.deliberativeSubstitutes.map((member, index) => (
                  <MemberCard key={index} member={member} isSubstitute />
                ))}
              </div>
            </div>
          </div>

          {/* Conselho Fiscal */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                <ShieldIcon />
              </div>
              <h3 className="font-semibold text-slate-800">{t.fiscalCouncil}</h3>
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                {councilData.fiscalCouncil.length} membros
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {councilData.fiscalCouncil.map((member, index) => (
                <MemberCard key={index} member={member} />
              ))}
            </div>
            
            {/* Suplente do Conselho Fiscal */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">{t.fiscalSubstitute}</p>
              <div className="max-w-xs">
                <MemberCard member={councilData.fiscalSubstitute} isSubstitute />
              </div>
            </div>
          </div>

          {/* Descrição final */}
          <div className="mt-8 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
            <p className="text-slate-600 text-center italic">
              "{t.councilDescription}"
            </p>
          </div>

          {/* Carrossel de Imagens */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-slate-800 text-center mb-4">📸 Galeria</h3>
            <div 
              className="relative rounded-2xl overflow-hidden shadow-xl"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Container principal do carrossel */}
              <div className="relative h-[350px] sm:h-[450px] bg-gradient-to-b from-slate-800 to-slate-900 perspective-1000">
                {/* Slides */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {[-2, -1, 0, 1, 2].map((offset) => {
                    const index = (currentImageIndex + offset + councilImages.length) % councilImages.length;
                    const isCenter = offset === 0;
                    
                    return (
                      <div
                        key={`${index}-${offset}`}
                        onClick={() => {
                          if (offset < 0) prevImage();
                          else if (offset > 0) nextImage();
                        }}
                        className={`absolute transition-all duration-500 ease-out cursor-pointer ${
                          isCenter ? 'z-30' : offset === -1 || offset === 1 ? 'z-20' : 'z-10'
                        }`}
                        style={{
                          transform: `
                            translateX(${offset * 55}%)
                            scale(${isCenter ? 1 : offset === -1 || offset === 1 ? 0.75 : 0.5})
                            rotateY(${offset * -15}deg)
                          `,
                          opacity: isCenter ? 1 : offset === -1 || offset === 1 ? 0.7 : 0.4,
                          filter: isCenter ? 'brightness(1)' : 'brightness(0.6)',
                        }}
                      >
                        <div className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${
                          isCenter ? 'ring-4 ring-blue-500/50' : ''
                        }`}>
                          <img
                            src={councilImages[index]}
                            alt={`Conselho - Imagem ${index + 1}`}
                            className="w-[280px] sm:w-[400px] h-[200px] sm:h-[300px] object-cover"
                            draggable={false}
                          />
                          {isCenter && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Botões de navegação */}
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Próxima imagem"
                >
                  <ChevronRightIcon />
                </button>

                {/* Indicador de auto-play */}
                <div className="absolute top-4 right-4 z-40">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isAutoPlaying 
                      ? 'bg-green-500/80 text-white' 
                      : 'bg-slate-600/80 text-slate-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-white animate-pulse' : 'bg-slate-400'}`} />
                    {isAutoPlaying ? 'Auto' : 'Pausado'}
                  </div>
                </div>
              </div>

              {/* Indicadores de progresso */}
              <div className="bg-slate-800 px-4 py-3">
                <div className="flex items-center justify-center gap-2">
                  {councilImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`transition-all duration-300 rounded-full ${
                        index === currentImageIndex
                          ? 'w-8 h-2 bg-blue-500'
                          : 'w-2 h-2 bg-slate-600 hover:bg-slate-500'
                      }`}
                      aria-label={`Ir para imagem ${index + 1}`}
                    />
                  ))}
                </div>
                <p className="text-center text-slate-400 text-xs mt-2">
                  {currentImageIndex + 1} de {councilImages.length}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <a 
              href="https://www.visitecamposdojordao.org.br/associados/associe-se/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              {t.cta}
            </a>
          </div>
        </div>
      )}

      {/* Estilos de animação */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
};

export default QuemSomos;
