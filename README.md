# Dashboard Música Clásica — Frontend (repo 1 de 3)

Next.js (App Router) con login contra el API LDAP de clase (Keycloak),
listado inicial y alta de obras. Nuevas altas se reflejan en el dashboard.

## Herramienta elegida para inyectar el JWT
1. **Cookie `access_token` httpOnly** (la setea `POST /api/auth/login` tras
   obtener el JWT de Keycloak con `grant_type=password`).
2. **Middleware con `jose`** (`middleware.js`): valida firma RS256, `iss` y
   `aud` con el JWKS de Keycloak antes de dejar entrar a `/dashboard` y `/agregar`.
3. **Zustand (`lib/store.js`)**: guarda el JWT en memoria + usuario para la UI.
4. **Interceptor Axios (`lib/api.js`)**: inyecta `Authorization: Bearer <JWT>`
   en CADA request + `console.log` (evidencia para el video).
5. **Proxy Next (`/api/items`)**: reinyecta el Bearer desde header o cookie
   hacia el backend y loguea el token (ver terminal de `npm run dev`).

Alternativa integral evaluada: Auth.js (NextAuth) — no se usa aquí para
mantener visible el JWT en cada request como pide la práctica.

## Correr
```bash
npm install
npm run dev
# abre http://localhost:3000/login  (alice / alice123)
```
Requiere: lab LDAP/Keycloak en `:8081` y backend en `:8001`.

## Subir a GitHub (repo separado del backend)
```bash
cd frontend-dashboard
git init -b main
git add .
git commit -m "Frontend dashboard musica clasica Next.js + JWT"
gh repo create <TU-USUARIO>/dashboard-musica-frontend --public --source=. --push
```

## Análisis de seguridad con Nuclei
Escaneo realizado el 2026-10-14 con **Nuclei v3.11.1** (templates v10.5.0, 11,144 templates).
El frontend (`next build` + `next start`) corrió en un contenedor dentro de la red Docker del lab
LDAP/Keycloak, y Nuclei se ejecutó en otro contenedor conectado a esa misma red
(`http://dashboard-frontend:3000`). También se escaneó el código fuente con los templates `file/`.

Resultados completos: [`nuclei-results/`](nuclei-results/) · Triage: [`nuclei-results/RESUMEN.md`](nuclei-results/RESUMEN.md)

| Severidad | Hallazgo |
|---|---|
| Info | Faltan 10 headers de seguridad (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, COEP, CORP, X-Permitted-Cross-Domain-Policies) |
| Info | Se revela la tecnología (`X-Powered-By: Next.js`) |
| Info | Método `OPTIONS` responde con los métodos permitidos |
| Código | `POST /api/auth/login` devuelve el `access_token` en el body, lo que lo expone a JavaScript aunque también esté en la cookie httpOnly |
| Código | Se registran fragmentos del JWT en consola (interceptor Axios, proxy, login) |

Hay falsos positivos documentados en el resumen, por ejemplo `dom-invader-xss` sobre `setTimeout` con función o `location.href` fijo.
