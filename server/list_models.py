from gpt4all import GPT4All
import json
try:
    lm = GPT4All.list_models()
    print(json.dumps(lm, ensure_ascii=False, default=str))
except Exception as e:
    print('ERROR', e)
