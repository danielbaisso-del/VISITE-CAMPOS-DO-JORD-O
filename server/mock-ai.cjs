const http = require('http');

const PORT = process.env.PORT || 5000;

const KB = {
  city: {
    name: 'Campos do Jordão',
    altitude_m: 1628,
    coordinates: { lat: -22.739, lng: -45.588 },
    climate: 'Clima de altitude; frio no inverno, chuvas de tarde no verão',
    best_times: 'Julho (alta temporada de inverno); primavera e outono para menos movimento'
  },
  convention: { website: 'https://www.visitecamposdojordao.org.br/associados/associe-se/' },
  attractions: {
    amantikir: { title: 'Parque Amantikir', website: 'https://parqueamantikir.com.br/', address: 'Rod. Campos do Jordão - Gavião Gonzaga' },
    felicia: { title: 'Museu Felícia Leirner', website: 'https://www.museufelicialeirner.org.br/', address: 'Av. Dr. Luis Arrobas Martins, 1880' },
    baden: { title: 'Baden Baden', website: 'https://www.badenbaden.com.br/', address: 'Av. Matheus Costa Pinto, 1653' }
  }
};

// Simple in-memory session store: { sessionId: [{role:'user'|'model', text: '...'}, ...] }
const SESSIONS = {};

function generateRichResponse(prompt, tone, kbOverride, history) {
  const KBLOCAL = kbOverride || KB;
  const m = (prompt || '').toLowerCase();
  // naive context resolution: if prompt references 'isso' or pronouns, prepend last model/user turn
  if (history && history.length > 0) {
    const last = history[history.length - 1];
    if (m.match(/\b(isso|aquilo|ele|ela|isso aí)\b/)) {
      prompt = `${last.role}: ${last.text}\nUsuário pergunta: ${prompt}`;
    }
  }
  if (m.includes('altitude') || m.includes('altura')) {
    return {
      text: `A altitude média de ${KBLOCAL.city.name} é aproximadamente ${KBLOCAL.city.altitude_m} metros acima do nível do mar. Isso impacta o clima: noites frias e dias amenos, especialmente entre maio e agosto. Para viagens, leve roupas em camadas e planeje aquecimento para eventos ao ar livre.`,
      actions: [
        { label: 'A Cidade', url: '/#' },
        { label: 'Dicas de Viagem', url: '/#explore' }
      ]
    };
  }
  if (m.includes('coorden') || m.includes('latitude') || m.includes('longitude')) {
    return { text: `Coordenadas aproximadas: latitude ${KBLOCAL.city.coordinates.lat}, longitude ${KBLOCAL.city.coordinates.lng}.` };
  }
  if (m.includes('clima') || m.includes('tempo')) {
    return { text: `Clima de altitude: verões com chuvas no fim da tarde e invernos secos e frios. Planeje roupas adequadas e verifique previsão antes de trilhas.` };
  }
  if (m.includes('passeio') || m.includes('passeios') || m.includes('turismo') || m.includes('famil')) {
    return {
      text: `Sugestões de passeios para famílias em ${KBLOCAL.city.name}:\n1) Parque Amantikir — jardins temáticos e áreas seguras para crianças.\n2) Museu Felícia Leirner — esculturas ao ar livre e espaço para fotos.\n3) Passeio gastronômico leve pelo centro — cafés e chocolaterias. Verifique horários e reserve quando necessário.`,
      actions: [
        { label: 'Parque Amantikir', url: (KBLOCAL.attractions && KBLOCAL.attractions.amantikir && KBLOCAL.attractions.amantikir.website) || '#' },
        { label: 'Museu Felícia Leirner', url: (KBLOCAL.attractions && KBLOCAL.attractions.felicia && KBLOCAL.attractions.felicia.website) || '#' },
        { label: 'Onde Comer', url: '/#ondecomer' }
      ]
    };
  }
  if (m.includes('convention') || m.includes('bureau') || m.includes('associe') || m.includes('evento') || m.includes('mice')) {
    return {
      text: `O Convention Bureau de ${KBLOCAL.city.name} conecta organizadores a hotéis, espaços e fornecedores. Para solicitar apoio, envie datas, número de participantes e necessidades técnicas. Contato: ${KBLOCAL.convention.contacts && KBLOCAL.convention.contacts.email ? KBLOCAL.convention.contacts.email : KBLOCAL.convention.website} ${KBLOCAL.convention.contacts && KBLOCAL.convention.contacts.phone ? '| Tel: ' + KBLOCAL.convention.contacts.phone : ''}.`,
      actions: [
        { label: 'Associe-se / Contato', url: KBLOCAL.convention.contacts && KBLOCAL.convention.contacts.website ? KBLOCAL.convention.contacts.website : KBLOCAL.convention.website },
        { label: 'Enviar e-mail', url: `mailto:${(KBLOCAL.convention.contacts && KBLOCAL.convention.contacts.email) || ''}` }
      ]
    };
  }
  if (m.includes('amantikir') || m.includes('amanti')) {
    return { text: `Parque Amantikir: jardins temáticos, mirantes e esculturas. Chegue cedo para melhores fotos.`, actions: [{ label: 'Parque Amantikir', url: (KBLOCAL.attractions && KBLOCAL.attractions.amantikir && KBLOCAL.attractions.amantikir.website) || '#' }] };
  }
  if (m.includes('felícia') || m.includes('felicia') || m.includes('museu')) {
    return { text: `Museu Felícia Leirner: esculturas ao ar livre e programação cultural. Endereço: ${(KBLOCAL.attractions && KBLOCAL.attractions.felicia && KBLOCAL.attractions.felicia.address) || ''}.`, actions: [{ label: 'Museu Felícia Leirner', url: (KBLOCAL.attractions && KBLOCAL.attractions.felicia && KBLOCAL.attractions.felicia.website) || '#' }] };
  }
  if (m.includes('baden') || m.includes('cervejaria')) {
    return { text: `Baden Baden: tours, loja e restaurante — boa opção gastronômica; reserve com antecedência na alta temporada.`, actions: [{ label: 'Baden Baden', url: (KBLOCAL.attractions && KBLOCAL.attractions.baden && KBLOCAL.attractions.baden.website) || '#' }] };
  }
  if (m.includes('hotel') || m.includes('hosped') || m.includes('onde ficar')) {
    const hotels = (KBLOCAL.hotels || []);
    const hotelsText = hotels.map(h => `• ${h.name} (${h.category}) — Tel: ${h.phone || 'N/A'}`).join('\n');
    return { text: `Algumas opções de hospedagem:\n${hotelsText}`, actions: [{ label: 'Onde Ficar', url: '/#hospedagens' }] };
  }
  if (m.includes('restaurante') || m.includes('comer') || m.includes('onde comer')) {
    const restos = (KBLOCAL.restaurants || []).map(r => `• ${r.name} — ${r.specialty || 'variedade'}`).join('\n');
    return { text: `Sugestões de gastronomia:\n${restos}`, actions: [{ label: 'Onde Comer', url: '/#ondecomer' }] };
  }
  if (m.includes('melhor época') || m.includes('quando visitar')) {
    return { text: `A melhor época depende do objetivo: ${KBLOCAL.city.best_times || 'julho para turismo de inverno; primavera/outono para menos público e clima agradável.'}` };
  }
  let generic = {
    text: `Olá! Sou o Guia Virtual de ${KBLOCAL.city.name}. Posso ajudar com passeios, hospedagem, gastronomia, eventos e contatos do Convention Bureau. Pergunte algo específico e eu respondo com recomendações, contatos e ações.`,
    actions: [
      { label: 'Passeios', url: '/#explore' },
      { label: 'Onde Comer', url: '/#ondecomer' },
      { label: 'Associe-se', url: (KBLOCAL.convention.contacts && KBLOCAL.convention.contacts.website) || KBLOCAL.convention.website }
    ]
  };
  if (tone === 'formal') {
    generic.text = `Prezado(a),\n\n${generic.text}`;
  } else if (tone === 'mice') {
    generic.text += `\n\nSe for organizador de eventos, peça "Checklist RFP" para receber um checklist detalhado.`;
  }
  return generic;
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

function extractUserQuestion(prompt) {
  try {
    if (!prompt || typeof prompt !== 'string') return prompt;
    const markers = ['pergunta do usuário:', 'pergunta do usuario:', 'user question:', 'usuario:'];
    const low = prompt.toLowerCase();
    for (const m of markers) {
      const idx = low.indexOf(m);
      if (idx !== -1) {
        const after = prompt.slice(idx + m.length).trim();
        // if there are separators like '---' or 'STRUTURED_SITE_CONTENT_START', cut there
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
  // Basic CORS headers
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
        const providedKB = payload.kb || payload.KB || null;
        const effectiveKB = providedKB ? Object.assign({}, KB, providedKB) : KB;
        const sessionId = payload.sessionId || payload.session || null;
        // ensure session history exists when sessionId provided
        let history = null;
        if (sessionId) {
          history = SESSIONS[sessionId] || [];
        }
        // Prefer local one-shot runner when available for fastest reliable responses
        const localCmd = process.env.LOCAL_MODEL_CMD;
        const userQ = extractUserQuestion(prompt);
        // append user turn to session history early so runners get context
        if (history && sessionId) {
          history.push({ role: 'user', text: userQ });
          SESSIONS[sessionId] = history;
        }
        if (localCmd) {
          const child_process = require('child_process');
          const parts = localCmd.split(' ');
          const child = child_process.spawn(parts[0], parts.slice(1));
          let out = '';
          if (child.stdout && child.stdout.setEncoding) child.stdout.setEncoding('utf8');
          if (child.stderr && child.stderr.setEncoding) child.stderr.setEncoding('utf8');
          child.stdout.on('data', d => out += String(d));
          child.stderr.on('data', d => out += String(d));
          let killedByTimeout = false;
          const killMs = Number(process.env.LOCAL_RUNNER_TIMEOUT_MS || 60000);
          const killTimer = setTimeout(() => { try { child.kill('SIGKILL'); killedByTimeout = true; console.log('local runner: killed by timeout'); } catch (e) {} }, killMs);
          child.on('close', () => {
            clearTimeout(killTimer);
            try {
              console.log('local runner finished; prompt len=', String(prompt).length, 'out len=', out ? out.length : 0);
              const j = extractJSON(out);
              if (j) {
                console.log('local runner: parsed JSON result');
                console.log('local runner JSON keys:', Object.keys(j));
                // store model reply in session when applicable
                if (history && sessionId && j && typeof j.text === 'string') {
                  history.push({ role: 'model', text: j.text });
                  SESSIONS[sessionId] = history;
                }
                res.writeHead(200, headers);
                res.end(JSON.stringify(j), 'utf8');
              } else {
                if (killedByTimeout) {
                  console.log('local runner: killed by timeout, falling back to KB responder');
                } else {
                  console.log('local runner: no JSON found; falling back to KB responder');
                }
                const fallbackResult = generateRichResponse(userQ, tone, effectiveKB, history);
                if (history && sessionId && fallbackResult && typeof fallbackResult.text === 'string') {
                  history.push({ role: 'model', text: fallbackResult.text });
                  SESSIONS[sessionId] = history;
                }
                res.writeHead(200, headers);
                res.end(JSON.stringify(fallbackResult), 'utf8');
              }
            } catch (err) {
              console.error('Error handling runner output', err);
              const fallbackResult2 = generateRichResponse(userQ, tone, effectiveKB, history);
              if (history && sessionId && fallbackResult2 && typeof fallbackResult2.text === 'string') {
                history.push({ role: 'model', text: fallbackResult2.text });
                SESSIONS[sessionId] = history;
              }
              res.writeHead(200, headers);
              res.end(JSON.stringify(fallbackResult2), 'utf8');
            }
          });
          if (child.stdin) {
            const toSend = { prompt, tone, kb: effectiveKB };
            if (history) toSend.history = history;
            child.stdin.write(JSON.stringify(toSend));
            child.stdin.end();
          }
          return;
        }
        // Optionally try persistent local model server only if enabled and its health endpoint reports ready
        // persistent mode is only used when `LOCAL_MODEL_CMD` is not set and `USE_PERSISTENT_MODEL` is enabled
        const usePersistent = (process.env.USE_PERSISTENT_MODEL === '1' || process.env.USE_PERSISTENT_MODEL === 'true');
        const persistBase = process.env.LOCAL_MODEL_SERVER_URL_BASE || 'http://127.0.0.1:5051';
        const persistHealth = persistBase + '/health';
        const persistGenerate = persistBase + '/generate';
        if (usePersistent) {
        try {
          const url = require('url');
          const parsed = url.parse(persistHealth);
          const httpmod = parsed.protocol === 'https:' ? require('https') : require('http');
          const healthRes = await new Promise((resolve) => {
            const r = httpmod.request({ hostname: parsed.hostname, port: parsed.port, path: parsed.path, method: 'GET' }, (rstream) => {
              let data = '';
              rstream.setEncoding('utf8');
              rstream.on('data', c => data += c);
              rstream.on('end', () => resolve({ ok: true, body: data, statusCode: rstream.statusCode }));
            });
            r.on('error', () => resolve({ ok: false }));
            r.setTimeout && r.setTimeout(3000, () => { try { r.abort(); } catch (e) {} resolve({ ok: false }); });
            try { r.end(); } catch (e) { resolve({ ok: false }); }
          });
          if (healthRes && healthRes.ok && healthRes.body) {
            try {
              const hj = JSON.parse(healthRes.body);
              if (hj && hj.ready) {
                // now call generate
                const genUrl = require('url').parse(persistGenerate);
                const genMod = genUrl.protocol === 'https:' ? require('https') : require('http');
                const genOpts = { hostname: genUrl.hostname, port: genUrl.port, path: genUrl.path, method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' } };
                const pRes = await new Promise((resolve) => {
                  const r2 = genMod.request(genOpts, (rstream) => {
                    let data = '';
                    rstream.setEncoding('utf8');
                    rstream.on('data', c => data += c);
                    rstream.on('end', () => resolve({ ok: true, body: data, statusCode: rstream.statusCode }));
                  });
                  r2.on('error', () => resolve({ ok: false }));
                  r2.setTimeout && r2.setTimeout(20000, () => { try { r2.abort(); } catch (e) {} resolve({ ok: false }); });
                  try { r2.write(JSON.stringify({ prompt, tone, kb: effectiveKB })); r2.end(); } catch (e) { resolve({ ok: false }); }
                });
                if (pRes && pRes.ok && pRes.body) {
                  try {
                    const j = JSON.parse(pRes.body);
                    // stricter validation: must have `text` (string) and optional `actions` (array)
                    const hasText = j && typeof j.text === 'string' && j.text.trim().length > 0;
                    const hasActions = !j.actions || Array.isArray(j.actions);
                    if (hasText && hasActions) {
                      console.log('persistent runner: returned valid JSON');
                      // store in session history when applicable
                      if (history && sessionId) {
                        history.push({ role: 'model', text: j.text });
                        SESSIONS[sessionId] = history;
                      }
                      res.writeHead(200, headers);
                      res.end(JSON.stringify(j), 'utf8');
                      return;
                    } else {
                      console.log('persistent runner: returned JSON but missing required fields; falling back');
                    }
                  } catch (e) {
                    console.log('persistent runner: invalid JSON, falling back');
                  }
                }
              }
            } catch (e) {
              console.log('persistent health parse failed', e && e.message);
            }
          }
        } catch (e) {
          console.log('persistent runner health check failed', e && e.message);
        }
        } else {
          console.log('persistent runner disabled (USE_PERSISTENT_MODEL not set)');
        }
        // No local runner configured; fall through to KB responder below
        const result3 = generateRichResponse(userQ, tone, effectiveKB, history);
        // store model reply into session history
        if (history && sessionId && result3 && typeof result3.text === 'string') {
          history.push({ role: 'model', text: result3.text });
          SESSIONS[sessionId] = history;
        }
        res.writeHead(200, headers);
        res.end(JSON.stringify(result3));
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

server.on('error', (err) => console.error('Server error:', err));
server.on('listening', () => console.log(`Mock AI server listening on http://127.0.0.1:${PORT}/generate`));
server.listen(PORT, '127.0.0.1');
