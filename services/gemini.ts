import { TOURS } from "../constants";
import metadata from "../metadata.json";
import SITE_CONTENT from "../data/siteContent";

const SYSTEM_INSTRUCTION = `
Você é o Guia Virtual oficial de Campos do Jordão para o site "${metadata.name}".
Seu tom é acolhedor, refinado e informativo. Responda apenas a perguntas sobre o conteúdo do site ou sobre Campos do Jordão (turismo, pontos turísticos, restaurantes, eventos, hospedagem, logística, clima e cultura local).
Se a pergunta não for sobre o site ou sobre Campos do Jordão, responda brevemente que não pode ajudar com esse tópico e sugira onde procurar.
Ao responder, seja conciso e útil. Sempre mencione locais/endereços/telefones disponíveis no site quando relevantes, e faça ao menos uma sugestão prática (ex: melhor horário, recomendação, link para o local).

IMPORTANTE: Quando possível, responda unicamente com um JSON válido (sem textos livres antes nem depois) com a forma:
{
  "text": "Resposta textual aqui...",
  "actions": [ { "label": "Ver Parque Amantikir", "url": "/#passeios" }, ... ]
}

- 'text' é obrigatório. 'actions' é opcional e, se presente, deve ser uma lista de objetos com 'label' e 'url' (URL pode ser relativa ao site, por exemplo '/#passeios', ou absoluta).
- Se não for possível gerar ações, retorne apenas o campo 'text' no JSON.
- Se o usuário pedir links para páginas do site, inclua uma ação por link correspondente.

Se precisar de mais detalhes do usuário (ex.: preferências, datas, clima), peça uma pergunta de seguimento curta, mas ainda respondendo em JSON com 'text' e (opcionalmente) 'actions'.
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
      console.warn('GeminiService: API key not provided. Falling back to local responder. Set VITE_API_KEY or API_KEY to enable real AI.');
    }
  }

  async sendMessage(message: string, opts?: { tone?: string }): Promise<{ text: string; actions?: Array<{ label: string; url: string }> }> {
    try {
      const context = this.buildContextSummary();
      const userMessage = `Contexto do site:\n${context}\n\nPergunta do usuário: ${message}`;
      // Força sempre o mock local com modelo Claude Opus 4.5
      const localUrl = 'http://127.0.0.1:5000/generate';
      const data = await this.callLocalApi(localUrl, userMessage, { ...opts, model: 'claude-3-opus-20240229' });
      if (data) {
        return { text: data.text || String(data), actions: data.actions } as any;
      }
      // fallback local responder
      const fallback = this.buildFallbackResponse(message);
      return { text: fallback.text, actions: fallback.actions } as any;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return { text: "No momento não consigo responder. Por favor, tente novamente mais tarde." };
    }
  }

  private getLocalApiUrl(): string | undefined {
    try {
      const u = (import.meta as any)?.env?.VITE_LOCAL_API_URL as string | undefined;
      if (u && u.length) return u;
    } catch (_e) {}
    if (typeof (process as any) !== 'undefined' && (process as any).env && (process as any).env.LOCAL_API_URL) return (process as any).env.LOCAL_API_URL;
    // default to a local mock server used for demos (use 127.0.0.1 to avoid IPv6/hosts issues)
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
      console.warn('Erro ao chamar API local:', e);
      return undefined;
    }
  }

  private buildContextSummary(): string {
    try {
      const shortTours = TOURS.slice(0, 6).map(t => `- ${t.title} (${t.category})${t.address ? ` — ${t.address}` : ''}${t.phone ? ` — Tel: ${t.phone}` : ''}${t.website ? ` — ${t.website}` : ''}`);
      const summary = `${metadata.description}\nPrincipais locais no site:\n${shortTours.join('\n')}`;
      // Attach structured site content (used by the assistant to answer with details and create action buttons). Provide as JSON after a separator.
      const structured = JSON.stringify(SITE_CONTENT);
      return `${summary}\n---\nSTRUTURED_SITE_CONTENT_START\n${structured}\nSTRUTURED_SITE_CONTENT_END`;
    } catch (e) {
      return `${metadata.description}`;
    }
  }

  private buildFallbackResponse(message: string): { text: string; actions?: Array<{ label: string; url: string }> } {
    const m = message.toLowerCase();

    // direct city facts
    if (m.includes('altitude') || m.includes('alt.') || m.includes('altura')) {
      const a = SITE_CONTENT.city?.altitude_m;
      return { text: `A altitude de ${SITE_CONTENT.city.name} é aproximadamente ${a} metros acima do nível do mar.` , actions: [{ label: 'A Cidade', url: '/' }] };
    }
    if (m.includes('coord') || m.includes('coordenada') || m.includes('latitude') || m.includes('longitude')) {
      const c = SITE_CONTENT.city?.coordinates;
      return { text: `Coordenadas aproximadas: lat ${c.lat}, lon ${c.lng}.`, actions: [{ label: 'A Cidade', url: '/' }] };
    }

    // search attractions by name or keyword
    for (const attr of SITE_CONTENT.attractions) {
      const titleLower = (attr.title || '').toLowerCase();
      if (m.includes(titleLower) || (attr.id && m.includes(attr.id))) {
        const lines = [];
        lines.push(`${attr.title}: ${attr.description}`);
        if (attr.address) lines.push(`Endereço: ${attr.address}`);
        if (attr.phone) lines.push(`Telefone: ${attr.phone}`);
        if (attr.hours) lines.push(`Horário: ${attr.hours}`);
        if (attr.tips) lines.push(`Dica: ${attr.tips}`);
        const actions = [];
        if (attr.website) actions.push({ label: attr.title, url: attr.website });
        else actions.push({ label: 'Ver no site', url: '/#explore' });
        return { text: lines.join('\n'), actions };
      }
    }

    // convention bureau
    if (m.includes('convention') || m.includes('bureau') || m.includes('mice') || m.includes('evento') || m.includes('evento')) {
      const conv = SITE_CONTENT.convention;
      const text = `${conv.name}: ${conv.description}\nServiços: ${conv.services.join(', ')}\nComo solicitar: ${conv.howToRequest}`;
      const actions = [{ label: 'Associe-se / Contato', url: conv.contacts.website || '/' }];
      return { text, actions };
    }

    // FAQ-like queries
    if (m.includes('melhor época') || m.includes('quando visitar') || m.includes('melhor época para visitar')) {
      return { text: `Melhor época: ${SITE_CONTENT.city.best_times}.` , actions: [{ label: 'A Cidade', url: '/' }] };
    }

    if (m.includes('como chegar') || m.includes('chegar') || m.includes('acesso')) {
      return { text: `Acesso/Transporte: ${SITE_CONTENT.city.transport}`, actions: [{ label: 'Como Chegar', url: '/' }] };
    }

    if (m.includes('clima') || m.includes('tempo')) {
      return { text: `Clima: ${SITE_CONTENT.city.climate}`, actions: [{ label: 'A Cidade', url: '/' }] };
    }

    // try to answer generically by listing matched categories
    // keywords mapping
    if (m.includes('onde comer') || m.includes('restaurante') || m.includes('onde posso comer') ) {
      const matches = SITE_CONTENT.attractions.filter(a => a.category && a.category.toLowerCase() === 'gastronomia');
      const text = matches.map(m => `${m.title} — ${m.address || ''}`).join('\n');
      const actions = matches.map(m => ({ label: m.title, url: m.website || '/#ondecomer' }));
      return { text: text || 'Veja nossas sugestões na seção Onde Comer.', actions: actions.length ? actions : [{ label: 'Onde Comer', url: '/#ondecomer' }] };
    }

    // If ambiguous, ask clarification but give quick links
    const summary = SITE_CONTENT.site.description + '\nPrincipais seções: Passeios, Onde Comer, Onde Ficar, Quem Somos, Associe-se.';
    return { text: `Não tenho certeza do que você quis dizer. Pode especificar? Ex.: "altitude", "horário do Amantikir", "contato do Convention Bureau".\n\n${summary}`, actions: [
      { label: 'Passeios', url: '/#explore' },
      { label: 'Onde Comer', url: '/#ondecomer' },
      { label: 'Onde Ficar', url: '/#hospedagens' }
    ] };
  }
}

export const geminiService = new GeminiService();
