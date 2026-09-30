import { cookies } from 'next/headers';

// Helper: obtiene el JWT desde (1) header Authorization del request
// (inyectado por el interceptor Axios) o (2) cookie httpOnly.
export function getTokenFromRequest(req) {
  const fromHeader = req.headers.get('authorization');
  if (fromHeader?.toLowerCase().startsWith('bearer ')) {
    const t = fromHeader.slice(7);
    console.log(`[proxy] JWT tomado del header Authorization (interceptor): Bearer ${t.slice(0, 30)}...`);
    return t;
  }
  const fromCookie = cookies().get('access_token')?.value;
  if (fromCookie) {
    console.log(`[proxy] JWT tomado de cookie httpOnly: ${fromCookie.slice(0, 30)}...`);
  } else {
    console.log('[proxy] SIN JWT ni en header ni en cookie -> 401');
  }
  return fromCookie ?? null;
}

export async function forwardToBackend(path, token, init = {}) {
  const base = process.env.BACKEND_URL || 'http://localhost:8001';
  console.log(`[proxy] -> ${init.method || 'GET'} ${base}${path} con Bearer ${token.slice(0, 30)}...`);
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });
  const text = await res.text();
  console.log(`[proxy] <- backend ${res.status} (${text.length} chars)`);
  return { status: res.status, body: text };
}
