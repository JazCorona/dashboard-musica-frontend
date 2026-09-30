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
