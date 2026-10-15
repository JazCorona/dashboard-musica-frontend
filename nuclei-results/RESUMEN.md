# Análisis Nuclei — dashboard-musica-frontend

- **Fecha:** 2026-10-14
- **Herramienta:** Nuclei v3.11.1, templates v10.5.0 (11,144 templates), contenedor `projectdiscovery/nuclei:latest`
- **Método:** el frontend se construyó con `npm ci && next build` y corrió con `next start` en un contenedor `node:20-alpine` dentro de la red Docker del lab (`ldap-keycloak-oauth2-lab_auth-network`). El contenedor de Nuclei se conectó a esa misma red.
- **Conectividad:** `http://dashboard-frontend:3000` respondió HTTP 307, la redirección normal de `/` a `/dashboard` o `/login`. El escaneo terminó en 2 minutos sin errores de conexión.
- **Nota:** en el host el contenedor se publicó en el puerto 3001 porque el 3000 ya estaba ocupado por otro contenedor. Esto no afecta el escaneo, que fue por la red interna.
- **Scripts usados:** `run-nuclei.ps1` y `run-nuclei-resto.ps1` (están en el repo `ldap-keycloak-oauth2-lab/nuclei-results`).

## Resultados del escaneo del servicio (12 hallazgos)

| # | Severidad | Template | Comentario |
|---|---|---|---|
| 1 | info | `http-missing-security-headers` ×10 | Faltan CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, COOP, COEP, CORP y X-Permitted-Cross-Domain-Policies. |
| 2 | info | `tech-detect:next.js` | El header `X-Powered-By: Next.js` revela la tecnología. |
| 3 | info | `options-method` | `OPTIONS` responde con los métodos permitidos. |

## Resultados del escaneo de código (`-file`, 34 coincidencias)

| Archivo | Template | Severidad | ¿Real? |
|---|---|---|---|
| `app/api/auth/login/route.js` | `credentials-disclosure-file`, `js-analyse:extracted-token` | unknown / info | **Sí.** El login devuelve `access_token` en el body JSON, además de ponerlo en la cookie httpOnly. Así el JWT queda expuesto a JavaScript (XSS), lo que anula el beneficio de la cookie httpOnly. También se registra parte del token en los logs. |
| `lib/api.js`, `lib/server-auth.js`, `middleware.js` | `credentials-disclosure-file`, `js-analyse:extracted-token` | unknown / info | **Parcial.** Son nombres de variables, pero el código hace `console.log` de fragmentos del JWT (interceptor, proxy). |
| `lib/store.js` | `credentials-disclosure-file` | unknown | **Parcial.** El JWT crudo se guarda en el store de Zustand (memoria de JS). |
| `lib/api.js` | `dom-invader-xss:source/sink` (`location.href`) | high | Falso positivo: asigna una ruta fija (`'/login'`) y no usa datos del usuario. |
| `app/agregar/page.js` | `dom-invader-xss:sink` (`setTimeout`) | high | Falso positivo: `setTimeout` recibe una función, no un string. |
| `app/api/auth/login/route.js`, `lib/server-auth.js` | `dom-invader-xss:sink` (`fetch`) | high | Falso positivo: es código de servidor y las URLs vienen de variables de entorno. |
| `*.js` | `js-analyse:extracted-endpoints/uri` | info | Informativo: endpoints y URLs por defecto (`http://localhost:8081`, `http://localhost:8001`). |
| `package-lock.json` | `url-extension-inspector` | unknown | Falso positivo: son las URLs `.tgz` normales del registro de npm. |
| `.git/hooks/fsmonitor-watchman.sample` | `credentials-disclosure-file` | unknown | Falso positivo: archivo de ejemplo de Git. |
| `nuclei-results/*` | `credentials-disclosure-file` | unknown | Ruido: Nuclei escaneó sus propios reportes. |

Detalle completo en `nuclei-report.txt` / `.jsonl`, `nuclei-file-report.txt` / `.jsonl` y `markdown/`.
