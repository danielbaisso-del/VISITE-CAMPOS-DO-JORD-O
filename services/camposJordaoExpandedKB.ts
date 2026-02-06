// =============================================================================
// BASE DE CONHECIMENTO EXPANDIDA - CAMPOS DO JORDÃO 2026
// Versão Premium para IA Turística Inteligente
// =============================================================================

export const CAMPOS_JORDAO_KB = {
  // INFORMAÇÕES BÁSICAS DA CIDADE
  cidade: {
    nome: 'Campos do Jordão',
    estado: 'São Paulo',
    pais: 'Brasil',
    apelidos: ['Suíça Brasileira', 'Estância Climática de Campos do Jordão'],
    altitude: 1628, // metros - município mais alto do Brasil
    coordenadas: { lat: -22.739, lng: -45.588 },
    area_km2: 290.52,
    populacao: 47956, // censo 2025
    densidade_demografica: 165.1, // hab/km²
    distancia_sp: 173, // km da capital
    fundacao: '29 de abril de 1874',
    emancipacao: '19 de junho de 1934',
    prefeito_atual: 'Marcelo Padovan (PSDB)',
    gentilico: 'jordanense',
    codigo_ddd: '12',
    cep_inicial: '12460',
    fuso_horario: 'UTC-3',
    
    // INFORMAÇÕES CLIMÁTICAS DETALHADAS
    clima: {
      tipo: 'Temperado oceânico (Cfb)',
      temperatura_media_anual: 14.5, // °C
      temperatura_minima_recordista: -7.3, // °C em 1979
      temperatura_maxima_recordista: 31, // °C em 2023
      umidade_relativa: 85.2, // % média anual
      precipitacao_anual: 1565.4, // mm
      estacoes: {
        verao: {
          periodo: 'Dezembro a Março',
          temperatura_media: 20.7, // °C
          caracteristicas: 'Chuvas de tarde, temperaturas amenas, mais movimento turístico',
          precipitacao_media: 224.5 // mm
        },
        outono: {
          periodo: 'Março a Junho',
          temperatura_media: 12.8, // °C
          caracteristicas: 'Clima seco, temperaturas baixas, ideal para caminhadas',
          precipitacao_media: 68.7 // mm
        },
        inverno: {
          periodo: 'Junho a Setembro',
          temperatura_media: 7.8, // °C
          caracteristicas: 'Alta temporada turística, noites geladas, geadas, Festival de Inverno',
          precipitacao_media: 42.0, // mm
          temperatura_minima_comum: 0 // °C
        },
        primavera: {
          periodo: 'Setembro a Dezembro',
          temperatura_media: 16.4, // °C
          caracteristicas: 'Floração das cerejeiras, clima agradável, menos movimento',
          precipitacao_media: 139.9 // mm
        }
      },
      melhor_epoca: {
        frio_intenso: 'Julho (alta temporada)',
        clima_ameno: 'Abril-Maio e Setembro-Outubro',
        menos_movimento: 'Março-Abril e Novembro',
        mais_chuva: 'Janeiro-Fevereiro',
        mais_seco: 'Junho-Agosto'
      }
    },

    // BAIRROS E REGIÕES
    regioes: {
      capivari: {
        nome: 'Vila Capivari',
        caracteristicas: 'Centro turístico principal, arquitetura alpina, vida noturna',
        principais_ruas: ['Boulevard Genève', 'Rua Djalma Forjaz', 'Av. Macedo Soares'],
        atrações: ['Bondinho', 'Igreja do Rosário', 'Lojas e restaurantes']
      },
      abernessia: {
        nome: 'Abernéssia',
        caracteristicas: 'Centro administrativo, residencial, comércio local',
        pontos_interesse: ['Palácio do Governo', 'Centro de Convenções']
      },
      vila_inglesa: {
        nome: 'Vila Inglesa',
        caracteristicas: 'Residencial, casas históricas, atmosfera tranquila'
      },
      jaguaribe: {
        nome: 'Jaguaribe',
        caracteristicas: 'Área residencial, proximidade com a natureza'
      },
      alto_boa_vista: {
        nome: 'Alto da Boa Vista',
        caracteristicas: 'Vista panorâmica, área residencial de alto padrão'
      }
    }
  },

  // PONTOS TURÍSTICOS DETALHADOS
  atracoes: {
    capivari: {
      nome: 'Vila Capivari',
      tipo: 'Centro Turístico',
      descricao: 'Coração turístico da cidade com arquitetura alpina, lojas, restaurantes e vida noturna',
      endereco: 'Centro de Campos do Jordão',
      horario_funcionamento: '24 horas (lojas: 9h às 22h)',
      tempo_visita: '2-4 horas',
      preco: 'Gratuito (consumo nos estabelecimentos)',
      acessibilidade: 'Parcial',
      estacionamento: 'Pago (R$ 5-15/hora)',
      destacado: true,
      categoria: 'imperdivel',
      dicas: [
        'Visite à noite para ver a iluminação especial',
        'Experimente o chocolate quente nas lojas',
        'Aproveite os fins de semana para eventos na praça'
      ],
      atrações_proximas: ['Bondinho', 'Morro do Elefante', 'Igreja do Rosário']
    },

    morro_elefante: {
      nome: 'Morro do Elefante',
      tipo: 'Mirante/Teleférico',
      descricao: 'Vista panorâmica espetacular da cidade e região, acessível por bondinho ou trilha',
      endereco: 'Vila Capivari - Estação do Bondinho',
      horario_funcionamento: 'Diário: 9h às 17h30',
      tempo_visita: '1-2 horas',
      preco: {
        bondinho_ida_volta: 'R$ 35',
        bondinho_crianca: 'R$ 17',
        trilha: 'Gratuito'
      },
      altura: 1800, // metros
      vista_alcance: '360 graus da região',
      destacado: true,
      categoria: 'imperdivel',
      dicas: [
        'Vá preferencialmente no final da tarde para o pôr do sol',
        'Leve agasalho, no topo faz mais frio',
        'A trilha tem dificuldade média (45 min subida)'
      ]
    },

    horto_florestal: {
      nome: 'Horto Florestal',
      tipo: 'Parque Estadual',
      descricao: 'Área de preservação com trilhas, araucárias centenárias e cachoeiras',
      endereco: 'Av. Pedro Paulo, s/n',
      horario_funcionamento: 'Diário: 8h às 17h',
      tempo_visita: '2-4 horas',
      preco: 'R$ 15 (adultos), R$ 7,50 (estudantes)',
      area: '8.341 hectares',
      trilhas: {
        cachoeira: { distancia: '1,5 km', dificuldade: 'fácil', tempo: '30 min' },
        araucarias: { distancia: '2 km', dificuldade: 'fácil', tempo: '45 min' },
        campos_naturais: { distancia: '3 km', dificuldade: 'média', tempo: '1h' }
      },
      fauna: ['Esquilos', 'Quatis', 'Diversas aves'],
      flora: ['Araucárias', 'Pinheiros', 'Mata Atlântica'],
      categoria: 'natureza'
    },

    pedra_do_bau: {
      nome: 'Pedra do Baú',
      tipo: 'Formação Rochosa/Trilha',
      descricao: 'Impressionante formação rochosa com visual único e trilhas desafiadoras',
      endereco: 'Distrito de São Bento do Sapucaí (30 min de carro)',
      horario_funcionamento: 'Diário: nascer ao pôr do sol',
      tempo_visita: '4-6 horas (trilha completa)',
      preco: 'R$ 20 (taxa de preservação)',
      altura_formacao: 1950, // metros
      dificuldade: 'Difícil a Extrema',
      distancia_trilha: '5 km (ida)',
      categoria: 'aventura',
      equipamentos_necessarios: ['Calçado adequado', 'Água', 'Protetor solar'],
      restricoes: 'Não recomendado para crianças menores de 12 anos'
    },

    ducha_de_prata: {
      nome: 'Ducha de Prata',
      tipo: 'Cachoeira',
      descricao: 'Cachoeira de 20 metros de altura com fácil acesso e estrutura turística',
      endereco: 'Estrada da Ducha de Prata, km 2',
      horario_funcionamento: 'Diário: 8h às 18h',
      tempo_visita: '1-2 horas',
      preco: 'R$ 10',
      altura_queda: 20, // metros
      acessibilidade: 'Boa',
      estrutura: ['Estacionamento', 'Lanchonete', 'Banheiros'],
      categoria: 'natureza'
    },

    palacio_boa_vista: {
      nome: 'Palácio Boa Vista',
      tipo: 'Museu/Palácio',
      descricao: 'Residência oficial do Governador com importante acervo artístico brasileiro',
      endereco: 'Av. Adhemar de Barros, s/n - Alto da Boa Vista',
      horario_funcionamento: 'Qua a Dom: 10h às 12h / 14h às 17h',
      tempo_visita: '1-2 horas',
      preco: 'Gratuito',
      acervo: '1.500 obras de arte',
      destaques: ['Arte colonial brasileira', 'Modernismo nacional', 'Jardins paisagísticos'],
      categoria: 'cultura',
      agendamento: 'Recomendado para grupos'
    },

    museu_felicia_leirner: {
      nome: 'Museu Felícia Leirner',
      tipo: 'Museu a Céu Aberto',
      descricao: 'Esculturas da artista Felícia Leirner em meio à natureza exuberante',
      endereco: 'Av. Dr. Luis Arrobas Martins, 1880',
      horario_funcionamento: 'Ter a Dom: 9h às 18h',
      tempo_visita: '1-1.5 horas',
      preco: 'R$ 12',
      esculturas: 84,
      area: '35 mil m²',
      categoria: 'cultura',
      dicas: [
        'Ideal para fotografias',
        'Combine com visita ao Auditório Cláudio Santoro'
      ]
    },

    parque_amantikir: {
      nome: 'Parque Amantikir',
      tipo: 'Jardim Temático',
      descricao: 'Jardins inspirados em paisagismos mundiais com labirintos e vistas panorâmicas',
      endereco: 'Av. Pedro Paulo, km 3',
      horario_funcionamento: 'Ter a Dom: 8h30 às 18h',
      tempo_visita: '2-3 horas',
      preco: 'R$ 45',
      area: '60 mil m²',
      jardins_tematicos: ['Japonês', 'Francês', 'Inglês', 'Australiano'],
      destaques: ['Labirinto', 'Vista panorâmica', 'Café com vista'],
      categoria: 'natureza',
      acessibilidade: 'Limitada (terreno irregular)'
    },

    pico_itapeva: {
      nome: 'Pico do Itapeva',
      tipo: 'Mirante Natural',
      descricao: 'Ponto mais alto da região com vista de 360° e nasceres do sol espetaculares',
      endereco: 'Estrada do Pico do Itapeva (20 km do centro)',
      horario_funcionamento: 'Diário: 24h (nascer do sol recomendado)',
      tempo_visita: '2-3 horas',
      preco: 'Gratuito',
      altitude: 2030, // metros - ponto mais alto
      vista: 'Vale do Paraíba e Serra da Mantiqueira',
      categoria: 'natureza',
      dicas: [
        'Chegue antes do nascer do sol (6h)',
        'Leve agasalho mesmo no verão',
        'Estrada de terra, carro com tração recomendado'
      ]
    }
  },

  // GASTRONOMIA DETALHADA
  gastronomia: {
    pratos_tipicos: {
      fondue: {
        nome: 'Fondue (Queijo, Chocolate, Carne)',
        preco_medio: 'R$ 80-150 para 2 pessoas',
        onde_encontrar: ['Churrascaria Baden Baden', 'Restaurante Krokodillo', 'Choperia Baden Baden'],
        descricao: 'Prato símbolo da cidade, ideal para o clima frio'
      },
      truta: {
        nome: 'Truta Grelhada/Assada',
        preco_medio: 'R$ 45-80',
        onde_encontrar: ['Restaurante Pontremoli', 'Ristorante Primo Villaggio'],
        descricao: 'Peixe de água doce criado localmente'
      },
      pinhao: {
        nome: 'Pinhão Cozido/Assado',
        preco_medio: 'R$ 8-15 (porção)',
        onde_encontrar: ['Vendedores de rua', 'Feira do Capivari'],
        descricao: 'Semente da araucária, tradicionalmente consumida no inverno'
      },
      chocolate_quente: {
        nome: 'Chocolate Quente Gourmet',
        preco_medio: 'R$ 12-25',
        onde_encontrar: ['Chocolate Araucária', 'Chocolates Montanhês', 'Café Palácio'],
        descricao: 'Bebida obrigatória na cidade, várias versões gourmet'
      },
      vinho_quente: {
        nome: 'Vinho Quente (Glögg)',
        preco_medio: 'R$ 15-30',
        onde_encontrar: ['Festival de Inverno', 'Baden Baden', 'Cervejaria Capybara'],
        descricao: 'Bebida tradicional europeia adaptada ao clima local'
      }
    },

    restaurantes_categoria: {
      alta_gastronomia: [
        {
          nome: 'Villa Gourmet',
          especialidade: 'Culinária Internacional',
          preco_medio: 'R$ 120-200/pessoa',
          destaque: 'Menu degustação premiado'
        },
        {
          nome: 'Restaurante Krokodillo',
          especialidade: 'Fondue e carnes',
          preco_medio: 'R$ 100-180/pessoa',
          destaque: 'Ambiente romântico, fondue premiado'
        }
      ],
      tradicional: [
        {
          nome: 'Churrascaria Baden Baden',
          especialidade: 'Carnes e fondues',
          preco_medio: 'R$ 80-130/pessoa',
          destaque: 'Tradição familiar, ambiente aconchegante'
        },
        {
          nome: 'Restaurante Pontremoli',
          especialidade: 'Culinária italiana e trutas',
          preco_medio: 'R$ 60-120/pessoa',
          destaque: 'Vista panorâmica, pratos fartos'
        }
      ],
      casual: [
        {
          nome: 'Café Palácio',
          especialidade: 'Cafeteria e doces',
          preco_medio: 'R$ 25-50/pessoa',
          destaque: 'Melhor chocolate quente da cidade'
        },
        {
          nome: 'Pizzaria Mamma Mia',
          especialidade: 'Pizzas e massas',
          preco_medio: 'R$ 40-80/pessoa',
          destaque: 'Ambiente familiar, bom custo-benefício'
        }
      ]
    },

    chocolaterias: [
      {
        nome: 'Chocolate Araucária',
        especialidades: ['Trufas artesanais', 'Barras gourmet', 'Fondue'],
        preco_medio: 'R$ 8-25 (unidade)',
        diferencial: 'Fábrica com visita guiada'
      },
      {
        nome: 'Chocolates Montanhês',
        especialidades: ['Bombons licorizados', 'Ovos de páscoa'],
        preco_medio: 'R$ 12-30 (unidade)',
        diferencial: 'Receitas tradicionais alemãs'
      },
      {
        nome: 'Doce Vida Chocolates',
        especialidades: ['Chocolate belga', 'Doces diet'],
        preco_medio: 'R$ 10-35 (unidade)',
        diferencial: 'Opções sem açúcar'
      }
    ],

    cervejas_artesanais: [
      {
        nome: 'Cervejaria Baden Baden',
        estilos: ['Pilsen', 'Red Ale', 'Weiss'],
        preco_medio: 'R$ 12-18 (garrafa)',
        diferencial: 'Primeira cervejaria artesanal da cidade'
      },
      {
        nome: 'Cervejaria Capybara',
        estilos: ['IPA', 'Stout', 'Saison'],
        preco_medio: 'R$ 15-22 (garrafa)',
        diferencial: 'Cervejas sazonais exclusivas'
      }
    ]
  },

  // HOSPEDAGENS POR CATEGORIA
  hospedagens: {
    hoteis_luxo: [
      {
        nome: 'Toriba Hotel',
        categoria: '5 estrelas',
        diaria_baixa_temporada: 'R$ 800-1.200',
        diaria_alta_temporada: 'R$ 1.500-2.500',
        diferenciais: ['Spa completo', 'Golf', 'Gastronomia premiada'],
        estrutura: ['Piscina aquecida', 'Quadras esportivas', 'Kids club']
      },
      {
        nome: 'Hotel Vila Inglesa',
        categoria: '5 estrelas',
        diaria_baixa_temporada: 'R$ 600-1.000',
        diaria_alta_temporada: 'R$ 1.200-2.000',
        diferenciais: ['Arquitetura vitoriana', 'Jardins paisagísticos'],
        estrutura: ['Spa', 'Restaurante', 'Bar']
      }
    ],

    hoteis_executivos: [
      {
        nome: 'Grande Hotel Campos do Jordão',
        categoria: '4 estrelas',
        diaria_baixa_temporada: 'R$ 350-600',
        diaria_alta_temporada: 'R$ 700-1.200',
        localizacao: 'Centro - Vila Capivari',
        diferenciais: ['Localização central', 'Centro de eventos']
      },
      {
        nome: 'Hotel Frontenac',
        categoria: '4 estrelas',
        diaria_baixa_temporada: 'R$ 300-500',
        diaria_alta_temporada: 'R$ 600-1.000',
        diferenciais: ['Tradicional', 'Ambiente familiar']
      }
    ],

    pousadas_charme: [
      {
        nome: 'Pousada Villa Capivari',
        categoria: 'Boutique',
        diaria_baixa_temporada: 'R$ 250-400',
        diaria_alta_temporada: 'R$ 500-800',
        diferenciais: ['Design contemporâneo', 'Localização premium']
      },
      {
        nome: 'Pousada Das Hortênsias',
        categoria: 'Charme',
        diaria_baixa_temporada: 'R$ 200-350',
        diaria_alta_temporada: 'R$ 400-650',
        diferenciais: ['Jardim florido', 'Café da manhã artesanal']
      }
    ],

    chales_casas: [
      {
        tipo: 'Chalé para 4 pessoas',
        diaria_baixa_temporada: 'R$ 300-500',
        diaria_alta_temporada: 'R$ 600-1.200',
        vantagens: ['Privacidade', 'Lareira', 'Cozinha completa'],
        onde_encontrar: ['Airbnb', 'Booking', 'Imobiliárias locais']
      },
      {
        tipo: 'Casa de montanha (6-8 pessoas)',
        diaria_baixa_temporada: 'R$ 500-800',
        diaria_alta_temporada: 'R$ 1.000-2.000',
        vantagens: ['Grupos', 'Área gourmet', 'Vista panorâmica'],
        onde_encontrar: ['Plataformas especializadas', 'Indicações locais']
      }
    ]
  },

  // EVENTOS ANUAIS DETALHADOS
  eventos: {
    festival_inverno: {
      nome: 'Festival de Inverno de Campos do Jordão',
      periodo: 'Julho (3 semanas)',
      descricao: 'Maior festival de música clássica da América Latina',
      local: 'Auditório Cláudio Santoro',
      publico_esperado: '100.000+ pessoas',
      programacao: ['Concertos sinfônicos', 'Música de câmara', 'Óperas', 'Masterclasses'],
      ingressos: 'R$ 30-200',
      historia: 'Criado em 1970, inspirado no Festival de Tanglewood',
      artistas: 'Orquestras nacionais e internacionais'
    },

    festa_cerejeira: {
      nome: 'Festa da Cerejeira em Flor',
      periodo: 'Julho-Agosto (6 semanas)',
      descricao: 'Celebração da cultura japonesa durante a floração das cerejeiras',
      local: 'Parque da Cerejeira',
      atividades: ['Apresentações culturais', 'Gastronomia japonesa', 'Workshops'],
      entrada: 'R$ 20',
      florescimento: 'Dependente do clima, geralmente julho',
      origem: 'Influência da imigração japonesa na região'
    },

    encontro_motos: {
      nome: 'Motofest Campos do Jordão',
      periodo: 'Agosto (fim de semana)',
      descricao: 'Encontro de motociclistas com shows e exposições',
      publico_esperado: '50.000+ motociclistas',
      programacao: ['Shows de rock', 'Exposição de motos', 'Trilhas'],
      entrada: 'R$ 40-80',
      camping: 'Área especial para motorhomes e barracas'
    },

    festival_gastronomico: {
      nome: 'Festival de Inverno Gourmet',
      periodo: 'Maio-Junho (4 semanas)',
      descricao: 'Celebração da gastronomia local com menus especiais',
      participantes: '30+ restaurantes',
      valores: 'Menus especiais de R$ 69-199',
      novidades: 'Pratos criados especialmente para o festival'
    },

    reveillon: {
      nome: 'Réveillon de Campos do Jordão',
      periodo: '31 de dezembro',
      descricao: 'Festa de passagem de ano na Vila Capivari',
      programacao: ['Shows musicais', 'Queima de fogos', 'Festa na praça'],
      publico: '20.000+ pessoas',
      estrutura: 'Palco principal + food trucks'
    }
  },

  // ATIVIDADES E AVENTURAS
  atividades: {
    aventura: {
      arvorismo: {
        nome: 'Arvorismo e Tirolesa',
        locais: ['Tarundu', 'Adventure Club'],
        preco: 'R$ 60-120',
        tempo_atividade: '2-3 horas',
        idade_minima: '8 anos',
        equipamentos: 'Fornecidos no local'
      },
      trilhas: {
        cachoeira_ducha: {
          nome: 'Trilha da Ducha de Prata',
          distancia: '1 km',
          dificuldade: 'Fácil',
          tempo: '30 minutos',
          atracao: 'Cachoeira de 20 metros'
        },
        pedra_do_bau: {
          nome: 'Trilha da Pedra do Baú',
          distancia: '5 km',
          dificuldade: 'Difícil',
          tempo: '3-4 horas',
          equipamento_necessario: ['Bota de trilha', 'Água', 'Protetor solar']
        },
        pico_itapeva: {
          nome: 'Trilha do Pico do Itapeva',
          distancia: '2 km',
          dificuldade: 'Média',
          tempo: '1 hora',
          melhor_horario: 'Nascer do sol (6h)'
        }
      }
    },

    cultura_lazer: {
      trem_turistico: {
        nome: 'Estrada de Ferro Campos do Jordão',
        trajeto: 'Campos do Jordão → Santo Antônio do Pinhal',
        distancia: '47 km',
        tempo_viagem: '2h30 (ida e volta)',
        preco: 'R$ 45-75',
        horarios: 'Fins de semana: 9h, 13h30',
        paisagens: 'Serra da Mantiqueira, mata atlântica'
      },
      compras: {
        magalu: {
          local: 'Vila Capivari',
          produtos: ['Malhas', 'Roupas de inverno', 'Souvenirs'],
          horario: '9h às 22h'
        },
        feira_artesanato: {
          local: 'Praça da Vila Capivari',
          quando: 'Fins de semana e feriados',
          produtos: ['Artesanato local', 'Doces', 'Lembrancinhas']
        }
      }
    }
  },

  // INFORMAÇÕES PRÁTICAS DETALHADAS
  informacoes_praticas: {
    como_chegar: {
      carro: {
        de_sao_paulo: {
          distancia: '173 km',
          tempo: '2h30-3h',
          rota: 'Marginal Tietê → Rodovia Ayrton Senna → SP-70 → SP-123',
          pedagio: 'R$ 25-35 (total)'
        },
        de_rio: {
          distancia: '320 km',
          tempo: '4h-5h',
          rota: 'BR-116 → SP-123',
          pedagio: 'R$ 45-60'
        }
      },
      aviao: {
        aeroporto_mais_proximo: 'São José dos Campos (SJK)',
        distancia_aeroporto: '85 km (1h30 de carro)',
        transfer: 'R$ 200-300',
        alternativa: 'Guarulhos (GRU) - 180 km (2h30)'
      },
      onibus: {
        de_sao_paulo: {
          empresa: 'Pássaro Marrom',
          tempo: '3h30',
          preco: 'R$ 55-85',
          frequencia: '5 horários/dia'
        },
        terminal_rodoviario: 'Rodoviária de Campos do Jordão - Centro'
      }
    },

    transporte_local: {
      taxi: 'R$ 15-30 (centro)',
      uber: 'Disponível, R$ 12-25',
      carro_aluguel: 'R$ 80-150/dia',
      onibus_urbano: 'R$ 4,50',
      walking: 'Vila Capivari é compacta e caminhável'
    },

    custos_estimados: {
      orcamento_economico: {
        hospedagem: 'R$ 150-250/noite',
        alimentacao: 'R$ 80-120/dia',
        atividades: 'R$ 50-100/dia',
        transporte: 'R$ 30-50/dia',
        total_dia: 'R$ 310-520/pessoa'
      },
      orcamento_medio: {
        hospedagem: 'R$ 300-500/noite',
        alimentacao: 'R$ 150-250/dia',
        atividades: 'R$ 100-200/dia',
        transporte: 'R$ 50-80/dia',
        total_dia: 'R$ 600-1030/pessoa'
      },
      orcamento_luxo: {
        hospedagem: 'R$ 800-1500/noite',
        alimentacao: 'R$ 300-500/dia',
        atividades: 'R$ 200-400/dia',
        transporte: 'R$ 100-200/dia',
        total_dia: 'R$ 1400-2600/pessoa'
      }
    },

    dicas_importantes: {
      roupa: 'Sempre leve agasalho, mesmo no verão as noites são frias',
      estacionamento: 'Centro fica congestionado, chegue cedo ou use apps',
      reservas: 'Essencial reservar hospedagem com antecedência em julho',
      pagamento: 'Maioria aceita cartão, mas leve dinheiro para vendedores de rua',
      internet: 'Boa cobertura 4G, Wi-Fi disponível na maioria dos estabelecimentos',
      seguranca: 'Cidade muito segura, mas atenção com pertences em locais movimentados'
    },

    contatos_emergencia: {
      bombeiros: '193',
      policia: '190',
      samu: '192',
      defesa_civil: '199',
      policia_turistica: '(12) 3663-2162',
      hospital: 'Santa Casa de Campos do Jordão - (12) 3668-9000'
    },

    melhor_epoca_visitacao: {
      alta_temporada: {
        periodo: 'Julho',
        vantagens: ['Festival de Inverno', 'Clima típico de frio'],
        desvantagens: ['Preços altos', 'Muito movimento', 'Trânsito'],
        publico: 'Familias, casais, turismo cultural'
      },
      media_temporada: {
        periodo: 'Maio-Junho, Agosto-Setembro',
        vantagens: ['Preços moderados', 'Clima agradável', 'Menos filas'],
        desvantagens: ['Alguns serviços reduzidos'],
        publico: 'Casais, terceira idade, grupos'
      },
      baixa_temporada: {
        periodo: 'Março-Abril, Outubro-Novembro',
        vantagens: ['Preços baixos', 'Tranquilidade', 'Atendimento personalizado'],
        desvantagens: ['Clima mais instável', 'Menos eventos'],
        publico: 'Viajantes independentes, grupos pequenos'
      }
    }
  },

  // CURIOSIDADES E HISTÓRIA CULTURAL
  historia_cultura: {
    origem_nome: 'Homenagem ao Brigadeiro Manuel Rodrigues do Jordão, antigo proprietário das terras',
    
    marcos_historicos: [
      '1874: Fundação por Mateus da Costa Pinto',
      '1891: Início do desenvolvimento como estância climática',
      '1920: Instalação dos primeiros sanatórios para tuberculose',
      '1934: Emancipação política',
      '1950: Transição para turismo',
      '1970: Criação do Festival de Inverno'
    ],

    influencias_arquitetonicas: {
      alemã: 'Casas com telhados inclinados e estruturas em madeira',
      suiça: 'Chalés alpinos e decorações florais',
      inglesa: 'Casas vitorianas no estilo cottage'
    },

    personalidades_ilustres: [
      'Felícia Leirner (escultora)',
      'Cláudio Santoro (maestro)',
      'Assis Chateaubriand (fundador do Museu de Arte)'
    ],

    lendas_locais: [
      'Lenda do Saci na Serra da Mantiqueira',
      'História dos fantasmas dos antigos sanatórios',
      'Mitos sobre a Pedra do Baú e energias místicas'
    ],

    gastronomia_origem: {
      fondue: 'Introduzido pelos imigrantes suíços nos anos 1960',
      pinhao: 'Herança dos povos indígenas da região',
      chocolate_quente: 'Adaptação das tradições europeias ao clima local'
    }
  }
};

