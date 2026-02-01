import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  image: string;
  tags: string[];
}

const RESTAURANTS: Restaurant[] = [
  {
    id: 'nonna-mimi',
    name: 'Cantina Nonna Mimi',
    description: 'Cantina italiana: massas, pães e mesa de antepastos. Ambiente acolhedor e familiar.',
    address: 'Av. Dr. Januário Miráglia, 2438 - Vila Telma',
    phone: '(12) 3662-3522',
    website: 'http://www.nonnamimi.com.br',
    image: '/images/gastronomia/nonna_mimi.jpg',
    tags: ['Italiano', 'Massas']
  },
  {
    id: 'caras-malte',
    name: 'Caras de Malte - Microcervejaria',
    description: 'Microcervejaria com rótulos próprios, grelhados e petiscos para harmonizar.',
    address: 'Av. Pedro Paulo, 1500 - Descansópolis',
    phone: '',
    website: '',
    image: '/images/gastronomia/caras_malte.jpg',
    tags: ['Cervejaria', 'Petiscos']
  },
  {
    id: 'baden-baden',
    name: 'Choperia Baden Baden',
    description: 'Clássicos alemães e chopes premiados num ambiente animado.',
    address: 'Rua Djalma Forfaz, 93, loja 10 - Capivari',
    phone: '',
    website: 'https://www.obadenbaden.com.br/',
    image: '/images/gastronomia/baden.jpg',
    tags: ['Cervejaria', 'Alemão']
  },
  {
    id: 'tapiti',
    name: 'Tapiti Confeitaria & Brunch',
    description: 'Café e brunch com produtos artesanais e foco na experiência regional.',
    address: 'Est. Municipal Aurora Nogueira Barros Vasconcellos, 100',
    phone: '',
    website: '',
    image: '/images/gastronomia/tapiti.jpg',
    tags: ['Café', 'Brunch']
  },
  {
    id: 'iceland',
    name: 'Iceland',
    description: 'Bar temático 100% gelo - experiência única com drinques em copos de gelo.',
    address: 'R. Eng. Diogo José de Carvalho, 190 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/iceland.jpg',
    tags: ['Bar', 'Temático']
  },
  {
    id: 'villa-montese',
    name: 'Villa Montese Bar & Ristorante',
    description: 'Fondues, trutas e pratos internacionais em ambiente aconchegante.',
    address: 'Av. Macedo Soares, 508 - Vila Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/villa_montese.jpg',
    tags: ['Fondue', 'Internacional']
  },
  {
    id: 'ludwig',
    name: 'Ludwig Restaurant',
    description: 'Alta gastronomia: sopas, fondues e pratos de caça.',
    address: 'Rua Aristides de Souza Mello, 50 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/ludwig.jpg',
    tags: ['Fine Dining', 'Fondue']
  },
  {
    id: 'matterhorn',
    name: 'Matterhorn Empório e Restaurante',
    description: 'Menu de trutas, ambiente romântico e música ao vivo em datas específicas.',
    address: 'Rua Djalma Forfaz, 93 - Loja 20 - Praça do Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/matterhorn.jpg',
    tags: ['Truta', 'Romântico']
  },
  {
    id: 'le-foyer',
    name: 'Le Foyer - Chateau La Villette',
    description: 'Gastronomia franco-suíça com influências de montanha, perfeito para ocasiões especiais.',
    address: 'Rua Cantídio Pereira de Castro, 100 - Vila Everest',
    phone: '',
    website: '',
    image: '/images/gastronomia/le_foyer.jpg',
    tags: ['Francês', 'Fine Dining']
  },
  {
    id: 'mana',
    name: 'Restaurante Maná',
    description: 'Antepastos, truta, picanha e rodízio de fondue com ampla carta de bebidas.',
    address: 'Av. Macedo Soares, 187 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/mana.jpg',
    tags: ['Fondue', 'Brasileiro']
  },
  {
    id: 'mercearia',
    name: 'Restaurante Mercearia Campos',
    description: 'Opção charmosa no centrinho do Capivari para refeições descontraídas.',
    address: 'Rua Vitor Godinho, 25 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/mercearia.jpg',
    tags: ['Casual', 'Centro']
  },
  {
    id: 'tainakan',
    name: 'Tainakan - Tarundu',
    description: 'Localizado no Parque Tarundu, com buffet, pizzas e cafés especiais.',
    address: 'Av. José Antônio Manso, 1515 - Parque Tarundu',
    phone: '',
    website: '',
    image: '/images/gastronomia/tainakan.jpg',
    tags: ['Buffet', 'Pizza']
  },
  {
    id: 'vila-cha',
    name: 'Vila Chã',
    description: 'Gastronomia lusitana com tábuas, pescados e doces tradicionais.',
    address: 'Av. Pedro Paulo, 7545 - Descansópolis',
    phone: '',
    website: '',
    image: '/images/gastronomia/vilacha.jpg',
    tags: ['Português', 'Pescados']
  },
  {
    id: 'villa-gourmet',
    name: 'Villa Gourmet',
    description: 'Cozinha contemporânea valorizando ingredientes regionais.',
    address: 'Av. Macedo Soares, 203 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/villa_gourmet.jpg',
    tags: ['Contemporâneo', 'Regional']
  },
  {
    id: 'sans-souci',
    name: 'Sans Souci Confeitaria & Café',
    description: 'Café e confeitaria com estilo europeu e foco em produtos locais.',
    address: 'Av. Dr. Januário Miraglia, 3.260 - Jaguaribe',
    phone: '',
    website: '',
    image: '/images/gastronomia/sans_souci.jpg',
    tags: ['Café', 'Confeitaria']
  },
  {
    id: 'trattoria',
    name: 'Trattoria Salvador',
    description: 'Massas artesanais e fondues em ambiente intimista.',
    address: 'Av. Macedo Soares, 489 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/trattoria.jpg',
    tags: ['Italiano', 'Fondue']
  },
  {
    id: 'cantinho-suico',
    name: 'Cantinho Suíço',
    description: 'Sequências de fondue, trutas e culinária franco-suíça.',
    address: 'Av. Macedo Soares, 457 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/cantinho_suico.jpg',
    tags: ['Suíço', 'Fondue']
  },
  {
    id: 'bella-vista',
    name: 'Bella Vista Restaurante',
    description: 'Experiência sofisticada com vista panorâmica e carta de vinhos.',
    address: 'Alameda Pérolas, 182 - Morro do Elefante',
    phone: '',
    website: '',
    image: '/images/gastronomia/bella_vista.jpg',
    tags: ['Vista', 'Vinhos']
  },
  {
    id: 'dona-chica',
    name: 'Dona Chica Capivari',
    description: 'Gastronomia afetiva em ambiente rústico com áreas ao ar livre.',
    address: 'Parque Capivari - R. Eng. Diogo José de Carvalho, 1291',
    phone: '',
    website: '',
    image: '/images/gastronomia/dona_chica.jpg',
    tags: ['Brasileiro', 'Rústico']
  },
  {
    id: 'sabor-chocolate',
    name: 'Sabor Chocolate',
    description: 'Chocolateria tradicional com criações regionais, como bombons de pinhão.',
    address: 'Rua Djalma Forfaz, 103 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/sabor_chocolate.jpg',
    tags: ['Chocolateria', 'Doces']
  },
  {
    id: 'cervejaria-luss',
    name: 'Cervejaria Luss',
    description: 'Biergarten em casarão histórico com rótulos e petiscos.',
    address: 'Av. Sen. Roberto Simonsen, 1724 - Vila Inglesa',
    phone: '',
    website: '',
    image: '/images/gastronomia/luss.jpg',
    tags: ['Cervejaria', 'Biergarten']
  },
  {
    id: 'nevada',
    name: 'Restaurante Nevada',
    description: 'Tradição desde 1965: fondues, sopas no pão e pratos clássicos da serra.',
    address: 'Av. Macedo Soares, 159 - Capivari',
    phone: '',
    website: '',
    image: '/images/gastronomia/nevada.jpg',
    tags: ['Tradicional', 'Fondue']
  },
];

