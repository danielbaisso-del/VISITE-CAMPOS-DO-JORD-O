import inspect
import json
try:
    import gpt4all
    from gpt4all import GPT4All
    info = {
        'module': 'ok',
        'module_dir': [a for a in dir(gpt4all) if not a.startswith('_')],
        'GPT4All_dir': [a for a in dir(GPT4All) if not a.startswith('_')]
    }
    try:
        info['GPT4All_init'] = str(inspect.signature(GPT4All))
    except Exception as e:
        info['GPT4All_init_error'] = str(e)
except Exception as e:
    info = {'module': 'error', 'error': str(e)}
print(json.dumps(info, ensure_ascii=False))
