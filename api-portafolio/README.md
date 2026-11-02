# API Portafolio — Leonardo Vargas Peña

API REST del portafolio del curso **Desarrollo Full Stack**.

Desarrollada con **Node.js + Express 5 + Prisma 7 + PostgreSQL + Swagger**, sirve el CRUD de proyectos, tecnologías y mensajes de contacto del portafolio.

**Autor:** Leonardo Vargas Peña · Santa Cruz, Bolivia

---

## ⚠️ Solución a problemas comunes

### "VS Code marca en rojo `dotenv/config` y `prisma/config` en `prisma.config.ts`"

Ese era un problema de TypeScript. La solución aplicada aquí fue **convertir `prisma.config.ts` a `prisma.config.js`** (JavaScript plano). Funciona exactamente igual y no requiere instalar TypeScript.

> Si tu profesor tenía `prisma.config.ts`, no te preocupes: Prisma 7 acepta tanto `.ts` como `.js` para el archivo de configuración. El archivo actual `prisma.config.js` es el equivalente directo.

### "¿Por qué no hay `index.html`?"

Una **API REST** es un **backend** que devuelve datos en JSON (no páginas web). Por eso no tiene `index.html`. El punto de entrada es `src/app.js`.

Sin embargo, esta API incluye una **página de inicio** que se sirve en `GET /`: al abrir `http://localhost:3000/` en el navegador verás una página HTML con info de la API, los endpoints y un link a Swagger UI.

---

## Requisitos

- **Node.js 22** o superior
- **PostgreSQL** (local o en Docker)

> Si quieres usar MySQL en vez de PostgreSQL, revisa `ejemplos/trabajar-con-mysql.md` en la raíz del repo.

---

## Instalación y puesta en marcha

```bash
cd api-portafolio

# 1) Instalar dependencias
npm install

# 2) Variables de entorno
cp .env-example .env        # y edita los valores (especialmente DATABASE_URL y ADMIN_API_KEY)

# 3) Base de datos: aplicar migraciones y generar el cliente de Prisma
npx prisma migrate dev
npx prisma generate

# 4) (Opcional) Cargar datos iniciales del portafolio de Leonardo
npm run seed                # crea 14 tecnologías, 5 proyectos y 1 mensaje de ejemplo

# 5) Levantar el servidor
npm run dev                 # con nodemon (recarga al guardar)
# o
npm start                   # node src/app.js
```

> El punto de entrada es `src/app.js`. **Nunca** ejecutes `node app.js` desde la raíz (da error `Cannot find module`); usa siempre `npm start`, `npm run dev`, o `node src/app.js`.

---

## Verificar que la API funciona

1. Abre `http://localhost:3000/` → verás la **página de inicio HTML** con info de la API.
2. Abre `http://localhost:3000/api-docs` → verás la **documentación Swagger interactiva**.
3. Prueba el endpoint público: `http://localhost:3000/api/proyectos` → devuelve los proyectos en JSON.

---

## Variables de entorno (`.env`)

Copia `.env-example` a `.env` y completa los valores:

| Variable | Ejemplo | Descripción |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres:password123@localhost:3254/portafolio_db` | Cadena de conexión a PostgreSQL |
| `PORT` | `3000` | Puerto del servidor |
| `NODE_ENV` | `development` | Entorno de ejecución |
| `CORS_ORIGIN` | `http://127.0.0.1:5500,http://localhost:5173` | Orígenes permitidos (Live Server y Vite) |
| `ADMIN_API_KEY` | `cambia-esta-clave` | Clave para las rutas de escritura (header `x-api-key`) |
| `DOCUMENTATION` | `/api-docs` | Ruta de Swagger UI (por defecto `/documentation`) |

---

## Estructura

```
api-portafolio/
├── prisma/
│   ├── schema.prisma         ← modelos y enums
│   ├── seed.js               ← datos iniciales (tecnologías, proyectos, mensajes)
│   └── migrations/           ← migraciones SQL generadas por Prisma
├── prisma.config.js          ← configuración de Prisma (versión JS, sin errores TS)
├── .env-example              ← plantilla de variables de entorno
├── package.json
└── src/
    ├── app.js                ← servidor Express (CORS, JSON, Swagger, rutas, 404, errores)
    ├── config/swagger.js     ← especificación OpenAPI 3.0
    ├── lib/prisma.js         ← cliente de Prisma con el adaptador de PostgreSQL
    ├── routes/               ← definición de rutas + anotaciones @swagger
    │   ├── proyecto.routes.js
    │   ├── tecnologia.routes.js
    │   └── mensaje.routes.js
    ├── controllers/          ← lógica de cada endpoint
    │   ├── proyecto.controller.js
    │   ├── tecnologia.controller.js
    │   └── mensaje.controller.js
    └── middlewares/
        ├── homePage.js       ← HTML de la página de inicio (GET /)
        ├── auth.js           ← valida el header x-api-key (ADMIN_API_KEY)
        ├── validar.js        ← validaciones de cuerpo e ID
        └── errorHandler.js   ← manejo centralizado de errores
```

