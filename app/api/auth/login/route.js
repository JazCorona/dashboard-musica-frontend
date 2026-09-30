import { NextResponse } from 'next/server';

// POST /api/auth/login {username, password}
// Consume el API LDAP de clase (Keycloak, grant password) -> JWT.
// Guarda el JWT en cookie httpOnly y lo devuelve (truncado en logs).
export async function POST(req) {
  const { username, password } = await req.json();
  const url = process.env.KEYCLOAK_URL || 'http://localhost:8081';
  const realm = process.env.KEYCLOAK_REALM || 'cybersecurity';
  const clientId = process.env.KEYCLOAK_CLIENT_ID || 'fastapi-api';

  const params = new URLSearchParams({
    grant_type: 'password',
    client_id: clientId,
    username: username || '',
    password: password || '',
    scope: 'openid',
  });

  const kcRes = await fetch(`${url}/realms/${realm}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  if (!kcRes.ok) {
    const err = await kcRes.text();
    console.log(`[login] Keycloak ${kcRes.status} para ${username}: ${err.slice(0, 200)}`);
    return NextResponse.json({ error: 'Credenciales invalidas (LDAP)' }, { status: 401 });
  }

  const data = await kcRes.json();
  const token = data.access_token;
  console.log(`[login] OK ${username} -> JWT largo=${token.length}, inicio=Bearer ${token.slice(0, 30)}...`);

  const res = NextResponse.json({ ok: true, username, access_token: token });
  res.cookies.set('access_token', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: data.expires_in || 300,
  });
  return res;
}
