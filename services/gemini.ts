import { TOURS } from "../constants";
import metadata from "../metadata.json";
import SITE_CONTENT from "../data/siteContent";
import { KB, KEYWORDS, matchKeywords, findBestMatch } from "./knowledgeBase";
import { CAMPOS_JORDAO_KB, CamposJordaoIA } from "./camposJordaoExpandedKB";

const SYSTEM_INSTRUCTION = `
Você é o Guia Virtual oficial de Campos do Jordão para o site "${metadata.name}".
Seu tom é acolhedor, refinado e informativo. Responda apenas a perguntas sobre o conteúdo do site ou sobre Campos do Jordão (turismo, pontos turísticos, restaurantes, eventos, hospedagem, logística, clima e cultura local).
Se a pergunta não for sobre o site ou sobre Campos do Jordão, responda brevemente que não pode ajudar com esse tópico e sugira onde procurar.
Ao responder, seja conciso e útil. Sempre mencione locais/endereços/telefones disponíveis no site quando relevantes, e faça ao menos uma sugestão prática (ex: melhor horário, recomendação, link para o local).
`;

export class GeminiService {
  private ai: any;
  private chat: any;
  private apiKey: string | undefined;
  private nodeKeyPresent: boolean = false;

  constructor() {
    const nodeKey = typeof process !== 'undefined' && (process as any)?.env ? (process.env.API_KEY as string | undefined) : undefined;
    let viteKey: string | undefined = undefined;
    try {
      viteKey = (import.meta as any)?.env?.VITE_API_KEY as string | undefined;
    } catch (e) {
      viteKey = undefined;
    }
    const apiKey = nodeKey || viteKey || '';
    this.apiKey = apiKey || undefined;
    this.nodeKeyPresent = !!nodeKey;

    this.ai = null;
    this.chat = null as any;

    if (!this.apiKey) {
      console.warn('GeminiService: API key not provided. Using local AI responder.');
    }
  }

  async sendMessage(message: string, opts?: { tone?: string }): Promise<{ text: string; actions?: Array<{ label: string; url: string }> }> {
    try {
      // Primeiro tenta o servidor mock local se estiver disponível
      const localUrl = this.getLocalApiUrl();
      if (localUrl) {
        const context = this.buildContextSummary();
        const userMessage = `Contexto do site:\n${context}\n\nPergunta do usuário: ${message}`;
        const data = await this.callLocalApi(localUrl, userMessage, opts);
        if (data && data.text) {
          return { text: data.text, actions: data.actions };
        }
      }
      // Fallback: usa o respondedor local embutido (sempre funciona)
      const fallback = this.buildFallbackResponse(message);
      return { text: fallback.text, actions: fallback.actions };
    } catch (error) {
      console.error("AI Error:", error);
      // Em caso de erro, usa o fallback local
      const fallback = this.buildFallbackResponse(message);
      return { text: fallback.text, actions: fallback.actions };
    }
  }

  private getLocalApiUrl(): string | undefined {
    try {
      const u = (import.meta as any)?.env?.VITE_LOCAL_API_URL as string | undefined;
      if (u && u.length) return u;
    } catch (_e) {}
    if (typeof (process as any) !== 'undefined' && (process as any).env && (process as any).env.LOCAL_API_URL) return (process as any).env.LOCAL_API_URL;
    return 'http://127.0.0.1:5000/generate';
  }

