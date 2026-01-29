import http from 'http';

const PORT = process.env.PORT || 5000;

// KB local simplificada — usada para respostas rápidas em localhost
const KB = {
  city: {
    name: 'Campos do Jordão',
    altitude_m: 1628,
    coordinates: { lat: -22.739, lng: -45.588 },
    climate: 'Clima de altitude; frio no inverno, chuvas de tarde no verão',
    best_times: 'Julho (alta temporada de inverno); primavera e outono para menos movimento'
  },
  convention: {
    website: 'https://www.visitecamposdojordao.org.br/associados/associe-se/',
    contacts: {
      email: 'contato@visitecamposdojordao.org.br',
      phone: '(12) 3662-0000',
      address: 'Av. Dr. Luis Arrobas Martins, s/n - Alto da Boa Vista'
    }
  },
  attractions: {
    amantikir: { title: 'Parque Amantikir', website: 'https://parqueamantikir.com.br/', address: 'Rod. Campos do Jordão - Gavião Gonzaga' },
    felicia: { title: 'Museu Felícia Leirner', website: 'https://www.museufelicialeirner.org.br/', address: 'Av. Dr. Luis Arrobas Martins, 1880' },
    baden: { title: 'Baden Baden', website: 'https://www.badenbaden.com.br/', address: 'Av. Matheus Costa Pinto, 1653' }
  },
  hotels: [
    { name: 'Hotel Toriba', category: 'Tradicional / Luxo', phone: '(12) 3662-9000', website: 'https://www.toriba.com.br/' },
    { name: 'Parque Hotel', category: 'Hotel', phone: '(12) 3644-1234' }
  ],
  restaurants: [
    { name: 'Cantina Nonna Mimi', specialty: 'Comida italiana tradicional', address: 'Capivari' },
    { name: 'Baden Baden - Restaurante', specialty: 'Cervejaria e pratos locais', address: 'Vila Santa Cruz', phone: '(12) 3664 2004', website: 'https://www.badenbaden.com.br/' }
  ],
  pocketbook: { url: 'https://www.visitecamposdojordao.org.br/pocketbook.pdf' },
  rfp_templates: [
    { id: 'rfp-basic', title: 'Modelo RFP - Básico', download: 'https://www.visitecamposdojordao.org.br/templates/rfp-basic.docx' },
    { id: 'rfp-mice', title: 'Checklist MICE', download: 'https://www.visitecamposdojordao.org.br/templates/rfp-mice.docx' }
  ]
};

async function queryHuggingFace(model, prompt, hfKey) {
  try {
    const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${hfKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: 512 } })
    });
    const data = await res.json();
    // HF may return an array or object with generated_text
    const txt = Array.isArray(data) ? (data[0]?.generated_text || JSON.stringify(data)) : (data.generated_text || data[0]?.generated_text || JSON.stringify(data));
    return String(txt || '');
  } catch (e) {
    console.warn('HuggingFace call failed', e);
    return null;
  }
}

function runLocalCommand(cmdTemplate, prompt) {
  return new Promise(async (resolve) => {
    try {
      const child = await import('child_process');
      let cmd = cmdTemplate;
      // If {PROMPT} placeholder present, replace and run via shell
      if (cmd.includes('{PROMPT}')) {
        const { exec } = child;
        cmd = cmd.replace('{PROMPT}', JSON.stringify(prompt));
        exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
          if (err) {
            console.warn('Local exec error', err, stderr);
            return resolve(null);
          }
          return resolve(String(stdout || stderr || '').trim());
        });
        return;
      }

      // Otherwise spawn and write prompt to stdin
      const parts = cmd.split(' ');
      const p = child.spawn(parts[0], parts.slice(1));
      let out = '';
      p.stdout.on('data', d => out += String(d));
      p.stderr.on('data', d => out += String(d));
      p.on('close', () => resolve(out.trim()));
      if (p.stdin) {
        p.stdin.write(prompt);
        p.stdin.end();
      }
    } catch (e) {
      console.warn('Local model execution failed', e);
      resolve(null);
    }
  });
}