---

## Modelo de datos

| Modelo | Tabla | Campos principales |
|---|---|---|
| **Proyecto** | `proyectos` | `titulo`, `descripcion`, `emoji`, `categoria` (`FRONTEND` / `BACKEND` / `FULLSTACK`), `urlDemo`, `urlRepo`, `destacado`, `tecnologias`, `creadoEn`, `actualizadoEn` |
| **Tecnologia** | `tecnologias` | `nombre` (único), `area` (`FRONTEND` / `BACKEND` / `BASE_DATOS` / `HERRAMIENTA`) |
| **Mensaje** | `mensajes` | `nombre`, `email`, `servicio`, `presupuesto`, `fecha`, `mensaje`, `leido`, `creadoEn` |

`Proyecto` ↔ `Tecnologia` es una relación **muchos a muchos**.

---

## Endpoints

Base: `http://localhost:3000/api`

### Proyectos — `/api/proyectos`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/proyectos` | Lista proyectos. Filtros: `?categoria=`, `?tecnologia=`, `?destacado=true` | público |
| `GET` | `/api/proyectos/:id` | Obtiene un proyecto por ID | público |
| `POST` | `/api/proyectos` | Crea un proyecto | `x-api-key` |
| `PUT` | `/api/proyectos/:id` | Reemplaza un proyecto | `x-api-key` |
| `DELETE` | `/api/proyectos/:id` | Elimina un proyecto | `x-api-key` |

### Tecnologías — `/api/tecnologias`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/tecnologias` | Lista tecnologías. Filtro: `?area=` | público |
| `GET` | `/api/tecnologias/:id` | Obtiene una tecnología por ID | público |
| `POST` | `/api/tecnologias` | Crea una tecnología | `x-api-key` |
| `PUT` | `/api/tecnologias/:id` | Actualiza una tecnología | `x-api-key` |
| `DELETE` | `/api/tecnologias/:id` | Elimina una tecnología | `x-api-key` |

### Mensajes — `/api/mensajes`

| Método | Ruta | Descripción | Auth |
|---|---|---|---|
| `GET` | `/api/mensajes` | Lista mensajes. Filtro: `?leido=` | `x-api-key` |
| `GET` | `/api/mensajes/:id` | Obtiene un mensaje por ID | `x-api-key` |
| `POST` | `/api/mensajes` | Envía un mensaje de contacto | **público** |
| `PUT` | `/api/mensajes/:id` | Marca como leído / actualiza | `x-api-key` |
| `DELETE` | `/api/mensajes/:id` | Elimina un mensaje | `x-api-key` |

Ejemplo de cuerpo para `POST /api/proyectos`:

```json
{
  "titulo": "App de Tareas",
  "descripcion": "Aplicación web con drag & drop y modo oscuro.",
  "emoji": "📱",
  "categoria": "FRONTEND",
  "urlDemo": "https://demo.ejemplo.com",
  "urlRepo": "https://github.com/leonardovargas/app-tareas",
  "destacado": false,
  "tecnologiaIds": [1, 2]
}
```

Las rutas inexistentes responden `404 { "error": "Ruta no encontrada" }`.

---

## Documentación interactiva (Swagger)

Con el servidor levantado, abre `http://localhost:3000/api-docs` (o la ruta definida en `DOCUMENTATION`). Desde ahí puedes probar cada endpoint; el botón **Authorize** permite escribir la `ADMIN_API_KEY` una sola vez y se enviará automáticamente en cada petición protegida.

---

## Probar la autenticación (cURL)

```bash
# Sin la API key → 401 Unauthorized
curl -X POST http://localhost:3000/api/proyectos \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Test","descripcion":"Descripción de prueba","categoria":"FRONTEND"}'

# Con la API key → 201 Created
curl -X POST http://localhost:3000/api/proyectos \
  -H "Content-Type: application/json" \
  -H "x-api-key: cambia-esta-clave" \
  -d '{"titulo":"Test","descripcion":"Descripción de prueba","categoria":"FRONTEND"}'
```

---

## Tareas completadas (curso)

- ✅ Middleware que valida `ADMIN_API_KEY` (header `x-api-key`) en `src/middlewares/auth.js`.
- ✅ Endpoints de **Tecnologías** (CRUD completo con Swagger).
- ✅ Endpoints de **Mensajes** (CRUD completo; el `POST` es público).
- ✅ `prisma/seed.js` con datos iniciales del portafolio de Leonardo.
- ✅ Script `npm run seed` agregado a `package.json`.
- ✅ `prisma.config.ts` convertido a `prisma.config.js` (sin errores en VS Code).
- ✅ Página de inicio HTML en `GET /` (ver `src/middlewares/homePage.js`).

---

## Autor

**Leonardo Vargas Peña** — Santa Cruz, Bolivia
Curso de Desarrollo Full Stack
