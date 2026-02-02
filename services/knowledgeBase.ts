// =============================================================================
// BASE DE CONHECIMENTO COMPLETA - CAMPOS DO JORDÃO
// =============================================================================

export const KB = {
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
    },
    'ducha-de-prata': {
      title: 'Ducha de Prata',
      category: 'Natureza',
      description: 'Queda d\'água natural canalizada em várias duchas. Ponto tradicional da cidade, gratuito e refrescante.',
      address: 'Av. Roberto Simonsen – Vila Inglesa',
      tips: 'Leve toalha se quiser se molhar!'
    },
    'borboletario': {
      title: 'Borboletário Flores que Voam',
      category: 'Natureza',
      description: 'Espaço dedicado a borboletas com mais de 35 espécies. Educativo e encantador para crianças.',
      address: 'Estrada do Horto Florestal',
      website: 'https://floresquevoam.com.br/'
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
    'nevada': { name: 'Nevada', specialty: 'Fondues e pratos clássicos', address: 'Av. Macedo Soares, 159 - Capivari' },
    'harry-pisek': { name: 'Harry Pisek', specialty: 'Confeitaria tradicional desde 1958', address: 'Capivari' },
    'casa-do-malte': { name: 'Casa do Malte', specialty: 'Cervejas especiais e petiscos', address: 'Capivari' },
    'araucaria-grill': { name: 'Araucária Grill', specialty: 'Carnes nobres e parrilla', address: 'Av. Macedo Soares - Capivari' }
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
    'quebra-noz': { name: 'Hotel Boutique Quebra-Noz', category: 'Boutique', description: 'Suítes com banheira, spa', phone: '(12) 3663-4889', website: 'https://quebranoz.com.br', tags: ['Boutique', 'Spa', 'Romântico'] },
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
    'chateau-villette': { name: 'Pousada Chateau La Villette', category: 'Luxo', description: 'Suítes luxuosas, restaurante Le Foyer', phone: '(12) 3663-1444', website: 'https://chateaulavillette.com.br/', tags: ['Luxo', 'Gourmet', 'Romântico'] },
    'surya-pan': { name: 'Surya-Pan Refúgio Hotel', category: 'Wellness', description: 'Spa, yoga, trilhas, Alto da Boa Vista', phone: '(12) 98847-3655', website: 'https://www.suryapan.com.br/', tags: ['Wellness', 'Spa', 'Natureza'] },
    'grande-hotel': { name: 'Grande Hotel Campos do Jordão', category: 'Histórico', description: 'Hotel histórico com arquitetura inglesa', phone: '(12) 3662-1566', website: 'https://www.grandehotelcamposdojordao.com.br/', tags: ['Histórico', 'Tradicional'] },
    'frontenac': { name: 'Hotel Frontenac', category: 'Tradicional', description: 'Tradição e conforto no Alto do Capivari', phone: '(12) 3669-1000', website: 'https://www.frontenac.com.br/', tags: ['Tradicional', 'Centro'] }
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
    { q: 'Quanto tempo ficar?', a: 'Recomendamos 3 a 5 dias para conhecer as principais atrações com calma.' },
    { q: 'Precisa de carro?', a: 'Recomendado, mas não obrigatório. O centro (Capivari) é walkable, mas um carro ajuda a visitar atrações mais distantes.' },
    { q: 'É caro?', a: 'Campos tem opções para todos os bolsos. Alta temporada (julho) tem preços mais altos. Baixa temporada oferece ótimo custo-benefício.' }
  ]
};

// =============================================================================
// KEYWORDS E PADRÕES DE DETECÇÃO
// =============================================================================