// FUNÇÕES DE BUSCA E FILTROS INTELIGENTES
export class CamposJordaoIA {
  
  // Busca geral por categoria
  static buscarInformacao(categoria: string, item?: string) {
    const kb = CAMPOS_JORDAO_KB;
    
    if (item) {
      return kb[categoria]?.[item] || `Não encontrei informações específicas sobre ${item} em ${categoria}`;
    }
    
    return kb[categoria] || `Categoria ${categoria} não encontrada`;
  }

  // Recomendações por época do ano
  static recomendacoesPorEpoca(mes: number) {
    const kb = CAMPOS_JORDAO_KB;
    
    if (mes >= 6 && mes <= 8) {
      return {
        epoca: 'Inverno - Alta Temporada',
        atividades: ['Festival de Inverno', 'Festa da Cerejeira', 'Fondue', 'Bondinho'],
        roupas: 'Agasalhos pesados, gorros, luvas',
        precos: 'Altos',
        dicas: 'Reserve com antecedência, chegue cedo nas atrações'
      };
    } else if (mes >= 3 && mes <= 5) {
      return {
        epoca: 'Outono - Baixa Temporada',
        atividades: ['Trilhas', 'Parque Amantikir', 'Festival Gastronômico'],
        roupas: 'Agasalhos leves, camadas',
        precos: 'Baixos',
        dicas: 'Melhor custo-benefício, clima ideal para caminhadas'
      };
    } else if (mes >= 9 && mes <= 11) {
      return {
        epoca: 'Primavera - Média Temporada',
        atividades: ['Floração', 'Trilhas', 'Museus'],
        roupas: 'Agasalhos leves, protetor solar',
        precos: 'Moderados',
        dicas: 'Época das flores, clima ameno'
      };
    } else {
      return {
        epoca: 'Verão - Média Temporada',
        atividades: ['Cachoeiras', 'Arvorismo', 'Trilhas'],
        roupas: 'Roupas leves + agasalho para noite',
        precos: 'Moderados',
        dicas: 'Chuvas de tarde, programe atividades pela manhã'
      };
    }
  }

