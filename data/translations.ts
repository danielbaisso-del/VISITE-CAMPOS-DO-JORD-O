/**
 * Traduções dos dados de atrações e hospedagens
 * Translations for attractions and accommodations data
 */

import { Language } from '../contexts/LanguageContext';

// ============================================
// Tipos / Types
// ============================================

export interface TranslatedContent {
  title?: string;
  name?: string;
  description: string;
  status?: string;
}

export type TranslationsMap = {
  [key: string]: {
    pt: TranslatedContent;
    en: TranslatedContent;
    es: TranslatedContent;
  };
};

// ============================================
// Categorias / Categories
// ============================================

export const categoryTranslations: Record<string, Record<Language, string>> = {
  'Cultura': { pt: 'Cultura', en: 'Culture', es: 'Cultura' },
  'Natureza': { pt: 'Natureza', en: 'Nature', es: 'Naturaleza' },
  'Lazer': { pt: 'Lazer', en: 'Leisure', es: 'Ocio' },
  'Gastronomia': { pt: 'Gastronomia', en: 'Gastronomy', es: 'Gastronomía' },
  'Aventura': { pt: 'Aventura', en: 'Adventure', es: 'Aventura' },
  'Artesanato': { pt: 'Artesanato', en: 'Handicrafts', es: 'Artesanía' },
  'Experiência': { pt: 'Experiência', en: 'Experience', es: 'Experiencia' },
  'Hospedagem': { pt: 'Hospedagem', en: 'Accommodation', es: 'Alojamiento' },
};

// ============================================
// Tags de Hospedagens / Accommodation Tags
// ============================================

export const tagTranslations: Record<string, Record<Language, string>> = {
  'Hotel': { pt: 'Hotel', en: 'Hotel', es: 'Hotel' },
  'Centro': { pt: 'Centro', en: 'Downtown', es: 'Centro' },
  'Boutique': { pt: 'Boutique', en: 'Boutique', es: 'Boutique' },
  'Wellness': { pt: 'Wellness', en: 'Wellness', es: 'Bienestar' },
  'Piscina': { pt: 'Piscina', en: 'Pool', es: 'Piscina' },
  'Flat': { pt: 'Flat', en: 'Flat', es: 'Flat' },
  'Alto Capivari': { pt: 'Alto Capivari', en: 'Upper Capivari', es: 'Alto Capivari' },
  'Capivari': { pt: 'Capivari', en: 'Capivari', es: 'Capivari' },
  'Pet Friendly': { pt: 'Pet Friendly', en: 'Pet Friendly', es: 'Acepta Mascotas' },
  'Resort': { pt: 'Resort', en: 'Resort', es: 'Resort' },
  'Spa': { pt: 'Spa', en: 'Spa', es: 'Spa' },
  'Rede': { pt: 'Rede', en: 'Chain', es: 'Cadena' },
  'Vila Everest': { pt: 'Vila Everest', en: 'Everest Village', es: 'Vila Everest' },
  'Tradicional': { pt: 'Tradicional', en: 'Traditional', es: 'Tradicional' },
  'Conforto': { pt: 'Conforto', en: 'Comfort', es: 'Confort' },
  'Familia': { pt: 'Família', en: 'Family', es: 'Familia' },
  'Natureza': { pt: 'Natureza', en: 'Nature', es: 'Naturaleza' },
  'Luxo': { pt: 'Luxo', en: 'Luxury', es: 'Lujo' },
  'Atividades': { pt: 'Atividades', en: 'Activities', es: 'Actividades' },
  'Elegância': { pt: 'Elegância', en: 'Elegance', es: 'Elegancia' },
  'Moderno': { pt: 'Moderno', en: 'Modern', es: 'Moderno' },
  'Vista': { pt: 'Vista', en: 'View', es: 'Vista' },
  'Chalé': { pt: 'Chalé', en: 'Chalet', es: 'Chalet' },
  'Charme': { pt: 'Charme', en: 'Charm', es: 'Encanto' },
  'Temático': { pt: 'Temático', en: 'Themed', es: 'Temático' },
  'Romântico': { pt: 'Romântico', en: 'Romantic', es: 'Romántico' },
  'Gourmet': { pt: 'Gourmet', en: 'Gourmet', es: 'Gourmet' },
  'Família': { pt: 'Família', en: 'Family', es: 'Familia' },
  'Aconchegante': { pt: 'Aconchegante', en: 'Cozy', es: 'Acogedor' },
  'Econômico': { pt: 'Econômico', en: 'Budget', es: 'Económico' },
  'Simples': { pt: 'Simples', en: 'Simple', es: 'Simple' },
  'Room Service': { pt: 'Room Service', en: 'Room Service', es: 'Servicio a la Habitación' },
  'Premium': { pt: 'Premium', en: 'Premium', es: 'Premium' },
  'Design': { pt: 'Design', en: 'Design', es: 'Diseño' },
};

// ============================================
// Atrações / Attractions
// ============================================

