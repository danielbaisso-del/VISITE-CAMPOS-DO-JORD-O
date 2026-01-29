const http = require('http');
let GoogleGenAI;
try {
  ({ GoogleGenAI } = require('@google/genai'));
} catch (e) {
  GoogleGenAI = null;
}

const PORT = process.env.PORT || 5051;

const SYSTEM_INSTRUCTION = `Você é o Guia Virtual oficial de Campos do Jordão. Responda conciso e em JSON quando possível (campos: text, actions).`;

const server = http.createServer(async (req, res) => {
  const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' };
  if (req.method === 'OPTIONS') { res.writeHead(204, headers); res.end(); return; }
  if (req.method === 'GET' && req.url === '/health') { res.writeHead(200, headers); res.end(JSON.stringify({ ready: !!process.env.API_KEY })); return; }
  if (req.method === 'POST' && req.url === '/generate') {
    if (!GoogleGenAI) {
      res.writeHead(503, headers);
      res.end(JSON.stringify({ error: 'SDK @google/genai not installed' }));
      return;
    }
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const prompt = payload.prompt || payload.text || '';
        const tone = payload.tone || 'friendly';
        const kb = payload.kb || undefined;
        // Support either API key (process.env.API_KEY) or Application Default Credentials
        // If API_KEY is set, use it. Otherwise the SDK will use ADC when
        // GOOGLE_APPLICATION_CREDENTIALS is set to a service account JSON path.
        const ai = process.env.API_KEY ? new GoogleGenAI({ apiKey: process.env.API_KEY }) : new GoogleGenAI();
        const chat = ai.chats.create({ model: process.env.GENAI_MODEL || 'gemini-3-flash-preview', config: { systemInstruction: SYSTEM_INSTRUCTION } });
        const result = await chat.sendMessage({ message: prompt });
        const raw = result && (result.text || result.output?.[0]?.content?.[0]?.text) || '';
        // Try parse JSON from raw
        try {
          const j = JSON.parse(raw);
          res.writeHead(200, headers);
          res.end(JSON.stringify(j));
          return;
        } catch (e) {
          res.writeHead(200, headers);
          res.end(JSON.stringify({ text: String(raw || 'Desculpe, sem resposta.') }));
          return;
        }
      } catch (err) {
        console.error('genai-proxy error', err && err.message);
        res.writeHead(500, headers);
        res.end(JSON.stringify({ error: 'internal error' }));
      }
    });
    return;
  }
  res.writeHead(404, headers);
  res.end(JSON.stringify({ error: 'not found' }));
});

server.on('listening', () => console.log(`GenAI proxy listening on http://127.0.0.1:${PORT}`));
server.on('error', (e) => console.error('GenAI proxy error', e));
server.listen(PORT, '127.0.0.1');
