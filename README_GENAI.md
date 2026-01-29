Guia rápido: usar Google Gemini (Generative AI) via proxy local

1) Opções de credenciais
- API Key (rápido, para testes): crie no Console > APIs & Services > Credentials > Create API key.
- Service Account (recomendado em produção): IAM & Admin > Service Accounts > Create > Create key (JSON).

2) Salve credenciais localmente
- API Key: definir variável de ambiente `API_KEY` (não colocar no código frontend).
  - PowerShell (persistente): `setx API_KEY "SUA_KEY_AQUI"`
- Service Account JSON: defina `GOOGLE_APPLICATION_CREDENTIALS` apontando para o arquivo JSON.
  - PowerShell (persistente): `setx GOOGLE_APPLICATION_CREDENTIALS "C:\caminho\service-account.json"`

3) Instalar dependências e iniciar proxy
```powershell
npm install
npm run genai-proxy
```
- O proxy escuta em `http://127.0.0.1:5051/generate` por padrão.

4) Configurar frontend (dev)
- Crie `.env` na raiz contendo:
  VITE_LOCAL_PROXY_URL=http://127.0.0.1:5051/generate

5) Testes
- Health:
  curl http://127.0.0.1:5051/health
- Teste de geração:
  curl -X POST http://127.0.0.1:5051/generate -H "Content-Type: application/json" -d '{ "prompt": "Teste: altitude de Campos do Jordão" }'

6) Observações de segurança
- Não exponha `API_KEY` no frontend. Use o proxy/servidor com variáveis de ambiente.
- Em produção, proteja o proxy (autenticação, rate-limiting) e rode via HTTPS.