export const tourTranslations: TranslationsMap = {
  'claudio-santoro': {
    pt: {
      title: 'Auditório Claudio Santoro',
      description: 'Principal palco do maior evento da música erudita da América Latina, o Auditório Claudio Santoro foi inaugurado em 1979 e seu nome é uma homenagem ao maestro falecido nesse mesmo ano, primeiro regente titular da Orquestra Sinfônica de Brasília.',
    },
    en: {
      title: 'Claudio Santoro Auditorium',
      description: 'The main stage of the largest classical music event in Latin America, the Claudio Santoro Auditorium was inaugurated in 1979 and is named in honor of the maestro who passed away that same year, the first principal conductor of the Brasília Symphony Orchestra.',
    },
    es: {
      title: 'Auditorio Claudio Santoro',
      description: 'Escenario principal del mayor evento de música clásica de América Latina, el Auditorio Claudio Santoro fue inaugurado en 1979 y su nombre es un homenaje al maestro fallecido ese mismo año, primer director titular de la Orquesta Sinfónica de Brasilia.',
    },
  },
  'felicia-leirner': {
    pt: {
      title: 'Museu Felícia Leirner',
      description: 'Localizado em uma área de mata com 35 mil m², o Museu Felícia Leirner foi inaugurado em 1979 e reúne um conjunto de 85 obras em bronze, cimento branco e granito da artista Felícia Leirner.',
    },
    en: {
      title: 'Felícia Leirner Museum',
      description: 'Located in a forested area of 35,000 m², the Felícia Leirner Museum was inaugurated in 1979 and houses a collection of 85 works in bronze, white cement and granite by artist Felícia Leirner.',
    },
    es: {
      title: 'Museo Felícia Leirner',
      description: 'Ubicado en un área boscosa de 35 mil m², el Museo Felícia Leirner fue inaugurado en 1979 y reúne un conjunto de 85 obras en bronce, cemento blanco y granito de la artista Felícia Leirner.',
    },
  },
  'efcj': {
    pt: {
      title: 'Estrada de Ferro Campos do Jordão',
      description: 'Inaugurada em 1914, a Estrada de Ferro se tornou a principal via de acesso ao município. O passeio de bondinho começa na Estação Emílio Ribas, no Capivari.',
      status: 'No momento os passeios estão desativados.',
    },
    en: {
      title: 'Campos do Jordão Railway',
      description: 'Inaugurated in 1914, the Railway became the main access route to the municipality. The trolley ride starts at Emílio Ribas Station, in Capivari.',
      status: 'Tours are currently suspended.',
    },
    es: {
      title: 'Ferrocarril de Campos do Jordão',
      description: 'Inaugurado en 1914, el Ferrocarril se convirtió en la principal vía de acceso al municipio. El paseo en tranvía comienza en la Estación Emílio Ribas, en Capivari.',
      status: 'Actualmente los paseos están desactivados.',
    },
  },
  'tarundu': {
    pt: {
      title: 'Centro de Lazer Tarundu',
      description: 'O Tarundu está localizado numa área de 500.000 m² de mata preservada, com jardins, trilhas e mais de 35 atrações para todas as idades.',
    },
    en: {
      title: 'Tarundu Leisure Center',
      description: 'Tarundu is located in an area of 500,000 m² of preserved forest, with gardens, trails and more than 35 attractions for all ages.',
    },
    es: {
      title: 'Centro de Ocio Tarundu',
      description: 'Tarundu está ubicado en un área de 500.000 m² de bosque preservado, con jardines, senderos y más de 35 atracciones para todas las edades.',
    },
  },
  'parque-capivari': {
    pt: {
      title: 'Parque Capivari',
      description: 'Grande revitalização com novo centro comercial, pedalinhos, o famoso teleférico e palco sobre o lago.',
    },
    en: {
      title: 'Capivari Park',
      description: 'Major revitalization with a new shopping center, paddle boats, the famous cable car and a stage over the lake.',
    },
    es: {
      title: 'Parque Capivari',
      description: 'Gran revitalización con nuevo centro comercial, botes a pedal, el famoso teleférico y escenario sobre el lago.',
    },
  },
  'baden-baden': {
    pt: {
      title: 'Cervejaria Baden Baden',
      description: 'A fábrica oferece tours guiados mostrando o processo de fabricação de uma das primeiras cervejas artesanais do Brasil.',
    },
    en: {
      title: 'Baden Baden Brewery',
      description: 'The factory offers guided tours showing the manufacturing process of one of Brazil\'s first craft beers.',
    },
    es: {
      title: 'Cervecería Baden Baden',
      description: 'La fábrica ofrece tours guiados mostrando el proceso de fabricación de una de las primeras cervezas artesanales de Brasil.',
    },
  },
  'amantikir': {
    pt: {
      title: 'Parque Amantikir',
      description: 'Jardins inspirados em diferentes culturas ao redor do mundo, com mais de 700 espécies de plantas.',
    },
    en: {
      title: 'Amantikir Park',
      description: 'Gardens inspired by different cultures around the world, with more than 700 plant species.',
    },
    es: {
      title: 'Parque Amantikir',
      description: 'Jardines inspirados en diferentes culturas alrededor del mundo, con más de 700 especies de plantas.',
    },
  },
  'horto': {
    pt: {
      title: 'Horto Florestal',
      description: 'Área preservada com trilhas entre araucárias centenárias, rios de águas cristalinas e paisagens típicas da montanha.',
    },
    en: {
      title: 'Botanical Garden',
      description: 'Preserved area with trails among century-old araucarias, crystal-clear rivers and typical mountain landscapes.',
    },
    es: {
      title: 'Jardín Botánico',
      description: 'Área preservada con senderos entre araucarias centenarias, ríos de aguas cristalinas y paisajes típicos de montaña.',
    },
  },
  'casa-xilogravura': {
    pt: {
      title: 'Museu Casa da Xilogravura',
      description: 'Museu particular que divulga a arte da xilogravura, com um acervo amplo e obras de artistas consagrados.',
    },
    en: {
      title: 'Woodcut House Museum',
      description: 'Private museum that promotes the art of woodcut, with an extensive collection and works by renowned artists.',
    },
    es: {
      title: 'Museo Casa del Grabado en Madera',
      description: 'Museo privado que difunde el arte del grabado en madera, con un amplio acervo y obras de artistas consagrados.',
    },
  },
  'palacio-boa-vista': {
    pt: {
      title: 'Palácio Boa Vista',
      description: 'Residência de inverno convertida em museu com um acervo com mais de 2 mil peças, entre mobiliário, porcelanas, pinturas e esculturas.',
    },
    en: {
      title: 'Boa Vista Palace',
      description: 'Winter residence converted into a museum with a collection of more than 2,000 pieces, including furniture, porcelain, paintings and sculptures.',
    },
    es: {
      title: 'Palacio Boa Vista',
      description: 'Residencia de invierno convertida en museo con un acervo de más de 2 mil piezas, entre mobiliario, porcelanas, pinturas y esculturas.',
    },
  },
  'prana-park': {
    pt: {
      title: 'Prana Park',
      description: 'Parque de aventuras com tirolesas, bike aérea, megabalanço, arvorismo e mirantes com vistas panorâmicas.',
    },
    en: {
      title: 'Prana Park',
      description: 'Adventure park with zip lines, aerial bike, mega swing, tree climbing and viewpoints with panoramic views.',
    },
    es: {
      title: 'Prana Park',
      description: 'Parque de aventuras con tirolesas, bicicleta aérea, megacolumpio, arborismo y miradores con vistas panorámicas.',
    },
  },
  'dreams-house-park': {
    pt: {
      title: 'Dreams House Park',
      description: 'Complexo de entretenimento com museu de cera, Miniland e atrações voltadas a famílias e fotos memoráveis.',
    },
    en: {
      title: 'Dreams House Park',
      description: 'Entertainment complex with wax museum, Miniland and attractions aimed at families and memorable photos.',
    },
    es: {
      title: 'Dreams House Park',
      description: 'Complejo de entretenimiento con museo de cera, Miniland y atracciones orientadas a familias y fotos memorables.',
    },
  },
  'maostiqueiras': {
    pt: {
      title: 'Mãostiqueiras',
      description: 'Projeto que processa lã natural localmente em peças de decoração e oferece oficinas e produtos de produtores locais.',
    },
    en: {
      title: 'Mãostiqueiras',
      description: 'Project that processes natural wool locally into decorative pieces and offers workshops and products from local producers.',
    },
    es: {
      title: 'Mãostiqueiras',
      description: 'Proyecto que procesa lana natural localmente en piezas de decoración y ofrece talleres y productos de productores locales.',
    },
  },
  'parque-da-lagoinha': {
    pt: {
      title: 'Parque da Lagoinha',
      description: 'Parque revitalizado com trilhas, lagos, projetos socioambientais, educação ambiental e áreas de lazer.',
    },
    en: {
      title: 'Lagoinha Park',
      description: 'Revitalized park with trails, lakes, socio-environmental projects, environmental education and leisure areas.',
    },
    es: {
      title: 'Parque da Lagoinha',
      description: 'Parque revitalizado con senderos, lagos, proyectos socioambientales, educación ambiental y áreas de ocio.',
    },
  },
  'casa-araucaria': {
    pt: {
      title: 'Casa Araucária',
      description: 'Loja e espaço com produtos de pequenos produtores locais, oficinas e experiências imersivas ligadas à araucária e biodiversidade.',
    },
    en: {
      title: 'Araucária House',
      description: 'Store and space with products from small local producers, workshops and immersive experiences related to araucaria and biodiversity.',
    },
    es: {
      title: 'Casa Araucária',
      description: 'Tienda y espacio con productos de pequeños productores locales, talleres y experiencias inmersivas relacionadas con la araucaria y biodiversidad.',
    },
  },
  'iceland-aventura-no-gelo': {
    pt: {
      title: 'Iceland Aventura no Gelo',
      description: 'Espaço inteiro construído em gelo com esculturas temáticas; visitas curtas com casacos e luvas providenciados.',
    },
    en: {
      title: 'Iceland Ice Adventure',
      description: 'Entire space built in ice with themed sculptures; short visits with coats and gloves provided.',
    },
    es: {
      title: 'Iceland Aventura en el Hielo',
      description: 'Espacio entero construido en hielo con esculturas temáticas; visitas cortas con abrigos y guantes provistos.',
    },
  },
  'parque-da-cerveja': {
    pt: {
      title: 'Parque da Cerveja',
      description: 'Espaço com experiências ligadas à produção e degustação de cervejas artesanais em um parque cercado por araucárias.',
    },
    en: {
      title: 'Beer Park',
      description: 'Space with experiences related to the production and tasting of craft beers in a park surrounded by araucarias.',
    },
    es: {
      title: 'Parque de la Cerveza',
      description: 'Espacio con experiencias relacionadas con la producción y degustación de cervezas artesanales en un parque rodeado de araucarias.',
    },
  },
  'parque-bambui': {
    pt: {
      title: 'Parque Bambuí',
      description: 'Área verde com trilhas, lagos, arte ao ar livre, Maria-fumaça, esculturas e gastronomia local.',
    },
    en: {
      title: 'Bambuí Park',
      description: 'Green area with trails, lakes, outdoor art, steam train, sculptures and local gastronomy.',
    },
    es: {
      title: 'Parque Bambuí',
      description: 'Área verde con senderos, lagos, arte al aire libre, tren a vapor, esculturas y gastronomía local.',
    },
  },
};