  // Filtro por orçamento
  static filtrarPorOrcamento(categoria: 'hospedagem' | 'gastronomia' | 'atividades', orcamento: 'economico' | 'medio' | 'luxo') {
    const kb = CAMPOS_JORDAO_KB;
    
    switch (categoria) {
      case 'hospedagem':
        if (orcamento === 'economico') return kb.hospedagens.pousadas_charme.concat(kb.hospedagens.chales_casas);
        if (orcamento === 'medio') return kb.hospedagens.hoteis_executivos;
        return kb.hospedagens.hoteis_luxo;
      
      case 'gastronomia':
        if (orcamento === 'economico') return kb.gastronomia.restaurantes_categoria.casual;
        if (orcamento === 'medio') return kb.gastronomia.restaurantes_categoria.tradicional;
        return kb.gastronomia.restaurantes_categoria.alta_gastronomia;
      
      default:
        return 'Categoria não encontrada';
    }
  }

  // Recomendações personalizadas
  static recomendacaoPersonalizada(perfil: {
    idade: 'crianca' | 'jovem' | 'adulto' | 'idoso';
    interesse: 'aventura' | 'cultura' | 'gastronomia' | 'natureza' | 'romance';
    orcamento: 'economico' | 'medio' | 'luxo';
    epoca: number;
  }) {
    let recomendacoes = {
      hospedagem: [],
      atividades: [],
      restaurantes: [],
      dicas: []
    };

    // Lógica de recomendação baseada no perfil
    if (perfil.interesse === 'aventura') {
      recomendacoes.atividades.push('Trilha da Pedra do Baú', 'Arvorismo Tarundu', 'Pico do Itapeva');
    }
    
    if (perfil.interesse === 'romance') {
      recomendacoes.restaurantes.push('Villa Gourmet', 'Krokodillo');
      recomendacoes.atividades.push('Bondinho ao Morro do Elefante', 'Jantar com vista');
    }

    return recomendacoes;
  }
}

export default CAMPOS_JORDAO_KB;