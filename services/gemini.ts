import { TOURS } from "../constants";
import metadata from "../metadata.json";
import SITE_CONTENT from "../data/siteContent";
import { KB, KEYWORDS, matchKeywords, findBestMatch } from "./knowledgeBase";

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
    // CLIMA E MELHOR ÉPOCA
    // =========================================================================
    if (matchKeywords(m, KEYWORDS.climate) || matchKeywords(m, KEYWORDS.bestTime)) {
      const hasNeve = m.includes('neve');
      const hasFrio = m.includes('frio') || m.includes('inverno');
      
      let response = `🌡️ **Clima em Campos do Jordão**\n\n${KB.city.climate}\n\n`;
      
      if (hasNeve) {
        response += `❄️ **Sobre neve:** Neve é extremamente rara em Campos do Jordão. Pode haver geadas fortes no inverno (junho-agosto), mas neve praticamente não ocorre.\n\n`;
      }
      
      if (hasFrio) {
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
    // HOSPEDAGEM
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
