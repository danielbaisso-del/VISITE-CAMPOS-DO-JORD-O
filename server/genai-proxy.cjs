const http = require('http');
const path = require('path');
const fs = require('fs');

// Carrega variáveis de ambiente do arquivo .env
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

let GoogleGenerativeAI;
try {
  ({ GoogleGenerativeAI } = require('@google/generative-ai'));
} catch (e) {
  GoogleGenerativeAI = null;
}

const PORT = process.env.PORT || 5000;

const SYSTEM_INSTRUCTION = `Você é o Guia Virtual oficial de Campos do Jordão para o site "Visite Campos do Jordão".
Seu tom é acolhedor, refinado e informativo. Responda apenas perguntas sobre Campos do Jordão (turismo, pontos turísticos, restaurantes, eventos, hospedagem, clima e cultura local).

Ao responder, seja conciso e útil. Sempre mencione locais/endereços/telefones quando relevantes.

IMPORTANTE: Responda SEMPRE em JSON válido com esta estrutura:
{
  "text": "Sua resposta aqui...",
  "actions": [{ "label": "Nome do Local", "url": "https://..." }]
}

Informações úteis sobre Campos do Jordão:
- Altitude: 1.628 metros
- Clima: Frio no inverno (maio-agosto), ameno no resto do ano
- Principais atrações: Parque Amantikir, Museu Felícia Leirner, Tarundu, Horto Florestal, Parque Capivari
- Cervejarias: Baden Baden, Caras de Malte
- Festival de Inverno: Julho (maior evento de música clássica da América Latina)`;

const server = http.createServer(async (req, res) => {
  const headers = { 
    'Content-Type': 'application/json; charset=utf-8', 
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  if (req.method === 'OPTIONS') { 
    res.writeHead(204, headers); 
    res.end(); 
    return; 
  }
  
  if (req.method === 'GET' && req.url === '/health') { 
    res.writeHead(200, headers); 
    res.end(JSON.stringify({ ready: !!process.env.API_KEY })); 
    return; 
  }
  
  if (req.method === 'POST' && req.url === '/generate') {
    if (!GoogleGenerativeAI) {
      res.writeHead(503, headers);
      res.end(JSON.stringify({ error: 'SDK @google/generative-ai não instalado. Execute: npm install @google/generative-ai' }));
      return;
    }
    
    if (!process.env.API_KEY) {
      res.writeHead(503, headers);
      res.end(JSON.stringify({ error: 'API_KEY não configurada no arquivo .env' }));
      return;
    }
    
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const prompt = payload.prompt || payload.text || '';
        
        console.log('📨 Pergunta recebida:', prompt.substring(0, 100) + '...');
        
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ 
          model: 'gemini-1.5-pro',
          systemInstruction: SYSTEM_INSTRUCTION
        });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const raw = response.text();
        
        console.log('✅ Resposta do Gemini:', raw.substring(0, 200) + '...');
        
        // Tenta extrair JSON da resposta
        try {
          // Remove possíveis marcadores de código markdown
          let cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          const j = JSON.parse(cleaned);
          res.writeHead(200, headers);
          res.end(JSON.stringify(j));
          return;
        } catch (e) {
          // Se não for JSON válido, retorna como texto
          res.writeHead(200, headers);
          res.end(JSON.stringify({ text: String(raw || 'Desculpe, não consegui processar sua pergunta.') }));
          return;
        }
      } catch (err) {
        console.error('❌ Erro no Gemini:', err && err.message);
        res.writeHead(500, headers);
        res.end(JSON.stringify({ 
          text: 'Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.',
          error: err.message 
        }));
      }
    });
    return;
  }
  
  res.writeHead(404, headers);
  res.end(JSON.stringify({ error: 'not found' }));
});

server.on('listening', () => {
  console.log('');
  console.log('🤖 ========================================');
  console.log('   SERVIDOR IA GEMINI INICIADO!');
  console.log('   http://127.0.0.1:' + PORT + '/generate');
  console.log('   API Key: ' + (process.env.API_KEY ? '✅ Configurada' : '❌ Não encontrada'));
  console.log('========================================');
  console.log('');
});
server.on('error', (e) => console.error('❌ Erro no servidor:', e));
server.listen(PORT, '127.0.0.1');