// ============================================
// Hospedagens / Accommodations
// ============================================

export const accommodationTranslations: TranslationsMap = {
  'parque-hotel': {
    pt: {
      name: 'Campos do Jordão Parque Hotel',
      description: 'Localizado a 400m do centro turístico do Capivari; apartamentos com vista panorâmica, sala de jogos, restaurante e café da manhã incluso.',
    },
    en: {
      name: 'Campos do Jordão Parque Hotel',
      description: 'Located 400m from the tourist center of Capivari; apartments with panoramic views, game room, restaurant and breakfast included.',
    },
    es: {
      name: 'Campos do Jordão Parque Hotel',
      description: 'Ubicado a 400m del centro turístico de Capivari; apartamentos con vista panorámica, sala de juegos, restaurante y desayuno incluido.',
    },
  },
  'champet-boutique': {
    pt: {
      name: 'Champet Boutique Hotel',
      description: 'A 17 min a pé do Parque Capivari; quartos com TV, ar-condicionado, mesa de trabalho e varanda em algumas unidades; café da manhã incluso.',
    },
    en: {
      name: 'Champet Boutique Hotel',
      description: '17 min walk from Capivari Park; rooms with TV, air conditioning, desk and balcony in some units; breakfast included.',
    },
    es: {
      name: 'Champet Boutique Hotel',
      description: 'A 17 min a pie del Parque Capivari; habitaciones con TV, aire acondicionado, escritorio y balcón en algunas unidades; desayuno incluido.',
    },
  },
  'chrys-wellness-park': {
    pt: {
      name: 'Chrys Wellness Park Hotel',
      description: 'Localizado no Morro do Elefante; oferece suítes, piscina coberta e aquecida, sauna, academia e restaurante.',
    },
    en: {
      name: 'Chrys Wellness Park Hotel',
      description: 'Located at Morro do Elefante; offers suites, heated indoor pool, sauna, gym and restaurant.',
    },
    es: {
      name: 'Chrys Wellness Park Hotel',
      description: 'Ubicado en el Morro do Elefante; ofrece suites, piscina cubierta y climatizada, sauna, gimnasio y restaurante.',
    },
  },
  'home-green-home': {
    pt: {
      name: 'Flat Hotel Home Green Home',
      description: 'Localizado no Alto do Capivari; suítes com sala de estar, calefação e minicopa; piscinas aquecidas e quadras.',
    },
    en: {
      name: 'Flat Hotel Home Green Home',
      description: 'Located in Alto Capivari; suites with living room, heating and kitchenette; heated pools and courts.',
    },
    es: {
      name: 'Flat Hotel Home Green Home',
      description: 'Ubicado en el Alto Capivari; suites con sala de estar, calefacción y cocina pequeña; piscinas climatizadas y canchas.',
    },
  },
  'palazzo-reale': {
    pt: {
      name: 'Flat Hotel Palazzo Reale',
      description: 'Localizado no Capivari; piscina aquecida, sauna e café da manhã incluso; estacionamento fechado com segurança.',
    },
    en: {
      name: 'Flat Hotel Palazzo Reale',
      description: 'Located in Capivari; heated pool, sauna and breakfast included; secure enclosed parking.',
    },
    es: {
      name: 'Flat Hotel Palazzo Reale',
      description: 'Ubicado en Capivari; piscina climatizada, sauna y desayuno incluido; estacionamiento cerrado con seguridad.',
    },
  },
  'hotel-ascona': {
    pt: {
      name: 'Hotel Ascona',
      description: 'Localizado próximo ao Capivari; quartos com aquecedor, TV LED, frigobar; piscina ao ar livre e jardim.',
    },
    en: {
      name: 'Hotel Ascona',
      description: 'Located near Capivari; rooms with heater, LED TV, minibar; outdoor pool and garden.',
    },
    es: {
      name: 'Hotel Ascona',
      description: 'Ubicado cerca de Capivari; habitaciones con calefactor, TV LED, frigobar; piscina al aire libre y jardín.',
    },
  },
  'bendito-cacau': {
    pt: {
      name: 'Hotel Bendito Cacau Resort',
      description: 'Quartos equipados com frigobar e ar-condicionado; instalações de fitness e quadras; Wi‑Fi e estacionamento.',
    },
    en: {
      name: 'Hotel Bendito Cacau Resort',
      description: 'Rooms equipped with minibar and air conditioning; fitness facilities and courts; Wi-Fi and parking.',
    },
    es: {
      name: 'Hotel Bendito Cacau Resort',
      description: 'Habitaciones equipadas con frigobar y aire acondicionado; instalaciones de fitness y canchas; Wi-Fi y estacionamiento.',
    },
  },
  'hotel-quebra-noz': {
    pt: {
      name: 'Hotel Boutique Quebra-Noz',
      description: 'Suítes com banheira, piscina aquecida, spa, áreas de lazer e restaurante; café da manhã incluso.',
    },
    en: {
      name: 'Hotel Boutique Quebra-Noz',
      description: 'Suites with bathtub, heated pool, spa, leisure areas and restaurant; breakfast included.',
    },
    es: {
      name: 'Hotel Boutique Quebra-Noz',
      description: 'Suites con bañera, piscina climatizada, spa, áreas de ocio y restaurante; desayuno incluido.',
    },
  },
  'dan-inn-premium': {
    pt: {
      name: 'Hotel Dan Inn Premium',
      description: 'Localizado na Vila Everest; piscina aquecida, hidromassagem e academia; café da manhã incluso.',
    },
    en: {
      name: 'Hotel Dan Inn Premium',
      description: 'Located in Vila Everest; heated pool, hot tub and gym; breakfast included.',
    },
    es: {
      name: 'Hotel Dan Inn Premium',
      description: 'Ubicado en Vila Everest; piscina climatizada, jacuzzi y gimnasio; desayuno incluido.',
    },
  },
  'hotel-estoril': {
    pt: {
      name: 'Hotel Estoril',
      description: 'Localizado no centro do Capivari; suítes com calefação, lareira e serviços como chá da tarde e estacionamento.',
    },
    en: {
      name: 'Hotel Estoril',
      description: 'Located in the center of Capivari; suites with heating, fireplace and services such as afternoon tea and parking.',
    },
    es: {
      name: 'Hotel Estoril',
      description: 'Ubicado en el centro de Capivari; suites con calefacción, chimenea y servicios como té de la tarde y estacionamiento.',
    },
  },
  'le-renard': {
    pt: {
      name: 'Hotel Le Renard',
      description: 'Suítes com piso aquecido e amenities de qualidade; piscina descoberta aquecida e café da manhã incluso.',
    },
    en: {
      name: 'Hotel Le Renard',
      description: 'Suites with heated floors and quality amenities; heated outdoor pool and breakfast included.',
    },
    es: {
      name: 'Hotel Le Renard',
      description: 'Suites con piso calefaccionado y amenities de calidad; piscina descubierta climatizada y desayuno incluido.',
    },
  },
  'leao-da-montanha': {
    pt: {
      name: 'Hotel Leão da Montanha',
      description: 'Hotel com ampla infraestrutura: piscinas, saunas, salão de jogos, restaurante e atividades para famílias.',
    },
    en: {
      name: 'Hotel Leão da Montanha',
      description: 'Hotel with extensive infrastructure: pools, saunas, game room, restaurant and family activities.',
    },
    es: {
      name: 'Hotel Leão da Montanha',
      description: 'Hotel con amplia infraestructura: piscinas, saunas, salón de juegos, restaurante y actividades para familias.',
    },
  },
  'hotel-platanus': {
    pt: {
      name: 'Hotel Platanus',
      description: 'Próximo ao Morro do Elefante; ideal para famílias, café da manhã incluso e estacionamento gratuito.',
    },
    en: {
      name: 'Hotel Platanus',
      description: 'Near Morro do Elefante; ideal for families, breakfast included and free parking.',
    },
    es: {
      name: 'Hotel Platanus',
      description: 'Cerca del Morro do Elefante; ideal para familias, desayuno incluido y estacionamiento gratuito.',
    },
  },
  'recanto-sao-cristovao': {
    pt: {
      name: 'Hotel Recanto São Cristóvão',
      description: 'Localizado em área verde de 250.000 m²; oferece piscinas, trilhas, passeios a cavalo e café da manhã incluso.',
    },
    en: {
      name: 'Hotel Recanto São Cristóvão',
      description: 'Located in a green area of 250,000 m²; offers pools, trails, horseback riding and breakfast included.',
    },
    es: {
      name: 'Hotel Recanto São Cristóvão',
      description: 'Ubicado en un área verde de 250.000 m²; ofrece piscinas, senderos, paseos a caballo y desayuno incluido.',
    },
  },
  'solar-d-izabel': {
    pt: {
      name: 'Hotel Solar d Izabel',
      description: 'Localizado próximo ao centro turístico de Capivari; acomodações para casais e famílias com café da manhã incluso.',
    },
    en: {
      name: 'Hotel Solar d Izabel',
      description: 'Located near the tourist center of Capivari; accommodations for couples and families with breakfast included.',
    },
    es: {
      name: 'Hotel Solar d Izabel',
      description: 'Ubicado cerca del centro turístico de Capivari; alojamiento para parejas y familias con desayuno incluido.',
    },
  },
  'hotel-toriba': {
    pt: {
      name: 'Hotel Toriba',
      description: 'Hotel com forte infraestrutura: spa, quadras, trilhas, restaurantes e diversas opções de lazer; café da manhã incluso.',
    },
    en: {
      name: 'Hotel Toriba',
      description: 'Hotel with strong infrastructure: spa, courts, trails, restaurants and various leisure options; breakfast included.',
    },
    es: {
      name: 'Hotel Toriba',
      description: 'Hotel con sólida infraestructura: spa, canchas, senderos, restaurantes y diversas opciones de ocio; desayuno incluido.',
    },
  },
  'vila-inglesa': {
    pt: {
      name: 'Hotel Vila Inglesa',
      description: 'Localizado na Vila Inglesa; oferece diversas atividades como arvorismo, tirolesa, quadras e piscinas; café da manhã incluso.',
    },
    en: {
      name: 'Hotel Vila Inglesa',
      description: 'Located in Vila Inglesa; offers various activities such as tree climbing, zip lines, courts and pools; breakfast included.',
    },
    es: {
      name: 'Hotel Vila Inglesa',
      description: 'Ubicado en Vila Inglesa; ofrece diversas actividades como arborismo, tirolesas, canchas y piscinas; desayuno incluido.',
    },
  },
  'le-suisse': {
    pt: {
      name: 'Le Suisse Elegance Hotel',
      description: 'Próximo ao centro de Capivari; quartos com calefação, restaurante e serviço de recepção 24h; café da manhã incluso.',
    },
    en: {
      name: 'Le Suisse Elegance Hotel',
      description: 'Near the center of Capivari; rooms with heating, restaurant and 24h reception service; breakfast included.',
    },
    es: {
      name: 'Le Suisse Elegance Hotel',
      description: 'Cerca del centro de Capivari; habitaciones con calefacción, restaurante y servicio de recepción 24h; desayuno incluido.',
    },
  },
  'parador': {
    pt: {
      name: 'Parador Campos do Jordão',
      description: 'A 700m do centrinho de Capivari; lofts e studios modernos com Wi-Fi exclusivo, segurança com câmeras e fechaduras eletrônicas; restaurante no local.',
    },
    en: {
      name: 'Parador Campos do Jordão',
      description: '700m from downtown Capivari; modern lofts and studios with exclusive Wi-Fi, camera security and electronic locks; on-site restaurant.',
    },
    es: {
      name: 'Parador Campos do Jordão',
      description: 'A 700m del centro de Capivari; lofts y estudios modernos con Wi-Fi exclusivo, seguridad con cámaras y cerraduras electrónicas; restaurante en el lugar.',
    },
  },
  'alto-boa-vista': {
    pt: {
      name: 'Pousada Alto da Boa Vista',
      description: 'Chalés em estilo europeu com vista panorâmica das montanhas; sala de leitura, lounge com lareira e jardins; café da manhã incluso.',
    },
    en: {
      name: 'Pousada Alto da Boa Vista',
      description: 'European-style chalets with panoramic mountain views; reading room, lounge with fireplace and gardens; breakfast included.',
    },
    es: {
      name: 'Pousada Alto da Boa Vista',
      description: 'Chalets de estilo europeo con vista panorámica de las montañas; sala de lectura, lounge con chimenea y jardines; desayuno incluido.',
    },
  },
  'annecy': {
    pt: {
      name: 'Pousada Annecy',
      description: 'A 400m do centro do Capivari; suítes com cama box queen size, TV LCD 42″, DVD e Sky, frigobar, aquecedor elétrico e enxoval Trussardi.',
    },
    en: {
      name: 'Pousada Annecy',
      description: '400m from the center of Capivari; suites with queen size box bed, 42" LCD TV, DVD and Sky, minibar, electric heater and Trussardi linens.',
    },
    es: {
      name: 'Pousada Annecy',
      description: 'A 400m del centro de Capivari; suites con cama box queen size, TV LCD 42", DVD y Sky, frigobar, calefactor eléctrico y ropa de cama Trussardi.',
    },
  },
  'provence': {
    pt: {
      name: 'Pousada Campos de Provence',
      description: 'Localizada no Capivari; apartamentos com cama box, TV LCD, DVD, cofre eletrônico, calefação e pisos de madeira anti-alérgicos; aceita pets.',
    },
    en: {
      name: 'Pousada Campos de Provence',
      description: 'Located in Capivari; apartments with box bed, LCD TV, DVD, electronic safe, heating and hypoallergenic wooden floors; pet friendly.',
    },
    es: {
      name: 'Pousada Campos de Provence',
      description: 'Ubicada en Capivari; apartamentos con cama box, TV LCD, DVD, caja fuerte electrónica, calefacción y pisos de madera antialérgicos; acepta mascotas.',
    },
  },
  'holandeses': {
    pt: {
      name: 'Pousada Campos dos Holandeses',
      description: 'Na Vila Inglesa; apartamentos com TV LCD, DVD, cofre eletrônico, calefação; sauna, piscina aquecida e coberta, sala fitness; aceita pets.',
    },
    en: {
      name: 'Pousada Campos dos Holandeses',
      description: 'In Vila Inglesa; apartments with LCD TV, DVD, electronic safe, heating; sauna, heated indoor pool, fitness room; pet friendly.',
    },
    es: {
      name: 'Pousada Campos dos Holandeses',
      description: 'En Vila Inglesa; apartamentos con TV LCD, DVD, caja fuerte electrónica, calefacción; sauna, piscina climatizada cubierta, sala fitness; acepta mascotas.',
    },
  },
  'cantinho-serra': {
    pt: {
      name: 'Pousada Cantinho da Serra',
      description: 'A 4 minutos de carro do Capivari; apartamentos com aquecedor, frigobar, TV LCD; quartos privativos com banheira; vista incrível.',
    },
    en: {
      name: 'Pousada Cantinho da Serra',
      description: '4 minutes by car from Capivari; apartments with heater, minibar, LCD TV; private rooms with bathtub; amazing view.',
    },
    es: {
      name: 'Pousada Cantinho da Serra',
      description: 'A 4 minutos en auto de Capivari; apartamentos con calefactor, frigobar, TV LCD; habitaciones privadas con bañera; vista increíble.',
    },
  },
  'sabor-chocolate-pousada': {
    pt: {
      name: 'Pousada Casa Sabor Chocolate',
      description: 'A 9 min a pé do Parque Capivari; 8 suítes premium com decoração temática de chocolates; banheira de hidromassagem e teto de vidro em algumas.',
    },
    en: {
      name: 'Pousada Casa Sabor Chocolate',
      description: '9 min walk from Capivari Park; 8 premium suites with chocolate-themed décor; hot tub and glass ceiling in some.',
    },
    es: {
      name: 'Pousada Casa Sabor Chocolate',
      description: 'A 9 min a pie del Parque Capivari; 8 suites premium con decoración temática de chocolates; jacuzzi y techo de vidrio en algunas.',
    },
  },
  'chateau-villette': {
    pt: {
      name: 'Pousada Chateau La Villette',
      description: 'Na Vila Everest; suítes com cama king, roupa de cama 600 fios, calefação, TV SKY HD, DVDs, Wi-Fi e cofre; restaurante Le Foyer.',
    },
    en: {
      name: 'Pousada Chateau La Villette',
      description: 'In Vila Everest; suites with king bed, 600-thread count linens, heating, SKY HD TV, DVDs, Wi-Fi and safe; Le Foyer restaurant.',
    },
    es: {
      name: 'Pousada Chateau La Villette',
      description: 'En Vila Everest; suites con cama king, ropa de cama 600 hilos, calefacción, TV SKY HD, DVDs, Wi-Fi y caja fuerte; restaurante Le Foyer.',
    },
  },
  'da-pedra': {
    pt: {
      name: 'Pousada da Pedra',
      description: 'A 2 km do centro do Capivari; apartamentos com ou sem lareira, TV 32", DVD, frigobar, cofre; piscina, jardim, massagem e biblioteca.',
    },
    en: {
      name: 'Pousada da Pedra',
      description: '2 km from the center of Capivari; apartments with or without fireplace, 32" TV, DVD, minibar, safe; pool, garden, massage and library.',
    },
    es: {
      name: 'Pousada da Pedra',
      description: 'A 2 km del centro de Capivari; apartamentos con o sin chimenea, TV 32", DVD, frigobar, caja fuerte; piscina, jardín, masaje y biblioteca.',
    },
  },
  'hortensias': {
    pt: {
      name: 'Pousada das Hortênsias',
      description: 'No Capivari; apartamentos com TV LCD SKY, DVD, cofre digital, secador, frigobar e aquecedor elétrico; minibiblioteca, bicicletas e sala de jogos.',
    },
    en: {
      name: 'Pousada das Hortênsias',
      description: 'In Capivari; apartments with SKY LCD TV, DVD, digital safe, hair dryer, minibar and electric heater; mini library, bicycles and game room.',
    },
    es: {
      name: 'Pousada das Hortênsias',
      description: 'En Capivari; apartamentos con TV LCD SKY, DVD, caja fuerte digital, secador, frigobar y calefactor eléctrico; minibiblioteca, bicicletas y sala de juegos.',
    },
  },
  'lavandas': {
    pt: {
      name: 'Pousada das Lavandas',
      description: 'A poucos metros do Capivari; área de 3.000 m² com vista para as montanhas; 11 suítes confortáveis; café da manhã servido à mesa.',
    },
    en: {
      name: 'Pousada das Lavandas',
      description: 'A few meters from Capivari; 3,000 m² area with mountain views; 11 comfortable suites; breakfast served at the table.',
    },
    es: {
      name: 'Pousada das Lavandas',
      description: 'A pocos metros de Capivari; área de 3.000 m² con vista a las montañas; 11 suites confortables; desayuno servido en la mesa.',
    },
  },
  'do-conde': {
    pt: {
      name: 'Pousada do Conde',
      description: 'No centro do Capivari; apartamentos com cama box queen size, TV 32" Sky, ar-condicionado quente/frio, frigobar; playground e bicicletas.',
    },
    en: {
      name: 'Pousada do Conde',
      description: 'In the center of Capivari; apartments with queen size box bed, 32" Sky TV, hot/cold air conditioning, minibar; playground and bicycles.',
    },
    es: {
      name: 'Pousada do Conde',
      description: 'En el centro de Capivari; apartamentos con cama box queen size, TV Sky 32", aire acondicionado frío/calor, frigobar; parque infantil y bicicletas.',
    },
  },
  'figueira-serra': {
    pt: {
      name: 'Pousada Figueira da Serra',
      description: 'No Jardim do Embaixador, a 2 km do Parque Capivari; suítes com cama king, Smart TV, ar condicionado, frigobar abastecido e banheira de hidromassagem.',
    },
    en: {
      name: 'Pousada Figueira da Serra',
      description: 'In Jardim do Embaixador, 2 km from Capivari Park; suites with king bed, Smart TV, air conditioning, stocked minibar and hot tub.',
    },
    es: {
      name: 'Pousada Figueira da Serra',
      description: 'En Jardim do Embaixador, a 2 km del Parque Capivari; suites con cama king, Smart TV, aire acondicionado, frigobar abastecido y jacuzzi.',
    },
  },
  'kaliman': {
    pt: {
      name: 'Pousada Kaliman',
      description: 'No Capivari; suítes com cama queen, frigobar, microondas, aquecedor elétrico e TV a cabo; café da manhã incluso.',
    },
    en: {
      name: 'Pousada Kaliman',
      description: 'In Capivari; suites with queen bed, minibar, microwave, electric heater and cable TV; breakfast included.',
    },
    es: {
      name: 'Pousada Kaliman',
      description: 'En Capivari; suites con cama queen, frigobar, microondas, calefactor eléctrico y TV por cable; desayuno incluido.',
    },
  },
  'la-toscana': {
    pt: {
      name: 'Pousada La Toscana',
      description: 'A 4 quadras do centro do Capivari; suítes com cama box Serta, calefação, frigobar, Wi-Fi, TV LCD Sky e ducha alta-pressão.',
    },
    en: {
      name: 'Pousada La Toscana',
      description: '4 blocks from the center of Capivari; suites with Serta box bed, heating, minibar, Wi-Fi, Sky LCD TV and high-pressure shower.',
    },
    es: {
      name: 'Pousada La Toscana',
      description: 'A 4 cuadras del centro de Capivari; suites con cama box Serta, calefacción, frigobar, Wi-Fi, TV LCD Sky y ducha de alta presión.',
    },
  },
  'luis-xv': {
    pt: {
      name: 'Pousada Luis XV',
      description: 'No centro do Capivari; suítes com piso de madeira, janelas antirruído, calefação, ar-condicionado, cofre, frigobar e cafeteira Nespresso.',
    },
    en: {
      name: 'Pousada Luis XV',
      description: 'In the center of Capivari; suites with wooden floors, soundproof windows, heating, air conditioning, safe, minibar and Nespresso coffee maker.',
    },
    es: {
      name: 'Pousada Luis XV',
      description: 'En el centro de Capivari; suites con piso de madera, ventanas antirruido, calefacción, aire acondicionado, caja fuerte, frigobar y cafetera Nespresso.',
    },
  },
  'murano': {
    pt: {
      name: 'Pousada Murano',
      description: 'A 6 min de carro do Parque Capivari; área tranquila rodeada por paisagens naturais; banheira de hidromassagem em suítes Premium; bikes e mini academia.',
    },
    en: {
      name: 'Pousada Murano',
      description: '6 min by car from Capivari Park; quiet area surrounded by natural landscapes; hot tub in Premium suites; bikes and mini gym.',
    },
    es: {
      name: 'Pousada Murano',
      description: 'A 6 min en auto del Parque Capivari; área tranquila rodeada de paisajes naturales; jacuzzi en suites Premium; bicicletas y mini gimnasio.',
    },
  },
  'primavera': {
    pt: {
      name: 'Pousada Primavera',
      description: 'Próxima ao Capivari; roupa de cama e banho inclusas; TV de tela plana nos quartos; banheiros privativos; café da manhã incluso.',
    },
    en: {
      name: 'Pousada Primavera',
      description: 'Near Capivari; bed and bath linens included; flat screen TV in rooms; private bathrooms; breakfast included.',
    },
    es: {
      name: 'Pousada Primavera',
      description: 'Cerca de Capivari; ropa de cama y baño incluidas; TV de pantalla plana en las habitaciones; baños privados; desayuno incluido.',
    },
  },
  'recanto-almeida': {
    pt: {
      name: 'Pousada Recanto Almeida',
      description: 'No Alto Manancial, a 2 km do Capivari; suítes com cama box king size, TV LCD HD, calefação, ducha com aquecimento central e som ambiente.',
    },
    en: {
      name: 'Pousada Recanto Almeida',
      description: 'In Alto Manancial, 2 km from Capivari; suites with king size box bed, HD LCD TV, heating, centrally heated shower and ambient sound.',
    },
    es: {
      name: 'Pousada Recanto Almeida',
      description: 'En Alto Manancial, a 2 km de Capivari; suites con cama box king size, TV LCD HD, calefacción, ducha con calentamiento central y sonido ambiente.',
    },
  },
  'vila-cores': {
    pt: {
      name: 'Pousada Vila das Cores',
      description: 'Em colina com vista para o alto do Capivari; 17 suítes com decoração personalizada; café da manhã incluso até o meio-dia, opção no quarto.',
    },
    en: {
      name: 'Pousada Vila das Cores',
      description: 'On a hill overlooking upper Capivari; 17 suites with personalized décor; breakfast included until noon, room service option.',
    },
    es: {
      name: 'Pousada Vila das Cores',
      description: 'En colina con vista al alto Capivari; 17 suites con decoración personalizada; desayuno incluido hasta el mediodía, opción en la habitación.',
    },
  },
  'dbiagy-raizes': {
    pt: {
      name: 'Pousada Villa D\'Biagy Raízes',
      description: 'No centro turístico do Capivari; suítes com cama box, TV LCD a cabo, calefação, cofre digital, som ambiente e piso aquecido nos banheiros; elevador panorâmico.',
    },
    en: {
      name: 'Pousada Villa D\'Biagy Raízes',
      description: 'In the tourist center of Capivari; suites with box bed, cable LCD TV, heating, digital safe, ambient sound and heated bathroom floors; panoramic elevator.',
    },
    es: {
      name: 'Pousada Villa D\'Biagy Raízes',
      description: 'En el centro turístico de Capivari; suites con cama box, TV LCD por cable, calefacción, caja fuerte digital, sonido ambiente y piso calefaccionado en baños; ascensor panorámico.',
    },
  },
  'dbiagy-premium': {
    pt: {
      name: 'Pousada Villa D\'Biagy Premium',
      description: 'No centro turístico do Capivari; suítes com cama king, TV LCD SKY, calefação, cofre digital, fechadura eletrônica, isolamento acústico e piso aquecido.',
    },
    en: {
      name: 'Pousada Villa D\'Biagy Premium',
      description: 'In the tourist center of Capivari; suites with king bed, SKY LCD TV, heating, digital safe, electronic lock, sound insulation and heated floors.',
    },
    es: {
      name: 'Pousada Villa D\'Biagy Premium',
      description: 'En el centro turístico de Capivari; suites con cama king, TV LCD SKY, calefacción, caja fuerte digital, cerradura electrónica, aislamiento acústico y piso calefaccionado.',
    },
  },
  'villaggio-italia': {
    pt: {
      name: 'Pousada Villaggio Itália',
      description: 'No centro turístico do Capivari; suítes com calefação, janelas antirruídos, camas box, edredom e travesseiros de pluma; chá da tarde aos sábados.',
    },
    en: {
      name: 'Pousada Villaggio Itália',
      description: 'In the tourist center of Capivari; suites with heating, soundproof windows, box beds, comforter and feather pillows; afternoon tea on Saturdays.',
    },
    es: {
      name: 'Pousada Villaggio Itália',
      description: 'En el centro turístico de Capivari; suites con calefacción, ventanas antirruido, camas box, edredón y almohadas de pluma; té de la tarde los sábados.',
    },
  },
  'surya-pan': {
    pt: {
      name: 'Surya-Pan Refúgio Hotel',
      description: 'No Alto da Boa Vista, a 6 km do Capivari; apartamentos com calefação, lareira (em algumas categorias); piscina ao ar livre, spa com massagens, sauna, ioga e trilhas.',
    },
    en: {
      name: 'Surya-Pan Refuge Hotel',
      description: 'In Alto da Boa Vista, 6 km from Capivari; apartments with heating, fireplace (in some categories); outdoor pool, spa with massages, sauna, yoga and trails.',
    },
    es: {
      name: 'Surya-Pan Refugio Hotel',
      description: 'En el Alto da Boa Vista, a 6 km de Capivari; apartamentos con calefacción, chimenea (en algunas categorías); piscina al aire libre, spa con masajes, sauna, yoga y senderos.',
    },
  },
  'zur': {
    pt: {
      name: 'Zur Campos do Jordão',
      description: 'A 5 min de carro do Capivari; check-in 100% online; Wi-Fi exclusivo em cada quarto; ambiente moderno, decorado e acolhedor; café da manhã incluso.',
    },
    en: {
      name: 'Zur Campos do Jordão',
      description: '5 min by car from Capivari; 100% online check-in; exclusive Wi-Fi in each room; modern, decorated and cozy environment; breakfast included.',
    },
    es: {
      name: 'Zur Campos do Jordão',
      description: 'A 5 min en auto de Capivari; check-in 100% online; Wi-Fi exclusivo en cada habitación; ambiente moderno, decorado y acogedor; desayuno incluido.',
    },
  },
};

