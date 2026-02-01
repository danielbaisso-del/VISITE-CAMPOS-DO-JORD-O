const http = require('http');

const PORT = process.env.PORT || 5000;

// =============================================================================
// BASE DE CONHECIMENTO COMPLETA - CAMPOS DO JORDÃO
// =============================================================================

const KB = {
  city: {
    name: 'Campos do Jordão',
    state: 'São Paulo',
    country: 'Brasil',
    altitude_m: 1628,
    coordinates: { lat: -22.739, lng: -45.588 },
    area_km2: 278.6,
    population: 'aproximadamente 50.000 habitantes (varia com sazonalidade)',
    history: 'Desenvolvida como estância climática desde o início do século XX, Campos do Jordão consolidou-se como destino de montanha e polo cultural.',
    climate: 'Clima de altitude: verões com chuvas de tarde e temperaturas amenas; invernos frios, com noites geladas e possibilidade de geadas.',
    best_times: 'Julho (alta temporada de inverno) para turismo de frio; primavera e outono são ideais para quem busca clima ameno e menos movimento.',
    transport: {
      main_access: 'Rodovias SP-123 (via Pindamonhangaba) e SP-050; viagens de carro são a forma mais comum.',
      airports: ['São José dos Campos (SJK) ~1h30', 'Guarulhos (GRU) ~2h30-3h por rodovia'],
      public: 'Linhas de ônibus intermunicipais e serviços de transfer/vans em alta temporada.'
    },
    neighborhoods: ['Capivari', 'Vila Inglesa', 'Alto da Boa Vista', 'Jaguaribe', 'Abernéssia', 'Vila Everest', 'Morro do Elefante'],
    emergency: { police: '190', fireDept: '193', samu: '192' }
  },

  convention: {
    name: 'Convention Bureau de Campos do Jordão',
    description: 'O Convention Bureau intermedia e apoia a realização de eventos, conectando organizadores a fornecedores locais, rede hoteleira, espaços e serviços MICE (meetings, incentives, conferences, exhibitions).',
    website: 'https://www.visitecamposdojordao.org.br/',
    associateUrl: 'https://www.visitecamposdojordao.org.br/associados/associe-se/',
    email: 'contato@visitecamposdojordao.org.br',
    phone: '(12) 3662-0000',
    address: 'Av. Dr. Luis Arrobas Martins, s/n - Alto da Boa Vista',
    services: [
      'RFPs e propostas personalizadas',
      'Conexão com rede hoteleira e fornecedores (catering, áudio/visual, transporte)',
      'Visitas técnicas (site inspections)',
      'Material técnico: fichas de salas, plantas, capacidades e imagens',
      'Apoio em logística local e autorizações municipais'
    ],
    howToAssociate: 'Para se associar ao Convention Bureau, acesse https://www.visitecamposdojordao.org.br/associados/associe-se/ e preencha o formulário com dados da sua empresa. A equipe entrará em contato para fornecer informações sobre benefícios e taxas.',
    benefits: [
      'Divulgação no portal oficial',
      'Participação em feiras e eventos de turismo',
      'Networking com outros associados',
      'Acesso a captação de eventos MICE',
      'Material promocional e apoio de marketing'
    ]
  },

  // PASSEIOS E ATRAÇÕES
  attractions: {
    'claudio-santoro': {
      title: 'Auditório Claudio Santoro',
      category: 'Cultura',
      description: 'Principal palco do Festival de Inverno. Inaugurado em 1979, homenageia o maestro Claudio Santoro. Recebe a Orquestra Sinfônica e eventos culturais de grande porte.',
      address: 'Av. Dr. Luis Arrobas Martins, 1880 – Alto Boa Vista',
      phone: '(12) 3662 6000',
      website: 'https://www.museufelicialeirner.org.br/institucional/auditorio-claudio-santoro/'
    },
    'felicia-leirner': {
      title: 'Museu Felícia Leirner',
      category: 'Cultura',
      description: 'Museu ao ar livre com 85 esculturas em bronze, cimento branco e granito. Área de 35 mil m² integrada à natureza.',
      address: 'Av. Dr. Luis Arrobas Martins, 1880 – Alto Boa Vista',
      phone: '(12) 3662 6000',
      website: 'https://www.museufelicialeirner.org.br/',
      hours: '09:00 - 17:00'
    },
    'efcj': {
      title: 'Estrada de Ferro Campos do Jordão',
      category: 'Lazer',
      description: 'Inaugurada em 1914, a Estrada de Ferro se tornou patrimônio histórico. Passeios de bondinho pela Serra da Mantiqueira com paisagens deslumbrantes.',
      address: 'Estação Emílio Ribas – Capivari',
      phone: '(12) 3644-7408',
      status: 'Consultar disponibilidade antes de visitar.'
    },
    'tarundu': {
      title: 'Centro de Lazer Tarundu',
      category: 'Lazer/Aventura',
      description: 'Parque com 500.000 m² de mata preservada, mais de 35 atrações: tirolesa, arvorismo, pedalinho, quadriciclo, trilhas e muito mais. Ideal para famílias.',
      address: 'Av. José Antonio Manso, 1515',
      phone: '(12) 3800 0150',
      website: 'http://tarundu.com.br/',
      hours: '09:00 - 18:00'
    },
    'parque-capivari': {
      title: 'Parque Capivari',
      category: 'Lazer',
      description: 'Centro turístico revitalizado com teleférico, pedalinhos, centro comercial, restaurantes e palco sobre o lago. Coração da vida noturna.',
      address: 'R. Eng. Diogo José de Carvalho, 1291 – Capivari',
      website: 'https://parquecapivari.com.br/'
    },
    'baden-baden': {
      title: 'Cervejaria Baden Baden',
      category: 'Gastronomia',
      description: 'Uma das primeiras cervejarias artesanais do Brasil. Tours guiados, loja e restaurante. Reserve com antecedência na alta temporada.',
      address: 'Av. Matheus Costa Pinto, 1653 – Vila Santa Cruz',
      phone: '(12) 3664 2004',
      website: 'https://www.badenbaden.com.br/',
      hours: '10:00 - 18:00'
    },
    'amantikir': {
      title: 'Parque Amantikir',
      category: 'Natureza',
      description: 'Jardins temáticos inspirados em diferentes culturas do mundo. Mais de 700 espécies de plantas, mirantes e labirintos. Excelente para fotos.',
      address: 'Rodovia Campos do Jordão - Gavião Gonzaga',
      phone: '(12) 3664-2000',
      website: 'https://parqueamantikir.com.br/',
      hours: '09:00 - 17:00',
      tips: 'Chegue cedo para melhores fotos. Use calçados confortáveis.'
    },
    'horto': {
      title: 'Horto Florestal (Parque Estadual)',
      category: 'Natureza',
      description: 'Área preservada com araucárias centenárias, trilhas, rios cristalinos e fauna nativa da Serra da Mantiqueira.',
      address: 'Parque Estadual de Campos do Jordão',
      instagram: 'https://www.instagram.com/parquecamposdojordao/',
      hours: '08:00 - 17:00',
      tips: 'Use roupas e calçados adequados. Leve água e evite trilhas em dias de chuva.'
    },
    'casa-xilogravura': {
      title: 'Museu Casa da Xilogravura',
      category: 'Cultura',
      description: 'Museu particular dedicado à arte da xilogravura com acervo de artistas consagrados.',
      address: 'Av. Eduardo Moreira da Cruz, 295 – Jardim Jaguaribe',
      phone: '(12) 3662 1832',
      website: 'https://www.casadaxilogravura.com.br/'
    },
    'palacio-boa-vista': {
      title: 'Palácio Boa Vista',
      category: 'Cultura',
      description: 'Residência de inverno do Governador convertida em museu. Acervo de 2 mil peças: mobiliário, porcelanas, pinturas e esculturas.',
      address: 'Av. Adhemar de Barros, 3001 – Alto da Boa Vista',
      phone: '(12) 3668 9739',
      website: 'http://www.acervo.sp.gov.br/palBoaVista.html'
    },
    'prana-park': {
      title: 'Prana Park',
      category: 'Aventura',
      description: 'Parque de aventuras com tirolesas, bike aérea, megabalanço, arvorismo e mirantes panorâmicos.',
      address: 'Estrada do Pico do Itapeva',
      website: 'https://pranapark.com.br/'
    },
    'dreams-house-park': {
      title: 'Dreams House Park',
      category: 'Lazer',
      description: 'Complexo com museu de cera, Miniland e atrações para famílias. Ótimo para fotos divertidas.',
      website: 'https://grupodreams.com.br/loja/campos/'
    },
    'maostiqueiras': {
      title: 'Mãostiqueiras',
      category: 'Artesanato',
      description: 'Projeto de artesanato local com lã natural. Oficinas, produtos de produtores locais e experiências imersivas.',
      address: 'Av. Pedro Paulo, 1455 – Parque da Lagoinha',
      phone: '(12) 3662 3207',
      website: 'http://maostiqueiras.com.br/'
    },
    'parque-da-lagoinha': {
      title: 'Parque da Lagoinha',
      category: 'Natureza',
      description: 'Parque revitalizado com trilhas, lagos, projetos socioambientais e educação ambiental.',
      address: 'Av. Pedro Paulo, 1455',
      website: 'https://parquedalagoinha.com.br/'
    },
    'casa-araucaria': {
      title: 'Casa Araucária',
      category: 'Experiência',
      description: 'Espaço com produtos de pequenos produtores, oficinas e experiências ligadas à biodiversidade da araucária.',
      website: 'https://www.casaraucaria.com.br/'
    },
    'iceland': {
      title: 'Iceland Aventura no Gelo',
      category: 'Lazer',
      description: 'Bar 100% construído em gelo com esculturas temáticas. Casacos e luvas fornecidos.',
      address: 'R. Eng. Diogo José de Carvalho, 190 – Capivari',
      website: 'https://www.icelandcampos.com.br/'
    },
    'parque-da-cerveja': {
      title: 'Parque da Cerveja',
      category: 'Gastronomia',
      description: 'Experiências de degustação de cervejas artesanais em ambiente cercado por araucárias.',
      website: 'https://cervejacamposdojordao.com.br/'
    },
    'parque-bambui': {
      title: 'Parque Bambuí',
      category: 'Natureza',
      description: 'Área verde com trilhas, lagos, arte ao ar livre, Maria-fumaça e gastronomia local.',
      website: 'https://parquebambui.com.br/'
    },
    'teleferico': {
      title: 'Teleférico de Campos do Jordão',
      category: 'Lazer',
      description: 'Passeio de teleférico até o Morro do Elefante com vista panorâmica da cidade.',
      address: 'Parque Capivari',
      tips: 'Funciona de quarta a segunda. Verificar horários.'
    },
    'pico-do-itapeva': {
      title: 'Pico do Itapeva',
      category: 'Natureza',
      description: 'Mirante a 2.030m de altitude com vista para o Vale do Paraíba. Um dos pontos mais altos da região.',
      tips: 'Leve agasalho mesmo no verão. Ideal para ver o nascer do sol.'
    },
    'morro-do-elefante': {
      title: 'Morro do Elefante',
      category: 'Natureza',
      description: 'Acesso por teleférico ou carro. Vista panorâmica, lojas e restaurantes no topo.',
      address: 'Capivari'
    },
    'pedra-do-bau': {
      title: 'Pedra do Baú',
      category: 'Aventura',
      description: 'Formação rochosa para escalada e trekking. Trilha desafiadora com vistas incríveis. Necessário preparo físico.',
      tips: 'Contrate guia local. Leve água e equipamentos adequados.'
    }
  },

  // RESTAURANTES E GASTRONOMIA
  restaurants: {
    'nonna-mimi': { name: 'Cantina Nonna Mimi', specialty: 'Comida italiana tradicional', address: 'Av. Dr. Januário Miráglia, 2438', phone: '(12) 3662-3522', website: 'http://www.nonnamimi.com.br' },
    'caras-malte': { name: 'Caras de Malte', specialty: 'Bar & microcervejaria', address: 'Av. Pedro Paulo, 1500 - Descansópolis' },
    'baden-rest': { name: 'Choperia Baden Baden', specialty: 'Cervejaria e pratos alemães', address: 'Rua Djalma Forfaz, 93 - Capivari', phone: '(12) 3664 2004', website: 'https://www.badenbaden.com.br/' },
    'tapiti': { name: 'Tapiti Confeitaria & Brunch', specialty: 'Cafeteria e brunch', address: 'Est. Municipal Aurora Nogueira Barros Vasconcellos, 100' },
    'iceland-bar': { name: 'Iceland', specialty: 'Bar temático 100% gelo', address: 'R. Eng. Diogo José de Carvalho, 190 - Capivari' },
    'villa-montese': { name: 'Villa Montese', specialty: 'Fondues e trutas', address: 'Av. Macedo Soares, 508 - Capivari' },
    'ludwig': { name: 'Ludwig Restaurant', specialty: 'Alta gastronomia', address: 'Rua Aristides de Souza Mello, 50 - Capivari' },
    'matterhorn': { name: 'Matterhorn', specialty: 'Trutas e pratos suíços', address: 'Rua Djalma Forfaz, 93 - Praça do Capivari' },
    'le-foyer': { name: 'Le Foyer - Chateau La Villette', specialty: 'Cozinha franco-suíça', address: 'Rua Cantídio Pereira de Castro, 100' },
    'mana': { name: 'Restaurante Maná', specialty: 'Trutas, fondues e carnes', address: 'Av. Macedo Soares, 187 - Capivari' },
    'mercearia': { name: 'Mercearia Campos', specialty: 'Refeições descontraídas', address: 'Rua Vitor Godinho, 25 - Capivari' },
    'tainakan': { name: 'Tainakan - Tarundu', specialty: 'Buffet e pizzas', address: 'Av. José Antônio Manso, 1515 - Parque Tarundu' },
    'vilacha': { name: 'Vila Chã', specialty: 'Gastronomia lusitana', address: 'Av. Pedro Paulo, 7545 - Descansópolis' },
    'villa-gourmet': { name: 'Villa Gourmet', specialty: 'Cozinha contemporânea', address: 'Av. Macedo Soares, 203 - Capivari' },
    'sans-souci': { name: 'Sans Souci', specialty: 'Cafeteria e confeitaria', address: 'Av. Dr. Januário Miraglia, 3.260 - Jaguaribe' },
    'trattoria': { name: 'Trattoria Salvador', specialty: 'Massas e fondues', address: 'Av. Macedo Soares, 489 - Capivari' },
    'churrasco': { name: 'Churrasco ao Vivo', specialty: 'Grelhados especiais', address: 'Rua Doutor Heitor Penteado, 82' },
    'cantinho-suico': { name: 'Cantinho Suíço', specialty: 'Fondue e culinária suíça', address: 'Av. Macedo Soares, 457 - Capivari' },
    'cantinho-serra': { name: 'Cantinho da Serra Grill', specialty: 'Cozinha mineira e cortes', address: 'Av. Macedo Soares, 457 - Capivari' },
    'bella-vista': { name: 'Bella Vista', specialty: 'Carta de vinhos e vista panorâmica', address: 'Alameda Pérolas, 182 - Morro do Elefante' },
    'art-bbq': { name: 'Art BBQ', specialty: 'Grelhados com vista', address: 'Rua 5, 308 - Vila Floresta' },
    'dona-chica': { name: 'Dona Chica', specialty: 'Gastronomia afetiva', address: 'Parque Capivari' },
    'bam-bam-cafe': { name: 'Bam Bam Café', specialty: 'Cafés e bolos', address: 'Rua Djalma Forfaz, 103 - Capivari' },
    'emporio-mellos': { name: 'Empório dos Mellos', specialty: 'Produtos artesanais', address: 'R. Elídio Gonçalves da Silva, 1800' },
    'sabor-chocolate': { name: 'Sabor Chocolate', specialty: 'Chocolateria tradicional', address: 'Rua Djalma Forfaz, 103 - Capivari' },
    'cervejaria-luss': { name: 'Cervejaria Luss', specialty: 'Biergarten e petiscos', address: 'Av. Sen. Roberto Simonsen, 1724 - Vila Inglesa' },
    'alto-brasa': { name: 'Alto da Brasa Brew Kitchen', specialty: 'Beer & Grill', address: 'Parque da Cerveja' },
    'paris-station': { name: 'Paris Station', specialty: 'Gastronomia de qualidade', address: 'Rua Djalma Forfaz, 263' },
    'nevada': { name: 'Nevada', specialty: 'Fondues e pratos clássicos', address: 'Av. Macedo Soares, 159 - Capivari' }
  },

  // HOSPEDAGENS
  hotels: {
    'parque-hotel': { name: 'Campos do Jordão Parque Hotel', category: 'Hotel', description: 'A 400m do Capivari, vista panorâmica', phone: '(12) 3669-3333', website: 'http://www.parquehotel.com.br', tags: ['Centro'] },
    'champet': { name: 'Champet Boutique Hotel', category: 'Boutique', description: 'A 17 min a pé do Parque Capivari', phone: '(12) 3669-8811', tags: ['Boutique', 'Centro'] },
    'chrys-wellness': { name: 'Chrys Wellness Park Hotel', category: 'Wellness', description: 'No Morro do Elefante, spa e piscina aquecida', phone: '(12) 3663-1151', website: 'http://www.chrisparkhotel.com.br', tags: ['Wellness', 'Piscina'] },
    'home-green-home': { name: 'Flat Hotel Home Green Home', category: 'Flat', description: 'Alto do Capivari, piscinas aquecidas', phone: '(12) 3669-0300', website: 'http://www.homegreenhome.com.br', tags: ['Flat'] },
    'palazzo-reale': { name: 'Flat Hotel Palazzo Reale', category: 'Flat', description: 'Capivari, piscina aquecida e sauna', phone: '(12) 3669-9600', website: 'http://www.palazzoreale.com.br', tags: ['Flat', 'Capivari'] },
    'hotel-ascona': { name: 'Hotel Ascona', category: 'Hotel', description: 'Pet friendly, piscina ao ar livre', phone: '(11) 91160-4122', website: 'https://hotelascona.com.br/', tags: ['Pet Friendly'] },
    'bendito-cacau': { name: 'Bendito Cacau Resort', category: 'Resort', description: 'Resort com fitness e quadras', phone: '(12) 3669-0777', website: 'https://www.benditocacauresort.com.br/campos', tags: ['Resort'] },
    'quebra-noz': { name: 'Hotel Boutique Quebra-Noz', category: 'Boutique', description: 'Suítes com banheira, spa', phone: '(12) 3663-4889', website: 'https://quebranoz.com.br', tags: ['Boutique', 'Spa'] },
    'dan-inn': { name: 'Hotel Dan Inn Premium', category: 'Rede', description: 'Vila Everest, piscina aquecida', phone: '(12) 3663-3611', website: 'https://www.nacionalinn.com.br/hotel/15/dan-inn-campos-do-jordao/', tags: ['Rede'] },
    'hotel-estoril': { name: 'Hotel Estoril', category: 'Tradicional', description: 'Centro do Capivari, suítes com lareira', phone: '(12) 3669-5000', website: 'https://hotelestoril.com.br/', tags: ['Centro', 'Tradicional'] },
    'le-renard': { name: 'Hotel Le Renard', category: 'Conforto', description: 'Piso aquecido, piscina aquecida', phone: '(12) 3669-2220', website: 'https://lerenard.com.br/', tags: ['Conforto', 'Piscina'] },
    'leao-montanha': { name: 'Hotel Leão da Montanha', category: 'Família', description: 'Infraestrutura completa para famílias', phone: '(12) 3669-8811', website: 'http://www.leaodamontanha.com.br', tags: ['Família', 'Lazer'] },
    'recanto-cristovao': { name: 'Hotel Recanto São Cristóvão', category: 'Resort', description: '250.000 m² de área verde, trilhas e cavalos', phone: '(12) 3662-2888', website: 'http://recantosaocristovao.com.br/', tags: ['Resort', 'Natureza'] },
    'hotel-toriba': { name: 'Hotel Toriba', category: 'Luxo', description: 'Hotel tradicional de luxo, spa completo', phone: '(12) 3668-5008', website: 'https://www.toriba.com.br/', tags: ['Luxo', 'Spa'] },
    'vila-inglesa': { name: 'Hotel Vila Inglesa', category: 'Atividades', description: 'Arvorismo, tirolesa, piscinas', phone: '(12) 3669-5000', website: 'http://www.hotelvilainglesa.com.br', tags: ['Atividades', 'Família'] },
    'le-suisse': { name: 'Le Suisse Elegance Hotel', category: 'Elegância', description: 'Próximo ao Capivari', phone: '(12) 3669-0000', website: 'https://www.lesuissehotel.com.br/', tags: ['Centro', 'Elegância'] },
    'parador': { name: 'Parador Campos do Jordão', category: 'Moderno', description: 'Lofts modernos a 700m do Capivari', phone: '(12) 99630-2478', website: 'https://paradorcamposdojordao.com.br/', tags: ['Moderno', 'Centro'] },
    'alto-boa-vista': { name: 'Pousada Alto da Boa Vista', category: 'Chalé', description: 'Chalés com vista panorâmica', phone: '(12) 99660-3386', website: 'https://pousadaaltodaboavista.com.br/', tags: ['Vista', 'Chalé'] },
    'annecy': { name: 'Pousada Annecy', category: 'Charme', description: 'A 400m do Capivari, enxoval Trussardi', phone: '(12) 3663-3617', website: 'https://www.annecypousada.com.br/', tags: ['Charme', 'Centro'] },
    'chateau-villette': { name: 'Pousada Chateau La Villette', category: 'Luxo', description: 'Suítes luxuosas, restaurante Le Foyer', phone: '(12) 3663-1444', website: 'https://chateaulavillette.com.br/', tags: ['Luxo', 'Gourmet'] },
    'surya-pan': { name: 'Surya-Pan Refúgio Hotel', category: 'Wellness', description: 'Spa, yoga, trilhas, Alto da Boa Vista', phone: '(12) 98847-3655', website: 'https://www.suryapan.com.br/', tags: ['Wellness', 'Spa', 'Natureza'] }
  },

  // FORNECEDORES MICE
  suppliers: [
    { name: 'Buffet Cintra', category: 'Catering' },
    { name: 'Mantiqueira Turismo', category: 'Transportes & Turismo Receptivo' },
    { name: 'CGM Promoeventos', category: 'Produção de eventos' },
    { name: 'DF Studio', category: 'Áudio/Visual e filmagem' },
    { name: 'Manoel Costa Cerimonial', category: 'Cerimonial e assessoria' },
    { name: 'Thomas Fotografia', category: 'Fotografia' },
    { name: 'Campos di Aromas', category: 'Lembranças e brindes' },
    { name: 'Spinassi Chocolates', category: 'Chocolates artesanais' }
  ],

  // FESTIVAL DE INVERNO
  festivalInverno: {
    name: 'Festival de Inverno de Campos do Jordão',
    description: 'Maior evento de música erudita da América Latina. Acontece em julho com concertos no Auditório Claudio Santoro.',
    when: 'Julho (geralmente 2ª quinzena)',
    where: 'Auditório Claudio Santoro e espaços pela cidade',
    highlights: ['Concertos de orquestras', 'Recitais', 'Master classes', 'Apresentações gratuitas'],
    tips: 'Reserve hospedagem com antecedência. Ingressos para concertos principais esgotam rápido.'
  },

  // SITE E NAVEGAÇÃO
  site: {
    name: 'Visite Campos do Jordão - Guia Inteligente',
    url: 'https://visitecamposdojordao.org.br/',
    pages: [
      { id: 'home', title: 'A Cidade', path: '/', description: 'Página inicial com informações sobre Campos do Jordão' },
      { id: 'passeios', title: 'Passeios', path: '/#explore', description: 'Atrações e passeios turísticos' },
      { id: 'ondecomer', title: 'Onde Comer', path: '/#ondecomer', description: 'Restaurantes e gastronomia' },
      { id: 'hospedagens', title: 'Onde Ficar', path: '/#hospedagens', description: 'Hotéis e pousadas' },
      { id: 'eventos', title: 'Eventos & MICE', path: '/#eventos', description: 'Eventos corporativos e Convention Bureau' },
      { id: 'quemsomos', title: 'Quem Somos', path: '/#quemsomos', description: 'Sobre o Convention Bureau' },
      { id: 'associe', title: 'Associe-se', path: 'https://www.visitecamposdojordao.org.br/associados/associe-se/', description: 'Como se tornar associado' }
    ]
  },

  // FAQs COMUNS
  faqs: [
    { q: 'Qual a melhor época para visitar?', a: 'Julho (inverno) é alta temporada para turismo de frio e Festival de Inverno. Primavera e outono têm dias agradáveis e menos multidões.' },
    { q: 'Como chegar?', a: 'De carro pelas rodovias SP-123 ou SP-050. De avião, os aeroportos mais próximos são São José dos Campos (1h30) e Guarulhos (2h30-3h).' },
    { q: 'Preciso de reserva para passeios?', a: 'Recomendado para atrações populares como Baden Baden, Amantikir e restaurantes na alta temporada.' },
    { q: 'Faz muito frio?', a: 'No inverno (junho-agosto) as temperaturas podem chegar perto de 0°C à noite. Leve roupas quentes e agasalhos.' },
    { q: 'Tem neve?', a: 'Neve é muito rara. Pode haver geadas fortes no inverno, mas neve praticamente não ocorre.' },
    { q: 'É bom para crianças?', a: 'Sim! Atrações como Tarundu, Dreams House Park, teleférico e parques são ótimas para famílias.' },
    { q: 'Tem vida noturna?', a: 'Capivari é o centro da vida noturna com bares, restaurantes e música ao vivo, especialmente no inverno.' },
    { q: 'Quanto tempo ficar?', a: 'Recomendamos 3 a 5 dias para conhecer as principais atrações com calma.' }
  ]
};

