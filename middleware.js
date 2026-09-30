import { jwtVerify, createRemoteJWKSet } from 'jose';
import { NextResponse } from 'next/server';

const PROTECTED = ['/dashboard', '/agregar'];

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  if (!PROTECTED.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next();
  }
  const token = req.cookies.get('access_token')?.value;
  if (!token) {
    console.log(`[middleware] ${pathname} sin cookie access_token -> /login`);
    return NextResponse.redirect(new URL('/login', req.url));
  }
  try {
    const url = process.env.KEYCLOAK_URL || 'http://localhost:8081';
    const realm = process.env.KEYCLOAK_REALM || 'cybersecurity';
    const JWKS = createRemoteJWKSet(
      new URL(`${url}/realms/${realm}/protocol/openid-connect/certs`)
    );
    await jwtVerify(token, JWKS, {
      issuer: `${url}/realms/${realm}`,
      audience: process.env.KEYCLOAK_CLIENT_ID || 'fastapi-api',
    });
    console.log(`[middleware] ${pathname} JWT valido (jose) -> permite acceso`);
    return NextResponse.next();
  } catch (e) {
    console.log(`[middleware] JWT invalido: ${String(e).slice(0, 120)} -> /login`);
    const res = NextResponse.redirect(new URL('/login', req.url));
    res.cookies.delete('access_token');
    return res;
  }
}

export const config = { matcher: ['/dashboard/:path*', '/agregar/:path*'] };
