import React from 'react';

const QuemSomos: React.FC = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif text-slate-800 mb-3">Conheça o Campos do Jordão e Região Convention &amp; Visitors Bureau</h1>
        <p className="text-slate-600">O Campos do Jordão e Região Convention &amp; Visitors Bureau é uma organização apolítica e sem fins lucrativos, fundada em 2003, que tem um papel estratégico no desenvolvimento socioeconômico da cidade, construindo parcerias entre o público e o privado, ampliando os negócios e o mercado de consumo através do turismo, apoiando a melhoria dos serviços e oferecendo atendimento aos visitantes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-2">Missão</h3>
          <p className="text-sm text-slate-600">Promover e ampliar o potencial turístico de Campos do Jordão e região, aumentando o fluxo de turistas a negócios ou a lazer, apoiando a captação de eventos, promovendo os equipamentos turísticos, projetos e parcerias, com foco no aumento da qualidade e competitividade desse destino.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-2">Visão</h3>
          <p className="text-sm text-slate-600">Ser um destino turístico de referência internacional em qualidade de infraestrutura e serviços de hospitalidade e promover experiências agregadoras aos visitantes de lazer, negócios e eventos.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-2">Valores</h3>
          <p className="text-sm text-slate-600">Desenvolver um turismo sustentável, com foco turístico no negócio coletivo, seguindo o padrão internacional dos Convention Bureaux e agindo dentro dos conceitos de boas práticas que organizam o mercado.</p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <a href="https://www.visitecamposdojordao.org.br/associados/associe-se/" target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">Associe-se agora</a>
      </div>
    </section>
  );
};

export default QuemSomos;