export const KEYWORDS = {
  // Saudações
  greetings: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e ai', 'e aí', 'hey', 'hello', 'hi', 'opa', 'eai', 'fala', 'iae', 'salve'],
  
  // Agradecimentos
  thanks: ['obrigado', 'obrigada', 'valeu', 'thanks', 'agradeço', 'agradeco', 'grato', 'grata', 'muito obrigado', 'muito obrigada', 'brigado', 'brigada', 'vlw'],
  
  // Cidade e informações gerais
  city: ['cidade', 'campos do jordão', 'campos', 'jordão', 'jordao', 'municipio', 'município'],
  altitude: ['altitude', 'altura', 'metros', 'alto', 'elevação', 'elevacao', 'nivel do mar', 'nível do mar'],
  location: ['localização', 'localizacao', 'onde fica', 'coordenadas', 'latitude', 'longitude', 'gps', 'mapa'],
  climate: ['clima', 'tempo', 'temperatura', 'frio', 'calor', 'chuva', 'chove', 'inverno', 'verão', 'verao', 'primavera', 'outono', 'geada', 'neve', 'graus', 'quente'],
  bestTime: ['melhor época', 'melhor epoca', 'quando visitar', 'quando ir', 'qual época', 'qual epoca', 'alta temporada', 'baixa temporada', 'época', 'epoca'],
  transport: ['como chegar', 'transporte', 'carro', 'ônibus', 'onibus', 'avião', 'aviao', 'aeroporto', 'rodovia', 'acesso', 'transfer', 'sp-123', 'sp-050', 'estrada'],
  
  // Passeios e atrações
  tours: ['passeio', 'passeios', 'atração', 'atracao', 'atrações', 'atracoes', 'turismo', 'visitar', 'conhecer', 'o que fazer', 'programação', 'programacao', 'pontos turísticos', 'pontos turisticos'],
  nature: ['natureza', 'parque', 'trilha', 'trilhas', 'mata', 'floresta', 'araucária', 'araucaria', 'montanha', 'serra', 'cachoeira', 'rio'],
  adventure: ['aventura', 'tirolesa', 'arvorismo', 'escalada', 'trekking', 'radical', 'adrenalina', 'rapel'],
  culture: ['cultura', 'museu', 'museus', 'arte', 'história', 'historia', 'patrimônio', 'patrimonio', 'artesanato', 'exposição', 'exposicao'],
  family: ['família', 'familia', 'criança', 'crianca', 'crianças', 'criancas', 'filhos', 'kids', 'infantil', 'bebê', 'bebe'],
  
  // Atrações específicas
  amantikir: ['amantikir', 'amanti', 'jardim', 'jardins'],
  tarundu: ['tarundu'],
  felicia: ['felícia', 'felicia', 'leirner', 'escultura', 'esculturas'],
  baden: ['baden', 'cervejaria baden', 'tour cerveja'],
  horto: ['horto', 'florestal', 'parque estadual'],
  teleferico: ['teleférico', 'teleferico', 'bondinho'],
  capivari: ['capivari', 'centrinho', 'centro turístico', 'centro turistico'],
  trem: ['trem', 'estrada de ferro', 'maria fumaça', 'maria fumaca', 'ferrovia', 'efcj'],
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
  maostiqueiras: ['mãostiqueiras', 'maostiqueiras', 'lã', 'la natural', 'artesanato'],
  ducha: ['ducha', 'prata', 'ducha de prata'],
  borboletario: ['borboletário', 'borboletario', 'borboleta', 'borboletas'],
  
  // Gastronomia
  food: ['comer', 'comida', 'restaurante', 'restaurantes', 'gastronomia', 'onde comer', 'almoço', 'almoco', 'jantar', 'café', 'cafe', 'refeição', 'refeicao', 'fome', 'ceia'],
  fondue: ['fondue', 'fondues', 'queijo derretido'],
  truta: ['truta', 'trutas', 'peixe'],
  chocolate: ['chocolate', 'chocolates', 'chocolateria', 'doce', 'doces', 'cacau'],
  cafeteria: ['cafeteria', 'café', 'cafe', 'confeitaria', 'bolo', 'bolos', 'torta', 'tortas', 'brunch'],
  italiana: ['italiana', 'italiano', 'massa', 'massas', 'pizza', 'pizzas', 'cantina', 'macarrão', 'macarrao'],
  suica: ['suíça', 'suica', 'suíço', 'suico', 'alpino', 'suiça'],
  alema: ['alemã', 'alema', 'alemão', 'alemao', 'germânica', 'germanica', 'salsicha', 'schnitzel'],
  churrasco: ['churrasco', 'carne', 'carnes', 'grelhado', 'grelhados', 'bbq', 'picanha', 'costela'],
  cerveja: ['cerveja', 'cervejas', 'cervejaria', 'chopp', 'chope', 'artesanal', 'brew'],
  vinho: ['vinho', 'vinhos', 'enoteca', 'carta de vinhos'],
  
  // Hospedagem
  hotel: ['hotel', 'hotéis', 'hoteis', 'hospedagem', 'hospedagens', 'onde ficar', 'dormir', 'estadia', 'acomodação', 'acomodacao', 'pernoite'],
  pousada: ['pousada', 'pousadas'],
  chale: ['chalé', 'chale', 'chalés', 'chales', 'cabana', 'cabin'],
  resort: ['resort', 'resorts', 'all inclusive'],
  luxo: ['luxo', 'luxuoso', 'premium', 'cinco estrelas', '5 estrelas', 'sofisticado'],
  economico: ['econômico', 'economico', 'barato', 'em conta', 'custo benefício', 'custo beneficio', 'budget'],
  spa: ['spa', 'wellness', 'bem estar', 'massagem', 'relaxar', 'relaxamento', 'sauna', 'hidromassagem'],
  romantico: ['romântico', 'romantico', 'casal', 'lua de mel', 'namorados', 'bodas'],
  petFriendly: ['pet', 'pets', 'cachorro', 'cão', 'cao', 'animal', 'animais', 'dog friendly'],
  piscina: ['piscina', 'piscina aquecida'],
  lareira: ['lareira', 'lareiras', 'aquecimento'],
  
  // Convention Bureau e Eventos
  convention: ['convention', 'bureau', 'convention bureau'],
  eventos: ['evento', 'eventos', 'congresso', 'conferência', 'conferencia', 'reunião', 'reuniao', 'workshop', 'seminário', 'seminario'],
  mice: ['mice', 'corporativo', 'corporativos', 'empresarial', 'empresariais', 'incentivo', 'incentivos'],
  associar: ['associar', 'associe', 'associado', 'associados', 'filiar', 'membro', 'parceiro', 'parceria'],
  rfp: ['rfp', 'proposta', 'propostas', 'orçamento', 'orcamento', 'cotação', 'cotacao'],
  fornecedor: ['fornecedor', 'fornecedores', 'catering', 'buffet', 'audiovisual', 'audio visual', 'transporte', 'cerimonial', 'fotografia', 'filmagem', 'decoração', 'decoracao'],
  casamento: ['casamento', 'casamentos', 'noiva', 'noivo', 'bodas', 'celebração', 'celebracao'],
  
  // Festival de Inverno
  festival: ['festival', 'festival de inverno', 'música clássica', 'musica classica', 'erudita', 'concerto', 'concertos', 'orquestra', 'sinfônica', 'sinfonica'],
  
  // Site e navegação
  site: ['site', 'página', 'pagina', 'navegação', 'navegacao', 'menu', 'seção', 'secao', 'portal'],
  contato: ['contato', 'telefone', 'email', 'e-mail', 'whatsapp', 'falar com', 'ligar', 'endereço', 'endereco'],
  
  // Emergência
  emergencia: ['emergência', 'emergencia', 'polícia', 'policia', 'bombeiro', 'bombeiros', 'samu', 'hospital', 'urgência', 'urgencia', 'socorro', 'upa', 'pronto socorro'],
  
  // Roteiros
  roteiro: ['roteiro', 'roteiros', 'itinerário', 'itinerario', 'quantos dias', 'fim de semana', 'fds', 'final de semana'],
  
  // Compras
  compras: ['compras', 'loja', 'lojas', 'shopping', 'souvenir', 'lembrança', 'lembrancinha', 'presente'],
  
  // Vida noturna
  noturna: ['noite', 'noturna', 'balada', 'bar', 'bares', 'música ao vivo', 'musica ao vivo', 'happy hour']
};

export function matchKeywords(text: string, keywordList: string[]): boolean {
  const lower = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return keywordList.some(kw => lower.includes(kw));
}

export function findBestMatch(text: string, options: Record<string, any>): { key: string; data: any } | null {
  const lower = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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
