// Base de Conhecimento: Campos do Jordão - SP
// Dados estruturados para IA turística

export const camposJordaoData = {
  overview: {
    name: "Campos do Jordão",
    nickname: "Suíça Brasileira",
    state: "São Paulo",
    altitude: 1628, // metros
    coordinates: {
      lat: -22.739,
      lng: -45.592
    },
    averageTemperature: 13, // °C anual
    description: "Estação climática na Serra da Mantiqueira, conhecida pelo clima frio, arquitetura europeia e paisagens montanhosas."
  },

  pontosTuristicos: [
    {
      id: "capivari",
      nome: "Capivari",
      categoria: "centro-turistico",
      descricao: "Principal área comercial e turística da cidade",
      localizacao: "Centro da cidade",
      caracteristicas: ["Teleférico", "Lojas", "Restaurantes", "Vida noturna", "Arquitetura alpina"],
      precos: {
        estacionamento: { min: 10, max: 15, unidade: "hora" },
        teleferico: 35
      },
      horarios: "Funcionamento 24h (comércio: 9h-22h)",
      melhorEpoca: "Ano todo, especial no inverno",
      tempoVisita: "4-6 horas"
    },
    {
      id: "horto-florestal",
      nome: "Horto Florestal",
      categoria: "natureza",
      descricao: "Parque estadual com trilhas e observação de fauna",
      area: 8341, // hectares
      altitude: { min: 1500, max: 2000 },
      trilhas: "20+ km de trilhas sinalizadas",
      fauna: ["Macacos-prego", "Tucanos", "Bem-te-vis"],
      flora: ["Araucárias", "Pinheiros", "Mata Atlântica"],
      precos: { entrada: 18 },
      horarios: "8h às 17h",
      atividades: ["Caminhada", "Observação de aves", "Piquenique"],
      tempoVisita: "3-4 horas"
    },
    {
      id: "morro-elefante",
      nome: "Morro do Elefante",
      categoria: "mirante",
      descricao: "Vista panorâmica 360° da cidade e serra",
      altitude: 1800,
      teleferico: {
        extensao: 700, // metros
        tempoSubida: 7, // minutos
        preco: 45
      },
      comodidades: ["Restaurante", "Loja de souvenirs", "Estacionamento"],
      horarios: {
        inverno: "9h às 17h",
        verao: "9h às 18h"
      },
      tempoVisita: "1-2 horas"
    },
    {
      id: "pedra-bau",
      nome: "Pedra do Baú",
      categoria: "aventura",
      descricao: "Formação rochosa com uma das vistas mais belas da Serra da Mantiqueira",
      localizacao: "São Bento do Sapucaí (30 km de Campos)",
      altitude: 1950,
      trilha: {
        tempo: "2-3 horas",
        dificuldade: "Moderada a difícil"
      },
      guias: { preco: { min: 80, max: 120 }, unidade: "grupo" },
      melhorEpoca: "Outono e inverno (clima seco)",
      tempoVisita: "Dia inteiro"
    },
    {
      id: "pico-itapeva",
      nome: "Pico do Itapeva",
      categoria: "mirante",
      descricao: "Ponto mais alto da região com vista espetacular",
      altitude: 2030,
      acesso: "Carro até 1.850m + trilha 30min",
      temperatura: "5-10°C menor que na cidade",
      atracao: "Nascer do sol",
      preco: 0, // gratuita
      infraestrutura: ["Estacionamento", "Lanchonete básica"],
      tempoVisita: "2-3 horas"
    },
    {
      id: "ducha-prata",
      nome: "Ducha de Prata",
      categoria: "aventura",
      descricao: "Cachoeira de 20 metros com atividades radicais",
      distancia: "5 km do centro",
      cachoeira: 20, // metros altura
      atividades: [
        { nome: "Tirolesa", preco: 60 },
        { nome: "Arvorismo", preco: 50 },
        { nome: "Trilhas", preco: 0 }
      ],
      gastronomia: "Restaurante especializado em trutas",
      precos: { entrada: 25 },
      horarios: "8h às 18h",
      tempoVisita: "3-4 horas"
    },
    {
      id: "parque-amantikir",
      nome: "Parque Amantikir",
      categoria: "jardins",
      descricao: "Jardins temáticos inspirados em diferentes países",
      area: 60000, // m²
      jardins: 22,
      atracao: "Maior labirinto de arbustos do Brasil",
      precos: {
        adultos: 65,
        criancas: 32
      },
      tempoVisita: "2-3 horas",
      melhorEpoca: "Primavera para flores"
    },
    {
      id: "palacio-boa-vista",
      nome: "Palácio Boa Vista",
      categoria: "historico",
      descricao: "Residência de inverno do Governador de São Paulo",
      estilo: "Arquitetura normanda",
      visitacao: "Quartas a domingos",
      horarios: ["10h às 12h", "14h às 17h"],
      preco: 12,
      acervo: ["Arte sacra", "Mobiliário", "Pinturas"],
      jardins: "Paisagismo europeu",
      tempoVisita: "1-2 horas"
    },
    {
      id: "museu-felicia-leirner",
      nome: "Museu Felícia Leirner",
      categoria: "cultura",
      descricao: "Museu a céu aberto com esculturas",
      obras: 85, // esculturas
      artista: "Felícia Leirner (polonesa)",
      area: 35000, // m²
      preco: 10,
      integracao: "Auditório Cláudio Santoro",
      estilo: "Modernista",
      tempoVisita: "1-2 horas"
    }
  ],

  gastronomia: {
    pratosRegionais: [
      {
        nome: "Truta",
        preparos: ["Grelhada", "Ao molho", "Defumada"],
        preco: { min: 60, max: 120 }
      },
      {
        nome: "Fondue",
        tipos: ["Queijo", "Chocolate", "Carne"],
        preco: { min: 80, max: 150, para: "casal" }
      },
      {
        nome: "Pinhão",
        preparos: ["Cozido", "Assado", "Em risotos"],
        sazonalidade: "Abril a julho"
      },
      {
        nome: "Chocolate Quente",
        especiais: "Com especiarias locais",
        preco: { min: 8, max: 15 }
      },
      {
        nome: "Linguiça de Truta",
        tipo: "Especialidade regional",
        preco: { min: 25, max: 40 }
      }
    ],
    restaurantes: [
      {
        nome: "Baden Baden",
        categoria: "cervejaria",
        especialidade: "Cerveja artesanal e pratos alemães",
        faixaPreco: { min: 80, max: 120, por: "pessoa" },
        ambiente: "Cervejaria com música ao vivo",
        endereco: "Rua Djalma Forjaz, 93 - Capivari",
        horarios: "12h às 2h"
      },
      {
        nome: "Villa Gourmet",
        categoria: "internacional",
        especialidade: "Internacional com toques regionais",
        faixaPreco: { min: 100, max: 150, por: "pessoa" },
        ambiente: "Romântico, lareira",
        destaque: "Fondues e carnes"
      },
      {
        nome: "Confraria do Sabor",
        categoria: "contemporanea",
        chef: "Erick Jacquin",
        faixaPreco: { min: 120, max: 180, por: "pessoa" },
        reservas: "Obrigatórias"
      }
    ],
    chocolaterias: [
      {
        nome: "Araucária Chocolate",
        especialidade: "Chocolate com pinhão",
        produtos: ["Chocolates artesanais", "Trufas"],
        localizacao: "Múltiplas lojas no Capivari",
        precos: { min: 8, max: 25 }
      },
      {
        nome: "Chocolates Montanhês",
        tradicao: "Mais de 30 anos",
        produtos: ["Bombons", "Barras", "Bebidas quentes"],
        precos: { min: 8, max: 25 }
      }
    ],
    cervejasArtesanais: [
      {
        nome: "Baden Baden",
        tipos: ["Pilsen", "Red Ale", "Weiss", "Strong Golden Ale"],
        precos: { min: 12, max: 18, volume: "300ml" },
        tours: "Visita à fábrica com degustação"
      },
      {
        nome: "Chopp Germania",
        estilo: "Alemão tradicional",
        ambiente: "Biergarten",
        precos: { min: 10, max: 15, tipo: "chopp" }
      }
    ]
  },

  hospedagens: {
    hoteisDeLuxo: [
      {
        nome: "Hotel Fazenda Vila Rica",
        categoria: 5,
        diarias: { min: 800, max: 1200, epoca: "alta temporada" },
        comodidades: ["SPA", "Hípica", "Atividades rurais"],
        distanciaCentro: 10 // km
      },
      {
        nome: "Pousada Villa Capivary",
        tipo: "Boutique hotel",
        diarias: { min: 600, max: 900 },
        diferenciais: ["Lareira no quarto", "Vista das montanhas"],
        localizacao: "Próximo ao Capivari"
      },
      {
        nome: "Grande Hotel Campos do Jordão",
        tradicao: "Desde 1940",
        diarias: { min: 500, max: 800 },
        caracteristicas: ["Arquitetura clássica", "Jardins"],
        localizacao: "Centro histórico"
      }
    ],
    pousadas: [
      {
        nome: "Pousada Recanto da Mata",
        ambiente: "Familiar, aconchegante",
        diarias: { min: 300, max: 450 },
        comodidades: ["Lareira", "Café colonial"],
        localizacao: "Vila Inglesa"
      },
      {
        nome: "Pousada do Zezinho",
        estilo: "Montanha",
        diarias: { min: 200, max: 350 },
        destaque: "Café da manhã regional",
        ambiente: "Familiar"
      }
    ],
    chales: [
      {
        nome: "Chalés da Montanha",
        capacidade: { min: 2, max: 6 },
        precos: { min: 400, max: 600, por: "dia" },
        comodidades: ["Lareira", "Cozinha equipada"],
        localizacao: "Vários bairros"
      },
      {
        nome: "Vila Chã Chalés",
        estilo: "Suíço",
        capacidade: { min: 4, max: 8 },
        precos: { min: 500, max: 800, por: "dia" },
        diferencial: "Vista panorâmica"
      }
    ]
  },

  eventos: [
    {
      nome: "Festival de Inverno",
      mes: "julho",
      duracao: 30, // dias
      publico: 500000,
      tipos: ["Música clássica", "Dança", "Teatro"],
      locais: ["Auditório Cláudio Santoro", "Praças", "Hotéis"],
      ingressos: { min: 40, max: 200 },
      nivel: "Internacional e nacional"
    },
    {
      nome: "Festa da Cerejeira",
      mes: "setembro",
      duracao: 15, // dias
      tradicao: "Influência japonesa",
      atividades: ["Exposições", "Culinária", "Artesanato"],
      entrada: "Gratuita para maioria dos eventos"
    },
    {
      nome: "Encontro de Motos (Motofest)",
      mes: "agosto",
      publico: 30000,
      duracao: 4, // dias
      atividades: ["Shows", "Exposições", "Trilhas"],
      local: "Parque Capivari"
    },
    {
      nome: "Festival Gastronômico",
      mes: "maio",
      nome_oficial: "Sabores de Campos",
      participantes: 40, // restaurantes
      especialidade: "Pratos com ingredientes locais",
      caracteristica: "Menus degustação com preços especiais"
    },
    {
      nome: "Festival de Chocolate",
      mes: "junho",
      atividades: ["Workshops", "Degustações", "Competições"],
      local: "Capivari",
      publico_alvo: "Famílias e casais",
      entrada: { min: 20, max: 40 }
    }
  ],

  atividades: {
    trilhas: [
      {
        nome: "Trilha do Elefante",
        distancia: 3, // km
        tempo: 90, // minutos
        dificuldade: "Fácil",
        vista: "Cidade e vale"
      },
      {
        nome: "Trilha da Cachoeira",
        distancia: 2.5, // km
        tempo: 45, // minutos
        destino: "Ducha de Prata",
        dificuldade: "Fácil"
      },
      {
        nome: "Trilha do Pico Agudo",
        distancia: 8, // km
        tempo: 270, // minutos (4-5 horas)
        dificuldade: "Difícil",
        altitude: 2100
      }
    ],
    arvorismo: {
      empresa: "Radical Aventura",
      circuitos: 3,
      precos: { min: 60, max: 100 },
      idadeMinima: 6,
      duracao: { min: 60, max: 120 } // minutos
    },
    passeioTrem: {
      nome: "Estrada de Ferro Campos do Jordão",
      trajeto: "Capivari - Santo Antônio do Pinhal",
      distancia: 47, // km
      duracao: 150, // minutos (ida e volta)
      precos: { min: 80, max: 120 },
      funcionamento: "Fins de semana e feriados"
    },
    compras: [
      {
        local: "Boulevard Genève",
        produtos: ["Roupas de inverno", "Chocolates", "Artesanato"],
        tipo: "Shopping a céu aberto",
        localizacao: "Capivari"
      },
      {
        local: "Mercado Municipal",
        produtos: ["Produtos locais", "Pinhão", "Doces"],
        horario: "7h às 18h",
        localizacao: "Centro"
      }
    ],
    vidaNoturna: [
      {
        nome: "Café Palacete",
        ambiente: "Música ao vivo, dança",
        publicoAlvo: "25+ anos",
        horario: "21h às 2h"
      },
      {
        nome: "Choperia Baden Baden",
        estilo: "Alemão, música",
        ambiente: "Familiar até 22h, jovem após",
        especialidade: "Cervejas artesanais"
      }
    ]
  },

  informacoesPraticas: {
    melhorEpoca: {
      inverno: {
        meses: ["junho", "julho", "agosto"],
        temperatura: { min: 3, max: 15 },
        vantagens: ["Festival de Inverno", "Clima seco"],
        desvantagens: ["Preços altos", "Multidões"],
        recomendacao: "Reservas antecipadas"
      },
      outono: {
        meses: ["março", "abril", "maio"],
        temperatura: { min: 8, max: 20 },
        vantagens: ["Preços médios", "Menos movimento"],
        paisagem: "Folhas amareladas",
        eventos: "Festival Gastronômico"
      },
      primavera: {
        meses: ["setembro", "outubro", "novembro"],
        temperatura: { min: 10, max: 22 },
        vantagens: ["Flores", "Festa da Cerejeira"],
        clima: "Agradável para caminhadas"
      },
      verao: {
        meses: ["dezembro", "janeiro", "fevereiro"],
        temperatura: { min: 15, max: 25 },
        vantagens: ["Preços baixos", "Menos frio"],
        desvantagens: ["Pode chover mais"],
        recomendacao: "Para quem não gosta de frio intenso"
      }
    },
    comoChegar: {
      deSaoPaulo: {
        distancia: 173, // km
        tempo: { min: 150, max: 180 }, // minutos
        pedagios: { min: 35, max: 45 }, // ida
        rotas: ["Via Dutra + SP-123", "Via Fernão Dias + SP-46"]
      },
      deAviao: {
        aeroporto: "São José dos Campos",
        distanciaAeroporto: 80, // km
        transfer: { min: 150, max: 200 }, // por trecho
        tempoViagem: 80 // minutos
      },
      deOnibus: {
        empresas: ["Pássaro Marron", "Util"],
        preco: { min: 45, max: 65 },
        duracao: { min: 210, max: 240 }, // minutos
        frequencia: 120 // minutos (a cada 2 horas)
      }
    },
    transporteLocal: {
      carro: {
        vantagens: "Mobilidade para pontos turísticos",
        estacionamento: { min: 8, max: 15, unidade: "hora" },
        combustivel: "15% mais caro que SP",
        condicaoEstradas: "Bem conservadas"
      },
      taxiUber: {
        corridasCentro: { min: 15, max: 25 },
        pontosTuristicos: { min: 30, max: 50 },
        disponibilidade: "Boa no centro, limitada nos bairros"
      },
      onibus: {
        preco: 4.5,
        cobertura: "Conectam principais bairros",
        horario: "6h às 22h"
      }
    },
    seguranca: {
      indices: "Baixos, cidade segura",
      cuidados: ["Trânsito em curvas", "Neblina"],
      emergencias: {
        policiamilitar: 190,
        bombeiros: 193
      },
      hospital: "Santa Casa de Campos do Jordão"
    },
    precosMedios2026: {
      alimentacao: {
        cafeManha: { min: 25, max: 40 },
        almoco: { min: 50, max: 80 },
        jantar: { min: 70, max: 120 },
        lanche: { min: 15, max: 25 }
      },
      hospedagem: {
        pousadaSimples: { min: 150, max: 250 },
        pousadaBoa: { min: 300, max: 500 },
        hotelLuxo: { min: 600, max: 1200 }
      },
      atividades: {
        teleferico: { min: 35, max: 45 },
        trilhasGuiadas: { min: 80, max: 120, unidade: "grupo" },
        parques: { min: 18, max: 65 }
      },
      compras: {
        chocolateArtesanal: { min: 8, max: 25 },
        malhas: { min: 80, max: 200 },
        artesanato: { min: 20, max: 100 },
        souvenirs: { min: 15, max: 50 }
      }
    },
    dicasImportantes: [
      "Reservas obrigatórias em alta temporada",
      "Agasalho mesmo no verão (noites frias)",
      "Protetor solar: altitude intensifica radiação",
      "Hidratação: ar seco exige mais água",
      "Nem todos os lugares aceitam cartão",
      "Boa cobertura de internet no centro, limitada na serra"
    ],
    contatosUteis: {
      prefeitura: "(12) 3669-7000",
      turismo: "(12) 3669-7000",
      policiaCivil: "(12) 3669-7090",
      hospital: "(12) 3669-7200",
      rodoviaria: "(12) 3669-1838"
    }
  },

  curiosidades: {
    origemNome: {
      homenagem: "Engenheiro Emílio Schnoor (origem alemã)",
      campos: "Referência aos campos de altitude",
      jordao: "Homenagem ao brasileiro Matheus da Costa Pinto Jordão"
    },
    arquitetura: {
      influencia: "Imigrantes europeus século XIX-XX",
      caracteristicas: [
        "Telhados inclinados para neve",
        "Uso de madeira maciça",
        "Janelas com venezianas",
        "Torres e frontões decorados"
      ],
      preservacao: "Lei municipal protege estilo arquitetônico"
    },
    clima: {
      altitude: 1628, // metros
      temperaturaMedia: 13, // °C anual
      geadas: "Comuns entre maio e setembro",
      neblina: "Presente em 60% dos dias",
      unicidade: "Único clima subtropical de altitude do Brasil"
    },
    sanatórios: {
      era: "1920-1960",
      proposito: "Tratamento de tuberculose",
      principal: "Sanatório Ezra",
      legado: "Influenciou arquitetura da cidade",
      atualmente: "Hotéis e centros culturais"
    },
    culturaLocal: {
      influenciaAlema: "45% da população",
      festivais: "Oktoberfest regional",
      culinaria: "Fusão alemã-brasileira",
      artesanato: ["Malhas", "Madeira", "Chocolate"],
      musica: "Bandas tradicionais alemãs"
    }
  }
};