// ============================================
// Helper Functions
// ============================================

/**
 * Get translated content for a tour/attraction
 */
export function getTranslatedTour(id: string, lang: Language) {
  const translation = tourTranslations[id];
  if (translation) {
    return translation[lang];
  }
  return null;
}

/**
 * Get translated content for an accommodation
 */
export function getTranslatedAccommodation(id: string, lang: Language) {
  const translation = accommodationTranslations[id];
  if (translation) {
    return translation[lang];
  }
  return null;
}

/**
 * Get translated category
 */
export function getTranslatedCategory(category: string, lang: Language): string {
  const translation = categoryTranslations[category];
  if (translation) {
    return translation[lang];
  }
  return category;
}

/**
 * Get translated tag
 */
export function getTranslatedTag(tag: string, lang: Language): string {
  const translation = tagTranslations[tag];
  if (translation) {
    return translation[lang];
  }
  return tag;
}

// ============================================
// Traduções para locais do mapa (Roteiros)
// Map Locations Translations
// ============================================

export interface MapLocationTranslation {
  name: string;
  description?: string;
}

export const mapLocationTranslations: Record<number, Record<Language, MapLocationTranslation>> = {
  // ========== ATRAÇÕES / ATTRACTIONS ==========
  201: {
    pt: { name: 'Auditório Claudio Santoro', description: 'Principal palco do maior evento da música erudita da América Latina.' },
    en: { name: 'Claudio Santoro Auditorium', description: 'Main stage of the largest classical music event in Latin America.' },
    es: { name: 'Auditorio Claudio Santoro', description: 'Escenario principal del mayor evento de música clásica de América Latina.' },
  },
  202: {
    pt: { name: 'Parque Tarundu', description: 'Parque de aventuras com mais de 35 atrações em 500 mil m² de mata preservada.' },
    en: { name: 'Tarundu Park', description: 'Adventure park with over 35 attractions in 500,000 m² of preserved forest.' },
    es: { name: 'Parque Tarundu', description: 'Parque de aventuras con más de 35 atracciones en 500 mil m² de bosque preservado.' },
  },
  203: {
    pt: { name: 'Dreams House Park', description: 'Complexo de entretenimento com museu de cera, Miniland e atrações para a família.' },
    en: { name: 'Dreams House Park', description: 'Entertainment complex with wax museum, Miniland and family attractions.' },
    es: { name: 'Dreams House Park', description: 'Complejo de entretenimiento con museo de cera, Miniland y atracciones familiares.' },
  },
  204: {
    pt: { name: 'Estrada de Ferro Campos do Jordão', description: 'Inaugurada em 1914, oferece passeios panorâmicos de bondinho.' },
    en: { name: 'Campos do Jordão Railway', description: 'Inaugurated in 1914, offers panoramic trolley rides.' },
    es: { name: 'Ferrocarril de Campos do Jordão', description: 'Inaugurado en 1914, ofrece paseos panorámicos en tranvía.' },
  },
  205: {
    pt: { name: 'Cervejaria Baden Baden', description: 'Fábrica de uma das primeiras cervejas artesanais do Brasil com tours guiados.' },
    en: { name: 'Baden Baden Brewery', description: 'Factory of one of Brazil\'s first craft beers with guided tours.' },
    es: { name: 'Cervecería Baden Baden', description: 'Fábrica de una de las primeras cervezas artesanales de Brasil con tours guiados.' },
  },
  206: {
    pt: { name: 'Iceland - Bar de Gelo', description: 'Espaço construído em gelo com esculturas temáticas.' },
    en: { name: 'Iceland - Ice Bar', description: 'Space built in ice with themed sculptures.' },
    es: { name: 'Iceland - Bar de Hielo', description: 'Espacio construido en hielo con esculturas temáticas.' },
  },
  207: {
    pt: { name: 'Ducha de Prata', description: 'Cachoeira artificial com várias quedas d\'água em meio à natureza.' },
    en: { name: 'Silver Shower', description: 'Artificial waterfall with multiple water falls surrounded by nature.' },
    es: { name: 'Ducha de Plata', description: 'Cascada artificial con varias caídas de agua en medio de la naturaleza.' },
  },
  208: {
    pt: { name: 'Museu Casa da Xilogravura', description: 'Museu dedicado à arte da xilogravura com obras de artistas consagrados.' },
    en: { name: 'Woodcut House Museum', description: 'Museum dedicated to woodcut art with works by renowned artists.' },
    es: { name: 'Museo Casa del Grabado en Madera', description: 'Museo dedicado al arte del grabado en madera con obras de artistas consagrados.' },
  },
  209: {
    pt: { name: 'Museu Felícia Leirner', description: 'Museu a céu aberto com 85 esculturas em 35 mil m² de mata.' },
    en: { name: 'Felícia Leirner Museum', description: 'Open-air museum with 85 sculptures in 35,000 m² of forest.' },
    es: { name: 'Museo Felícia Leirner', description: 'Museo al aire libre con 85 esculturas en 35 mil m² de bosque.' },
  },
  210: {
    pt: { name: 'Palácio da Boa Vista', description: 'Residência de inverno do governador convertida em museu com 2 mil peças.' },
    en: { name: 'Boa Vista Palace', description: 'Governor\'s winter residence converted into museum with 2,000 pieces.' },
    es: { name: 'Palacio Boa Vista', description: 'Residencia de invierno del gobernador convertida en museo con 2 mil piezas.' },
  },
  211: {
    pt: { name: 'Parque Amantikir', description: 'Jardins inspirados em diferentes culturas com mais de 700 espécies de plantas.' },
    en: { name: 'Amantikir Park', description: 'Gardens inspired by different cultures with over 700 plant species.' },
    es: { name: 'Parque Amantikir', description: 'Jardines inspirados en diferentes culturas con más de 700 especies de plantas.' },
  },
  212: {
    pt: { name: 'Bosque do Silêncio', description: 'Área preservada com trilhas ecológicas e natureza exuberante.' },
    en: { name: 'Silence Forest', description: 'Preserved area with ecological trails and lush nature.' },
    es: { name: 'Bosque del Silencio', description: 'Área preservada con senderos ecológicos y naturaleza exuberante.' },
  },
  213: {
    pt: { name: 'Parque Capivari', description: 'Centro turístico com teleférico, pedalinhos e diversas atrações.' },
    en: { name: 'Capivari Park', description: 'Tourist center with cable car, paddle boats and various attractions.' },
    es: { name: 'Parque Capivari', description: 'Centro turístico con teleférico, botes a pedal y diversas atracciones.' },
  },
  214: {
    pt: { name: 'Parque da Cerveja', description: 'Espaço com experiências de produção e degustação de cervejas artesanais.' },
    en: { name: 'Beer Park', description: 'Space with craft beer production and tasting experiences.' },
    es: { name: 'Parque de la Cerveza', description: 'Espacio con experiencias de producción y degustación de cervezas artesanales.' },
  },
  215: {
    pt: { name: 'Parque da Lagoinha', description: 'Parque revitalizado com trilhas, lagos e educação ambiental.' },
    en: { name: 'Lagoinha Park', description: 'Revitalized park with trails, lakes and environmental education.' },
    es: { name: 'Parque da Lagoinha', description: 'Parque revitalizado con senderos, lagos y educación ambiental.' },
  },
  216: {
    pt: { name: 'Parque Estadual Campos do Jordão', description: 'Área preservada com trilhas entre araucárias centenárias (Horto Florestal).' },
    en: { name: 'Campos do Jordão State Park', description: 'Preserved area with trails among century-old araucarias (Botanical Garden).' },
    es: { name: 'Parque Estadual Campos do Jordão', description: 'Área preservada con senderos entre araucarias centenarias (Jardín Botánico).' },
  },
  217: {
    pt: { name: 'Pico do Itapeva', description: 'Mirante a 2.030m de altitude com vista panorâmica do Vale do Paraíba.' },
    en: { name: 'Itapeva Peak', description: 'Viewpoint at 2,030m altitude with panoramic view of the Paraíba Valley.' },
    es: { name: 'Pico do Itapeva', description: 'Mirador a 2.030m de altitud con vista panorámica del Valle del Paraíba.' },
  },
  218: {
    pt: { name: 'Morro do Elefante', description: 'Mirante acessível por teleférico com vista panorâmica da cidade.' },
    en: { name: 'Elephant Hill', description: 'Viewpoint accessible by cable car with panoramic city views.' },
    es: { name: 'Morro do Elefante', description: 'Mirador accesible por teleférico con vista panorámica de la ciudad.' },
  },
  219: {
    pt: { name: 'Pedra do Baú', description: 'Formação rochosa icônica ideal para escalada e trekking.' },
    en: { name: 'Baú Rock', description: 'Iconic rock formation ideal for climbing and trekking.' },
    es: { name: 'Pedra do Baú', description: 'Formación rocosa icónica ideal para escalada y trekking.' },
  },
  220: {
    pt: { name: 'Teleférico de Campos do Jordão', description: 'Passeio panorâmico até o topo do Morro do Elefante.' },
    en: { name: 'Campos do Jordão Cable Car', description: 'Panoramic ride to the top of Elephant Hill.' },
    es: { name: 'Teleférico de Campos do Jordão', description: 'Paseo panorámico hasta la cima del Morro do Elefante.' },
  },
};

/**
 * Get translated content for a map location
 */
export function getTranslatedMapLocation(id: number, lang: Language): MapLocationTranslation | null {
  const translation = mapLocationTranslations[id];
  if (translation) {
    return translation[lang];
  }
  return null;
}

/**
 * Get translated category name for map
 */
export const mapCategoryTranslations: Record<string, Record<Language, string>> = {
  'hotel': { pt: 'Hotéis', en: 'Hotels', es: 'Hoteles' },
  'restaurant': { pt: 'Restaurantes', en: 'Restaurants', es: 'Restaurantes' },
  'attraction': { pt: 'Atrações', en: 'Attractions', es: 'Atracciones' },
  'service': { pt: 'Serviços', en: 'Services', es: 'Servicios' },
};

export function getTranslatedMapCategory(category: string, lang: Language): string {
  const translation = mapCategoryTranslations[category];
  if (translation) {
    return translation[lang];
  }
  return category;
}

