'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function AgregarPage() {
  const [form, setForm] = useState({ obra: '', compositor: '', epoca: 'Barroco', anio: '', duracion_min: '' });
  const [msg, setMsg] = useState('');
  const router = useRouter();

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg('Guardando...');
    try {
      // POST alta: tambien lleva `Authorization: Bearer <JWT>` por el interceptor.
      const { data } = await api.post('/items', {
        obra: form.obra,
        compositor: form.compositor,
        epoca: form.epoca,
        anio: form.anio ? Number(form.anio) : null,
        duracion_min: form.duracion_min ? Number(form.duracion_min) : null,
      });
      setMsg(`Creada id=${data.id}. Redirigiendo al dashboard...`);
      setTimeout(() => router.push('/dashboard'), 800);
    } catch {
      setMsg('Error al guardar (¿sesion expirada?)');
    }
  }

  return (
    <main>
      <h1>Agregar obra</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 420 }}>
        <input placeholder="Obra (ej. Sinfonia No. 9)" value={form.obra} onChange={(e) => set('obra', e.target.value)} style={input} required />
        <input placeholder="Compositor (ej. Beethoven)" value={form.compositor} onChange={(e) => set('compositor', e.target.value)} style={input} required />
        <select value={form.epoca} onChange={(e) => set('epoca', e.target.value)} style={input}>
          <option>Barroco</option>
          <option>Clasicismo</option>
          <option>Romanticismo</option>
          <option>Siglo XX</option>
        </select>
        <input placeholder="Año" inputMode="numeric" value={form.anio} onChange={(e) => set('anio', e.target.value)} style={input} />
        <input placeholder="Duración (min)" inputMode="numeric" value={form.duracion_min} onChange={(e) => set('duracion_min', e.target.value)} style={input} />
        <button style={btn}>Guardar</button>
      </form>
      {msg && <p>{msg}</p>}
      <p><Link href="/dashboard" style={{ color: '#a29bfe' }}>← Volver al dashboard</Link></p>
    </main>
  );
}

const input = { padding: 10, borderRadius: 8, border: '1px solid #444', background: '#1a1e35', color: '#fff' };
const btn = { padding: 10, borderRadius: 8, border: 0, background: '#00b894', color: '#fff', cursor: 'pointer' };
