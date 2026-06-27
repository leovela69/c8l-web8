# C8L Web — Plataforma de Creacion

> **URL:** https://c8l-agency.vercel.app
> 
> Herramientas de creacion: Estudio Musical IA, Editor de Video/Imagen, 
> Casino, Streaming, Comunidad, y mas.

---

## Deploy en Vercel (GRATIS)

1. Ve a [vercel.com](https://vercel.com)
2. "Add New Project" → importa este repo (`c8l-web`)
3. Agrega variable de entorno:
   ```
   NEXT_PUBLIC_API_URL = https://c8l-bot-server.onrender.com
   ```
4. Deploy → listo

---

## Desarrollo Local

```bash
npm install
npm run dev
# → http://localhost:3000
```

---

## Estructura

```
c8l-web/
├── app/                  # Paginas Next.js
│   ├── page.tsx         #   Home (Mesa de Creacion)
│   ├── tv/              #   C8L TV
│   ├── studio/          #   Estudio IA (Canva/Adobe style)
│   ├── casino/          #   Casino
│   ├── bandos/          #   Sistema de Bandos
│   ├── streaming/       #   Streaming
│   ├── karaoke/         #   Karaoke
│   ├── comunidad/       #   Comunidad
│   └── ...
├── components/           # Componentes reutilizables
├── lib/                  # Logica de negocio
│   ├── api/             #   Conexion con bot server
│   ├── auth/            #   Autenticacion
│   ├── credits/         #   Sistema de creditos
│   └── studio/          #   Motor de creacion
├── public/               # Assets estaticos
├── vercel.json           # Config de deploy
└── package.json          # Dependencias
```

---

## Conexion con el Bot Server

La web se conecta al backend (bot Python en Render.com) via API:

```
Web (Vercel) ──HTTPS──► Bot Server (Render)
                         ├── /api/suno/*     (musica)
                         ├── /api/image/*    (imagenes)
                         ├── /api/video/*    (video)
                         └── /api/chat       (bot IA)
```

---

## Proyectos Relacionados

| Proyecto | Repo | Deploy | Funcion |
|----------|------|--------|---------|
| **C8L Web** (este) | `c8l-web` | Vercel | Plataforma de creacion |
| **C8L Bot** | `c8l-bot-server` | Render | Bot Telegram/WhatsApp |
| **C8L Original** | — | Firebase | Web original (no tocar) |

---

*C8L Agency — Corazones Locos Family. 2026.*
