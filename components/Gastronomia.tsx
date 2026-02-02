import React, { useState } from 'react';
import { useLanguage, Language } from '../contexts';

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  phone?: string;
  website?: string;
  image: string;
  tags: string[];
  instagram?: string;
  facebook?: string;
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'nonna-mimi',
    name: 'Cantina Nonna Mimi',
    description: 'Cantina italiana: massas, pães e mesa de antepastos. Ambiente acolhedor e familiar.',
    address: 'Av. Dr. Januário Miráglia, 2438 - Vila Telma',
    phone: '(12) 3662-3522',
    website: 'http://www.nonnamimi.com.br',
    image: '/images/gastronomia/nonna_mimi.jpg',
    tags: ['Italiano', 'Massas'],
    instagram: 'https://www.instagram.com/cantinanonnamimi',
    facebook: 'https://www.facebook.com/restaurantenonnamimi'
  },
  {
    id: 'caras-malte',
    name: 'Caras de Malte - Microcervejaria',
    description: 'Microcervejaria com rótulos próprios, grelhados e petiscos para harmonizar.',
    address: 'Av. Pedro Paulo, 1500 - Descansópolis',
    phone: '(12) 3662-2530',
    website: 'http://carasdemalte.com.br/',
    image: '/images/gastronomia/caras_malte.jpg',
    tags: ['Cervejaria', 'Petiscos'],
    instagram: 'https://www.instagram.com/carasdemalte/',
    facebook: 'https://www.facebook.com/carasdemalte/'
  },
  {
    id: 'baden-baden',
    name: 'Choperia Baden Baden',
    description: 'Clássicos alemães e chopes premiados num ambiente animado.',
    address: 'Rua Djalma Forjaz, 93, loja 10 - Capivari',
    phone: '(12) 3663-3610',
    website: 'https://www.obadenbaden.com.br/',
    image: '/images/gastronomia/baden.jpg',
    tags: ['Cervejaria', 'Alemão'],
    instagram: 'https://www.instagram.com/obadenbaden/',
    facebook: 'https://www.facebook.com/badenbadenchoperia/'
  },
  {
    id: 'tapiti',
    name: 'Tapiti Confeitaria & Brunch',
    description: 'Café e brunch com produtos artesanais e foco na experiência regional.',
    address: 'Est. Municipal Aurora Nogueira Barros Vasconcellos, 100',
    phone: '(12) 3500-8868',
    website: '',
    image: '/images/gastronomia/tapiti.jpg',
    tags: ['Café', 'Brunch'],
    instagram: 'https://www.instagram.com/tapiticamposdojordao'
  },
  {
    id: 'iceland',
    name: 'Iceland',
    description: 'Bar temático 100% gelo - experiência única com drinques em copos de gelo.',
    address: 'R. Eng. Diogo José de Carvalho, 190 - Capivari',
    phone: '(12) 3663-7214',
    website: 'http://www.icelandcampos.com.br/',
    image: '/images/gastronomia/iceland.jpg',
    tags: ['Bar', 'Temático'],
    instagram: 'https://www.instagram.com/icelandcampos/',
    facebook: 'https://www.facebook.com/icelandcampos/'
  },
  {
    id: 'villa-montese',
    name: 'Villa Montese Bar & Ristorante',
    description: 'Fondues, trutas e pratos internacionais em ambiente aconchegante.',
    address: 'Av. Macedo Soares, 508 - Vila Capivari',
    phone: '(12) 3663-7170',
    website: 'http://www.villamontese.com.br/',
    image: '/images/gastronomia/villa_montese.jpg',
    tags: ['Fondue', 'Internacional'],
    instagram: 'https://www.instagram.com/villamontese/',
    facebook: 'https://www.facebook.com/villamontese/'
  },
  {
    id: 'ludwig',
    name: 'Ludwig Restaurant',
    description: 'Alta gastronomia: sopas, fondues e pratos de caça.',
    address: 'Rua Aristides de Souza Mello, 50 - Capivari',
    phone: '(12) 3663-5111',
    website: 'http://www.ludwigrestaurant.com.br/',
    image: '/images/gastronomia/ludwig.jpg',
    tags: ['Fine Dining', 'Fondue'],
    instagram: 'https://www.instagram.com/ludwigrestaurantoficial/',
    facebook: 'https://www.facebook.com/ludwigrestaurant/'
  },
  {
    id: 'matterhorn',
    name: 'Matterhorn Empório e Restaurante',
    description: 'Menu de trutas, ambiente romântico e música ao vivo em datas específicas.',
    address: 'Rua Djalma Forjaz, 93 - Loja 20 - Praça do Capivari',
    phone: '(12) 3663-1841',
    website: 'https://www.matterhorn.com.br/',
    image: '/images/gastronomia/matterhorn.jpg',
    tags: ['Truta', 'Romântico'],
    instagram: 'https://www.instagram.com/matterhorn_emporio/',
    facebook: 'https://www.facebook.com/matterhorncamposdojordao/'
  },
  {
    id: 'le-foyer',
    name: 'Le Foyer - Chateau La Villette',
    description: 'Gastronomia franco-suíça com influências de montanha, perfeito para ocasiões especiais.',
    address: 'Rua Cantídio Pereira de Castro, 100 - Vila Everest',
    phone: '(12) 3663-1278',
    website: 'http://www.chateaulavillette.com.br/',
    image: '/images/gastronomia/le_foyer.jpg',
    tags: ['Francês', 'Fine Dining'],
    instagram: 'https://www.instagram.com/chateau_la_villette/',
    facebook: 'https://www.facebook.com/lavillette/'
  },
  {
    id: 'mana',
    name: 'Restaurante Maná',
    description: 'Antepastos, truta, picanha e rodízio de fondue com ampla carta de bebidas.',
    address: 'Av. Macedo Soares, 187 - Capivari',
    phone: '(12) 3662-3889',
    website: 'http://www.manarestaurante.com.br/',
    image: '/images/gastronomia/mana.jpg',
    tags: ['Fondue', 'Brasileiro'],
    instagram: 'https://www.instagram.com/manarestauranteepizzaria/',
    facebook: 'https://www.facebook.com/manarestaurantemana/'
  },
  {
    id: 'mercearia',
    name: 'Restaurante Mercearia Campos',
    description: 'Opção charmosa no centrinho do Capivari para refeições descontraídas.',
    address: 'Rua Vitor Godinho, 25 - Capivari',
    phone: '(12) 3663-6464',
    website: 'http://merceariacampos.com.br/',
    image: '/images/gastronomia/mercearia.jpg',
    tags: ['Casual', 'Centro'],
    instagram: 'https://www.instagram.com/merceariacampos/',
    facebook: 'https://www.facebook.com/merceariacampos/'
  },
  {
    id: 'tainakan',
    name: 'Tainakan - Tarundu',
    description: 'Localizado no Parque Tarundu, com buffet, pizzas e cafés especiais.',
    address: 'Av. José Antônio Manso, 1515 - Parque Tarundu',
    phone: '(12) 3800-0150',
    website: 'http://tarundu.com.br/restaurante/',
    image: '/images/gastronomia/tainakan.jpg',
    tags: ['Buffet', 'Pizza'],
    instagram: 'https://www.instagram.com/tarundu/',
    facebook: 'https://www.facebook.com/tarundu'
  },
  {
    id: 'vila-cha',
    name: 'Vila Chã',
    description: 'Gastronomia lusitana com tábuas, pescados e doces tradicionais.',
    address: 'Av. Pedro Paulo, 7545 - Descansópolis',
    phone: '(12) 3663-4702',
    website: 'http://www.vilacha.com.br/',
    image: '/images/gastronomia/vilacha.jpg',
    tags: ['Português', 'Pescados'],
    instagram: 'https://www.instagram.com/restaurantevilacha/',
    facebook: 'https://www.facebook.com/restaurantevilacha'
  },
  {
    id: 'villa-gourmet',
    name: 'Villa Gourmet',
    description: 'Cozinha contemporânea valorizando ingredientes regionais.',
    address: 'Av. Macedo Soares, 203 - Capivari',
    phone: '(12) 3663-1323',
    website: 'http://www.villagourmetcampos.com.br/',
    image: '/images/gastronomia/villa_gourmet.jpg',
    tags: ['Contemporâneo', 'Regional'],
    instagram: 'https://www.instagram.com/villa_gourmetcampos/',
    facebook: 'https://www.facebook.com/villagourmetcamposdojordao'
  },
  {
    id: 'sans-souci',
    name: 'Sans Souci Confeitaria & Café',
    description: 'Café e confeitaria com estilo europeu e foco em produtos locais.',
    address: 'Av. Dr. Januário Miraglia, 3.260 - Jaguaribe',
    phone: '(12) 3663-3922',
    website: 'http://www.sanssoucibistro.com.br/',
    image: '/images/gastronomia/sans_souci.jpg',
    tags: ['Café', 'Confeitaria'],
    instagram: 'https://www.instagram.com/sanssoucipatisserie/',
    facebook: 'https://www.facebook.com/sanssoucipatisserie/'
  },
  {
    id: 'trattoria',
    name: 'Trattoria Salvador',
    description: 'Massas artesanais e fondues em ambiente intimista.',
    address: 'Av. Macedo Soares, 489 - Capivari',
    phone: '(12) 3663-2525',
    website: 'http://www.trattoriasalvador.com.br/',
    image: '/images/gastronomia/trattoria.jpg',
    tags: ['Italiano', 'Fondue'],
    instagram: 'https://www.instagram.com/trattoria_salvador',
    facebook: 'https://www.facebook.com/trattoriasalvador'
  },
  {
    id: 'cantinho-suico',
    name: 'Cantinho Suíço',
    description: 'Sequências de fondue, trutas e culinária franco-suíça.',
    address: 'Av. Macedo Soares, 457 - Capivari',
    phone: '(12) 3663-2525',
    website: '',
    image: '/images/gastronomia/cantinho_suico.jpg',
    tags: ['Suíço', 'Fondue'],
    instagram: 'https://www.instagram.com/cantinhosuicorestaurante'
  },
  {
    id: 'bella-vista',
    name: 'Bella Vista Restaurante',
    description: 'Experiência sofisticada com vista panorâmica e carta de vinhos.',
    address: 'Alameda Pérolas, 182 - Morro do Elefante',
    phone: '(12) 99784-9168',
    website: 'https://www.getinapp.com.br/campos-do-jordao/bella-vista-restaurante',
    image: '/images/gastronomia/bella_vista.jpg',
    tags: ['Vista', 'Vinhos'],
    instagram: 'https://www.instagram.com/bellavistacamposdojordao/',
    facebook: 'https://www.facebook.com/restaurante.bellavistacampos/'
  },
  {
    id: 'dona-chica',
    name: 'Dona Chica Capivari',
    description: 'Gastronomia afetiva em ambiente rústico com áreas ao ar livre.',
    address: 'Parque Capivari - R. Eng. Diogo José de Carvalho, 1291',
    phone: '(12) 99647-6888',
    website: '',
    image: '/images/gastronomia/dona_chica.jpg',
    tags: ['Brasileiro', 'Rústico'],
    instagram: 'https://www.instagram.com/donachicacapivari/',
    facebook: 'https://www.facebook.com/people/Dona-Chica-Capivari/61575137816797/'
  },
  {
    id: 'sabor-chocolate',
    name: 'Sabor Chocolate',
    description: 'Chocolateria tradicional com criações regionais, como bombons de pinhão.',
    address: 'Rua Djalma Forjaz, 103 - Capivari',
    phone: '(12) 3663-1777',
    website: 'https://www.saborchocolate.com.br/',
    image: '/images/gastronomia/sabor_chocolate.jpg',
    tags: ['Chocolateria', 'Doces'],
    instagram: 'https://www.instagram.com/sabor.chocolate/',
    facebook: 'https://www.facebook.com/saborcj'
  },
  {
    id: 'cervejaria-luss',
    name: 'Cervejaria Luss',
    description: 'Biergarten em casarão histórico com rótulos e petiscos.',
    address: 'Av. Sen. Roberto Simonsen, 1724 - Vila Inglesa',
    phone: '(12) 99108-9675',
    website: '',
    image: '/images/gastronomia/luss.jpg',
    tags: ['Cervejaria', 'Biergarten'],
    instagram: 'https://www.instagram.com/lusscervejaria/',
    facebook: 'https://www.facebook.com/lusscervejaria'
  },
  {
    id: 'nevada',
    name: 'Restaurante Nevada',
    description: 'Tradição desde 1965: fondues, sopas no pão e pratos clássicos da serra.',
    address: 'Av. Macedo Soares, 159 - Capivari',
    phone: '(12) 3663-1566',
    website: '',
    image: '/images/gastronomia/nevada.jpg',
    tags: ['Tradicional', 'Fondue'],
    instagram: 'https://www.instagram.com/restaurantenevadacampos/'
  },
  {
    id: 'churrasco-ao-vivo',
    name: 'Churrasco ao Vivo',
    description: 'Mais de 30 anos de história com carnes argentinas preparadas pelo mestre assador.',
    address: 'Rua Doutor Heitor Penteado, 82',
    phone: '(12) 3663-6430',
    website: '',
    image: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/churrasco-aovivo-760x428.png',
    tags: ['Churrasco', 'Argentino'],
    instagram: 'https://www.instagram.com/churrascoaovivocj'
  },
  {
    id: 'cantinho-serra-grill',
    name: 'Cantinho da Serra Grill',
    description: 'Cozinha mineira com cortes especiais Angus, rodízio de fondues e cervejas especiais.',
    address: 'Av. Macedo Soares, 457 - Capivari',
    phone: '(12) 3663-4448',
    website: 'https://www.cantinhodaserragrill.com.br/',
    image: '/images/gastronomia/cantinho_serra.jpg',
    tags: ['Grill', 'Mineiro'],
    instagram: 'https://www.instagram.com/cantinhodaserragrill',
    facebook: 'https://www.facebook.com/restaurantecantinhodaserragrill'
  },
  {
    id: 'bam-bam-cafe',
    name: 'Bam Bam Café',
    description: 'Restaurante bem avaliado com ambiente acolhedor e festival de fondue.',
    address: 'Rua Djalma Forjaz, 103 - Capivari',
    phone: '(12) 99676-3491',
    website: '',
    image: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/bam-bam-760x428.png',
    tags: ['Café', 'Fondue'],
    instagram: 'https://www.instagram.com/bambamcafeoficial/'
  },
  {
    id: 'emporio-mellos',
    name: 'Empório dos Mellos',
    description: 'Refúgio gastronômico slow food com ingredientes frescos de produtores locais.',
    address: 'R. Elídio Gonçalves da Silva, 1800',
    phone: '(12) 99751-2601',
    website: '',
    image: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/mellos-760x428.png',
    tags: ['Slow Food', 'Regional'],
    instagram: 'https://www.instagram.com/emporiodosmellos/',
    facebook: 'https://www.facebook.com/emporiodosmellos/'
  },
  {
    id: 'alto-da-brasa',
    name: 'Alto da Brasa Brew Kitchen',
    description: 'Grelhados harmonizados com cervejas artesanais no Parque da Cerveja.',
    address: 'Parque da Cerveja - Estr Mun Paulo Costa Lenz Cesar, 2150',
    phone: '(12) 99781-7538',
    website: 'https://cervejacamposdojordao.com.br/parque/alto-da-brasa/',
    image: '/images/gastronomia/alto_brasa.jpg',
    tags: ['Grill', 'Cervejaria'],
    instagram: 'https://www.instagram.com/altodabrasa',
    facebook: 'https://www.facebook.com/altodabrasa'
  },
  {
    id: 'paris-station',
    name: 'Paris Station',
    description: 'Aconchego, boa música e gastronomia de qualidade ao lado da Torre Eiffel.',
    address: 'Rua Djalma Forjaz, 263 - Capivari',
    phone: '(12) 99112-0325',
    website: 'https://parisstation.com.br/',
    image: '/images/gastronomia/paris_station.jpg',
    tags: ['Francês', 'Música'],
    instagram: 'https://www.instagram.com/restauranteparisstationoficial',
    facebook: 'https://www.facebook.com/RestauranteParisStation'
  },
];

const Card: React.FC<{ r: Restaurant; onDetails: (r: Restaurant) => void; texts: any; language: Language }> = ({ r, onDetails, texts }) => {
  const [imgError, setImgError] = useState(false);
  const hasSocialLinks = r.instagram || r.facebook;
  
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

        {/* Redes Sociais */}
        {hasSocialLinks && (
          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-400 font-medium">Siga:</span>
            {r.instagram && (
              <a 
                href={r.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                title="Instagram"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
            {r.facebook && (
              <a 
                href={r.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                title="Facebook"
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
          </div>
        )}

        <div className="mt-4 flex gap-2">
          {r.website && (
            <a href={r.website} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold py-2 rounded-lg transition-colors">
              {texts.website}
            </a>
          )}
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