// =============================================================================
// KEYWORDS E PADRÕES DE DETECÇÃO
// =============================================================================

const KEYWORDS = {
  // Saudações
  greetings: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e ai', 'e aí', 'hey', 'hello', 'hi', 'opa', 'eai', 'fala'],
  
  // Agradecimentos
  thanks: ['obrigado', 'obrigada', 'valeu', 'thanks', 'agradeço', 'grato', 'grata', 'muito obrigado', 'muito obrigada', 'brigado', 'brigada'],
  
  // Cidade e informações gerais
  city: ['cidade', 'campos do jordão', 'campos', 'jordão', 'jordao', 'municipio', 'município'],
  altitude: ['altitude', 'altura', 'metros', 'alto', 'elevação', 'elevacao', 'nivel do mar'],
  location: ['localização', 'localizacao', 'onde fica', 'coordenadas', 'latitude', 'longitude', 'gps'],
  climate: ['clima', 'tempo', 'temperatura', 'frio', 'calor', 'chuva', 'chove', 'inverno', 'verão', 'verao', 'primavera', 'outono', 'geada', 'neve'],
  bestTime: ['melhor época', 'melhor epoca', 'quando visitar', 'quando ir', 'qual época', 'qual epoca', 'alta temporada', 'baixa temporada'],
  transport: ['como chegar', 'transporte', 'carro', 'ônibus', 'onibus', 'avião', 'aviao', 'aeroporto', 'rodovia', 'acesso', 'transfer'],
  
  // Passeios e atrações
  tours: ['passeio', 'passeios', 'atração', 'atracao', 'atrações', 'atracoes', 'turismo', 'visitar', 'conhecer', 'o que fazer', 'programação', 'programacao'],
  nature: ['natureza', 'parque', 'trilha', 'trilhas', 'mata', 'floresta', 'araucária', 'araucaria', 'montanha', 'serra'],
  adventure: ['aventura', 'tirolesa', 'arvorismo', 'escalada', 'trekking', 'radical', 'adrenalina'],
  culture: ['cultura', 'museu', 'museus', 'arte', 'história', 'historia', 'patrimônio', 'patrimonio', 'artesanato'],
  family: ['família', 'familia', 'criança', 'crianca', 'crianças', 'criancas', 'filhos', 'kids', 'infantil'],
  
  // Atrações específicas
  amantikir: ['amantikir', 'amanti', 'jardim', 'jardins'],
  tarundu: ['tarundu'],
  felicia: ['felícia', 'felicia', 'leirner', 'escultura', 'esculturas'],
  baden: ['baden', 'cervejaria', 'cerveja', 'chopp', 'chope'],
  horto: ['horto', 'florestal', 'parque estadual'],
  teleferico: ['teleférico', 'teleferico', 'bondinho'],
  capivari: ['capivari', 'centrinho', 'centro turístico', 'centro turistico'],
  trem: ['trem', 'estrada de ferro', 'maria fumaça', 'maria fumaca', 'ferrovia'],
  palacio: ['palácio', 'palacio', 'boa vista', 'governador'],
  xilogravura: ['xilogravura', 'xilo'],
  pico: ['pico', 'itapeva', 'mirante', 'vista'],
  morro: ['morro', 'elefante'],
  pedra: ['pedra', 'baú', 'bau', 'escalada'],
  iceland: ['iceland', 'gelo', 'bar de gelo'],
  dreams: ['dreams', 'museu de cera', 'miniland'],
  prana: ['prana', 'park'],
  bambui: ['bambuí', 'bambui'],
  lagoinha: ['lagoinha'],
  araucaria: ['araucária', 'araucaria', 'casa araucária'],
  cervejaPark: ['parque da cerveja'],
  maostiqueiras: ['mãostiqueiras', 'maostiqueiras', 'lã', 'la', 'artesanato'],
  
  // Gastronomia
  food: ['comer', 'comida', 'restaurante', 'restaurantes', 'gastronomia', 'onde comer', 'almoço', 'almoco', 'jantar', 'café', 'cafe', 'refeição', 'refeicao'],
  fondue: ['fondue', 'fondues', 'queijo', 'chocolate quente'],
  truta: ['truta', 'trutas', 'peixe'],
  chocolate: ['chocolate', 'chocolates', 'chocolateria', 'doce', 'doces'],
  cafeteria: ['cafeteria', 'café', 'cafe', 'confeitaria', 'bolo', 'bolos'],
  italiana: ['italiana', 'italiano', 'massa', 'massas', 'pizza', 'pizzas', 'cantina'],
  suica: ['suíça', 'suica', 'suíço', 'suico', 'alpino'],
  alemã: ['alemã', 'alema', 'alemão', 'alemao', 'germânica', 'germanica'],
  churrasco: ['churrasco', 'carne', 'carnes', 'grelhado', 'grelhados', 'bbq'],
  
  // Hospedagem
  hotel: ['hotel', 'hotéis', 'hoteis', 'hospedagem', 'hospedagens', 'onde ficar', 'dormir', 'estadia', 'acomodação', 'acomodacao'],
  pousada: ['pousada', 'pousadas'],
  luxo: ['luxo', 'luxuoso', 'premium', 'cinco estrelas', '5 estrelas', 'sofisticado'],
  economico: ['econômico', 'economico', 'barato', 'em conta', 'custo benefício', 'custo beneficio'],
  spa: ['spa', 'wellness', 'bem estar', 'massagem', 'relaxar', 'relaxamento'],
  familia: ['família', 'familia', 'crianças', 'criancas', 'familiar'],
  romantico: ['romântico', 'romantico', 'casal', 'lua de mel'],
  petFriendly: ['pet', 'pets', 'cachorro', 'cão', 'cao', 'animal', 'animais'],
  
  // Convention Bureau e Eventos
  convention: ['convention', 'bureau', 'convention bureau'],
  eventos: ['evento', 'eventos', 'congresso', 'conferência', 'conferencia', 'reunião', 'reuniao', 'workshop', 'seminário', 'seminario'],
  mice: ['mice', 'corporativo', 'corporativos', 'empresarial', 'empresariais', 'incentivo', 'incentivos'],
  associar: ['associar', 'associe', 'associado', 'associados', 'filiar', 'membro', 'parceiro', 'parceria'],
  rfp: ['rfp', 'proposta', 'propostas', 'orçamento', 'orcamento', 'cotação', 'cotacao'],
  fornecedor: ['fornecedor', 'fornecedores', 'catering', 'buffet', 'audiovisual', 'audio visual', 'transporte', 'cerimonial', 'fotografia', 'filmagem'],
  
  // Festival de Inverno
  festival: ['festival', 'festival de inverno', 'música clássica', 'musica classica', 'erudita', 'concerto', 'concertos', 'orquestra', 'sinfônica', 'sinfonica'],
  
  // Site e navegação
  site: ['site', 'página', 'pagina', 'navegação', 'navegacao', 'menu', 'seção', 'secao'],
  contato: ['contato', 'telefone', 'email', 'e-mail', 'whatsapp', 'falar com', 'ligar'],
  
  // Emergência
  emergencia: ['emergência', 'emergencia', 'polícia', 'policia', 'bombeiro', 'bombeiros', 'samu', 'hospital', 'urgência', 'urgencia', 'socorro'],
  
  // Perguntas gerais
  whatIs: ['o que é', 'o que e', 'qual é', 'qual e', 'quem é', 'quem e'],
  howTo: ['como', 'de que forma', 'de que maneira'],
  where: ['onde', 'aonde', 'qual lugar', 'em que lugar'],
  when: ['quando', 'que horas', 'horário', 'horario', 'funcionamento'],
  howMuch: ['quanto', 'preço', 'preco', 'valor', 'custo', 'custa'],
  tips: ['dica', 'dicas', 'sugestão', 'sugestao', 'sugestões', 'sugestoes', 'recomendação', 'recomendacao', 'recomende', 'indica', 'indicação', 'indicacao']
};

