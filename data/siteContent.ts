const SITE_CONTENT = {
  site: {
    name: "Visite Campos do Jordão - Guia Inteligente",
    url: "https://visitecamposdojordao.org.br/",
    description:
      "Portal de divulgação turística de Campos do Jordão com guias de passeios, gastronomia, hospedagem e serviços para eventos (MICE).",
    pages: [
      { id: "home", title: "A Cidade", path: "/" },
      { id: "passeios", title: "Passeios", path: "/#explore" },
      { id: "ondecomer", title: "Onde Comer", path: "/#ondecomer" },
      { id: "hospedagens", title: "Onde Ficar", path: "/#hospedagens" },
      { id: "eventos", title: "Eventos & MICE", path: "/#eventos" },
      { id: "quemsomos", title: "Quem Somos", path: "/#quemsomos" },
      { id: "associe", title: "Associe-se", path: "https://www.visitecamposdojordao.org.br/associados/associe-se/" }
    ]
  },
  city: {
    name: "Campos do Jordão",
    state: "São Paulo",
    country: "Brasil",
    altitude_m: 1628,
    coordinates: { lat: -22.739, lng: -45.588 },
    area_km2: 278.6,
    population_estimate: "aprox. 50.000 habitantes (varia com sazonalidade)",
    history:
      "Desenvolvida como estância climática desde o início do século XX, Campos do Jordão consolidou-se como destino de montanha e polo cultural.",
    transport: {
      main_access: "Rodovias SP-123 (via Pindamonhangaba) e SP-050; viagens de carro são a forma mais comum.",
      nearest_airports: ["São José dos Campos (SJK) ~1h30", "Guarulhos (GRU) ~2h30-3h por rodovia"],
      public_transit: "Linhas de ônibus intermunicipais e serviços de transfer / vans em alta temporada."
    },
    climate:
      "Clima de altitude: verões com chuvas de tarde e temperaturas amenas; invernos frios, com noites geladas e possibilidade de geadas.",
    best_times:
      "Julho (alta temporada de inverno) para turismo de frio; primavera e outono são ideais para quem busca clima ameno e menos movimento."
  },
  convention: {
    name: "Convention Bureau de Campos do Jordão",
    description:
      "O convention bureau intermedia e apoia a realização de eventos, conectando organizadores a fornecedores locais, rede hoteleira, espaços e serviços MICE (meetings, incentives, conferences, exhibitions).",
    contacts: {
      website: "https://www.visitecamposdojordao.org.br/associados/associe-se/",
      email: "contato@visitecamposdojordao.org.br",
      phone: "(12) 3662-0000",
      address: "Av. Dr. Luis Arrobas Martins, s/n - Alto da Boa Vista"
    },
    services: [
      "RFPs e propostas personalizadas",
      "Conexão com rede hoteleira e fornecedores (catering, áudio/visual, transporte)",
      "Visitas técnicas (site inspections)",
      "Material técnico: fichas de salas, plantas, capacidades e imagens",
      "Apoio em logística local e autorizações municipais"
    ],
    howToRequest:
      "Solicitações via formulário no site ou e-mail corporativo: enviar datas, número estimado de participantes, formato do evento e necessidades técnicas para receber propostas e opções de fornecedores locais."
  },
  attractions: [
    {
      id: "amantikir",
      title: "Parque Amantikir",
      category: "Natureza",
      description:
        "Jardins temáticos com paisagismo artístico, esculturas, labirintos e mirantes — excelente para fotos, caminhadas leves e contato com a natureza.",
      address: "Rod. Campos do Jordão - Gavião Gonzaga",
      phone: "(12) 3664-2000",
      website: "https://parqueamantikir.com.br/",
      hours: "09:00 - 17:00 (sujeito a alterações)",
      tips: "Visite no início da manhã; ideal para fotografia. Verifique ingressos e pacotes com guias locais."
    },
    {
      id: "felicia-leirner",
      title: "Museu Felícia Leirner",
      category: "Cultura",
      description:
        "Museu ao ar livre com obras escultóricas integradas à paisagem e programação cultural no Auditório Claudio Santoro.",
      address: "Av. Dr. Luis Arrobas Martins, 1880 – Alto Boa Vista",
      phone: "(12) 3662 6000",
      website: "https://www.museufelicialeirner.org.br/",
      hours: "09:00 - 17:00",
      tips: "Combine com visita ao Auditório; verifique agenda de concertos e exposições temporárias."
    },
    {
      id: "horto",
      title: "Horto Florestal (Parque Estadual)",
      category: "Natureza",
      description:
        "Área protegida com trilhas, mirantes e amostras de fauna e flora da Serra da Mantiqueira.",
      address: "Parque Estadual de Campos do Jordão",
      phone: null,
      website: null,
      hours: "08:00 - 17:00",
      tips: "Use roupas e calçados adequados; leve água e evite trilhas em dias de chuva."
    },
    {
      id: "baden-baden",
      title: "Cervejaria Baden Baden",
      category: "Gastronomia",
      description:
        "Cervejaria com tour, loja e restaurante — experiência gastronômica local muito procurada.",
      address: "Av. Matheus Costa Pinto, 1653 – Vila Santa Cruz",
      phone: "(12) 3664 2004",
      website: "https://www.badenbaden.com.br/",
      hours: "10:00 - 18:00",
      tips: "Reserve o tour e restaurante em alta temporada; ideal para grupos e eventos pequenos."
    },
    {
      id: "tarundu",
      title: "Tarundu",
      category: "Lazer",
      description:
        "Parque de aventuras com atividades para crianças e adultos — tirolesa, arvorismo e infraestrutura para grupos.",
      address: "Av. José Antonio Manso, 1515",
      phone: "(12) 3800 0150",
      website: "http://tarundu.com.br/",
      hours: "09:00 - 18:00",
      tips: "Ótimo para famílias; confira limites de idade e altura para cada atividade."
    },
    {
      id: "parque-capivari",
      title: "Capivari (Centro Turístico)",
      category: "Lazer",
      description:
        "Bairro central com comércio, bares, restaurantes, teleférico e eventos sazonais.",
      address: "Capivari",
      phone: null,
      website: "https://parquecapivari.com.br/",
      hours: "Área pública - 24h; atrações variam",
      tips: "Base ideal para hospedagem e vida noturna; caminhe pelas ruas e aproveite cafés e lojas."
    },
    {
      id: "efcj",
      title: "Estrada de Ferro Campos do Jordão",
      category: "Lazer",
      description:
        "Passeios de trem turístico entre estações históricas, com paisagens da Serra da Mantiqueira.",
      address: "Estação Emílio Ribas – Capivari",
      phone: "(12) 3644-7408",
      website: null,
      hours: "Consultar operadora",
      tips: "Compre bilhetes com antecedência em feriados e finais de semana."
    }
  ],
  hotels: [
    { id: "hotel-toriba", name: "Hotel Toriba", category: "Tradicional / Luxo", phone: "(12) 3662-9000", website: "https://www.toriba.com.br/" },
    { id: "parque-hotel", name: "Parque Hotel", category: "Hotel", phone: "(12) 3644-1234", website: null },
    { id: "le-renard", name: "Hotel Le Renard", category: "Pousada / Boutique", phone: "(12) 3644-4321", website: null },
    { id: "vila-inglesa", name: "Hotel Vila Inglesa", category: "Hotel", phone: "(12) 3662-3333", website: null },
    { id: "recanto-sao-cristovao", name: "Recanto São Cristóvão", category: "Pousada", phone: "(12) 3662-4545", website: null }
  ],
  restaurants: [
    { id: 'nonna_mimi', name: 'Cantina Nonna Mimi', specialty: 'Comida italiana tradicional', address: 'Avenida Doutor Januário Miráglia, 2438 - Vila Telma', phone: '(12) 3662-3522', website: 'http://www.nonnamimi.com.br', image: '/images/gastronomia/nonna_mimi.jpg' },
    { id: 'caras_malte', name: 'Caras de Malte', specialty: 'Bar & microcervejaria', address: 'Av. Pedro Paulo, 1500 - Descansópolis', phone: null, website: null, image: '/images/gastronomia/caras_malte.jpg' },
    { id: 'baden', name: 'Choperia Baden Baden', specialty: 'Cervejaria e pratos alemães', address: 'Rua Djalma Forfaz, 93, loja 10 - Capivari', phone: '(12) 3664 2004', website: 'https://www.badenbaden.com.br/', image: '/images/gastronomia/baden.jpg' },
    { id: 'tapiti', name: 'Tapiti Confeitaria & Brunch', specialty: 'Cafeteria e brunch', address: 'Est. Municipal Aurora Nogueira Barros Vasconcellos, 100', phone: null, website: null, image: '/images/gastronomia/tapiti.jpg' },
    { id: 'iceland', name: 'Iceland', specialty: 'Bar temático 100% gelo', address: 'R. Eng. Diogo José de Carvalho, 190 - Capivari', phone: null, website: null, image: '/images/gastronomia/iceland.jpg' },
    { id: 'villa_montese', name: 'Villa Montese Bar & Ristorante', specialty: 'Fondues e trutas', address: 'Av. Macedo Soares, 508 - Vila Capivari', phone: null, website: null, image: '/images/gastronomia/villa_montese.jpg' },
    { id: 'ludwig', name: 'Ludwig Restaurant', specialty: 'Alta gastronomia', address: 'Rua Aristides de Souza Mello, 50 - Capivari', phone: null, website: null, image: '/images/gastronomia/ludwig.jpg' },
    { id: 'matterhorn', name: 'Matterhorn Empório e Restaurante', specialty: 'Trutas e pratos suíços', address: 'Rua Djalma Forfaz, 93 - Praça do Capivari', phone: null, website: null, image: '/images/gastronomia/matterhorn.jpg' },
    { id: 'le_foyer', name: 'Le Foyer - Chateau La Villette', specialty: 'Cozinha franco-suíça', address: 'Rua Cantídio Pereira de Castro, 100 - Vila Everest', phone: null, website: null, image: '/images/gastronomia/le_foyer.jpg' },
    { id: 'mana', name: 'Restaurante Maná', specialty: 'Trutas, fondues e carnes', address: 'Av. Macedo Soares, 187 - Capivari', phone: null, website: null, image: '/images/gastronomia/mana.jpg' },
    { id: 'mercearia', name: 'Restaurante Mercearia Campos', specialty: 'Refeições descontraídas', address: 'Rua Vitor Godinho, 25 - Capivari', phone: null, website: null, image: '/images/gastronomia/mercearia.jpg' },
    { id: 'tainakan', name: 'Tainakan - Tarundu', specialty: 'Buffet e pizzas', address: 'Av. José Antônio Manso, 1515 - Parque Tarundu', phone: null, website: null, image: '/images/gastronomia/tainakan.jpg' },
    { id: 'vilacha', name: 'Vila Chã', specialty: 'Gastronomia lusitana', address: 'Av. Pedro Paulo, 7545 - Descansópolis', phone: null, website: null, image: '/images/gastronomia/vilacha.jpg' },
    { id: 'villa_gourmet', name: 'Villa Gourmet', specialty: 'Cozinha contemporânea', address: 'Av. Macedo Soares, 203 - Capivari', phone: null, website: null, image: '/images/gastronomia/villa_gourmet.jpg' },
    { id: 'sans_souci', name: 'Sans Souci Confeitaria & Café', specialty: 'Cafeteria e confeitaria', address: 'Av. Dr. Januário Miraglia, 3.260 - Jaguaribe', phone: null, website: null, image: '/images/gastronomia/sans_souci.jpg' },
    { id: 'trattoria', name: 'Trattoria Salvador', specialty: 'Massas e fondues', address: 'Av. Macedo Soares, 489 - Capivari', phone: null, website: null, image: '/images/gastronomia/trattoria.jpg' },
    { id: 'churrasco', name: 'Churrasco ao Vivo', specialty: 'Grelhados especiais', address: 'Rua Doutor Heitor Penteado, 82 - Campos do Jordão', phone: null, website: null, image: '/images/gastronomia/churrasco.jpg' },
    { id: 'cantinho_suico', name: 'Cantinho Suíço', specialty: 'Fondue e culinária suíça', address: 'Av. Macedo Soares, 457 - Capivari', phone: null, website: null, image: '/images/gastronomia/cantinho_suico.jpg' },
    { id: 'cantinho_serra', name: 'Cantinho da Serra Grill', specialty: 'Cozinha mineira e cortes', address: 'Av. Macedo Soares, 457 - Capivari', phone: null, website: null, image: '/images/gastronomia/cantinho_serra.jpg' },
    { id: 'bella_vista', name: 'Bella Vista Restaurante', specialty: 'Carta de vinhos e vista', address: 'Alameda Pérolas, 182 - Morro do Elefante', phone: null, website: null, image: '/images/gastronomia/bella_vista.jpg' },
    { id: 'art_bbq', name: 'Restaurante Art BBQ', specialty: 'Grelhados e vista', address: 'Rua 5, 308 - Vila Floresta', phone: null, website: null, image: '/images/gastronomia/art_bbq.jpg' },
    { id: 'dona_chica', name: 'Dona Chica Capivari', specialty: 'Gastronomia afetiva', address: 'Parque Capivari - R. Eng. Diogo José de Carvalho, 1291', phone: null, website: null, image: '/images/gastronomia/dona_chica.jpg' },
    { id: 'bam_bam', name: 'Bam Bam Café', specialty: 'Cafés e bolos', address: 'Rua Djalma Forfaz, 103 - Capivari', phone: null, website: null, image: '/images/gastronomia/bam_bam.jpg' },
    { id: 'emporio', name: 'Empório dos Mellos', specialty: 'Produtos artesanais', address: 'R. Elídio Gonçalves da Silva, 1800', phone: null, website: null, image: '/images/gastronomia/emporio.jpg' },
    { id: 'sabor_chocolate', name: 'Sabor Chocolate', specialty: 'Chocolateria tradicional', address: 'Rua Djalma Forfaz, 103 - Capivari', phone: null, website: null, image: '/images/gastronomia/sabor_chocolate.jpg' },
    { id: 'luss', name: 'Cervejaria Luss', specialty: 'Biergarten e petiscos', address: 'Av. Sen. Roberto Simonsen, 1724 - Vila Inglesa', phone: null, website: null, image: '/images/gastronomia/luss.jpg' },
    { id: 'alto_brasa', name: 'Alto da Brasa Brew Kitchen', specialty: 'Beer & Grill', address: 'Parque da Cerveja - Estr Mun Paulo Costa Lenz Cesar, 2150', phone: null, website: null, image: '/images/gastronomia/alto_brasa.jpg' },
    { id: 'paris_station', name: 'Restaurante Paris Station', specialty: 'Gastronomia de qualidade', address: 'Rua Djalma Forfaz, 263', phone: null, website: null, image: '/images/gastronomia/paris_station.jpg' },
    { id: 'nevada', name: 'Restaurante Nevada', specialty: 'Fondues e pratos clássicos', address: 'Avenida Macedo Soares, 159 - Capivari', phone: null, website: null, image: '/images/gastronomia/nevada.jpg' }
  ],
  suppliers: [
    { id: "buffet-cintra", name: "Buffet Cintra", category: "Catering", phone: null, website: null, email: null },
    { id: "mantiqueira-turismo", name: "Mantiqueira Turismo", category: "Transportes & Turismo Receptivo", phone: null, website: null, email: null },
    { id: "cgm-promoeventos", name: "CGM Promoeventos", category: "Produção de eventos", phone: null, website: null, email: null },
    { id: "df-studio", name: "DF Studio", category: "Áudio/Visual e filmagem", phone: null, website: null, email: null },
    { id: "manoel-costa-cerimonial", name: "Manoel Costa Cerimonial", category: "Cerimonial e assessoria", phone: null, website: null, email: null },
    { id: "thomas-fotografia", name: "Thomas Fotografia", category: "Fotografia", phone: null, website: null, email: null },
    { id: "campos-di-aromas", name: "Campos di Aromas", category: "Lembranças e brindes", phone: null, website: null, email: null },
    { id: "spinassi-chocolates", name: "Spinassi Chocolates", category: "Chocolates artesanais", phone: null, website: null, email: null }
  ],
  associados: [
    { id: "assoc-toriba", name: "Hotel Toriba", category: "Hotel", phone: "(12) 3662-9000", website: "https://www.toriba.com.br/", email: null },
    { id: "assoc-parque-hotel", name: "Parque Hotel", category: "Hotel", phone: "(12) 3644-1234", website: null, email: null },
    { id: "assoc-baden", name: "Cervejaria Baden Baden", category: "Restaurante / Cervejaria", phone: "(12) 3664 2004", website: "https://www.badenbaden.com.br/", email: null },
    { id: "assoc-amantikir", name: "Parque Amantikir", category: "Atração", phone: "(12) 3664-2000", website: "https://parqueamantikir.com.br/", email: null }
  ],
  pocketbook: {
    description:
      "Guia de bolso com mapa turístico, contatos úteis e roteiro sugerido. Disponível para download ou mediante solicitação via formulário no site oficial.",
    download_url: "https://www.visitecamposdojordao.org.br/pocketbook.pdf",
    howToGet:
      "Baixe diretamente do site ou solicite envio por e-mail ao Convention Bureau informando nome, empresa e tipo de evento."
  },
  rfp_templates: [
    {
      id: "rfp-basic",
      title: "Modelo RFP - Básico",
      description:
        "Template simples para solicitação de propostas (datas, número de participantes, estruturas básicas).",
      download: "https://www.visitecamposdojordao.org.br/templates/rfp-basic.docx"
    },
    {
      id: "rfp-mice",
      title: "Checklist MICE",
      description: "Checklist com itens técnicos e logísticos para eventos MICE.",
      download: "https://www.visitecamposdojordao.org.br/templates/rfp-mice.docx"
    }
  ],
  faqs: [
    {
      q: "Qual a melhor época para visitar?",
      a: "Julho (inverno) é alta temporada para turismo de frio; primavera e outono têm dias agradáveis e menos multidões."
    },
    {
      q: "Como chegar?",
      a: "Acesso por rodovias estaduais, ônibus interestadual até a rodoviária local ou transfer aéreo até aeroportos próximos seguido de transfer rodoviário."
    },
    {
      q: "Preciso de reserva para passeios?",
      a: "Algumas atrações e tours (ex.: Baden Baden, Amantikir) recomendam reserva antecipada, especialmente na alta temporada."
    },
    {
      q: "Quais são os números de emergência?",
      a: "Polícia: 190; Bombeiros: 193; SAMU: 192. Para informações locais, consulte a prefeitura e o site oficial."
    }
  ],
  seo: {
    keywords: [
      "Campos do Jordão",
      "passeios",
      "hospedagem",
      "onde comer",
      "eventos",
      "convention bureau",
      "turismo de inverno"
    ]
  }
};

export default SITE_CONTENT;