async function generateRichResponse(prompt, tone) {
  // Try provider options in order: Hugging Face (if key), Local command (if provided), then fallback KB responder
  const hfKey = process.env.HF_API_KEY || process.env.HUGGINGFACE_API_KEY;
  const hfModel = process.env.HF_MODEL || 'google/flan-t5-large';

  // System instruction to steer the model to return JSON {text, actions[]}
  const system = `Você é o Guia Virtual de Campos do Jordão. Responda em português e retorne um JSON válido com {"text": string, "actions": [{"label","url"}] quando aplicável. Seja conciso e cite contatos quando disponíveis.`;
  const fullPrompt = `${system}\n\nContexto: ${JSON.stringify(KB)}\n\nPergunta: ${prompt}\nTom: ${tone || 'padrão'}`;

  if (hfKey) {
    const hfOut = await queryHuggingFace(hfModel, fullPrompt, hfKey);
    if (hfOut) {
      // try parse JSON out of model output
      const j = extractJSON(hfOut);
      if (j) return j;
      return { text: hfOut };
    }
  }

  const localCmd = process.env.LOCAL_MODEL_CMD;
  if (localCmd) {
    const out = await runLocalCommand(localCmd, fullPrompt);
    if (out) {
      const j = extractJSON(out);
      if (j) return j;
      return { text: out };
    }
  }

  // fallback to simple KB-based answers
  return generateKbResponse(prompt, tone);
}

function extractJSON(text) {
  try {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start === -1 || end === -1) return null;
    const sub = text.slice(start, end + 1);
    return JSON.parse(sub);
  } catch (e) {
    return null;
  }
}

