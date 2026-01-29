from gpt4all import GPT4All
try:
    # try with filename form if the friendly name fails
    name = 'Llama-3.2-1B-Instruct-Q4_0.gguf'
    print('Trying model:', name)
    g = GPT4All(name, allow_download=True)
    print('Instantiated:', type(g))
    print('Generating short reply...')
    out = g.generate('Qual a altitude de Campos do Jordão?', max_tokens=64)
    print('OUT:', out)
except Exception as e:
    print('ERROR', e)
