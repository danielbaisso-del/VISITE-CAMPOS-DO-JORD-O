import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../../types';
import { geminiService } from '../../services/gemini';
import { APP_CONFIG, TONE_OPTIONS } from '../../config/app';
import { useLanguage } from '../../contexts';

export const VirtualGuide: React.FC = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tone, setTone] = useState<string>('friendly');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Textos traduzidos
  const texts = {
    pt: {
      title: 'Guia Virtual Inteligente',
      subtitle: 'Respostas rápidas sobre Campos do Jordão',
      placeholder: 'Pergunte sobre Campos do Jordão ou sobre o nosso site',
      send: 'Enviar',
      typing: 'Digitando...',
      welcome: 'Olá! Em que posso ajudar hoje?',
      error: 'Desculpe, ocorreu um erro ao obter resposta.',
    },
    en: {
      title: 'Smart Virtual Guide',
      subtitle: 'Quick answers about Campos do Jordão',
      placeholder: 'Ask about Campos do Jordão or about our website',
      send: 'Send',
      typing: 'Typing...',
      welcome: 'Hello! How can I help you today?',
      error: 'Sorry, an error occurred while getting the response.',
    },
    es: {
      title: 'Guía Virtual Inteligente',
      subtitle: 'Respuestas rápidas sobre Campos do Jordão',
      placeholder: 'Pregunta sobre Campos do Jordão o sobre nuestro sitio',
      send: 'Enviar',
      typing: 'Escribiendo...',
      welcome: '¡Hola! ¿En qué puedo ayudarte hoy?',
      error: 'Lo sentimos, ocurrió un error al obtener la respuesta.',
    },
  };

  const t = texts[language];

  // Auto-scroll and focus management
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages, isOpen]);

  // Listen for global open event
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('virtualguide:open', handleOpen);
    return () => window.removeEventListener('virtualguide:open', handleOpen);
  }, []);

  // Listen for open-query event
  useEffect(() => {
    async function handleOpenQuery(e: CustomEvent<{ query: string }>) {
      const q = e?.detail?.query;
      if (!q) return;

      setIsOpen(true);
      setMessages(prev => [...prev, { role: 'user', text: q }]);
      setIsLoading(true);

      try {
        const response = await geminiService.sendMessage(q, { tone });
        setMessages(prev => [...prev, { role: 'model', text: response.text, actions: response.actions }]);
      } catch (err) {
        setMessages(prev => [...prev, { role: 'model', text: t.error }]);
      }
      setIsLoading(false);
    }

    window.addEventListener('virtualguide:open-query', handleOpenQuery as EventListener);
    return () => window.removeEventListener('virtualguide:open-query', handleOpenQuery as EventListener);
  }, [tone, t.error]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await geminiService.sendMessage(userMsg, { tone });
      setMessages(prev => [...prev, { role: 'model', text: response.text, actions: response.actions }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: t.error }]);
    }
    setIsLoading(false);
  };

  const handleActionNav = (action: { label?: string; url?: string }) => {
    const url = (action.url || '').toString();

    // External URL
    if (/^https?:\/\//i.test(url)) {
      window.open(url, '_blank', 'noopener');
      return;
    }

    // Hash navigation
    if (url.includes('#')) {
      const hash = url.split('#')[1] || '';
      if (hash) {
        window.location.hash = `#${hash}`;
        window.dispatchEvent(new CustomEvent('site:navigate', { detail: { target: hash } }));
        setIsOpen(false);
        return;
      }
    }

    // Path navigation
    if (url.startsWith('/')) {
      const path = url.replace(/^\//, '').split('/')[0];
      window.dispatchEvent(new CustomEvent('site:navigate', { detail: { target: path } }));
      setIsOpen(false);
      return;
    }

    // Fallback
    window.location.hash = url;
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[120] pointer-events-none">
      {/* Floating glow effect */}
      <div className="absolute -bottom-3 -right-3 w-64 h-64 pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-10 blur-3xl animate-pulse" />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <div className="relative w-full max-w-4xl h-[70vh] bg-white rounded-3xl shadow-[0_30px_80px_rgba(2,6,23,0.6)] border border-slate-200 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
              <div className="flex items-center gap-3">
                <img
                  src={APP_CONFIG.logo.local}
                  alt="logo"
                  className="w-9 h-9 rounded-md object-contain"
                />
                <div>
                  <div className="font-bold text-sm">{t.title}</div>
                  <div className="text-[11px] opacity-90">{t.subtitle}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="text-xs bg-white/20 text-white rounded px-2 py-1"
                >
                  {TONE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <button onClick={() => setIsOpen(false)} className="text-white/90 text-lg">
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow p-6 overflow-y-auto" ref={scrollRef}>
              {messages.length === 0 && (
                <div className="text-center text-slate-400 py-8 bg-white/4 backdrop-blur-md rounded-lg px-4">
                  {t.welcome}
                </div>
              )}
              <div className="space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                          : 'bg-white/6 backdrop-blur-md border border-white/10 text-slate-100'
                      } max-w-[85%] p-4 rounded-3xl text-sm`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {msg.actions.map((a, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleActionNav(a)}
                              className="bg-white/10 border border-white/20 text-white/90 px-3 py-1 rounded-full text-xs hover:brightness-110 transition-colors"
                            >
                              {a.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && <div className="text-sm text-slate-500">{t.typing}</div>}
              </div>
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-slate-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.placeholder}
                  className="flex-grow rounded-full px-4 py-3 text-sm border border-slate-200 bg-slate-50 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  className="bg-slate-900 text-white px-5 py-2 rounded-full"
                >
                  {t.send}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualGuide;
