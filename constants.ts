
import { TourItem } from './types';

export const TOURS: TourItem[] = [
  // ========== HOTÉIS E POUSADAS (primeiro) ==========
  {
    id: 'hortensias',
    title: 'Pousada das Hortênsias',
    category: 'Hospedagem',
    description: 'No Capivari; apartamentos com TV LCD SKY, DVD, cofre digital, secador, frigobar e aquecedor elétrico; minibiblioteca, bicicletas e sala de jogos.',
    address: 'Capivari, Campos do Jordão',
    phone: '(12) 3663-6010',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/pousada_hortensias.jpg',
    website: 'https://dashortensias.com.br/'
  },
  {
    id: 'parque-hotel',
    title: 'Campos do Jordão Parque Hotel',
    category: 'Hospedagem',
    description: 'Localizado a 400m do centro turístico do Capivari; apartamentos com vista panorâmica, sala de jogos, restaurante e café da manhã incluso.',
    address: 'Capivari, Campos do Jordão',
    phone: '(12) 3669-3333',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_hotel_800.jpg',
    website: 'http://www.parquehotel.com.br'
  },
  {
    id: 'hotel-toriba',
    title: 'Hotel Toriba',
    category: 'Hospedagem',
    description: 'Hotel com forte infraestrutura: spa, quadras, trilhas, restaurantes e diversas opções de lazer; café da manhã incluso.',
    address: 'Alto da Boa Vista, Campos do Jordão',
    phone: '(12) 3668-5008',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/10/hotel-toriba.png',
    website: 'https://www.toriba.com.br/'
  },
  {
    id: 'bendito-cacau',
    title: 'Hotel Bendito Cacau Resort',
    category: 'Hospedagem',
    description: 'Quartos equipados com frigobar e ar-condicionado; instalações de fitness e quadras; Wi‑Fi e estacionamento.',
    address: 'Campos do Jordão',
    phone: '(12) 3669-0777',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/Design-sem-nome.png',
    website: 'https://www.benditocacauresort.com.br/campos'
  },
  {
    id: 'hotel-quebra-noz',
    title: 'Hotel Boutique Quebra-Noz',
    category: 'Hospedagem',
    description: 'Suítes com banheira, piscina aquecida, spa, áreas de lazer e restaurante; café da manhã incluso.',
    address: 'Capivari, Campos do Jordão',
    phone: '(12) 3663-4889',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2024/02/Externa-Quebra-Noz-6-scaled.jpg',
    website: 'https://quebranoz.com.br'
  },
  {
    id: 'vila-inglesa',
    title: 'Hotel Vila Inglesa',
    category: 'Hospedagem',
    description: 'Localizado na Vila Inglesa; oferece diversas atividades como arvorismo, tirolesa, quadras e piscinas; café da manhã incluso.',
    address: 'Vila Inglesa, Campos do Jordão',
    phone: '(12) 3669-5000',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/vila_inglesa.jpg',
    website: 'http://www.hotelvilainglesa.com.br'
  },
  {
    id: 'le-renard',
    title: 'Hotel Le Renard',
    category: 'Hospedagem',
    description: 'Suítes com piso aquecido e amenities de qualidade; piscina descoberta aquecida e café da manhã incluso.',
    address: 'Capivari, Campos do Jordão',
    phone: '(12) 3669-2220',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/le_renard.jpg',
    website: 'https://lerenard.com.br/'
  },
  {
    id: 'chateau-villette',
    title: 'Pousada Chateau La Villette',
    category: 'Hospedagem',
    description: 'Na Vila Everest; suítes com cama king, roupa de cama 600 fios, calefação, TV SKY HD, DVDs, Wi-Fi e cofre; restaurante Le Foyer.',
    address: 'Vila Everest, Campos do Jordão',
    phone: '(12) 3663-1444',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/la_villette.jpg',
    website: 'https://chateaulavillette.com.br/'
  },
  {
    id: 'annecy',
    title: 'Pousada Annecy',
    category: 'Hospedagem',
    description: 'A 400m do centro do Capivari; suítes com cama box queen size, TV LCD 42″, DVD e Sky, frigobar, aquecedor elétrico e enxoval Trussardi.',
    address: 'Capivari, Campos do Jordão',
    phone: '(12) 3663-3617',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/annecy.jpg',
    website: 'https://www.annecypousada.com.br/'
  },
  {
    id: 'alto-boa-vista',
    title: 'Pousada Alto da Boa Vista',
    category: 'Hospedagem',
    description: 'Chalés em estilo europeu com vista panorâmica das montanhas; sala de leitura, lounge com lareira e jardins; café da manhã incluso.',
    address: 'Alto da Boa Vista, Campos do Jordão',
    phone: '(12) 99660-3386',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/alto-da-boa-vista-760x428.png',
    website: 'https://pousadaaltodaboavista.com.br/'
  },
  // ========== PASSEIOS E ATRAÇÕES ==========
  {
    id: 'claudio-santoro',
    title: 'Auditório Claudio Santoro',
    category: 'Cultura',
    description: 'Principal palco do maior evento da música erudita da América Latina, o Auditório Claudio Santoro foi inaugurado em 1979 e seu nome é uma homenagem ao maestro falecido nesse mesmo ano, primeiro regente titular da Orquestra Sinfônica de Brasília.',
    address: 'Av. Dr. Luis Arrobas Martins, 1880 – Alto Boa Vista',
    phone: '(12) 3662 6000',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/auditorio_claudio_santoro.jpg',
    website: 'https://www.museufelicialeirner.org.br/institucional/auditorio-claudio-santoro/'
  },
  {
    id: 'felicia-leirner',
    title: 'Museu Felícia Leirner',
    category: 'Cultura',
    description: 'Localizado em uma área de mata com 35 mil m², o Museu Felícia Leirner foi inaugurado em 1979 e reúne um conjunto de 85 obras em bronze, cimento branco e granito da artista Felícia Leirner.',
    address: 'Av. Dr. Luis Arrobas Martins, 1880 – Alto Boa Vista',
    phone: '(12) 3662 6000',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/museu_felicia_leirner.jpg',
    website: 'https://www.museufelicialeirner.org.br/institucional/museu-felicia-leirner/'
  },
  {
    id: 'efcj',
    title: 'Estrada de Ferro Campos do Jordão',
    category: 'Lazer',
    description: 'Inaugurada em 1914, a Estrada de Ferro se tornou a principal via de acesso ao município. O passeio de bondinho começa na Estação Emílio Ribas, no Capivari.',
    address: 'Avenida Emilio Ribas – Estação Emílio Ribas – Capivari',
    phone: '(12) 3644-7408',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/efcj.jpg',
    status: 'No momento os passeios estão desativados.'
  },
  {
    id: 'tarundu',
    title: 'Centro de Lazer Tarundu',
    category: 'Lazer',
    description: 'O Tarundu está localizado numa área de 500.000 m² de mata preservada, com jardins, trilhas e mais de 35 atrações para todas as idades.',
    address: 'Av. José Antonio Manso, 1515',
    phone: '(12) 3800 0150',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/tarundu.jpg',
    website: 'http://tarundu.com.br/'
  },
  {
    id: 'parque-capivari',
    title: 'Parque Capivari',
    category: 'Lazer',
    description: 'Grande revitalização com novo centro comercial, pedalinhos, o famoso teleférico e palco sobre o lago.',
    address: 'R. Eng. Diogo José de Carvalho, 1291 – Capivari',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/parque_capivari.jpg',
    website: 'https://parquecapivari.com.br/'
  },
  {
    id: 'baden-baden',
    title: 'Cervejaria Baden Baden',
    category: 'Gastronomia',
    description: 'A fábrica oferece tours guiados mostrando o processo de fabricação de uma das primeiras cervejas artesanais do Brasil.',
    address: 'Av. Matheus Costa Pinto, 1653 – Vila Santa Cruz',
    phone: '(12) 3664 2004',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/fabrica_baden.jpg',
    website: 'https://www.badenbaden.com.br/'
  },
  {
    id: 'amantikir',
    title: 'Parque Amantikir',
    category: 'Natureza',
    description: 'Jardins inspirados em diferentes culturas ao redor do mundo, com mais de 700 espécies de plantas.',
    address: 'Rodovia Campos do Jordão - Gavião Gonzaga',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/2-800x450.png',
    website: 'https://parqueamantikir.com.br/'
  },
  {
    id: 'horto',
    title: 'Horto Florestal',
    category: 'Natureza',
    description: 'Área preservada com trilhas entre araucárias centenárias, rios de águas cristalinas e paisagens típicas da montanha.',
    address: 'Parque Estadual de Campos do Jordão',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2026/01/Untitled-design.png',
    instagram: 'https://www.instagram.com/parquecamposdojordao/'
  }
  ,
  {
    id: 'casa-xilogravura',
    title: 'Museu Casa da Xilogravura',
    category: 'Cultura',
    description: 'Museu particular que divulga a arte da xilogravura, com um acervo amplo e obras de artistas consagrados.',
    address: 'Av. Eduardo Moreira da Cruz, 295 – Jardim Jaguaribe',
    phone: '(12) 3662 1832',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/museu_xilogravura.jpg',
    website: 'https://www.casadaxilogravura.com.br/'
  },
  {
    id: 'palacio-boa-vista',
    title: 'Palácio Boa Vista',
    category: 'Cultura',
    description: 'Residência de inverno convertida em museu com um acervo com mais de 2 mil peças, entre mobiliário, porcelanas, pinturas e esculturas.',
    address: 'Av. Adhemar de Barros, 3001 – Alto da Boa Vista',
    phone: '(12) 3668 9739',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2020/11/palacio_boa_vista.jpg',
    website: 'http://www.acervo.sp.gov.br/palBoaVista.html'
  },
  {
    id: 'prana-park',
    title: 'Prana Park',
    category: 'Aventura',
    description: 'Parque de aventuras com tirolesas, bike aérea, megabalanço, arvorismo e mirantes com vistas panorâmicas.',
    address: 'Estrada do Pico do Itapeva',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/03/Design-sem-nome.png',
    website: 'https://pranapark.com.br/'
  },
  {
    id: 'dreams-house-park',
    title: 'Dreams House Park',
    category: 'Lazer',
    description: 'Complexo de entretenimento com museu de cera, Miniland e atrações voltadas a famílias e fotos memoráveis.',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/10/dreamhouse.png',
    website: 'https://grupodreams.com.br/loja/campos/'
  },
  {
    id: 'maostiqueiras',
    title: 'Mãostiqueiras',
    category: 'Artesanato',
    description: 'Projeto que processa lã natural localmente em peças de decoração e oferece oficinas e produtos de produtores locais.',
    address: 'Av. Pedro Paulo, 1455 – Parque da Lagoinha',
    phone: '(12) 3662 3207',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/maostiqueira.jpg',
    website: 'http://maostiqueiras.com.br/'
  },
  {
    id: 'parque-da-lagoinha',
    title: 'Parque da Lagoinha',
    category: 'Natureza',
    description: 'Parque revitalizado com trilhas, lagos, projetos socioambientais, educação ambiental e áreas de lazer.',
    address: 'Av. Pedro Paulo, 1455 – Lot. Veu da Noiva',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/03/paruqe-da-lagoinha-800x464.jpg',
    website: 'https://parquedalagoinha.com.br/'
  },
  {
    id: 'casa-araucaria',
    title: 'Casa Araucária',
    category: 'Experiência',
    description: 'Loja e espaço com produtos de pequenos produtores locais, oficinas e experiências imersivas ligadas à araucária e biodiversidade.',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/3-800x450.png',
    website: 'https://www.casaraucaria.com.br/'
  },
  {
    id: 'iceland-aventura-no-gelo',
    title: 'Iceland Aventura no Gelo',
    category: 'Lazer',
    description: 'Espaço inteiro construído em gelo com esculturas temáticas; visitas curtas com casacos e luvas providenciados.',
    address: 'R. Eng. Diogo José de Carvalho, 190 – Capivari',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/iceland-800x450.png',
    website: 'https://www.icelandcampos.com.br/'
  },
  {
    id: 'parque-da-cerveja',
    title: 'Parque da Cerveja',
    category: 'Gastronomia',
    description: 'Espaço com experiências ligadas à produção e degustação de cervejas artesanais em um parque cercado por araucárias.',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/04/1-800x450.png',
    website: 'https://cervejacamposdojordao.com.br/'
  },
  {
    id: 'parque-bambui',
    title: 'Parque Bambuí',
    category: 'Natureza',
    description: 'Área verde com trilhas, lagos, arte ao ar livre, Maria-fumaça, esculturas e gastronomia local.',
    imageUrl: 'https://visitecamposdojordao.org.br/wp-content/uploads/2025/05/parque-bambui.png',
    website: 'https://parquebambui.com.br/'
  }
];