function generateKbResponse(prompt, tone) {
  const m = (prompt || '').toLowerCase();

  // Altitude / coordinates / climate
  if (m.includes('altitude') || m.includes('altura')) {
    return {
      text: `A altitude média de ${KB.city.name} é aproximadamente ${KB.city.altitude_m} metros acima do nível do mar. Isso significa que as noites podem ser bastante frias, especialmente entre maio e agosto; recomenda-se levar casacos quentes e calçados adequados. Em eventos ao ar livre, considere aquecimento e planos de contingência para temperaturas baixas.`,
      actions: [
        { label: 'A Cidade', url: '/#' },
        { label: 'Dicas de Viagem', url: '/#explore' }
      ]
    };
  }

  if (m.includes('coorden') || m.includes('latitude') || m.includes('longitude')) {
    return { text: `Coordenadas aproximadas: latitude ${KB.city.coordinates.lat}, longitude ${KB.city.coordinates.lng}. Essas coordenadas situam ${KB.city.name} na Serra da Mantiqueira, na divisa de climas entre o interior paulista e o sudeste.` };
  }

  if (m.includes('clima') || m.includes('tempo')) {
    return {
      text: `O clima em ${KB.city.name} é de altitude: verões com chuvas no fim da tarde e temperaturas amenas, e invernos secos e frios, com noites próximas ou abaixo de 0°C em picos de frio. Para passeios diurnos, leve camadas leves; à noite, casacos pesados são recomendados.`,
      actions: [{ label: 'Melhor Época', url: '/#explore' }]
    };
  }

  // Convention Bureau
  if (m.includes('convention') || m.includes('bureau') || m.includes('associe') || m.includes('evento') || m.includes('mice')) {
    return {
      text: `O Convention Bureau de ${KB.city.name} atua conectando organizadores a hotéis, casas de eventos, fornecedores de áudio/visual, catering e transporte local. Para iniciar um pedido, informe: datas propostas, número estimado de participantes, formato (presencial/híbrido) e necessidades técnicas. O bureau fornece RFPs, visitas técnicas e kits com fichas técnicas de espaços. Contato principal: ${KB.convention.contacts.email} | Tel: ${KB.convention.contacts.phone}.`,
      actions: [
        { label: 'Associe-se / Contato', url: KB.convention.website },
        { label: 'Enviar e-mail', url: `mailto:${KB.convention.contacts.email}` },
        { label: 'Download Pocketbook', url: KB.pocketbook.url }
      ]
    };
  }

  // Attractions and recommendations
  if (m.includes('amantikir') || m.includes('amantiki')) {
    return {
      text: `Parque Amantikir é um dos pontos mais fotografados de ${KB.city.name}. Recomendo chegar cedo para aproveitar a luz da manhã e evitar filas. O parque oferece trilhas fáceis, mirantes e jardins temáticos; use calçados confortáveis e verifique a previsão do tempo.`,
      actions: [{ label: 'Parque Amantikir', url: KB.attractions.amantikir.website }]
    };
  }

  if (m.includes('felícia') || m.includes('felicia') || m.includes('museu')) {
    return {
      text: `O Museu Felícia Leirner combina arte e natureza em um espaço ao ar livre. Além das esculturas, o Auditório Claudio Santoro recebe concertos ocasionais — confira a programação antes da visita. Endereço: ${KB.attractions[1].address}.`,
      text: `O Museu Felícia Leirner combina arte e natureza em um espaço ao ar livre. Além das esculturas, o Auditório Claudio Santoro recebe concertos ocasionais — confira a programação antes da visita. Endereço: ${KB.attractions.felicia.address}.`,
      actions: [{ label: 'Museu Felícia Leirner', url: KB.attractions.felicia.website }]
    };
  }

  if (m.includes('baden') || m.includes('cervejaria')) {
    return {
      text: `A Cervejaria Baden Baden oferece tours, harmonizações e restaurante. É um excelente programa gastronômico; em alta temporada recomenda-se reservar com antecedência. Ideal para grupos e eventos informais.`,
      actions: [{ label: 'Baden Baden', url: KB.attractions.baden.website }]
    };
  }

  // Hotels / restaurants
  if (m.includes('hotel') || m.includes('hosped') || m.includes('onde ficar')) {
    const hotelsText = (KB.hotels || []).map(h => `• ${h.name} (${h.category || 'hotel'}) — Telefone: ${h.phone || 'não informado'}`).join('\n');
    return {
      text: `Algumas opções de hospedagem em ${KB.city.name}:\n${hotelsText}\nPara eventos, peça tarifas e blocos de quartos com antecedência.`,
      actions: [{ label: 'Onde Ficar', url: '/#hospedagens' }]
    };
  }

  if (m.includes('restaurante') || m.includes('comer') || m.includes('onde comer')) {
    const restos = (KB.restaurants || []).map(r => `• ${r.name} — Especialidade: ${r.specialty || 'variedade'}`).join('\n');
    return { text: `Sugestões de gastronomia:\n${restos}\nMuitos restaurantes em Capivari oferecem opções para grupos; recomendo verificar horários e reservar em épocas de alta demanda.`, actions: [{ label: 'Onde Comer', url: '/#ondecomer' }] };
  }

  // FAQ style answers
  if (m.includes('melhor época') || m.includes('quando visitar')) {
    return { text: `A melhor época depende do objetivo: para experiência de inverno (neve não garantida) escolha julho; para clima mais ameno, prefira primavera/outono. Alta temporada: festas e eventos em julho podem elevar preços.` };
  }

  // generic / fallback: provide a helpful multi-paragraph reply with actions
  let generic = {
    text: `Olá! Sou o Guia Virtual de ${KB.city.name}. Posso ajudar com informações sobre passeios, hospedagem, gastronomia, eventos e o Convention Bureau. Exemplos de perguntas: "Qual a altitude?", "Quais passeios para família?", "Como contratar fornecedores para um evento?"\n\nSe quiser, clique em um dos botões para acessar seções do site ou peça detalhes específicos que eu vou responder com recomendações práticas, contatos e dicas.`,
    actions: [
      { label: 'Passeios', url: '/#explore' },
      { label: 'Onde Comer', url: '/#ondecomer' },
      { label: 'Associe-se (Convention)', url: KB.convention.website },
      { label: 'Pocketbook (download)', url: KB.pocketbook.url },
      { label: 'Checklist RFP', url: KB.rfp_templates[1].download }
    ]
  };

  // adjust tone if requested
  if (tone === 'formal') {
    generic.text = `Prezado(a),\n\n${generic.text}`;
  } else if (tone === 'mice') {
    generic.text += `\n\nCaso seja organizador de eventos, diga "Checklist RFP" para receber uma lista de itens técnicos e orçamentários.`;
  }

  return generic;
}

const server = http.createServer(async (req, res) => {
  // Basic CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/generate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        const prompt = payload.prompt || payload.text || '';
        const tone = payload.tone || undefined;
        const result = generateRichResponse(prompt, tone);
        res.writeHead(200, headers);
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(400, headers);
        res.end(JSON.stringify({ error: 'invalid json' }));
      }
    });
    return;
  }

  res.writeHead(404, headers);
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, () => console.log(`Mock AI server listening on http://localhost:${PORT}/generate`));
