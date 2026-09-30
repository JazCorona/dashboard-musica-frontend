'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function DashboardPage() {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState('Cargando...');
  const username = useAuthStore((s) => s.username);
  const clear = useAuthStore((s) => s.clear);
  const router = useRouter();

  useEffect(() => {
    // GET listado: el interceptor Axios inyecta `Authorization: Bearer <JWT>`.
    api
      .get('/items')
      .then((r) => {
        setItems(r.data.items || []);
        setMsg('');
      })
      .catch(() => setMsg('No se pudo cargar (¿backend :8001 caido o sesion expirada?)'));
  }, []);

  async function logout() {
    await api.post('/auth/logout', {});
    clear();
    router.push('/login');
  }

  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard — Música Clásica {username ? `(${username})` : ''}</h1>
        <button onClick={logout} style={btnGhost}>Salir</button>
      </div>
      <Link href="/agregar" style={btn}>+ Agregar obra</Link>
      {msg && <p>{msg}</p>}
      <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        {items.map((it) => (
          <div key={it.id} style={card}>
            <strong>{it.obra}</strong> — {it.compositor}
            <div style={{ opacity: 0.7, fontSize: 13 }}>
              {it.epoca} · {it.anio || 's/f'} · {it.duracion_min ? `${it.duracion_min} min` : ''}
            </div>
          </div>
        ))}
      </div>
      <p style={{ opacity: 0.6, fontSize: 13 }}>Total: {items.length} obras. Nuevas altas aparecen aquí al volver.</p>
    </main>
  );
}

const card = { padding: 14, borderRadius: 10, background: '#1a1e35', border: '1px solid #333' };
const btn = { display: 'inline-block', marginTop: 8, padding: '10px 14px', borderRadius: 8, background: '#6c5ce7', color: '#fff', textDecoration: 'none' };
const btnGhost = { padding: '8px 12px', borderRadius: 8, background: 'transparent', color: '#fff', border: '1px solid #555', cursor: 'pointer' };
