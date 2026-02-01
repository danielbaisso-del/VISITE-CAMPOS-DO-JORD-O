import React from 'react';
import { useLanguage } from '../contexts';

const QuemSomos: React.FC = () => {
  const { language } = useLanguage();

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
    },
  };

  const t = content[language];

  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif text-slate-800 mb-3">{t.title}</h1>
        <p className="text-slate-600">{t.intro}</p>
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
        <a href="https://www.visitecamposdojordao.org.br/associados/associe-se/" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">{t.cta}</a>
      </div>
    </section>
  );
};

export default QuemSomos;