// =============================================================================
// FUNÇÕES DE DETECÇÃO E RESPOSTA
// =============================================================================

const SESSIONS = {};

function matchKeywords(text, keywordList) {
  const lower = text.toLowerCase();
  return keywordList.some(kw => lower.includes(kw));
}

function findBestMatch(text, options) {
  const lower = text.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;
  
  for (const [key, data] of Object.entries(options)) {
    const searchTerms = [key, data.title || data.name || ''].join(' ').toLowerCase();
    const words = searchTerms.split(/\s+/);
    let score = 0;
    for (const word of words) {
      if (word.length > 2 && lower.includes(word)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = { key, data };
    }
  }
  
  return bestScore > 0 ? bestMatch : null;
}

function generateRichResponse(prompt, tone, kbOverride, history) {
  const m = (prompt || '').toLowerCase().trim();
  
  // Handle empty or very short input
  if (m.length < 2) {
    return {
      text: `Olá! Sou o Guia Virtual de Campos do Jordão. Como posso ajudar? Pergunte sobre passeios, restaurantes, hospedagem, eventos ou como se associar ao Convention Bureau!`,
      actions: [
        { label: 'Ver Passeios', url: '/#explore' },
        { label: 'Onde Comer', url: '/#ondecomer' },
        { label: 'Onde Ficar', url: '/#hospedagens' }
      ]
    };
  }

  // =========================================================================
  // SAUDAÇÕES
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.greetings) && m.length < 30) {
    return {
      text: `Olá! 👋 Bem-vindo ao Guia Virtual de Campos do Jordão!\n\nSou seu assistente turístico e posso ajudar com:\n• 🏔️ Passeios e atrações\n• 🍽️ Restaurantes e gastronomia\n• 🏨 Hotéis e pousadas\n• 🎪 Eventos e Convention Bureau\n• ℹ️ Informações sobre a cidade\n\nO que gostaria de saber?`,
      actions: [
        { label: '🏔️ Passeios', url: '/#explore' },
        { label: '🍽️ Onde Comer', url: '/#ondecomer' },
        { label: '🏨 Onde Ficar', url: '/#hospedagens' },
        { label: '🎪 Eventos', url: '/#eventos' }
      ]
    };
  }

  // =========================================================================
  // AGRADECIMENTOS
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.thanks)) {
    return {
      text: `De nada! 😊 Fico feliz em ajudar!\n\nSe tiver mais dúvidas sobre Campos do Jordão, é só perguntar. Tenha uma excelente viagem! 🏔️`,
      actions: [
        { label: 'Voltar ao Início', url: '/' }
      ]
    };
  }

  // =========================================================================
  // EMERGÊNCIA
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.emergencia)) {
    return {
      text: `📞 **Números de Emergência em Campos do Jordão:**\n\n• 🚔 **Polícia:** 190\n• 🚒 **Bombeiros:** 193\n• 🚑 **SAMU:** 192\n\nPara informações não-emergenciais, consulte a Prefeitura ou o site oficial do turismo.`,
      actions: []
    };
  }

  // =========================================================================
  // ALTITUDE E LOCALIZAÇÃO
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.altitude)) {
    return {
      text: `🏔️ **Altitude de Campos do Jordão**\n\nA cidade está a aproximadamente **${KB.city.altitude_m} metros** acima do nível do mar, sendo uma das cidades mais altas do Brasil.\n\nIsso resulta em:\n• Temperaturas mais baixas que o litoral e capital\n• Noites frias mesmo no verão\n• Clima seco no inverno\n• Ar mais puro e rarefeito\n\n💡 **Dica:** Pessoas com problemas respiratórios podem sentir a diferença. Hidrate-se bem!`,
      actions: [
        { label: 'Sobre a Cidade', url: '/' },
        { label: 'Como Chegar', url: '/' }
      ]
    };
  }

  if (matchKeywords(m, KEYWORDS.location)) {
    return {
      text: `📍 **Localização de Campos do Jordão**\n\n• **Estado:** São Paulo\n• **Região:** Serra da Mantiqueira\n• **Área:** ${KB.city.area_km2} km²\n• **População:** ${KB.city.population}\n• **Coordenadas:** ${KB.city.coordinates.lat}, ${KB.city.coordinates.lng}\n\n🚗 **Como Chegar:**\n${KB.city.transport.main_access}\n\n✈️ **Aeroportos próximos:**\n${KB.city.transport.airports.join('\n')}`,
      actions: [
        { label: 'Ver no Mapa', url: '/#explore' }
      ]
    };
  }

  // =========================================================================
  // CLIMA E MELHOR ÉPOCA
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.climate) || matchKeywords(m, KEYWORDS.bestTime)) {
    const hasNeve = m.includes('neve');
    const hasFrio = m.includes('frio');
    
    let response = `🌡️ **Clima em Campos do Jordão**\n\n${KB.city.climate}\n\n`;
    
    if (hasNeve) {
      response += `❄️ **Sobre neve:** Neve é extremamente rara em Campos do Jordão. Pode haver geadas fortes no inverno (junho-agosto), mas neve praticamente não ocorre.\n\n`;
    }
    
    if (hasFrio || m.includes('inverno')) {
      response += `🧥 **Inverno (junho-agosto):**\n• Temperaturas de 0°C a 15°C\n• Noites muito frias, possível geada\n• Dias ensolarados e secos\n• Alta temporada turística\n\n`;
    }
    
    response += `📅 **Melhor época para visitar:**\n${KB.city.best_times}\n\n💡 **Dica:** Leve roupas em camadas e agasalhos mesmo no verão, pois as noites são frias.`;
    
    return {
      text: response,
      actions: [
        { label: 'Festival de Inverno', url: '/#eventos' },
        { label: 'Onde Ficar', url: '/#hospedagens' }
      ]
    };
  }

  // =========================================================================
  // TRANSPORTE - COMO CHEGAR
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.transport)) {
    return {
      text: `🚗 **Como Chegar a Campos do Jordão**\n\n**De carro:**\n${KB.city.transport.main_access}\n\n**De avião:**\n${KB.city.transport.airports.map(a => `• ${a}`).join('\n')}\n\n**Transporte público:**\n${KB.city.transport.public}\n\n💡 **Dicas:**\n• Na alta temporada (julho), trânsito pode ser intenso\n• Alugar carro facilita visitar atrações fora do centro\n• Transfer particular é opção confortável do aeroporto`,
      actions: [
        { label: 'Ver Hospedagens', url: '/#hospedagens' },
        { label: 'Mapa da Cidade', url: '/#explore' }
      ]
    };
  }

  // =========================================================================
  // CONVENTION BUREAU E ASSOCIAÇÃO
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.associar)) {
    return {
      text: `🤝 **Como se Associar ao Convention Bureau**\n\n${KB.convention.howToAssociate}\n\n**Benefícios de ser associado:**\n${KB.convention.benefits.map(b => `• ${b}`).join('\n')}\n\n📧 **Contato:**\n• Email: ${KB.convention.email}\n• Telefone: ${KB.convention.phone}\n• Site: ${KB.convention.associateUrl}`,
      actions: [
        { label: '📝 Associe-se Agora', url: KB.convention.associateUrl },
        { label: '📧 Enviar Email', url: `mailto:${KB.convention.email}` }
      ]
    };
  }

  if (matchKeywords(m, KEYWORDS.convention) || matchKeywords(m, KEYWORDS.mice) || matchKeywords(m, KEYWORDS.eventos)) {
    return {
      text: `🎪 **${KB.convention.name}**\n\n${KB.convention.description}\n\n**Serviços oferecidos:**\n${KB.convention.services.map(s => `• ${s}`).join('\n')}\n\n**Contato:**\n• 📧 ${KB.convention.email}\n• 📞 ${KB.convention.phone}\n• 📍 ${KB.convention.address}`,
      actions: [
        { label: '📝 Solicitar Proposta', url: KB.convention.associateUrl },
        { label: '📧 Enviar Email', url: `mailto:${KB.convention.email}` },
        { label: 'Ver Fornecedores', url: '/#eventos' }
      ]
    };
  }

  if (matchKeywords(m, KEYWORDS.fornecedor) || matchKeywords(m, KEYWORDS.rfp)) {
    const fornecedores = KB.suppliers.map(f => `• **${f.name}** - ${f.category}`).join('\n');
    return {
      text: `📋 **Fornecedores para Eventos em Campos do Jordão**\n\n${fornecedores}\n\n💡 Para solicitar propostas (RFP), envie para ${KB.convention.email}:\n• Datas do evento\n• Número de participantes\n• Formato do evento\n• Necessidades técnicas`,
      actions: [
        { label: '📧 Solicitar RFP', url: `mailto:${KB.convention.email}?subject=Solicitação de RFP` },
        { label: 'Convention Bureau', url: '/#eventos' }
      ]
    };
  }

  // =========================================================================
  // FESTIVAL DE INVERNO
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.festival)) {
    return {
      text: `🎼 **${KB.festivalInverno.name}**\n\n${KB.festivalInverno.description}\n\n📅 **Quando:** ${KB.festivalInverno.when}\n📍 **Onde:** ${KB.festivalInverno.where}\n\n**Destaques:**\n${KB.festivalInverno.highlights.map(h => `• ${h}`).join('\n')}\n\n💡 **Dica:** ${KB.festivalInverno.tips}`,
      actions: [
        { label: 'Auditório Claudio Santoro', url: KB.attractions['claudio-santoro'].website },
        { label: 'Onde Ficar', url: '/#hospedagens' }
      ]
    };
  }

  // =========================================================================
  // ATRAÇÕES ESPECÍFICAS
  // =========================================================================
  
  // Amantikir
  if (matchKeywords(m, KEYWORDS.amantikir)) {
    const attr = KB.attractions.amantikir;
    return {
      text: `🌸 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n📞 **Telefone:** ${attr.phone}\n🕐 **Horário:** ${attr.hours}\n\n💡 **Dica:** ${attr.tips}`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Outros Passeios', url: '/#explore' }
      ]
    };
  }

  // Tarundu
  if (matchKeywords(m, KEYWORDS.tarundu)) {
    const attr = KB.attractions.tarundu;
    return {
      text: `🎢 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n📞 **Telefone:** ${attr.phone}\n🕐 **Horário:** ${attr.hours}\n\n💡 **Dica:** Ótimo para famílias! Confira limites de idade e altura para cada atividade.`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Outros Passeios', url: '/#explore' }
      ]
    };
  }

  // Felícia Leirner / Claudio Santoro
  if (matchKeywords(m, KEYWORDS.felicia)) {
    const museu = KB.attractions['felicia-leirner'];
    const audit = KB.attractions['claudio-santoro'];
    return {
      text: `🎨 **${museu.title}**\n\n${museu.description}\n\n📍 **Endereço:** ${museu.address}\n📞 **Telefone:** ${museu.phone}\n🕐 **Horário:** ${museu.hours}\n\n🎼 No mesmo complexo fica o **${audit.title}**, principal palco do Festival de Inverno.`,
      actions: [
        { label: '🌐 Site do Museu', url: museu.website },
        { label: 'Festival de Inverno', url: '/#eventos' }
      ]
    };
  }

  // Baden Baden
  if (matchKeywords(m, KEYWORDS.baden)) {
    const attr = KB.attractions['baden-baden'];
    return {
      text: `🍺 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n📞 **Telefone:** ${attr.phone}\n🕐 **Horário:** ${attr.hours}\n\n💡 **Dica:** Reserve o tour com antecedência na alta temporada!`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Outros Restaurantes', url: '/#ondecomer' }
      ]
    };
  }

  // Horto Florestal
  if (matchKeywords(m, KEYWORDS.horto)) {
    const attr = KB.attractions.horto;
    return {
      text: `🌲 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n🕐 **Horário:** ${attr.hours}\n\n💡 **Dica:** ${attr.tips}`,
      actions: [
        { label: '📸 Instagram', url: attr.instagram },
        { label: 'Outros Passeios', url: '/#explore' }
      ]
    };
  }

  // Teleférico / Morro do Elefante
  if (matchKeywords(m, KEYWORDS.teleferico) || matchKeywords(m, KEYWORDS.morro)) {
    return {
      text: `🚡 **Teleférico de Campos do Jordão**\n\n${KB.attractions.teleferico.description}\n\nO teleférico sobe até o **Morro do Elefante**, que oferece:\n• Vista panorâmica da cidade\n• Lojas de artesanato\n• Restaurantes\n• Acesso também por carro\n\n📍 **Localização:** Parque Capivari\n💡 **Dica:** ${KB.attractions.teleferico.tips}`,
      actions: [
        { label: 'Parque Capivari', url: 'https://parquecapivari.com.br/' },
        { label: 'Outros Passeios', url: '/#explore' }
      ]
    };
  }

  // Capivari
  if (matchKeywords(m, KEYWORDS.capivari)) {
    const attr = KB.attractions['parque-capivari'];
    return {
      text: `🎡 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n\n**O que encontrar:**\n• Teleférico para o Morro do Elefante\n• Pedalinhos no lago\n• Restaurantes e bares\n• Lojas e boutiques\n• Vida noturna animada\n\n💡 Base ideal para hospedagem e explorar a cidade!`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Onde Ficar no Capivari', url: '/#hospedagens' }
      ]
    };
  }

  // Pico do Itapeva
  if (matchKeywords(m, KEYWORDS.pico)) {
    const attr = KB.attractions['pico-do-itapeva'];
    return {
      text: `⛰️ **${attr.title}**\n\n${attr.description}\n\n💡 **Dica:** ${attr.tips}`,
      actions: [
        { label: 'Prana Park (próximo)', url: 'https://pranapark.com.br/' },
        { label: 'Outros Passeios', url: '/#explore' }
      ]
    };
  }

  // Pedra do Baú
  if (matchKeywords(m, KEYWORDS.pedra)) {
    const attr = KB.attractions['pedra-do-bau'];
    return {
      text: `🧗 **${attr.title}**\n\n${attr.description}\n\n⚠️ **Importante:** Trilha desafiadora que requer preparo físico.\n\n💡 **Dicas:**\n${attr.tips}`,
      actions: [
        { label: 'Passeios de Aventura', url: '/#explore' }
      ]
    };
  }

  // Iceland
  if (matchKeywords(m, KEYWORDS.iceland)) {
    const attr = KB.attractions.iceland;
    return {
      text: `❄️ **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n\n💡 **Dica:** A visita dura cerca de 20-30 minutos. Casacos e luvas são fornecidos!`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Outros Passeios', url: '/#explore' }
      ]
    };
  }

  // Dreams House Park
  if (matchKeywords(m, KEYWORDS.dreams)) {
    const attr = KB.attractions['dreams-house-park'];
    return {
      text: `🎭 **${attr.title}**\n\n${attr.description}\n\n💡 Ótimo para fotos divertidas e passeio em família!`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Outros Passeios', url: '/#explore' }
      ]
    };
  }

  // Trem / Estrada de Ferro
  if (matchKeywords(m, KEYWORDS.trem)) {
    const attr = KB.attractions.efcj;
    return {
      text: `🚂 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n📞 **Telefone:** ${attr.phone}\n\n⚠️ **Status:** ${attr.status}`,
      actions: [
        { label: 'Outros Passeios', url: '/#explore' }
      ]
    };
  }

  // Palácio Boa Vista
  if (matchKeywords(m, KEYWORDS.palacio)) {
    const attr = KB.attractions['palacio-boa-vista'];
    return {
      text: `🏛️ **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n📞 **Telefone:** ${attr.phone}`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Outros Passeios Culturais', url: '/#explore' }
      ]
    };
  }

  // Casa da Xilogravura
  if (matchKeywords(m, KEYWORDS.xilogravura)) {
    const attr = KB.attractions['casa-xilogravura'];
    return {
      text: `🎨 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n📞 **Telefone:** ${attr.phone}`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Outros Museus', url: '/#explore' }
      ]
    };
  }

  // Prana Park
  if (matchKeywords(m, KEYWORDS.prana)) {
    const attr = KB.attractions['prana-park'];
    return {
      text: `🏔️ **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}`,
      actions: [
        { label: '🌐 Site Oficial', url: attr.website },
        { label: 'Passeios de Aventura', url: '/#explore' }
      ]
    };
  }

  // =========================================================================
  // GASTRONOMIA - GERAL E ESPECÍFICA
  // =========================================================================
  
  // Fondue
  if (matchKeywords(m, KEYWORDS.fondue)) {
    return {
      text: `🧀 **Restaurantes de Fondue em Campos do Jordão**\n\nFondue é um clássico da cidade! Sugestões:\n\n• **${KB.restaurants['villa-montese'].name}** - ${KB.restaurants['villa-montese'].specialty}\n• **${KB.restaurants['cantinho-suico'].name}** - ${KB.restaurants['cantinho-suico'].specialty}\n• **${KB.restaurants.nevada.name}** - ${KB.restaurants.nevada.specialty}\n• **${KB.restaurants.mana.name}** - ${KB.restaurants.mana.specialty}\n• **${KB.restaurants.trattoria.name}** - ${KB.restaurants.trattoria.specialty}\n\n💡 **Dica:** Reserve com antecedência na alta temporada!`,
      actions: [
        { label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }
      ]
    };
  }

  // Truta
  if (matchKeywords(m, KEYWORDS.truta)) {
    return {
      text: `🐟 **Restaurantes de Truta em Campos do Jordão**\n\nA truta é criada localmente e é um dos pratos típicos! Experimente em:\n\n• **${KB.restaurants.matterhorn.name}** - ${KB.restaurants.matterhorn.specialty}\n• **${KB.restaurants['villa-montese'].name}** - ${KB.restaurants['villa-montese'].specialty}\n• **${KB.restaurants.mana.name}** - ${KB.restaurants.mana.specialty}`,
      actions: [
        { label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }
      ]
    };
  }

  // Chocolate
  if (matchKeywords(m, KEYWORDS.chocolate)) {
    return {
      text: `🍫 **Chocolaterias em Campos do Jordão**\n\nA cidade é famosa pelos chocolates artesanais!\n\n• **${KB.restaurants['sabor-chocolate'].name}** - ${KB.restaurants['sabor-chocolate'].address}\n• **Spinassi Chocolates** - Chocolates artesanais tradicionais\n• **Casa Sabor Chocolate** - Pousada e chocolateria temática\n\n💡 Não deixe de levar chocolates como lembrança!`,
      actions: [
        { label: 'Ver Gastronomia', url: '/#ondecomer' }
      ]
    };
  }

  // Café / Cafeteria
  if (matchKeywords(m, KEYWORDS.cafeteria)) {
    return {
      text: `☕ **Cafeterias e Confeitarias**\n\n• **${KB.restaurants['sans-souci'].name}** - ${KB.restaurants['sans-souci'].specialty}\n• **${KB.restaurants['bam-bam-cafe'].name}** - ${KB.restaurants['bam-bam-cafe'].specialty}\n• **${KB.restaurants.tapiti.name}** - ${KB.restaurants.tapiti.specialty}\n\n💡 Ótimas opções para café da tarde com vista!`,
      actions: [
        { label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }
      ]
    };
  }

  // Italiana
  if (matchKeywords(m, KEYWORDS.italiana)) {
    return {
      text: `🍝 **Restaurantes Italianos**\n\n• **${KB.restaurants['nonna-mimi'].name}** - ${KB.restaurants['nonna-mimi'].specialty}\n  📍 ${KB.restaurants['nonna-mimi'].address}\n  📞 ${KB.restaurants['nonna-mimi'].phone}\n\n• **${KB.restaurants.trattoria.name}** - ${KB.restaurants.trattoria.specialty}\n  📍 ${KB.restaurants.trattoria.address}`,
      actions: [
        { label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }
      ]
    };
  }

  // Cervejaria
  if (m.includes('cerveja') || m.includes('chopp') || m.includes('chope') || m.includes('cervejaria')) {
    return {
      text: `🍺 **Cervejarias em Campos do Jordão**\n\nA cidade é um polo de cervejas artesanais!\n\n• **${KB.restaurants['baden-rest'].name}**\n  ${KB.restaurants['baden-rest'].specialty}\n  📍 ${KB.restaurants['baden-rest'].address}\n\n• **${KB.restaurants['cervejaria-luss'].name}**\n  ${KB.restaurants['cervejaria-luss'].specialty}\n  📍 ${KB.restaurants['cervejaria-luss'].address}\n\n• **${KB.restaurants['alto-brasa'].name}**\n  ${KB.restaurants['alto-brasa'].specialty}\n\n• **${KB.restaurants['caras-malte'].name}**\n  ${KB.restaurants['caras-malte'].specialty}`,
      actions: [
        { label: 'Parque da Cerveja', url: 'https://cervejacamposdojordao.com.br/' },
        { label: 'Baden Baden', url: 'https://www.badenbaden.com.br/' }
      ]
    };
  }

  // Churrasco
  if (matchKeywords(m, KEYWORDS.churrasco)) {
    return {
      text: `🥩 **Restaurantes de Carnes e Grelhados**\n\n• **${KB.restaurants.churrasco.name}** - ${KB.restaurants.churrasco.specialty}\n• **${KB.restaurants['art-bbq'].name}** - ${KB.restaurants['art-bbq'].specialty}\n• **${KB.restaurants['cantinho-serra'].name}** - ${KB.restaurants['cantinho-serra'].specialty}`,
      actions: [
        { label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }
      ]
    };
  }

  // Gastronomia Geral
  if (matchKeywords(m, KEYWORDS.food)) {
    const restos = Object.values(KB.restaurants).slice(0, 10).map(r => `• **${r.name}** - ${r.specialty}`).join('\n');
    return {
      text: `🍽️ **Gastronomia em Campos do Jordão**\n\nA cidade oferece culinária variada: fondues, trutas, massas, cervejas artesanais e muito mais!\n\n**Alguns destaques:**\n${restos}\n\n💡 **Dica:** Na alta temporada, reserve com antecedência!`,
      actions: [
        { label: 'Ver Todos os Restaurantes', url: '/#ondecomer' },
        { label: 'Fondues', url: '/#ondecomer' },
        { label: 'Cervejarias', url: '/#ondecomer' }
      ]
    };
  }

  // =========================================================================
  // HOSPEDAGEM
  // =========================================================================
  
  // Luxo
  if (matchKeywords(m, KEYWORDS.luxo) && matchKeywords(m, KEYWORDS.hotel.concat(KEYWORDS.pousada))) {
    return {
      text: `✨ **Hospedagens de Luxo em Campos do Jordão**\n\n• **${KB.hotels['hotel-toriba'].name}**\n  ${KB.hotels['hotel-toriba'].description}\n  📞 ${KB.hotels['hotel-toriba'].phone}\n\n• **${KB.hotels['chateau-villette'].name}**\n  ${KB.hotels['chateau-villette'].description}\n  📞 ${KB.hotels['chateau-villette'].phone}\n\n• **${KB.hotels['quebra-noz'].name}**\n  ${KB.hotels['quebra-noz'].description}\n  📞 ${KB.hotels['quebra-noz'].phone}`,
      actions: [
        { label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }
      ]
    };
  }

  // Spa / Wellness
  if (matchKeywords(m, KEYWORDS.spa)) {
    return {
      text: `🧘 **Hospedagens com Spa e Wellness**\n\n• **${KB.hotels['surya-pan'].name}**\n  ${KB.hotels['surya-pan'].description}\n  📞 ${KB.hotels['surya-pan'].phone}\n\n• **${KB.hotels['hotel-toriba'].name}**\n  ${KB.hotels['hotel-toriba'].description}\n  📞 ${KB.hotels['hotel-toriba'].phone}\n\n• **${KB.hotels['chrys-wellness'].name}**\n  ${KB.hotels['chrys-wellness'].description}\n  📞 ${KB.hotels['chrys-wellness'].phone}`,
      actions: [
        { label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }
      ]
    };
  }

  // Família
  if ((matchKeywords(m, KEYWORDS.familia) || matchKeywords(m, KEYWORDS.family)) && matchKeywords(m, KEYWORDS.hotel.concat(KEYWORDS.pousada))) {
    return {
      text: `👨‍👩‍👧‍👦 **Hospedagens para Famílias**\n\n• **${KB.hotels['leao-montanha'].name}**\n  ${KB.hotels['leao-montanha'].description}\n  📞 ${KB.hotels['leao-montanha'].phone}\n\n• **${KB.hotels['vila-inglesa'].name}**\n  ${KB.hotels['vila-inglesa'].description}\n  📞 ${KB.hotels['vila-inglesa'].phone}\n\n• **${KB.hotels['recanto-cristovao'].name}**\n  ${KB.hotels['recanto-cristovao'].description}\n  📞 ${KB.hotels['recanto-cristovao'].phone}`,
      actions: [
        { label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }
      ]
    };
  }

  // Pet Friendly
  if (matchKeywords(m, KEYWORDS.petFriendly)) {
    return {
      text: `🐕 **Hospedagens Pet Friendly**\n\n• **${KB.hotels['hotel-ascona'].name}**\n  ${KB.hotels['hotel-ascona'].description}\n  📞 ${KB.hotels['hotel-ascona'].phone}\n\n💡 **Dica:** Sempre confirme as políticas de pets diretamente com o hotel.`,
      actions: [
        { label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }
      ]
    };
  }

  // Romântico
  if (matchKeywords(m, KEYWORDS.romantico)) {
    return {
      text: `💕 **Hospedagens Românticas**\n\n• **${KB.hotels['chateau-villette'].name}**\n  ${KB.hotels['chateau-villette'].description}\n\n• **${KB.hotels['quebra-noz'].name}**\n  ${KB.hotels['quebra-noz'].description}\n\n• **${KB.hotels.annecy.name}**\n  ${KB.hotels.annecy.description}\n\n💡 Muitas pousadas oferecem pacotes especiais para casais!`,
      actions: [
        { label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }
      ]
    };
  }

  // Hospedagem Geral
  if (matchKeywords(m, KEYWORDS.hotel) || matchKeywords(m, KEYWORDS.pousada)) {
    const hoteisList = Object.values(KB.hotels).slice(0, 8).map(h => `• **${h.name}** (${h.category}) - ${h.description.substring(0, 50)}...`).join('\n');
    return {
      text: `🏨 **Hospedagens em Campos do Jordão**\n\nA cidade oferece opções para todos os gostos e bolsos:\n\n${hoteisList}\n\n💡 **Dica:** Reserve com antecedência na alta temporada (julho)!`,
      actions: [
        { label: 'Ver Todas as Hospedagens', url: '/#hospedagens' },
        { label: 'Hotéis de Luxo', url: '/#hospedagens' },
        { label: 'Pousadas Românticas', url: '/#hospedagens' }
      ]
    };
  }

  // =========================================================================
  // PASSEIOS GERAIS
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.tours) || matchKeywords(m, KEYWORDS.nature) || matchKeywords(m, KEYWORDS.adventure)) {
    return {
      text: `🏔️ **Passeios em Campos do Jordão**\n\n**🌿 Natureza:**\n• Parque Amantikir - jardins temáticos\n• Horto Florestal - trilhas e araucárias\n• Pico do Itapeva - mirante a 2.030m\n\n**🎢 Lazer:**\n• Tarundu - parque de aventuras\n• Parque Capivari - teleférico e compras\n• Iceland - bar de gelo\n\n**🎨 Cultura:**\n• Museu Felícia Leirner\n• Palácio Boa Vista\n• Casa da Xilogravura\n\n**🍺 Gastronomia:**\n• Cervejaria Baden Baden\n• Parque da Cerveja\n\n💡 Pergunte sobre qualquer atração para mais detalhes!`,
      actions: [
        { label: 'Ver Todos os Passeios', url: '/#explore' },
        { label: 'Mapa Interativo', url: '/#explore' }
      ]
    };
  }

  // Passeios para família/crianças
  if (matchKeywords(m, KEYWORDS.family)) {
    return {
      text: `👨‍👩‍👧‍👦 **Passeios para Famílias com Crianças**\n\n• **Tarundu** - Parque de aventuras com +35 atrações\n• **Dreams House Park** - Museu de cera e Miniland\n• **Teleférico** - Passeio até o Morro do Elefante\n• **Parque Capivari** - Pedalinhos e área de lazer\n• **Parque Amantikir** - Jardins e labirintos\n• **Iceland** - Bar de gelo (crianças adoram!)\n\n💡 **Dica:** Verifique idade mínima para atividades de aventura!`,
      actions: [
        { label: 'Ver Passeios', url: '/#explore' },
        { label: 'Hotéis para Famílias', url: '/#hospedagens' }
      ]
    };
  }

  // =========================================================================
  // SITE E NAVEGAÇÃO
  // =========================================================================
  if (matchKeywords(m, KEYWORDS.site)) {
    const pages = KB.site.pages.map(p => `• **${p.title}** - ${p.description}`).join('\n');
    return {
      text: `🌐 **Navegação do Site**\n\n${pages}\n\n💡 Use o menu superior para navegar entre as seções!`,
      actions: KB.site.pages.slice(0, 4).map(p => ({ label: p.title, url: p.path }))
    };
  }

  // Contato
  if (matchKeywords(m, KEYWORDS.contato)) {
    return {
      text: `📞 **Contatos**\n\n**Convention Bureau de Campos do Jordão:**\n• 📧 Email: ${KB.convention.email}\n• 📞 Telefone: ${KB.convention.phone}\n• 📍 Endereço: ${KB.convention.address}\n• 🌐 Site: ${KB.convention.website}\n\n**Emergências:**\n• 🚔 Polícia: 190\n• 🚒 Bombeiros: 193\n• 🚑 SAMU: 192`,
      actions: [
        { label: '📧 Enviar Email', url: `mailto:${KB.convention.email}` },
        { label: '🌐 Site Oficial', url: KB.convention.website }
      ]
    };
  }

  // =========================================================================
  // FAQs
  // =========================================================================
  for (const faq of KB.faqs) {
    const faqKeywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3);
    if (faqKeywords.some(kw => m.includes(kw))) {
      return {
        text: `❓ **${faq.q}**\n\n${faq.a}`,
        actions: [
          { label: 'Mais Perguntas', url: '/' }
        ]
      };
    }
  }

  // =========================================================================
  // BUSCA EM ATRAÇÕES
  // =========================================================================
  const attrMatch = findBestMatch(m, KB.attractions);
  if (attrMatch) {
    const attr = attrMatch.data;
    let response = `📍 **${attr.title}**\n\n${attr.description}\n\n`;
    if (attr.address) response += `📍 **Endereço:** ${attr.address}\n`;
    if (attr.phone) response += `📞 **Telefone:** ${attr.phone}\n`;
    if (attr.hours) response += `🕐 **Horário:** ${attr.hours}\n`;
    if (attr.tips) response += `\n💡 **Dica:** ${attr.tips}`;
    
    return {
      text: response,
      actions: attr.website ? [{ label: '🌐 Site Oficial', url: attr.website }] : [{ label: 'Outros Passeios', url: '/#explore' }]
    };
  }

  // =========================================================================
  // BUSCA EM RESTAURANTES
  // =========================================================================
  const restoMatch = findBestMatch(m, KB.restaurants);
  if (restoMatch) {
    const resto = restoMatch.data;
    let response = `🍽️ **${resto.name}**\n\n${resto.specialty}\n\n`;
    if (resto.address) response += `📍 **Endereço:** ${resto.address}\n`;
    if (resto.phone) response += `📞 **Telefone:** ${resto.phone}\n`;
    
    return {
      text: response,
      actions: resto.website ? [{ label: '🌐 Site', url: resto.website }] : [{ label: 'Outros Restaurantes', url: '/#ondecomer' }]
    };
  }

  // =========================================================================
  // BUSCA EM HOTÉIS
  // =========================================================================
  const hotelMatch = findBestMatch(m, KB.hotels);
  if (hotelMatch) {
    const hotel = hotelMatch.data;
    let response = `🏨 **${hotel.name}**\n\n${hotel.description}\n\n`;
    if (hotel.phone) response += `📞 **Telefone:** ${hotel.phone}\n`;
    if (hotel.tags) response += `🏷️ **Tags:** ${hotel.tags.join(', ')}\n`;
    
    return {
      text: response,
      actions: hotel.website ? [{ label: '🌐 Site', url: hotel.website }] : [{ label: 'Outras Hospedagens', url: '/#hospedagens' }]
    };
  }

  // =========================================================================
  // RESPOSTA PADRÃO (FALLBACK INTELIGENTE)
  // =========================================================================
  return {
    text: `Olá! Sou o Guia Virtual de **Campos do Jordão** 🏔️\n\nPosso ajudar com informações sobre:\n\n• 🏔️ **Passeios** - Amantikir, Tarundu, Horto Florestal...\n• 🍽️ **Gastronomia** - Restaurantes, fondues, trutas, cervejarias...\n• 🏨 **Hospedagem** - Hotéis, pousadas, resorts...\n• 🎪 **Eventos** - Convention Bureau, MICE, fornecedores...\n• ℹ️ **Informações** - Clima, como chegar, dicas...\n\n**Exemplos de perguntas:**\n• "Quais os melhores restaurantes de fondue?"\n• "Como me associar ao Convention Bureau?"\n• "O que fazer com crianças?"\n• "Qual a melhor época para visitar?"\n\nComo posso ajudar você hoje?`,
    actions: [
      { label: '🏔️ Passeios', url: '/#explore' },
      { label: '🍽️ Onde Comer', url: '/#ondecomer' },
      { label: '🏨 Onde Ficar', url: '/#hospedagens' },
      { label: '🤝 Associe-se', url: KB.convention.associateUrl }
    ]
  };
}

