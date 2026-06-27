# SISTEMA DE ORGANIZACION — Proyectos C8L

> Regla #1: **NUNCA mezclar proyectos en un mismo repositorio.**
> Cada proyecto tiene su propio repo, su propio deploy, su propia URL.

---

## MAPA DE PROYECTOS

```
┌─────────────────────────────────────────────────────────────┐
│                    C8L AGENCY — ECOSISTEMA                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📦 REPO: c8l-bot-server                                    │
│  🎯 FUNCION: Bot Telegram/WhatsApp + API backend            │
│  🚀 DEPLOY: Render.com (Docker, gratis)                     │
│  🌐 URL: https://c8l-bot-server.onrender.com                │
│  💻 TECH: Python 3.11                                       │
│  📁 CONTENIDO: Solo .py, Dockerfile, requirements.txt       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📦 REPO: c8l-web                                           │
│  🎯 FUNCION: Plataforma web de creacion (Canva/Adobe/IA)    │
│  🚀 DEPLOY: Vercel (static, gratis)                         │
│  🌐 URL: https://c8l-agency.vercel.app                      │
│  💻 TECH: Next.js 14, React, Tailwind                       │
│  📁 CONTENIDO: Solo .tsx, .ts, .css, package.json           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📦 REPO: (en Firebase, no tiene repo publico)              │
│  🎯 FUNCION: Web ORIGINAL — NO SE TOCA                      │
│  🚀 DEPLOY: Firebase Hosting                                │
│  🌐 URL: https://gen-lang-client-0744582882.web.app         │
│  ⚠️  REGLA: NUNCA modificar desde aqui                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## REGLAS DE ORO

### 1. Un repo = Un proyecto = Un deploy
- Si es Python → va en su repo de Python
- Si es Next.js/React → va en su repo de frontend
- Si es una app movil → va en su repo de mobile
- **NUNCA** poner dos lenguajes/frameworks principales juntos

### 2. Cada proyecto nuevo = Repo nuevo
Antes de crear archivos, preguntate:
- ¿Esto es parte de un proyecto existente? → Mismo repo
- ¿Esto es algo nuevo/diferente? → **REPO NUEVO**

### 3. Comunicacion entre proyectos = APIs
Los proyectos se hablan por HTTPS, nunca compartiendo archivos:
```
Web (Vercel) ──API──► Bot (Render)
Web (Vercel) ──API──► Supabase (DB)
Bot (Render) ──API──► Groq (IA)
```

### 4. Variables de entorno = Conexion
Para conectar un proyecto con otro, usa env vars:
- `NEXT_PUBLIC_API_URL` en la web → apunta al bot
- `C8L_WEB_URL` en el bot → apunta a la web

### 5. Deploy independiente
- Puedo actualizar el bot SIN tocar la web
- Puedo actualizar la web SIN tocar el bot
- Si uno falla, el otro sigue funcionando

---

## COMO CREAR UN PROYECTO NUEVO

```
1. Crear repo en GitHub (leovela69/nombre-proyecto)
2. Elegir stack:
   - Frontend → Next.js → Vercel
   - Backend Python → Docker → Render
   - API/Microservicio → Docker → Render
   - Static site → HTML → Firebase/Vercel
3. Configurar deploy (vercel.json o render.yaml)
4. Configurar env vars en el dashboard del hosting
5. Conectar con otros proyectos via API URLs
```

---

## FUTURO: POSIBLES PROYECTOS NUEVOS

| Idea | Repo sugerido | Stack | Deploy |
|------|--------------|-------|--------|
| App movil | `c8l-mobile` | React Native | Expo |
| Landing page | `c8l-landing` | HTML/CSS | Vercel |
| Dashboard admin | `c8l-admin` | Next.js | Vercel |
| Bot Discord | `c8l-discord` | Python | Render |
| API publica | `c8l-api` | FastAPI | Render |

---

*Ultima actualizacion: 27 Jun 2026*
