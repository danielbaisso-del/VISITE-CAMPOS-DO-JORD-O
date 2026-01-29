import json
from gpt4all import GPT4All

available = GPT4All.list_models()
print('models_count=', len(available))
# pick smallest ramrequired
cand = None
for m in available:
    ram = 999
    try:
        ram = int(str(m.get('ramrequired') or 999))
    except:
        pass
    if cand is None or ram < cand[0]:
        cand = (ram, m)
print('chosen:', cand[1].get('name'))
try:
    print('Attempting to instantiate...')
    g = GPT4All(cand[1].get('name'), allow_download=True)
    print('Instantiated OK, type:', type(g))
    # try a quick generate
    out = g.generate('Qual a altitude de Campos do Jordão?', max_tokens=64)
    print('generate returned:', out)
except Exception as e:
    print('ERROR', e)