const Card: React.FC<{ r: Restaurant; onDetails: (r: Restaurant) => void; texts: any; language: Language }> = ({ r, onDetails, texts }) => {
  const [imgError, setImgError] = useState(false);
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 flex flex-col">
      <div className="relative h-44 bg-slate-200">
        <img 
          src={imgError ? 'https://picsum.photos/800/450?grayscale' : r.image} 
          alt={r.name} 
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        {r.tags && r.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {r.tags.slice(0, 2).map(tag => (
              <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-white/90 text-slate-700 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold text-slate-800">{r.name}</h4>
            <div className="text-xs text-slate-500 mt-1">{r.address}</div>
          </div>
        </div>

        <p className="text-sm text-slate-600 mt-3 line-clamp-3">{r.description}</p>

        <div className="mt-4 flex gap-2">
          {r.website && (
            <a href={r.website} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold py-2 rounded-lg transition-colors">
              {texts.website}
            </a>
          )}
          <button onClick={() => onDetails(r)} className="flex-1 text-center bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-semibold py-2 rounded-lg transition-colors border border-blue-100">
            {texts.details}
          </button>
        </div>
      </div>
    </div>
  );
};

const Gastronomia: React.FC = () => {
  const { language } = useLanguage();
  const [items] = useState<Restaurant[]>(RESTAURANTS);
  const [selected, setSelected] = useState<Restaurant | null>(null);

  const texts = {
    pt: {
      title: 'Onde Comer',
      subtitle: 'De fondues e trutas a cervejarias artesanais - descubra os melhores sabores da serra.',
      website: 'Site Oficial',
      details: 'Detalhes',
      phone: 'Telefone',
      visitSite: 'Visitar site',
    },
    en: {
      title: 'Where to Eat',
      subtitle: 'From fondues and trout to craft breweries - discover the best flavors of the mountains.',
      website: 'Official Website',
      details: 'Details',
      phone: 'Phone',
      visitSite: 'Visit website',
    },
    es: {
      title: 'Dónde Comer',
      subtitle: 'De fondues y truchas a cervecerías artesanales - descubra los mejores sabores de la sierra.',
      website: 'Sitio Oficial',
      details: 'Detalles',
      phone: 'Teléfono',
      visitSite: 'Visitar sitio',
    },
  };

  const t = texts[language];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-serif text-slate-800">{t.title}</h3>
          <p className="text-sm text-slate-500">{t.subtitle}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => <Card key={item.id} r={item} onDetails={setSelected} texts={t} language={language} />)}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden z-10">
            <div className="flex justify-between items-center p-4 border-b border-slate-100">
              <h4 className="font-semibold text-lg">{selected.name}</h4>
              <button className="text-slate-500" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img src={selected.image} alt={selected.name} className="w-full h-56 object-cover rounded-lg" onError={(e: any) => { e.target.src = 'https://picsum.photos/800/450?grayscale'; }} />
                <div className="mt-4 text-sm text-slate-600">{selected.address}</div>
                {selected.phone && <div className="mt-1 text-sm text-slate-600">{t.phone}: {selected.phone}</div>}
                {selected.tags && selected.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {selected.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-slate-700">{selected.description}</p>
                <div className="mt-4">
                  {selected.website && <a href={selected.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{t.visitSite}</a>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gastronomia;
