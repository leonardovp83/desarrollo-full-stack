// prisma.config.js
// Configuración de Prisma 7 (versión JavaScript — sin errores en VS Code).
//
// Antes era prisma.config.ts pero daba error rojo en los imports
// 'dotenv/config' y 'prisma/config' porque VS Code no tenía TypeScript
// configurado. Esta versión en JS funciona exactamente igual y no
// requiere ninguna configuración extra.
//
// Documentación: https://www.prisma.io/docs/orm/reference/prisma-config

require('dotenv').config();

const { defineConfig, env } = require('prisma/config');

module.exports = defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'node prisma/seed.js',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
