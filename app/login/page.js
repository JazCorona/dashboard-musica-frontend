'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function LoginPage() {
  const [username, setUsername] = useState('alice');
  const [password, setPassword] = useState('alice123');
  const [error, setError] = useState('');
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      // POST /api/auth/login consume el API LDAP (Keycloak) y regresa JWT.
      // Se usa axios SIN interceptor aqui para no duplicar logs.
      const { data } = await api.post('/auth/login', { username, password });
      console.log(`[login-page] JWT recibido, largo=${data.access_token.length}`);
      setSession(data.access_token, data.username); // Zustand: JWT disponible para el interceptor
      router.push('/dashboard');
    } catch {
      setError('Credenciales invalidas (prueba alice / alice123)');
    }
  }

  return (
    <main>
      <h1>Login — Música Clásica (LDAP)</h1>
      <p style={{ opacity: 0.8 }}>Usa usuarios del lab: <code>alice / alice123</code> o <code>bob / bob123</code>.</p>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="usuario" style={input} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" style={input} />
        <button style={btn}>Entrar</button>
      </form>
      {error && <p style={{ color: '#ff8080' }}>{error}</p>}
      <p style={{ opacity: 0.6, fontSize: 13 }}>Abre DevTools (F12) → Consola: verás el JWT en cada request vía interceptor Axios.</p>
    </main>
  );
}

const input = { padding: 10, borderRadius: 8, border: '1px solid #444', background: '#1a1e35', color: '#fff' };
const btn = { padding: 10, borderRadius: 8, border: 0, background: '#6c5ce7', color: '#fff', cursor: 'pointer' };