// =============================================================================
// SERVIDOR HTTP
// =============================================================================

function extractUserQuestion(prompt) {
  try {
    if (!prompt || typeof prompt !== 'string') return prompt;
    const markers = ['pergunta do usuário:', 'pergunta do usuario:', 'user question:', 'usuario:'];
    const low = prompt.toLowerCase();
    for (const m of markers) {
      const idx = low.indexOf(m);
      if (idx !== -1) {
        const after = prompt.slice(idx + m.length).trim();
        const cutAt = after.search(/---|STRUTURED_SITE_CONTENT_START|STRUTURED_SITE_CONTENT_END|$/i);
        if (cutAt > 0) return after.slice(0, cutAt).trim();
        return after;
      }
    }
    return prompt;
  } catch (e) {
    return prompt;
  }
}

const server = http.createServer(async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/generate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const prompt = payload.prompt || payload.text || '';
        const tone = payload.tone || undefined;
        const sessionId = payload.sessionId || payload.session || null;
        
        let history = null;
        if (sessionId) {
          history = SESSIONS[sessionId] || [];
        }
        
        const userQ = extractUserQuestion(prompt);
        
        if (history && sessionId) {
          history.push({ role: 'user', text: userQ });
          SESSIONS[sessionId] = history;
        }
        
        console.log(`[${new Date().toISOString()}] Pergunta: "${userQ.substring(0, 100)}..."`);
        
        const result = generateRichResponse(userQ, tone, null, history);
        
        if (history && sessionId && result && typeof result.text === 'string') {
          history.push({ role: 'model', text: result.text });
          SESSIONS[sessionId] = history;
        }
        
        console.log(`[${new Date().toISOString()}] Resposta gerada com ${result.text.length} caracteres`);
        
        res.writeHead(200, headers);
        res.end(JSON.stringify(result), 'utf8');
      } catch (e) {
        console.error('Erro:', e);
        res.writeHead(400, headers);
        res.end(JSON.stringify({ error: 'invalid json' }));
      }
    });
    return;
  }

  res.writeHead(404, headers);
  res.end(JSON.stringify({ error: 'not found' }));
});

server.on('error', (err) => console.error('Server error:', err));
server.on('listening', () => console.log(`\n🤖 Guia Virtual de Campos do Jordão - Mock AI Server\n📍 Listening on http://127.0.0.1:${PORT}/generate\n`));
server.listen(PORT, '127.0.0.1');