  private async callLocalApi(url: string, prompt: string, opts?: { tone?: string }): Promise<any | undefined> {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8', 'Accept-Charset': 'utf-8' },
        body: JSON.stringify({ prompt, tone: opts?.tone }),
      });
      const data = await res.json();
      return data;
    } catch (e) {
      return undefined;
    }
  }

  private buildContextSummary(): string {
    try {
      const shortTours = TOURS.slice(0, 6).map(t => `- ${t.title} (${t.category})${t.address ? ` — ${t.address}` : ''}${t.phone ? ` — Tel: ${t.phone}` : ''}${t.website ? ` — ${t.website}` : ''}`);
      const summary = `${metadata.description}\nPrincipais locais no site:\n${shortTours.join('\n')}`;
      const structured = JSON.stringify(SITE_CONTENT);
      return `${summary}\n---\nSTRUTURED_SITE_CONTENT_START\n${structured}\nSTRUTURED_SITE_CONTENT_END`;
    } catch (e) {
      return `${metadata.description}`;
    }
  }

  private buildFallbackResponse(message: string): { text: string; actions?: Array<{ label: string; url: string }> } {
    const m = (message || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    
    // Handle empty or very short input
    if (m.length < 2) {
      return {
        text: `Olá! 👋 Sou o Guia Virtual de Campos do Jordão!\n\nPosso ajudar com:\n• 🏔️ Passeios e atrações\n• 🍽️ Restaurantes e gastronomia\n• 🏨 Hotéis e pousadas\n• 🎪 Eventos e Convention Bureau\n• ℹ️ Informações sobre a cidade\n\nO que gostaria de saber?`,
        actions: [
          { label: '🏔️ Passeios', url: '/#explore' },
          { label: '🍽️ Onde Comer', url: '/#ondecomer' },
          { label: '🏨 Onde Ficar', url: '/#hospedagens' }
        ]
      };
    }

    // =========================================================================
    // SAUDAÇÕES
    // =========================================================================
    if (matchKeywords(m, KEYWORDS.greetings) && m.length < 40) {
      return {
        text: `Olá! 👋 Bem-vindo ao Guia Virtual de Campos do Jordão!\n\nSou seu assistente turístico e posso ajudar com:\n• 🏔️ Passeios e atrações\n• 🍽️ Restaurantes e gastronomia\n• 🏨 Hotéis e pousadas\n• 🎪 Eventos e Convention Bureau\n• 🌡️ Clima e melhor época\n• 🚗 Como chegar\n\nO que gostaria de saber?`,
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
        actions: [{ label: 'Voltar ao Início', url: '/' }]
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
          { label: 'Clima', url: '/' }
        ]
      };
    }

    if (matchKeywords(m, KEYWORDS.location)) {
      return {
        text: `📍 **Localização de Campos do Jordão**\n\n• **Estado:** São Paulo\n• **Região:** Serra da Mantiqueira\n• **Área:** ${KB.city.area_km2} km²\n• **População:** ${KB.city.population}\n• **Coordenadas:** ${KB.city.coordinates.lat}, ${KB.city.coordinates.lng}\n\n🚗 **Como Chegar:**\n${KB.city.transport.main_access}\n\n✈️ **Aeroportos próximos:**\n${KB.city.transport.airports.map(a => `• ${a}`).join('\n')}`,
        actions: [{ label: 'Ver Mapa', url: '/#explore' }]
      };
    }

    // =========================================================================
    // BUSCA INTELIGENTE - USA A NOVA BASE DE CONHECIMENTO EXPANDIDA
    // =========================================================================

    // Gastronomia com detalhes específicos
    if (matchKeywords(m, KEYWORDS.food) || matchKeywords(m, KEYWORDS.restaurant)) {
      // Detecta interesse específico
      const isVegetarian = m.includes('vegetarian') || m.includes('vegano') || m.includes('vegetaria');
      const isFondue = m.includes('fondue');
      const isChocolate = m.includes('chocolate') || m.includes('doce');
      const isBudget = m.includes('barato') || m.includes('economico') || m.includes('custo');
      const isRomantic = m.includes('romantic') || m.includes('jantar') && m.includes('vista');
      
      let response = '🍽️ **Gastronomia em Campos do Jordão**\n\n';
      
      if (isFondue) {
        const fondue = CAMPOS_JORDAO_KB.gastronomia.pratos_tipicos.fondue;
        response += `🧀 **Fondue - Prato Símbolo da Cidade**\n${fondue.descricao}\n**Preço:** ${fondue.preco_medio}\n\n**Onde encontrar:**\n${fondue.onde_encontrar.map(r => `• ${r}`).join('\n')}\n\n`;
      }
      
      if (isChocolate) {
        const chocolaterias = CAMPOS_JORDAO_KB.gastronomia.chocolaterias;
        response += `🍫 **Chocolaterias Imperdíveis:**\n${chocolaterias.map(c => `• **${c.nome}** - ${c.diferencial} (${c.preco_medio})`).join('\n')}\n\n`;
      }
      
      if (isRomantic) {
        const gastronomia = CAMPOS_JORDAO_KB.gastronomia.restaurantes_categoria.alta_gastronomia;
        response += `💕 **Para um Jantar Romântico:**\n${gastronomia.map(r => `• **${r.nome}** - ${r.especialidade} (${r.preco_medio})`).join('\n')}\n\n`;
      }
      
      if (isBudget) {
        const casual = CAMPOS_JORDAO_KB.gastronomia.restaurantes_categoria.casual;
        response += `💰 **Opções Econômicas:**\n${casual.map(r => `• **${r.nome}** - ${r.especialidade} (${r.preco_medio})`).join('\n')}\n\n`;
      }
      
      // Adiciona recomendação geral se não há critério específico
      if (!isFondue && !isChocolate && !isRomantic && !isBudget) {
        response += `**Pratos típicos obrigatórios:**\n• 🧀 Fondue (queijo, chocolate, carne)\n• 🐟 Truta local grelhada\n• 🌰 Pinhão assado\n• ☕ Chocolate quente gourmet\n• 🍷 Vinho quente (inverno)\n\n`;
        const tradicional = CAMPOS_JORDAO_KB.gastronomia.restaurantes_categoria.tradicional;
        response += `**Restaurantes tradicionais:**\n${tradicional.slice(0,3).map(r => `• **${r.nome}** - ${r.especialidade}`).join('\n')}`;
      }
      
      return {
        text: response,
        actions: [
          { label: '🧀 Baden Baden', url: '/#ondecomer' },
          { label: '🍫 Chocolaterias', url: '/#ondecomer' },
          { label: '📍 Ver no Mapa', url: '/#explore' }
        ]
      };
    }

    // Hospedagem com filtros inteligentes
    if (matchKeywords(m, KEYWORDS.accommodations)) {
      const isLuxury = m.includes('luxo') || m.includes('5 estrelas') || m.includes('spa');
      const isFamily = m.includes('familia') || m.includes('crianca');
      const isBudget = m.includes('barato') || m.includes('economico') || m.includes('pousada');
      const isRomantic = m.includes('romantic') || m.includes('casal') || m.includes('lua de mel');
      
      let response = '🏨 **Hospedagem em Campos do Jordão**\n\n';
      
      if (isLuxury) {
        const luxo = CAMPOS_JORDAO_KB.hospedagens.hoteis_luxo;
        response += `⭐ **Hotéis de Luxo:**\n${luxo.map(h => `• **${h.nome}** - ${h.categoria}\n  Alta: ${h.diaria_alta_temporada} | Baixa: ${h.diaria_baixa_temporada}\n  ${h.diferenciais.join(', ')}`).join('\n\n')}\n\n`;
      }
      
      if (isBudget) {
        const pousadas = CAMPOS_JORDAO_KB.hospedagens.pousadas_charme;
        response += `💰 **Pousadas e Opções Econômicas:**\n${pousadas.map(p => `• **${p.nome}** - ${p.categoria}\n  Alta: ${p.diaria_alta_temporada} | Baixa: ${p.diaria_baixa_temporada}\n  ${p.diferenciais.join(', ')}`).join('\n\n')}\n\n`;
      }
      
      if (isFamily || (!isLuxury && !isBudget && !isRomantic)) {
        const executivos = CAMPOS_JORDAO_KB.hospedagens.hoteis_executivos;
        response += `👨‍👩‍👧‍👦 **Hotéis para Famílias:**\n${executivos.map(h => `• **${h.nome}** - ${h.categoria}\n  Alta: ${h.diaria_alta_temporada} | Baixa: ${h.diaria_baixa_temporada}\n  ${h.diferenciais?.join(', ') || 'Tradicional, boa localização'}`).join('\n\n')}\n\n`;
      }
      
      // Informações sobre temporadas
      response += `📅 **Sobre as temporadas:**\n• **Alta temporada (Julho):** Preços máximos, reserve com antecedência\n• **Baixa temporada (Mar-Mai, Set-Nov):** Melhores preços, menos movimento\n• **Média temporada:** Bom custo-benefício`;
      
      return {
        text: response,
        actions: [
          { label: '🏨 Ver Hospedagens', url: '/#hospedagens' },
          { label: '📅 Verificar Disponibilidade', url: '/#hospedagens' },
          { label: '📍 Localização', url: '/#explore' }
        ]
      };
    }

    // Roteiros personalizados por perfil
    if (matchKeywords(m, ['roteiro', 'itinerario', 'o que fazer', 'programa'])) {
      const isAdventure = m.includes('aventura') || m.includes('trilha') || m.includes('radical');
      const isFamily = m.includes('familia') || m.includes('crianca');
      const isRomantic = m.includes('casal') || m.includes('romantic') || m.includes('lua de mel');
      const isOneDay = m.includes('1 dia') || m.includes('um dia') || m.includes('bate e volta');
      const isCulture = m.includes('cultura') || m.includes('museu') || m.includes('arte');
      
      let response = '🗺️ **Roteiro Personalizado para Campos do Jordão**\n\n';
      
      if (isOneDay) {
        response += `⏰ **Roteiro de 1 Dia - Bate e Volta:**\n\n**Manhã (9h-12h):**\n• Chegada e café na Vila Capivari\n• Teleférico para o Morro do Elefante\n• Vista panorâmica e fotos\n\n**Tarde (12h-17h):**\n• Almoço no Capivari (fondue obrigatório)\n• Visita ao Horto Florestal OU Amantikir\n• Compras de chocolates e malhas\n\n**Final (17h-19h):**\n• Chocolate quente de despedida\n• Retorno\n\n💡 **Dica:** Chegue cedo para evitar trânsito e filas!`;
      }
      
      else if (isAdventure) {
        response += `🏔️ **Roteiro de Aventura (2-3 dias):**\n\n**Dia 1:**\n• Trilha do Pico do Itapeva (nascer do sol)\n• Arvorismo no Tarundu\n• Noite na Vila Capivari\n\n**Dia 2:**\n• Trilha da Pedra do Baú (dia inteiro)\n• Descanso e jantar romântico\n\n**Dia 3:**\n• Horto Florestal (trilhas mais leves)\n• Cervejaria Baden Baden\n• Relaxamento no hotel\n\n⚠️ **Preparo:** Leve equipamentos adequados e verifique condições climáticas`;
      }
      
      else if (isFamily) {
        response += `👨‍👩‍👧‍👦 **Roteiro Família (2-3 dias):**\n\n**Dia 1:**\n• Vila Capivari e teleférico\n• Parque Capivari (pedalinhos)\n• Chocolate quente e compras\n\n**Dia 2:**\n• Amantikir (crianças adoram os jardins)\n• Fábrica de chocolates (visita guiada)\n• Iceland (experiência no gelo)\n\n**Dia 3:**\n• Horto Florestal (trilhas fáceis)\n• Tarundu (atividades para todas idades)\n• Souvenir shopping\n\n👶 **Para crianças:** A maioria das atrações aceita todas as idades com supervisão`;
      }
      
      else if (isRomantic) {
        response += `💕 **Roteiro Romântico (2-3 dias):**\n\n**Dia 1:**\n• Chegada e check-in em hotel boutique\n• Passeio pela Vila Capivari\n• Jantar romântico com fondue\n\n**Dia 2:**\n• Nascer do sol no Pico do Itapeva\n• Spa no hotel ou Amantikir\n• Degustação na Baden Baden\n• Jantar no Villa Gourmet\n\n**Dia 3:**\n• Museu Felícia Leirner\n• Compras de presentes únicos\n• Despedida com vista panorâmica\n\n🍷 **Dicas:** Reserve restaurantes com vista, considere hospedagem com lareira`;
      }
      
      else {
        // Roteiro geral
        response += `🎯 **Roteiro Clássico (2-3 dias):**\n\n**Imperdíveis:**\n• Vila Capivari e Teleférico\n• Horto Florestal ou Amantikir\n• Baden Baden (cervejaria)\n• Fondue em algum restaurante tradicional\n• Compras (chocolates, malhas, souvenirs)\n\n**Se tiver tempo extra:**\n• Pico do Itapeva (vista panorâmica)\n• Museu Felícia Leirner\n• Tarundu (aventura)\n• Iceland (experiência gelada)\n\n💡 **Melhor época:** Julho para frio autêntico, abril-maio para preços melhores`;
      }
      
      return {
        text: response,
        actions: [
          { label: '🎯 Principais Atrações', url: '/#explore' },
          { label: '🏨 Onde Ficar', url: '/#hospedagens' },
          { label: '🍽️ Onde Comer', url: '/#ondecomer' },
          { label: '📍 Ver Mapa', url: '/#explore' }
        ]
      };
    }

    // Informações sobre eventos sazonais
    if (matchKeywords(m, KEYWORDS.eventos) || matchKeywords(m, ['evento', 'festa', 'show', 'festival'])) {
      const isWinter = m.includes('inverno') || m.includes('julho') || m.includes('musica') || m.includes('classica');
      const currentMonth = new Date().getMonth() + 1; // 1-12
      
      let response = '🎪 **Eventos em Campos do Jordão**\n\n';
      
      if (isWinter) {
        const festival = CAMPOS_JORDAO_KB.eventos.festival_inverno;
        response += `🎼 **${festival.nome}**\n${festival.descricao}\n\n📅 **Período:** ${festival.periodo}\n📍 **Local:** ${festival.local}\n🎫 **Ingressos:** ${festival.ingressos}\n👥 **Público:** ${festival.publico_esperado} pessoas\n\n**Programação inclui:**\n${festival.programacao.map(p => `• ${p}`).join('\n')}\n\n`;
      }
      
      // Eventos por época do ano
      const eventosEpoca = CamposJordaoIA.recomendacoesPorEpoca(currentMonth);
      response += `📅 **Nesta época (${eventosEpoca.epoca}):**\n`;
      
      // Lista os eventos principais
      Object.values(CAMPOS_JORDAO_KB.eventos).forEach(evento => {
        if (evento.periodo) {
          response += `• **${evento.nome}** - ${evento.periodo}\n`;
        }
      });
      
      response += `\n💡 **Dica:** ${eventosEpoca.dicas}`;
      
      return {
        text: response,
        actions: [
          { label: '🎼 Festival de Inverno', url: '/#eventos' },
          { label: '🌸 Festa da Cerejeira', url: '/#eventos' },
          { label: '🏍️ Motofest', url: '/#eventos' }
        ]
      };
    // =========================================================================
    // CLIMA E MELHOR ÉPOCA - COM INFORMAÇÕES EXPANDIDAS
    // =========================================================================
    if (matchKeywords(m, KEYWORDS.climate) || matchKeywords(m, KEYWORDS.bestTime)) {
      const hasNeve = m.includes('neve');
      const hasFrio = m.includes('frio') || m.includes('inverno');
      const hasTemperatura = m.includes('temperatura') || m.includes('grau');
      const currentMonth = new Date().getMonth() + 1; // 1-12
      
      let response = `🌡️ **Clima em Campos do Jordão**\n\n`;
      
      // Informações climáticas básicas da nova KB
      const clima = CAMPOS_JORDAO_KB.cidade.clima;
      response += `**Altitude:** ${CAMPOS_JORDAO_KB.cidade.altitude}m - Município mais alto do Brasil!\n`;
      response += `**Tipo:** ${clima.tipo}\n`;
      response += `**Temperatura média:** ${clima.temperatura_media_anual}°C\n\n`;
      
      if (hasNeve) {
        response += `❄️ **Sobre neve:** Neve é extremamente rara em Campos do Jordão devido ao clima seco do inverno. Registros históricos: 1928, 1942, 1947, 1966.\n**Mais comum:** Geadas fortes no inverno, especialmente madrugadas.\n\n`;
      }
      
      if (hasTemperatura) {
        response += `🌡️ **Extremos de temperatura:**\n• **Máxima histórica:** ${clima.temperatura_maxima_recordista}°C (2023)\n• **Mínima histórica:** ${clima.temperatura_minima_recordista}°C (1979)\n\n`;
      }
      
      // Informações sazonais detalhadas
      if (hasFrio) {
        const inverno = clima.estacoes.inverno;
        response += `🧥 **Inverno (${inverno.periodo}):**\n• **Temperatura média:** ${inverno.temperatura_media}°C\n• **Características:** ${inverno.caracteristicas}\n• **Precipitação:** ${inverno.precipitacao_media}mm (época seca)\n• **Mín. comum:** ${inverno.temperatura_minima_comum}°C\n\n`;
      } else {
        // Informação da época atual
        const recomendacaoEpoca = CamposJordaoIA.recomendacoesPorEpoca(currentMonth);
        response += `📅 **Agora (${recomendacaoEpoca.epoca}):**\n• **Roupas:** ${recomendacaoEpoca.roupas}\n• **Preços:** ${recomendacaoEpoca.precos}\n• **Dicas:** ${recomendacaoEpoca.dicas}\n\n`;
      }
      
      // Melhor época por interesse
      const melhorEpoca = clima.melhor_epoca;
      response += `📅 **Melhor época para visitar:**\n• **Frio intenso:** ${melhorEpoca.frio_intenso}\n• **Clima ameno:** ${melhorEpoca.clima_ameno}\n• **Menos movimento:** ${melhorEpoca.menos_movimento}\n• **Época seca:** ${melhorEpoca.mais_seco}\n\n💡 **Dica:** Sempre leve agasalho, mesmo no verão as noites são frias!`;
      
      return {
        text: response,
        actions: [
          { label: '❄️ Festival de Inverno', url: '/#eventos' },
          { label: '🏨 Onde Ficar', url: '/#hospedagens' },
          { label: '🎯 O que fazer', url: '/#explore' }
        ]
      };
    }
    // =========================================================================
    // TRANSPORTE - COMO CHEGAR (EXPANDIDO)
    // =========================================================================
    if (matchKeywords(m, KEYWORDS.transport)) {
      const praticas = CAMPOS_JORDAO_KB.informacoes_praticas.como_chegar;
      const custos = CAMPOS_JORDAO_KB.informacoes_praticas.custos_estimados;
      const transLocal = CAMPOS_JORDAO_KB.informacoes_praticas.transporte_local;
      
      let response = `🚗 **Como Chegar a Campos do Jordão**\n\n`;
      
      // Informações detalhadas de carro
      response += `**🚗 De carro:**\n`;
      response += `• **São Paulo:** ${praticas.carro.de_sao_paulo.distancia} - ${praticas.carro.de_sao_paulo.tempo}\n`;
      response += `  Rota: ${praticas.carro.de_sao_paulo.rota}\n`;
      response += `  Pedágios: ${praticas.carro.de_sao_paulo.pedagio}\n\n`;
      
      response += `• **Rio de Janeiro:** ${praticas.carro.de_rio.distancia} - ${praticas.carro.de_rio.tempo}\n`;
      response += `  Rota: ${praticas.carro.de_rio.rota}\n`;
      response += `  Pedágios: ${praticas.carro.de_rio.pedagio}\n\n`;
      
      // Informações de avião
      response += `**✈️ De avião:**\n`;
      response += `• **Mais próximo:** ${praticas.aviao.aeroporto_mais_proximo}\n`;
      response += `  Distância: ${praticas.aviao.distancia_aeroporto}\n`;
      response += `  Transfer: ${praticas.aviao.transfer}\n`;
      response += `• **Alternativa:** ${praticas.aviao.alternativa}\n\n`;
      
      // Ônibus
      response += `**🚌 De ônibus:**\n`;
      response += `• **De São Paulo:** ${praticas.onibus.de_sao_paulo.empresa}\n`;
      response += `  Tempo: ${praticas.onibus.de_sao_paulo.tempo} | Preço: ${praticas.onibus.de_sao_paulo.preco}\n`;
      response += `  Frequência: ${praticas.onibus.de_sao_paulo.frequencia}\n\n`;
      
      // Transporte local
      response += `**🚕 Transporte na cidade:**\n`;
      response += `• Táxi: ${transLocal.taxi}\n`;
      response += `• Uber: ${transLocal.uber}\n`;
      response += `• Aluguel de carro: ${transLocal.carro_aluguel}\n`;
      response += `• Ônibus urbano: ${transLocal.onibus_urbano}\n`;
      response += `• A pé: ${transLocal.walking}\n\n`;
      
      response += `💡 **Dicas importantes:**\n• Na alta temporada (julho), trânsito intenso - chegue cedo\n• Estacionar no centro é difícil e pago\n• Para pontos distantes, carro próprio/alugado é melhor opção\n• Apps de transporte funcionam bem na cidade`;
      
      return {
        text: response,
        actions: [
          { label: '🏨 Hotéis com Transfer', url: '/#hospedagens' },
          { label: '📍 Mapa da Cidade', url: '/#explore' },
          { label: '💰 Custos de Viagem', url: '/#hospedagens' }
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

    if (matchKeywords(m, KEYWORDS.casamento)) {
      return {
        text: `💒 **Casamentos em Campos do Jordão**\n\nA cidade é um destino muito procurado para casamentos e celebrações!\n\n**Por que casar em Campos?**\n• Cenários românticos e paisagens de montanha\n• Clima agradável (especialmente primavera/outono)\n• Hotéis e pousadas com infraestrutura para eventos\n• Fornecedores especializados\n\n**Fornecedores:**\n${KB.suppliers.map(f => `• ${f.name} - ${f.category}`).join('\n')}\n\n💡 Entre em contato com o Convention Bureau para apoio na organização!`,
        actions: [
          { label: '📧 Contato Convention', url: `mailto:${KB.convention.email}?subject=Casamento em Campos` },
          { label: 'Pousadas Românticas', url: '/#hospedagens' }
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
          { label: 'Auditório Claudio Santoro', url: KB.attractions['claudio-santoro'].website || '/#eventos' },
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
          { label: '🌐 Site Oficial', url: attr.website || '/#explore' },
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
          { label: '🌐 Site Oficial', url: attr.website || '/#explore' },
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
          { label: '🌐 Site do Museu', url: museu.website || '/#explore' },
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
          { label: '🌐 Site Oficial', url: attr.website || '/#explore' },
          { label: 'Outras Cervejarias', url: '/#ondecomer' }
        ]
      };
    }

    // Horto Florestal
    if (matchKeywords(m, KEYWORDS.horto)) {
      const attr = KB.attractions.horto;
      return {
        text: `🌲 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n🕐 **Horário:** ${attr.hours}\n\n💡 **Dica:** ${attr.tips}`,
        actions: [
          { label: '📸 Instagram', url: attr.instagram || '/#explore' },
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
          { label: '🌐 Site Oficial', url: attr.website || '/#explore' },
          { label: 'Hotéis no Capivari', url: '/#hospedagens' }
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
        actions: [{ label: 'Passeios de Aventura', url: '/#explore' }]
      };
    }

    // Trem / Estrada de Ferro
    if (matchKeywords(m, KEYWORDS.trem)) {
      const attr = KB.attractions.efcj;
      return {
        text: `🚂 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n📞 **Telefone:** ${attr.phone}\n\n⚠️ **Status:** ${attr.status}`,
        actions: [{ label: 'Outros Passeios', url: '/#explore' }]
      };
    }

    // Iceland
    if (matchKeywords(m, KEYWORDS.iceland)) {
      const attr = KB.attractions.iceland;
      return {
        text: `❄️ **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n\n💡 **Dica:** A visita dura cerca de 20-30 minutos. Casacos e luvas são fornecidos!`,
        actions: [
          { label: '🌐 Site Oficial', url: attr.website || '/#explore' },
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
          { label: '🌐 Site Oficial', url: attr.website || '/#explore' },
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
          { label: '🌐 Site Oficial', url: attr.website || '/#explore' },
          { label: 'Outros Museus', url: '/#explore' }
        ]
      };
    }

    // Ducha de Prata
    if (matchKeywords(m, KEYWORDS.ducha)) {
      const attr = KB.attractions['ducha-de-prata'];
      return {
        text: `💦 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}\n\n💡 **Dica:** ${attr.tips}`,
        actions: [{ label: 'Outros Passeios', url: '/#explore' }]
      };
    }

    // Borboletário
    if (matchKeywords(m, KEYWORDS.borboletario)) {
      const attr = KB.attractions.borboletario;
      return {
        text: `🦋 **${attr.title}**\n\n${attr.description}\n\n📍 **Endereço:** ${attr.address}`,
        actions: [
          { label: '🌐 Site Oficial', url: attr.website || '/#explore' },
          { label: 'Outros Passeios', url: '/#explore' }
        ]
      };
    }

    // =========================================================================
    // GASTRONOMIA - ESPECÍFICA
    // =========================================================================
    
    // Fondue
    if (matchKeywords(m, KEYWORDS.fondue)) {
      return {
        text: `🧀 **Restaurantes de Fondue em Campos do Jordão**\n\nFondue é um clássico da cidade! Sugestões:\n\n• **${KB.restaurants['villa-montese'].name}** - ${KB.restaurants['villa-montese'].specialty}\n  📍 ${KB.restaurants['villa-montese'].address}\n\n• **${KB.restaurants['cantinho-suico'].name}** - ${KB.restaurants['cantinho-suico'].specialty}\n  📍 ${KB.restaurants['cantinho-suico'].address}\n\n• **${KB.restaurants.nevada.name}** - ${KB.restaurants.nevada.specialty}\n  📍 ${KB.restaurants.nevada.address}\n\n• **${KB.restaurants.mana.name}** - ${KB.restaurants.mana.specialty}\n  📍 ${KB.restaurants.mana.address}\n\n💡 **Dica:** Reserve com antecedência na alta temporada!`,
        actions: [{ label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }]
      };
    }

    // Truta
    if (matchKeywords(m, KEYWORDS.truta)) {
      return {
        text: `🐟 **Restaurantes de Truta em Campos do Jordão**\n\nA truta é criada localmente e é um dos pratos típicos! Experimente em:\n\n• **${KB.restaurants.matterhorn.name}** - ${KB.restaurants.matterhorn.specialty}\n  📍 ${KB.restaurants.matterhorn.address}\n\n• **${KB.restaurants['villa-montese'].name}** - ${KB.restaurants['villa-montese'].specialty}\n  📍 ${KB.restaurants['villa-montese'].address}\n\n• **${KB.restaurants.mana.name}** - ${KB.restaurants.mana.specialty}\n  📍 ${KB.restaurants.mana.address}`,
        actions: [{ label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }]
      };
    }

    // Chocolate
    if (matchKeywords(m, KEYWORDS.chocolate)) {
      return {
        text: `🍫 **Chocolaterias em Campos do Jordão**\n\nA cidade é famosa pelos chocolates artesanais!\n\n• **${KB.restaurants['sabor-chocolate'].name}**\n  📍 ${KB.restaurants['sabor-chocolate'].address}\n\n• **Spinassi Chocolates** - Chocolates artesanais tradicionais\n\n• **Harry Pisek** - Confeitaria tradicional desde 1958\n\n💡 Não deixe de levar chocolates como lembrança!`,
        actions: [{ label: 'Ver Gastronomia', url: '/#ondecomer' }]
      };
    }

    // Café / Cafeteria
    if (matchKeywords(m, KEYWORDS.cafeteria)) {
      return {
        text: `☕ **Cafeterias e Confeitarias**\n\n• **${KB.restaurants['sans-souci'].name}** - ${KB.restaurants['sans-souci'].specialty}\n  📍 ${KB.restaurants['sans-souci'].address}\n\n• **${KB.restaurants['bam-bam-cafe'].name}** - ${KB.restaurants['bam-bam-cafe'].specialty}\n  📍 ${KB.restaurants['bam-bam-cafe'].address}\n\n• **${KB.restaurants.tapiti.name}** - ${KB.restaurants.tapiti.specialty}\n  📍 ${KB.restaurants.tapiti.address}\n\n• **Harry Pisek** - Confeitaria tradicional\n\n💡 Ótimas opções para café da tarde!`,
        actions: [{ label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }]
      };
    }

    // Italiana
    if (matchKeywords(m, KEYWORDS.italiana)) {
      return {
        text: `🍝 **Restaurantes Italianos**\n\n• **${KB.restaurants['nonna-mimi'].name}** - ${KB.restaurants['nonna-mimi'].specialty}\n  📍 ${KB.restaurants['nonna-mimi'].address}\n  📞 ${KB.restaurants['nonna-mimi'].phone}\n\n• **${KB.restaurants.trattoria.name}** - ${KB.restaurants.trattoria.specialty}\n  📍 ${KB.restaurants.trattoria.address}`,
        actions: [{ label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }]
      };
    }

    // Cervejaria
    if (matchKeywords(m, KEYWORDS.cerveja)) {
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
        text: `🥩 **Restaurantes de Carnes e Grelhados**\n\n• **${KB.restaurants.churrasco.name}** - ${KB.restaurants.churrasco.specialty}\n  📍 ${KB.restaurants.churrasco.address}\n\n• **${KB.restaurants['art-bbq'].name}** - ${KB.restaurants['art-bbq'].specialty}\n  📍 ${KB.restaurants['art-bbq'].address}\n\n• **${KB.restaurants['cantinho-serra'].name}** - ${KB.restaurants['cantinho-serra'].specialty}\n  📍 ${KB.restaurants['cantinho-serra'].address}`,
        actions: [{ label: 'Ver Todos os Restaurantes', url: '/#ondecomer' }]
      };
    }

    // Gastronomia Geral
    if (matchKeywords(m, KEYWORDS.food)) {
      const restos = Object.values(KB.restaurants).slice(0, 10).map(r => `• **${r.name}** - ${r.specialty}`).join('\n');
      return {
        text: `🍽️ **Gastronomia em Campos do Jordão**\n\nA cidade oferece culinária variada: fondues, trutas, massas, cervejas artesanais e muito mais!\n\n**Alguns destaques:**\n${restos}\n\n💡 **Dica:** Na alta temporada, reserve com antecedência!`,
        actions: [
          { label: 'Ver Restaurantes', url: '/#ondecomer' },
          { label: '🧀 Fondues', url: '/#ondecomer' },
          { label: '🍺 Cervejarias', url: '/#ondecomer' }
        ]
      };
    }

    // =========================================================================
    // BUSCA INTELIGENTE GERAL - NOVA BASE DE CONHECIMENTO
    // =========================================================================
    
    // Tenta buscar informações específicas na base expandida
    const buscarInformacaoEspecifica = (consulta: string) => {
      const kb = CAMPOS_JORDAO_KB;
      
      // Busca por pontos turísticos específicos
      if (consulta.includes('morro') || consulta.includes('elefante')) {
        const attracao = kb.atracoes.morro_elefante;
        return `🚡 **${attracao.nome}**\n\n${attracao.descricao}\n\n📍 **Endereço:** ${attracao.endereco}\n🕐 **Funcionamento:** ${attracao.horario_funcionamento}\n⏱️ **Tempo de visita:** ${attracao.tempo_visita}\n💰 **Preços:** Bondinho ida/volta: ${attracao.preco.bondinho_ida_volta}, Crianças: ${attracao.preco.bondinho_crianca}\n\n**Dicas:**\n${attracao.dicas.map(d => `• ${d}`).join('\n')}`;
      }
      
      if (consulta.includes('horto') || consulta.includes('florestal')) {
        const attracao = kb.atracoes.horto_florestal;
        return `🌲 **${attracao.nome}**\n\n${attracao.descricao}\n\n📍 **Endereço:** ${attracao.endereco}\n🕐 **Funcionamento:** ${attracao.horario_funcionamento}\n💰 **Entrada:** ${attracao.preco}\n🏞️ **Área:** ${attracao.area}\n\n**Trilhas disponíveis:**\n${Object.entries(attracao.trilhas).map(([nome, dados]: [string, any]) => `• **${nome.charAt(0).toUpperCase() + nome.slice(1)}**: ${dados.distancia}, ${dados.dificuldade}, ${dados.tempo}`).join('\n')}\n\n**Fauna:** ${attracao.fauna.join(', ')}\n**Flora:** ${attracao.flora.join(', ')}`;
      }
      
      if (consulta.includes('amantikir')) {
        const attracao = kb.atracoes.parque_amantikir;
        return `🌸 **${attracao.nome}**\n\n${attracao.descricao}\n\n📍 **Endereço:** ${attracao.endereco}\n🕐 **Funcionamento:** ${attracao.horario_funcionamento}\n💰 **Entrada:** ${attracao.preco}\n🏞️ **Área:** ${attracao.area}\n\n**Jardins temáticos:** ${attracao.jardins_tematicos.join(', ')}\n**Destaques:** ${attracao.destaques.join(', ')}`;
      }
      
      if (consulta.includes('itapeva') || consulta.includes('pico')) {
        const attracao = kb.atracoes.pico_itapeva;
        return `⛰️ **${attracao.nome}**\n\n${attracao.descricao}\n\n📍 **Localização:** ${attracao.endereco}\n🕐 **Melhor horário:** ${attracao.horario_funcionamento}\n💰 **Entrada:** ${attracao.preco}\n📏 **Altitude:** ${attracao.altitude}m - Ponto mais alto da região!\n🔭 **Vista:** ${attracao.vista}\n\n**Dicas importantes:**\n${attracao.dicas.map(d => `• ${d}`).join('\n')}`;
      }
      
      // Busca por informações de custos
      if (consulta.includes('preco') || consulta.includes('custo') || consulta.includes('quanto custa') || consulta.includes('orcamento')) {
        const custos = kb.informacoes_praticas.custos_estimados;
        return `💰 **Custos Estimados para Campos do Jordão**\n\n**💵 Orçamento Econômico:**\n• Hospedagem: ${custos.orcamento_economico.hospedagem}\n• Alimentação: ${custos.orcamento_economico.alimentacao}\n• Atividades: ${custos.orcamento_economico.atividades}\n• **Total/dia: ${custos.orcamento_economico.total_dia}**\n\n**💳 Orçamento Médio:**\n• Hospedagem: ${custos.orcamento_medio.hospedagem}\n• Alimentação: ${custos.orcamento_medio.alimentacao}\n• Atividades: ${custos.orcamento_medio.atividades}\n• **Total/dia: ${custos.orcamento_medio.total_dia}**\n\n**💎 Orçamento Luxo:**\n• Hospedagem: ${custos.orcamento_luxo.hospedagem}\n• Alimentação: ${custos.orcamento_luxo.alimentacao}\n• Atividades: ${custos.orcamento_luxo.atividades}\n• **Total/dia: ${custos.orcamento_luxo.total_dia}**`;
      }
      
      // Busca por curiosidades e história
      if (consulta.includes('historia') || consulta.includes('curiosidade') || consulta.includes('origem') || consulta.includes('fundacao')) {
        const historia = kb.historia_cultura;
        return `📚 **História de Campos do Jordão**\n\n**Origem do nome:** ${historia.origem_nome}\n\n**Marcos históricos:**\n${historia.marcos_historicos.map(m => `• ${m}`).join('\n')}\n\n**Influências arquitetônicas:**\n• **Alemã:** ${historia.influencias_arquitetonicas.alemã}\n• **Suíça:** ${historia.influencias_arquitetonicas.suiça}\n• **Inglesa:** ${historia.influencias_arquitetonicas.inglesa}\n\n**Personalidades ilustres:** ${historia.personalidades_ilustres.join(', ')}`;
      }
      
      return null;
    };
    
    const informacaoEspecifica = buscarInformacaoEspecifica(m);
    if (informacaoEspecifica) {
      return {
        text: informacaoEspecifica,
        actions: [
          { label: '🎯 Principais Atrações', url: '/#explore' },
          { label: '🏨 Onde Ficar', url: '/#hospedagens' },
          { label: '📍 Ver no Mapa', url: '/#explore' }
        ]
      };
    }

    // =========================================================================
    // BUSCA POR CATEGORIAS EXISTENTES (FALLBACK ORIGINAL)
    // =========================================================================
    
    // Luxo
    if (matchKeywords(m, KEYWORDS.luxo) && (matchKeywords(m, KEYWORDS.hotel) || matchKeywords(m, KEYWORDS.pousada))) {
      return {
        text: `✨ **Hospedagens de Luxo em Campos do Jordão**\n\n• **${KB.hotels['hotel-toriba'].name}**\n  ${KB.hotels['hotel-toriba'].description}\n  📞 ${KB.hotels['hotel-toriba'].phone}\n\n• **${KB.hotels['chateau-villette'].name}**\n  ${KB.hotels['chateau-villette'].description}\n  📞 ${KB.hotels['chateau-villette'].phone}\n\n• **${KB.hotels['quebra-noz'].name}**\n  ${KB.hotels['quebra-noz'].description}\n  📞 ${KB.hotels['quebra-noz'].phone}`,
        actions: [{ label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }]
      };
    }

    // Spa / Wellness
    if (matchKeywords(m, KEYWORDS.spa)) {
      return {
        text: `🧘 **Hospedagens com Spa e Wellness**\n\n• **${KB.hotels['surya-pan'].name}**\n  ${KB.hotels['surya-pan'].description}\n  📞 ${KB.hotels['surya-pan'].phone}\n\n• **${KB.hotels['hotel-toriba'].name}**\n  ${KB.hotels['hotel-toriba'].description}\n  📞 ${KB.hotels['hotel-toriba'].phone}\n\n• **${KB.hotels['chrys-wellness'].name}**\n  ${KB.hotels['chrys-wellness'].description}\n  📞 ${KB.hotels['chrys-wellness'].phone}`,
        actions: [{ label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }]
      };
    }

    // Romântico
    if (matchKeywords(m, KEYWORDS.romantico)) {
      return {
        text: `💕 **Hospedagens Românticas**\n\n• **${KB.hotels['chateau-villette'].name}**\n  ${KB.hotels['chateau-villette'].description}\n  📞 ${KB.hotels['chateau-villette'].phone}\n\n• **${KB.hotels['quebra-noz'].name}**\n  ${KB.hotels['quebra-noz'].description}\n  📞 ${KB.hotels['quebra-noz'].phone}\n\n• **${KB.hotels.annecy.name}**\n  ${KB.hotels.annecy.description}\n  📞 ${KB.hotels.annecy.phone}\n\n💡 Muitas pousadas oferecem pacotes especiais para casais!`,
        actions: [{ label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }]
      };
    }

    // Pet Friendly
    if (matchKeywords(m, KEYWORDS.petFriendly)) {
      return {
        text: `🐕 **Hospedagens Pet Friendly**\n\n• **${KB.hotels['hotel-ascona'].name}**\n  ${KB.hotels['hotel-ascona'].description}\n  📞 ${KB.hotels['hotel-ascona'].phone}\n\n💡 **Dica:** Sempre confirme as políticas de pets diretamente com o hotel antes de reservar.`,
        actions: [{ label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }]
      };
    }

    // Família
    if (matchKeywords(m, KEYWORDS.family) && (matchKeywords(m, KEYWORDS.hotel) || matchKeywords(m, KEYWORDS.pousada) || m.includes('ficar') || m.includes('hosped'))) {
      return {
        text: `👨‍👩‍👧‍👦 **Hospedagens para Famílias**\n\n• **${KB.hotels['leao-montanha'].name}**\n  ${KB.hotels['leao-montanha'].description}\n  📞 ${KB.hotels['leao-montanha'].phone}\n\n• **${KB.hotels['vila-inglesa'].name}**\n  ${KB.hotels['vila-inglesa'].description}\n  📞 ${KB.hotels['vila-inglesa'].phone}\n\n• **${KB.hotels['recanto-cristovao'].name}**\n  ${KB.hotels['recanto-cristovao'].description}\n  📞 ${KB.hotels['recanto-cristovao'].phone}`,
        actions: [{ label: 'Ver Todas as Hospedagens', url: '/#hospedagens' }]
      };
    }

    // Hospedagem Geral
    if (matchKeywords(m, KEYWORDS.hotel) || matchKeywords(m, KEYWORDS.pousada) || matchKeywords(m, KEYWORDS.chale)) {
      const hoteisList = Object.values(KB.hotels).slice(0, 8).map(h => `• **${h.name}** (${h.category}) - ${h.description.substring(0, 50)}...`).join('\n');
      return {
        text: `🏨 **Hospedagens em Campos do Jordão**\n\nA cidade oferece opções para todos os gostos e bolsos:\n\n${hoteisList}\n\n💡 **Dica:** Reserve com antecedência na alta temporada (julho)!`,
        actions: [
          { label: 'Ver Hospedagens', url: '/#hospedagens' },
          { label: '✨ Hotéis de Luxo', url: '/#hospedagens' },
          { label: '💕 Pousadas Românticas', url: '/#hospedagens' }
        ]
      };
    }

    // =========================================================================
    // PASSEIOS GERAIS E FAMÍLIA
    // =========================================================================
    
    // Passeios para família/crianças
    if (matchKeywords(m, KEYWORDS.family)) {
      return {
        text: `👨‍👩‍👧‍👦 **Passeios para Famílias com Crianças**\n\n• **Tarundu** - Parque de aventuras com +35 atrações\n• **Dreams House Park** - Museu de cera e Miniland\n• **Teleférico** - Passeio até o Morro do Elefante\n• **Parque Capivari** - Pedalinhos e área de lazer\n• **Parque Amantikir** - Jardins e labirintos\n• **Iceland** - Bar de gelo (crianças adoram!)\n• **Borboletário** - Mais de 35 espécies de borboletas\n\n💡 **Dica:** Verifique idade mínima para atividades de aventura!`,
        actions: [
          { label: 'Ver Passeios', url: '/#explore' },
          { label: 'Hotéis para Famílias', url: '/#hospedagens' }
        ]
      };
    }

    // Passeios gerais
    if (matchKeywords(m, KEYWORDS.tours) || matchKeywords(m, KEYWORDS.nature) || matchKeywords(m, KEYWORDS.adventure)) {
      return {
        text: `🏔️ **Passeios em Campos do Jordão**\n\n**🌿 Natureza:**\n• Parque Amantikir - jardins temáticos\n• Horto Florestal - trilhas e araucárias\n• Pico do Itapeva - mirante a 2.030m\n• Ducha de Prata - queda d'água gratuita\n\n**🎢 Lazer:**\n• Tarundu - parque de aventuras\n• Parque Capivari - teleférico e compras\n• Iceland - bar de gelo\n• Dreams House Park - museu de cera\n\n**🎨 Cultura:**\n• Museu Felícia Leirner\n• Palácio Boa Vista\n• Casa da Xilogravura\n\n**🍺 Gastronomia:**\n• Cervejaria Baden Baden\n• Parque da Cerveja\n\n💡 Pergunte sobre qualquer atração para mais detalhes!`,
        actions: [
          { label: 'Ver Todos os Passeios', url: '/#explore' },
          { label: 'Mapa Interativo', url: '/#explore' }
        ]
      };
    }

    // =========================================================================
    // ROTEIROS
    // =========================================================================
    if (matchKeywords(m, KEYWORDS.roteiro)) {
      const hasFds = m.includes('fim de semana') || m.includes('fds') || m.includes('final de semana') || m.includes('2 dias') || m.includes('dois dias');
      
      if (hasFds) {
        return {
          text: `📅 **Roteiro de Fim de Semana em Campos do Jordão**\n\n**Dia 1:**\n• Manhã: Parque Amantikir (jardins e fotos)\n• Almoço: Restaurante com fondue ou truta\n• Tarde: Passeio no Capivari + Teleférico\n• Noite: Jantar e drinks no Capivari\n\n**Dia 2:**\n• Manhã: Horto Florestal ou Tarundu\n• Almoço: Baden Baden (tour + almoço)\n• Tarde: Compras e chocolates\n• Retorno no final da tarde\n\n💡 **Dica:** Se puder, estenda para 3 dias!`,
          actions: [
            { label: 'Ver Passeios', url: '/#explore' },
            { label: 'Onde Ficar', url: '/#hospedagens' }
          ]
        };
      }
      
      return {
        text: `📅 **Roteiros em Campos do Jordão**\n\n**Recomendação:** 3 a 5 dias para conhecer bem\n\n**Imperdíveis:**\n• Parque Amantikir\n• Cervejaria Baden Baden\n• Teleférico + Morro do Elefante\n• Horto Florestal\n• Capivari (compras e gastronomia)\n\n**Se tiver mais tempo:**\n• Pico do Itapeva (nascer do sol)\n• Tarundu (dia inteiro)\n• Museu Felícia Leirner\n• Pedra do Baú (aventureiros)\n\n💡 Pergunte "roteiro fim de semana" para sugestão de 2 dias!`,
        actions: [
          { label: 'Ver Passeios', url: '/#explore' },
          { label: 'Onde Comer', url: '/#ondecomer' }
        ]
      };
    }

    // =========================================================================
    // VIDA NOTURNA
    // =========================================================================
    if (matchKeywords(m, KEYWORDS.noturna)) {
      return {
        text: `🌙 **Vida Noturna em Campos do Jordão**\n\n**Capivari** é o centro da vida noturna!\n\n**Bares e restaurantes:**\n• Baden Baden - cervejaria tradicional\n• Cervejaria Luss - biergarten\n• Iceland - bar de gelo\n• Casa do Malte - cervejas especiais\n\n**O que esperar:**\n• Música ao vivo em diversos estabelecimentos\n• Restaurantes abertos até tarde\n• Clima animado especialmente no inverno\n• Lojas e boutiques no centrinho\n\n💡 A alta temporada (julho) tem mais opções e movimento!`,
        actions: [
          { label: 'Restaurantes', url: '/#ondecomer' },
          { label: 'Capivari', url: '/#explore' }
        ]
      };
    }

    // =========================================================================
    // COMPRAS
    // =========================================================================
    if (matchKeywords(m, KEYWORDS.compras)) {
      return {
        text: `🛍️ **Compras em Campos do Jordão**\n\n**O que levar:**\n• 🍫 Chocolates artesanais\n• 🧥 Malhas e roupas de frio\n• 🧀 Queijos e produtos coloniais\n• 🎨 Artesanato local\n• 🍷 Vinhos e licores\n\n**Onde comprar:**\n• **Capivari** - Principal centro comercial\n• **Vila Inglesa** - Lojas e boutiques\n• **Mãostiqueiras** - Artesanato em lã\n• **Feiras de artesanato** - Produtos locais\n\n💡 **Dica:** Os chocolates de Campos são famosos em todo o país!`,
        actions: [
          { label: 'Capivari', url: '/#explore' },
          { label: 'Gastronomia', url: '/#ondecomer' }
        ]
      };
    }

    // =========================================================================
    // CONTATO
    // =========================================================================
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
    // SITE E NAVEGAÇÃO
    // =========================================================================
    if (matchKeywords(m, KEYWORDS.site)) {
      const pages = KB.site.pages.map(p => `• **${p.title}** - ${p.description}`).join('\n');
      return {
        text: `🌐 **Navegação do Site**\n\n${pages}\n\n💡 Use o menu superior para navegar entre as seções!`,
        actions: KB.site.pages.slice(0, 4).map(p => ({ label: p.title, url: p.path }))
      };
    }

    // =========================================================================
    // FAQs
    // =========================================================================
    for (const faq of KB.faqs) {
      const faqKeywords = faq.q.toLowerCase().split(' ').filter(w => w.length > 3);
      if (faqKeywords.some(kw => m.includes(kw.normalize('NFD').replace(/[\u0300-\u036f]/g, '')))) {
        return {
          text: `❓ **${faq.q}**\n\n${faq.a}`,
          actions: [{ label: 'Mais Informações', url: '/' }]
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
    // RESPOSTA INTELIGENTE FINAL - USA TODA A BASE EXPANDIDA
    // =========================================================================
    
    // Função de busca semântica avançada usando a nova base
    const buscarSemantico = (consulta: string) => {
      const termos = consulta.toLowerCase().split(' ');
      const kb = CAMPOS_JORDAO_KB;
      
      // Detecta intenção e direciona para informações específicas
      if (termos.some(t => ['neve', 'frio', 'temperatura', 'clima'].includes(t))) {
        return CamposJordaoIA.recomendacoesPorEpoca(new Date().getMonth() + 1);
      }
      
      if (termos.some(t => ['quanto', 'preco', 'custo', 'caro', 'barato', 'orcamento'].includes(t))) {
        const custos = kb.informacoes_praticas.custos_estimados;
        return {
          epoca: 'Informações de Custos',
          atividades: [`Orçamento econômico: ${custos.orcamento_economico.total_dia}`, `Orçamento médio: ${custos.orcamento_medio.total_dia}`, `Orçamento luxo: ${custos.orcamento_luxo.total_dia}`],
          roupas: 'Consulte hotéis e restaurantes para valores específicos',
          precos: 'Variam conforme temporada',
          dicas: 'Julho é alta temporada com preços máximos. Maio-junho e agosto-setembro oferecem melhor custo-benefício'
        };
      }
      
      if (termos.some(t => ['historia', 'cultura', 'origem', 'curiosidade'].includes(t))) {
        return {
          epoca: 'História e Cultura Local',
          atividades: kb.historia_cultura.marcos_historicos.slice(0, 3),
          roupas: 'Visitação a museus e centros culturais',
          precos: 'Atrações culturais geralmente têm preços acessíveis',
          dicas: kb.historia_cultura.origem_nome
        };
      }
      
      return null;
    };
    
    const respostaSematica = buscarSemantico(m);
    if (respostaSematica) {
      return {
        text: `ℹ️ **${respostaSematica.epoca}**\n\n${respostaSematica.dicas}\n\n**Informações relevantes:**\n${respostaSematica.atividades.map(a => `• ${a}`).join('\n')}\n\n💡 **Dica:** ${respostaSematica.roupas}`,
        actions: [
          { label: '💰 Custos Detalhados', url: '/#hospedagens' },
          { label: '🎯 Atrações', url: '/#explore' },
          { label: '📚 Mais Informações', url: '/' }
        ]
      };
    }

    // =========================================================================
    // RESPOSTA PADRÃO (FALLBACK INTELIGENTE)
    // =========================================================================
    return {
      text: `Olá! Sou o Guia Virtual de **Campos do Jordão** 🏔️\n\nPosso ajudar com informações sobre:\n\n• 🏔️ **Passeios** - Amantikir, Tarundu, Horto Florestal...\n• 🍽️ **Gastronomia** - Restaurantes, fondues, trutas, cervejarias...\n• 🏨 **Hospedagem** - Hotéis, pousadas, resorts...\n• 🎪 **Eventos** - Convention Bureau, MICE, fornecedores...\n• ℹ️ **Informações** - Clima, como chegar, dicas...\n\n**Exemplos de perguntas:**\n• "Quais os melhores restaurantes de fondue?"\n• "Como me associar ao Convention Bureau?"\n• "O que fazer com crianças?"\n• "Qual a melhor época para visitar?"\n• "Roteiro de fim de semana"\n\nComo posso ajudar você hoje?`,
      actions: [
        { label: '🏔️ Passeios', url: '/#explore' },
        { label: '🍽️ Onde Comer', url: '/#ondecomer' },
        { label: '🏨 Onde Ficar', url: '/#hospedagens' },
        { label: '🤝 Associe-se', url: KB.convention.associateUrl }
      ]
    };
  }
}

export const geminiService = new GeminiService();
