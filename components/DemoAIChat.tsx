import React, { useState } from 'react';

const DEMO_RESPONSES: Record<string, string> = {
  'oi': 'Olá! Como posso ajudar você a explorar Campos do Jordão?',
  'roteiros': 'Temos roteiros incríveis! Quer sugestões de passeios, gastronomia ou hospedagem?',
  'hotel': 'Há ótimos hotéis na cidade! Prefere luxo, charme ou economia?',
  'restaurante': 'Campos do Jordão tem excelentes restaurantes! Alguma preferência de culinária?',
  'mapa': 'Você pode usar o mapa interativo para encontrar atrações próximas.',
  'default': 'Desculpe, sou uma IA de demonstração. Pergunte sobre roteiros, hotéis, restaurantes ou mapa!'
};

export default function DemoAIChat() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Olá! Sou uma IA de demonstração. Pergunte sobre Campos do Jordão.' }
  ]);
  const [input, setInput] = useState('');

  function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(msgs => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      const key = Object.keys(DEMO_RESPONSES).find(k => userMsg.toLowerCase().includes(k)) || 'default';
      setMessages(msgs => [...msgs, { from: 'ai', text: DEMO_RESPONSES[key] }]);
    }, 600);
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, width: 340, maxWidth: '90vw', zIndex: 9999, background: 'rgba(15,23,42,0.95)', borderRadius: 18, boxShadow: '0 8px 32px #0008', color: '#fff', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid #334155', fontWeight: 600, fontSize: 16, background: 'rgba(30,41,59,0.95)' }}>
        <i className="fas fa-robot" style={{ marginRight: 8, color: '#60a5fa' }} /> IA Demo
      </div>
      <div style={{ flex: 1, padding: 16, overflowY: 'auto', minHeight: 120, maxHeight: 260 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '8px 0', textAlign: m.from === 'user' ? 'right' : 'left' }}>
            <span style={{
              display: 'inline-block',
              background: m.from === 'user' ? 'linear-gradient(90deg,#6366f1,#60a5fa)' : 'rgba(51,65,85,0.7)',
              color: m.from === 'user' ? '#fff' : '#e0e7ef',
              borderRadius: 16,
              padding: '8px 14px',
              fontSize: 14,
              maxWidth: 220,
              wordBreak: 'break-word',
              boxShadow: m.from === 'user' ? '0 2px 8px #6366f155' : 'none',
            }}>{m.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', borderTop: '1px solid #334155', background: 'rgba(30,41,59,0.95)' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Pergunte algo..."
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: '#fff', padding: '12px 14px', fontSize: 15 }}
        />
        <button type="submit" style={{ background: 'none', border: 'none', color: '#60a5fa', fontSize: 20, padding: '0 16px', cursor: 'pointer' }}>
          <i className="fas fa-paper-plane" />
        </button>
      </form>
    </div>
  );
}
