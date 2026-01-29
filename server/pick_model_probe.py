from gpt4all import GPT4All
import json
available = GPT4All.list_models()
filtered = []
for m in available:
    if m.get('embeddingModel'):
        continue
    try:
        ram = int(str(m.get('ramrequired') or 999))
    except Exception:
        ram = 999
    try:
        fs = int(''.join(ch for ch in str(m.get('filesize') or '') if ch.isdigit()))
    except Exception:
        fs = 999999999
    filtered.append((ram, fs, m))
filtered.sort(key=lambda x: (x[0], x[1]))
print('total available:', len(available))
print('candidates count:', len(filtered))
for i, (ram, fs, m) in enumerate(filtered[:10]):
    print(i, 'ram', ram, 'fs', fs, 'name', m.get('name'))
print('chosen:', filtered[0][2].get('name') if filtered else 'none')
