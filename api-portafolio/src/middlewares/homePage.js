// middlewares/homePage.js
// Página de inicio HTML de la API — se sirve en GET /
// Muestra información del autor (Leonardo Vargas Peña, Santa Cruz, Bolivia),
// los endpoints disponibles y un link a Swagger UI.

const homePage = (port, docPath) => `<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>API Portafolio · Leonardo Vargas Peña</title>
  <style>
    :root {
      --bg: #0f172a;
      --card: #1e293b;
      --border: #334155;
      --text: #e2e8f0;
      --muted: #94a3b8;
      --accent: #10b981;
      --accent-hover: #059669;
      --accent-soft: #10b98120;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      padding: 2rem 1rem;
    }
    .container {
      max-width: 880px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .badge {
      display: inline-block;
      background: var(--accent-soft);
      color: var(--accent);
      padding: 0.3rem 0.8rem;
      border-radius: 999px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    h1 {
      font-size: 2.2rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--accent), #14b8a6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .subtitle {
      color: var(--muted);
      font-size: 1.05rem;
    }
    .author {
      margin-top: 1rem;
      color: var(--text);
    }
    .author strong { color: var(--accent); }
    .author .loc { color: var(--muted); }

    .section {
      margin-bottom: 2.5rem;
    }
    .section h2 {
      font-size: 1.3rem;
      margin-bottom: 1rem;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .section h2::before {
      content: '';
      width: 4px;
      height: 1.3rem;
      background: var(--accent);
      border-radius: 2px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1rem;
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.2rem 1.4rem;
      transition: border-color 0.2s, transform 0.2s;
    }
    .card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
    }
    .card .label {
      color: var(--muted);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.4rem;
    }
    .card .value {
      font-size: 1.05rem;
      font-weight: 600;
      word-break: break-word;
    }

    .endpoints {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
    }
    .endpoint {
      display: grid;
      grid-template-columns: 80px 1fr auto;
      align-items: center;
      padding: 0.9rem 1.2rem;
      border-bottom: 1px solid var(--border);
      gap: 1rem;
    }
    .endpoint:last-child { border-bottom: none; }
    .method {
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      text-align: center;
    }
    .method.get    { background: #10b98120; color: #34d399; }
    .method.post   { background: #3b82f620; color: #60a5fa; }
    .method.put    { background: #f59e0b20; color: #fbbf24; }
    .method.delete { background: #ef444420; color: #f87171; }
    .method.public { background: #10b98120; color: #34d399; }
    .method.protected { background: #f59e0b20; color: #fbbf24; }
    .path {
      font-family: 'SF Mono', Monaco, Consolas, monospace;
      color: var(--text);
      font-size: 0.95rem;
    }
    .auth {
      font-size: 0.75rem;
      color: var(--muted);
      font-style: italic;
    }

    .cta {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: var(--accent);
      color: white;
      padding: 0.9rem 1.8rem;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: background 0.2s, transform 0.2s;
    }
    .cta:hover {
      background: var(--accent-hover);
      transform: translateY(-2px);
    }
    .cta-row {
      text-align: center;
      margin-top: 1rem;
    }

    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .tech {
      background: var(--card);
      border: 1px solid var(--border);
      color: var(--muted);
      padding: 0.4rem 0.9rem;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 500;
    }

    footer {
      text-align: center;
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      color: var(--muted);
      font-size: 0.85rem;
    }
    footer strong { color: var(--text); }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <span class="badge">API REST · v1.0.0</span>
      <h1>API Portafolio</h1>
      <p class="subtitle">Backend del portafolio con Node.js, Express, Prisma y PostgreSQL</p>
      <p class="author">Desarrollado por <strong>Leonardo Vargas Peña</strong> <span class="loc">· Santa Cruz, Bolivia</span></p>
    </header>

    <section class="section">
      <h2>Servidor activo</h2>
      <div class="grid">
        <div class="card">
          <div class="label">URL base</div>
          <div class="value">http://localhost:${port}</div>
        </div>
        <div class="card">
          <div class="label">Documentación Swagger</div>
          <div class="value"><a href="${docPath.startsWith('/') ? docPath : '/' + docPath}" style="color: var(--accent); text-decoration: none;">${docPath.startsWith('/') ? docPath : '/' + docPath}</a></div>
        </div>
        <div class="card">
          <div class="label">Autenticación</div>
          <div class="value">Header <code style="color: var(--accent);">x-api-key</code></div>
        </div>
      </div>
      <div class="cta-row">
        <a class="cta" href="${docPath.startsWith('/') ? docPath : '/' + docPath}">📚 Abrir Swagger UI →</a>
      </div>
    </section>

    <section class="section">
      <h2>Endpoints disponibles</h2>
      <div class="endpoints">

        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/proyectos</span>
          <span class="auth">público</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/proyectos/:id</span>
          <span class="auth">público</span>
        </div>
        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="path">/api/proyectos</span>
          <span class="auth">protegido</span>
        </div>
        <div class="endpoint">
          <span class="method put">PUT</span>
          <span class="path">/api/proyectos/:id</span>
          <span class="auth">protegido</span>
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="path">/api/proyectos/:id</span>
          <span class="auth">protegido</span>
        </div>

        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/tecnologias</span>
          <span class="auth">público</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/tecnologias/:id</span>
          <span class="auth">público</span>
        </div>
        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="path">/api/tecnologias</span>
          <span class="auth">protegido</span>
        </div>
        <div class="endpoint">
          <span class="method put">PUT</span>
          <span class="path">/api/tecnologias/:id</span>
          <span class="auth">protegido</span>
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="path">/api/tecnologias/:id</span>
          <span class="auth">protegido</span>
        </div>

        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/mensajes</span>
          <span class="auth">protegido</span>
        </div>
        <div class="endpoint">
          <span class="method get">GET</span>
          <span class="path">/api/mensajes/:id</span>
          <span class="auth">protegido</span>
        </div>
        <div class="endpoint">
          <span class="method post">POST</span>
          <span class="path">/api/mensajes</span>
          <span class="auth">público</span>
        </div>
        <div class="endpoint">
          <span class="method put">PUT</span>
          <span class="path">/api/mensajes/:id</span>
          <span class="auth">protegido</span>
        </div>
        <div class="endpoint">
          <span class="method delete">DELETE</span>
          <span class="path">/api/mensajes/:id</span>
          <span class="auth">protegido</span>
        </div>

      </div>
    </section>

    <section class="section">
      <h2>Stack tecnológico</h2>
      <div class="tech-list">
        <span class="tech">Node.js 22+</span>
        <span class="tech">Express 5</span>
        <span class="tech">Prisma 7</span>
        <span class="tech">PostgreSQL</span>
        <span class="tech">Swagger / OpenAPI 3.0</span>
        <span class="tech">CORS</span>
        <span class="tech">dotenv</span>
      </div>
    </section>

    <footer>
      <p><strong>Leonardo Vargas Peña</strong> · Santa Cruz, Bolivia</p>
      <p style="margin-top: 0.3rem;">Curso de Desarrollo Full Stack · API REST del portafolio</p>
    </footer>
  </div>
</body>
</html>`;

module.exports = { homePage };
