import sys
import json
import time

# Runner usando gpt4all Python package
# Recebe o prompt como único argumento (JSON string) ou via stdin

try:
    from gpt4all import GPT4All
    GPT4ALL_AVAILABLE = True
except Exception:
    GPT4ALL_AVAILABLE = False

# Prefer a small, already-downloadable model filename to avoid large auto-downloads
MODEL_NAME = "Llama-3.2-1B-Instruct-Q4_0.gguf"

def load_model(name=MODEL_NAME):
    # Tenta carregar o modelo, permitindo download se necessário.
    try:
        model = GPT4All(name, allow_download=True)
        return model
    except TypeError:
        # versão da API que exige model_name= keyword
        try:
            model = GPT4All(model_name=name, allow_download=True)
            return model
        except Exception:
            return None
    except Exception:
        return None

def choose_model_from_list(preferred=MODEL_NAME):
    try:
        available = GPT4All.list_models()
        # procurar por nome exato
        for m in available:
            if m.get('name') == preferred or m.get('filename') == preferred:
                # preferir o identificador de arquivo (gguf) que o runtime aceita
                return m.get('filename') or m.get('name')
        # preferir modelos de baixa RAM requirement e que não sejam modelos de embedding
        candidates = []
        for m in available:
            if m.get('embeddingModel'):
                continue
            try:
                ram = int(str(m.get('ramrequired') or 999))
            except Exception:
                ram = 999
            # filesize numérico quando possível
            fs = None
            try:
                fs = int(''.join(ch for ch in str(m.get('filesize') or '') if ch.isdigit()))
            except Exception:
                fs = 999999999
            candidates.append((ram, fs, m))
        candidates.sort(key=lambda x: (x[0], x[1]))
        for ram, fs, m in candidates:
            if ram <= 6:
                return m.get('filename') or m.get('name')
        if candidates:
            return candidates[0][2].get('filename') or candidates[0][2].get('name')
    except Exception:
        return preferred

def parse_input():
    if len(sys.argv) > 1:
        raw = " ".join(sys.argv[1:])
        # raw may be a JSON string; tentar desserializar
        try:
            prompt = json.loads(raw)
        except Exception:
            # remover aspas externas se existirem
            if raw.startswith('"') and raw.endswith('"'):
                raw2 = raw[1:-1]
                raw2 = raw2.encode('utf-8').decode('unicode_escape')
                prompt = raw2
            else:
                prompt = raw
    else:
        try:
            prompt = sys.stdin.read()
        except Exception:
            prompt = ''
    if isinstance(prompt, dict):
        # extrair campo prompt
        prompt = prompt.get('prompt') or prompt.get('text') or json.dumps(prompt)
    return str(prompt or '')


def main():
    prompt = parse_input()
    model = None
    if GPT4ALL_AVAILABLE:
        # escolher modelo sensato disponível
        try:
            chosen = choose_model_from_list(MODEL_NAME)
        except Exception:
            chosen = MODEL_NAME
        model = load_model(chosen)

    text = ''
    # se modelo disponível, tente gerar
    if model:
        try:
            # gerar com limite de tokens
            response = model.generate(prompt, max_tokens=256)
            if isinstance(response, list):
                text = '\n'.join(response)
            else:
                text = str(response)
        except Exception:
            text = ''

    # fallback heurístico usando palavras-chave do prompt
    if not text:
        lp = prompt.lower()
        if 'altitude' in lp or 'altura' in lp:
            text = 'A altitude média de Campos do Jordão é aproximadamente 1628 metros acima do nível do mar.'
        elif 'coorden' in lp or 'latitude' in lp or 'longitude' in lp:
            text = 'Coordenadas aproximadas: latitude -22.739, longitude -45.588.'
        elif 'clima' in lp or 'tempo' in lp:
            text = 'Clima de altitude: verões com chuvas de tarde e temperaturas amenas; invernos frios e noites geladas.'
        elif 'convention' in lp or 'bureau' in lp or 'associe' in lp or 'mice' in lp or 'evento' in lp:
            text = 'Convention Bureau de Campos do Jordão: contato contato@visitecamposdojordao.org.br | Tel: (12) 3662-0000. Para solicitar, informe datas, número estimado de participantes e necessidades técnicas.'
        else:
            text = 'Olá! Posso ajudar com informações sobre Campos do Jordão: passeios, hospedagem, gastronomia e eventos. Pergunte algo específico.'

    # sempre retornar JSON com campo text e ações básicas
    out = {"text": text, "actions": [{"label": "Ver no site", "url": "/"} ] }
    sys.stdout.write(json.dumps(out, ensure_ascii=False))

if __name__ == '__main__':
    main()
