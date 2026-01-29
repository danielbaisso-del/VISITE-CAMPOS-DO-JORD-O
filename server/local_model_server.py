#!/usr/bin/env python3
"""Lightweight persistent local model server using gpt4all.

Endpoints:
 - POST /generate  (json: {prompt, tone}) -> json {text, actions}

The server loads the model once on startup and answers requests.
"""
import os
import json
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
import threading

MODEL_PORT = int(os.environ.get('LOCAL_MODEL_SERVER_PORT', '5051'))
# Allow overriding via env; default to a usable small instruct model known to download reliably
# (change via env LOCAL_MODEL_NAME if you prefer a different model)
MODEL_NAME = os.environ.get('LOCAL_MODEL_NAME', 'Llama-3.2-1B-Instruct-Q4_0.gguf')

MODEL = None
G4ALL = None

def load_model():
    global MODEL, G4ALL
    try:
        import gpt4all
        G4ALL = gpt4all
    except Exception as e:
        print('gpt4all import failed:', e, file=sys.stderr)
        return
    try:
        # Try constructor variants defensively
        def try_instantiate(name):
            try:
                return G4ALL.GPT4All(model_name=name, allow_download=True)
            except Exception:
                try:
                    return G4ALL.GPT4All(name, allow_download=True)
                except Exception:
                    return None

        MODEL = try_instantiate(MODEL_NAME)
        if MODEL is None:
            # try to pick a small available model from the list when supported
            try:
                if hasattr(G4ALL, 'list_models'):
                    available = G4ALL.list_models()
                else:
                    # older gpt4all bindings may not expose list_models; use a known fallback
                    print('gpt4all.list_models not available; will try a default fallback model', file=sys.stderr)
                    available = []
                candidates = []
                for m in available:
                    if m.get('embeddingModel'):
                        continue
                    try:
                        ram = int(str(m.get('ramrequired') or 999))
                    except Exception:
                        ram = 999
                    fs = None
                    try:
                        fs = int(''.join(ch for ch in str(m.get('filesize') or '') if ch.isdigit()))
                    except Exception:
                        fs = 999999999
                    candidates.append((ram, fs, m))
                candidates.sort(key=lambda x: (x[0], x[1]))
                for ram, fs, m in candidates:
                    if ram <= 6:
                        pick = m.get('filename') or m.get('name')
                        MODEL = try_instantiate(pick)
                        if MODEL:
                            print('Auto-picked model', pick)
                            break
                if MODEL is None and candidates:
                    pick = candidates[0][2].get('filename') or candidates[0][2].get('name')
                    MODEL = try_instantiate(pick)
                    if MODEL:
                        print('Auto-picked fallback model', pick)
                # If still no model, try a known downloadable filename as a last resort
                if MODEL is None:
                    fallback = 'Llama-3.2-1B-Instruct-Q4_0.gguf'
                    print('Attempting known fallback model:', fallback, file=sys.stderr)
                    MODEL = try_instantiate(fallback)
                    if MODEL:
                        print('Loaded known fallback model', fallback)
            except Exception as e:
                print('model list/selection failed', e, file=sys.stderr)

        print('Model loaded:', bool(MODEL))
    except Exception as e:
        print('Failed to instantiate model:', e, file=sys.stderr)

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

class Handler(BaseHTTPRequestHandler):
    def _set_headers(self, code=200):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(204)

    def do_GET(self):
        if self.path == '/health':
            ready = MODEL is not None
            self._set_headers(200)
            self.wfile.write(json.dumps({'ready': ready}).encode('utf-8'))
            return
        self._set_headers(404)
        self.wfile.write(json.dumps({'error': 'not found'}).encode('utf-8'))

    def do_POST(self):
        if self.path != '/generate':
            self._set_headers(404)
            self.wfile.write(json.dumps({'error': 'not found'}).encode('utf-8'))
            return
        length = int(self.headers.get('content-length', 0))
        raw = self.rfile.read(length).decode('utf-8') if length else '{}'
        try:
            payload = json.loads(raw)
        except Exception:
            payload = {}
        prompt = payload.get('prompt') or payload.get('text') or ''
        tone = payload.get('tone')

        response = {'text': '', 'actions': []}

        if MODEL is None:
            response['text'] = 'Modelo local não disponível no servidor persistente.'
            self._set_headers(200)
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
            return

        try:
            # Use a safe generate call; adapt to API variants
            # Build a strict instruction so the model outputs JSON only
            instruction = (
                'You are a JSON-only responder. Respond ONLY with a single valid JSON object and nothing else. '
                'The JSON must have the shape: {"text": string, "actions": [{"label": string, "url": string}, ...]}. '
                'If there are no actions, return an empty array for "actions". Ensure there is no surrounding markdown or explanation. '
                'Now answer the user prompt exactly and concisely.'
            )
            full_prompt = instruction + '\n\nUser prompt:\n"""' + prompt + '"""'
            try:
                out = MODEL.generate(full_prompt, n_predict=512)
            except TypeError:
                # alternate arg name
                try:
                    out = MODEL.generate(full_prompt, max_tokens=512)
                except Exception:
                    out = MODEL.generate(full_prompt)
            except Exception:
                # last-resort: call with only original prompt
                out = MODEL.generate(prompt)

            # MODEL.generate may return a generator or string
            if isinstance(out, (list, tuple)):
                text = ' '.join(map(str, out))
            else:
                text = str(out)

            # Try to extract JSON-like response if model was instructed to emit it
            try:
                start = text.find('{')
                end = text.rfind('}')
                if start != -1 and end != -1 and end > start:
                    j = json.loads(text[start:end+1])
                    self._set_headers(200)
                    self.wfile.write(json.dumps(j, ensure_ascii=False).encode('utf-8'))
                    return
            except Exception:
                pass

            # Default: return the raw text in the expected shape
            response['text'] = text
            self._set_headers(200)
            self.wfile.write(json.dumps(response, ensure_ascii=False).encode('utf-8'))
        except Exception as e:
            print('Generation error:', e, file=sys.stderr)
            self._set_headers(500)
            self.wfile.write(json.dumps({'error': 'generation failed', 'detail': str(e)}).encode('utf-8'))

def run():
    # Bind server first so we respond immediately while the model loads in background
    server = ThreadedHTTPServer(('127.0.0.1', MODEL_PORT), Handler)
    print(f'Local model server listening on http://127.0.0.1:{MODEL_PORT}/generate')
    # Load model in background to avoid blocking the HTTP listener
    t = threading.Thread(target=load_model, daemon=True)
    t.start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        server.shutdown()

if __name__ == '__main__':
    run()
