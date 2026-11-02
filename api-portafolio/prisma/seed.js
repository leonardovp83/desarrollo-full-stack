// prisma/seed.js
// Puebla la base de datos con datos iniciales del portafolio de
// Leonardo Vargas Peña. Se ejecuta con:  npx prisma db seed
//
// Antes de ejecutarlo necesitas aplicar las migraciones:
//   npx prisma migrate dev
//   npx prisma generate

require('dotenv').config({ quiet: true });
const prisma = require('../src/lib/prisma');

async function main() {
  console.log('🌱 Iniciando seed del portafolio de Leonardo Vargas Peña...');

  // 1) Limpiar datos previos (el orden importa por las relaciones)
  console.log('   Limpiando datos previos...');
  await prisma.proyecto.deleteMany();
  await prisma.tecnologia.deleteMany();
  await prisma.mensaje.deleteMany();

  // 2) Tecnologías
  console.log('   Insertando tecnologías...');
  const [react, cssModules, flexbox, html5, cssGrid, javascript, nodejs, postgresql, chartjs, express, mysql, jwt, fetchApi, openWeather] =
    await Promise.all([
      prisma.tecnologia.create({ data: { nombre: 'React', area: 'FRONTEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'CSS Modules', area: 'FRONTEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'Flexbox', area: 'FRONTEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'HTML5', area: 'FRONTEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'CSS Grid', area: 'FRONTEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'JavaScript', area: 'FRONTEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'Node.js', area: 'BACKEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'PostgreSQL', area: 'BASE_DATOS' } }),
      prisma.tecnologia.create({ data: { nombre: 'Chart.js', area: 'FRONTEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'Express', area: 'BACKEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'MySQL', area: 'BASE_DATOS' } }),
      prisma.tecnologia.create({ data: { nombre: 'JWT', area: 'BACKEND' } }),
      prisma.tecnologia.create({ data: { nombre: 'Fetch API', area: 'HERRAMIENTA' } }),
      prisma.tecnologia.create({ data: { nombre: 'OpenWeather', area: 'HERRAMIENTA' } }),
    ]);

  // 3) Proyectos del portafolio de Leonardo
  console.log('   Insertando proyectos...');
  await prisma.proyecto.create({
    data: {
      titulo: 'App de Tareas',
      descripcion: 'Aplicación web con drag & drop, almacenamiento local y modo oscuro. UI minimalista con microinteracciones.',
      emoji: '📱',
      categoria: 'FRONTEND',
      urlDemo: 'https://demo.ejemplo.com/app-tareas',
      urlRepo: 'https://github.com/leonardovargas/app-tareas',
      destacado: true,
      tecnologias: { connect: [{ id: react.id }, { id: cssModules.id }, { id: flexbox.id }] },
    },
  });

  await prisma.proyecto.create({
    data: {
      titulo: 'EcoShop',
      descripcion: 'E-commerce sostenible con sistema de filtros y carrito de compras.',
      emoji: '🌿',
      categoria: 'FRONTEND',
      urlDemo: 'https://demo.ejemplo.com/ecoshop',
      urlRepo: 'https://github.com/leonardovargas/ecoshop',
      destacado: false,
      tecnologias: { connect: [{ id: html5.id }, { id: cssGrid.id }, { id: javascript.id }] },
    },
  });

  await prisma.proyecto.create({
    data: {
      titulo: 'Dashboard Analytics',
      descripcion: 'Panel con gráficas en tiempo real, filtros dinámicos y exportación.',
      emoji: '📊',
      categoria: 'FULLSTACK',
      urlDemo: 'https://demo.ejemplo.com/dashboard',
      urlRepo: 'https://github.com/leonardovargas/dashboard-analytics',
      destacado: true,
      tecnologias: { connect: [{ id: nodejs.id }, { id: postgresql.id }, { id: chartjs.id }] },
    },
  });

  await prisma.proyecto.create({
    data: {
      titulo: 'REST API – Inventario',
      descripcion: 'API REST completa con autenticación JWT y documentación Swagger.',
      emoji: '🔧',
      categoria: 'BACKEND',
      urlDemo: null,
      urlRepo: 'https://github.com/leonardovargas/api-inventario',
      destacado: false,
      tecnologias: { connect: [{ id: express.id }, { id: mysql.id }, { id: jwt.id }] },
    },
  });

  await prisma.proyecto.create({
    data: {
      titulo: 'GeoWeather App',
      descripcion: 'Consulta clima en tiempo real usando la API de OpenWeather y países.',
      emoji: '🌍',
      categoria: 'FULLSTACK',
      urlDemo: 'https://demo.ejemplo.com/geoweather',
      urlRepo: 'https://github.com/leonardovargas/geoweather',
      destacado: false,
      tecnologias: { connect: [{ id: react.id }, { id: fetchApi.id }, { id: openWeather.id }] },
    },
  });

  // 4) Mensaje de contacto de ejemplo
  console.log('   Insertando mensaje de contacto de ejemplo...');
  await prisma.mensaje.create({
    data: {
      nombre: 'María Fernández',
      email: 'maria@ejemplo.com',
      servicio: 'Desarrollo Web Full Stack',
      presupuesto: 2500,
      fecha: new Date('2026-11-15'),
      mensaje: 'Hola Leonardo, vi tu portafolio y me gustaría conversar sobre un proyecto de e-commerce. Soy de Santa Cruz, Bolivia.',
      leido: false,
    },
  });

  console.log('\n✅ Seed completado:');
  console.log(`   - 14 tecnologías`);
  console.log(`   - 5 proyectos`);
  console.log(`   - 1 mensaje de contacto`);
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