// Função para buscar informações específicas
export function buscarInformacao(categoria: string, item?: string) {
  const data = camposJordaoData;
  
  switch(categoria.toLowerCase()) {
    case 'pontos-turisticos':
      return item ? 
        data.pontosTuristicos.find(p => p.id === item || p.nome.toLowerCase().includes(item.toLowerCase())) :
        data.pontosTuristicos;
    
    case 'gastronomia':
      return data.gastronomia;
    
    case 'hospedagens':
      return data.hospedagem;
    
    case 'eventos':
      return item ?
        data.eventos.find(e => e.nome.toLowerCase().includes(item.toLowerCase())) :
        data.eventos;
    
    case 'atividades':
      return data.atividades;
    
    case 'praticas':
      return data.informacoesPraticas;
    
    case 'curiosidades':
      return data.curiosidades;
    
    default:
      return data;
  }
}

// Função para filtrar por preço
export function filtrarPorPreco(categoria: string, precoMax: number) {
  const data = camposJordaoData;
  
  switch(categoria) {
    case 'restaurantes':
      return data.gastronomia.restaurantes.filter(r => r.faixaPreco.min <= precoMax);
    
    case 'hospedagens':
      return {
        hoteis: data.hospedagens.hoteisDeLuxo.filter(h => h.diarias.min <= precoMax),
        pousadas: data.hospedagens.pousadas.filter(p => p.diarias.min <= precoMax),
        chales: data.hospedagens.chales.filter(c => c.precos.min <= precoMax)
      };
    
    case 'atividades':
      return {
        pontosTuristicos: data.pontosTuristicos.filter(p => 
          !p.precos || (typeof p.precos.entrada === 'number' && p.precos.entrada <= precoMax)
        )
      };
    
    default:
      return null;
  }
}

// Função para buscar por época do ano
export function buscarPorEpoca(mes: string) {
  const data = camposJordaoData;
  const epoca = data.informacoesPraticas.melhorEpoca;
  const eventos = data.eventos.filter(e => e.mes.toLowerCase() === mes.toLowerCase());
  
  let estacao = '';
  if (['dezembro', 'janeiro', 'fevereiro'].includes(mes.toLowerCase())) {
    estacao = 'verao';
  } else if (['março', 'abril', 'maio'].includes(mes.toLowerCase())) {
    estacao = 'outono';
  } else if (['junho', 'julho', 'agosto'].includes(mes.toLowerCase())) {
    estacao = 'inverno';
  } else if (['setembro', 'outubro', 'novembro'].includes(mes.toLowerCase())) {
    estacao = 'primavera';
  }
  
  return {
    estacao: epoca[estacao] || null,
    eventos: eventos,
    recomendacoes: epoca[estacao]?.recomendacao || 'Época agradável para visita'
  };
}

export default camposJordaoData;