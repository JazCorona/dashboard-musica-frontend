import { NextResponse } from 'next/server';
import { getTokenFromRequest, forwardToBackend } from '@/lib/server-auth';

// GET /api/items -> proxy al backend inyectando Bearer JWT.
export async function GET(req) {
  const token = getTokenFromRequest(req);
  if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  const { status, body } = await forwardToBackend('/api/items', token);
  return new NextResponse(body, { status, headers: { 'Content-Type': 'application/json' } });
}

// POST /api/items -> alta, tambien con Bearer JWT.
export async function POST(req) {
  const token = getTokenFromRequest(req);
  if (!token) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  const payload = await req.json();
  const { status, body } = await forwardToBackend('/api/items', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return new NextResponse(body, { status, headers: { 'Content-Type': 'application/json' } });
}
