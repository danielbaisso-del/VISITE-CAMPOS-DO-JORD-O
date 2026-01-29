from gpt4all import GPT4All
name='Llama 3.2 1B Instruct'
try:
    p = GPT4All.retrieve_model(name)
    print('retrieve_model returned:', p)
except Exception as e:
    print('ERROR', e)
