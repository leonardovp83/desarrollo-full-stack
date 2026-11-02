// controllers/tecnologia.controller.js
const prisma = require('../lib/prisma');
const { AREAS } = require('../middlewares/validar');

const datosTecnologia = ({ nombre, area }) => ({
  nombre: nombre.trim(),
  area,
});

// GET /api/tecnologias?area=FRONTEND
const obtenerTodas = async (req, res) => {
  const area = req.query.area?.toUpperCase();
  if (area && !AREAS.includes(area)) {
    return res.status(400).json({ error: `area debe ser: ${AREAS.join(', ')}` });
  }

  const tecnologias = await prisma.tecnologia.findMany({
    where: area ? { area } : undefined,
    include: { proyectos: { select: { id: true, titulo: true } } },
    orderBy: [{ nombre: 'asc' }],
  });
  res.json(tecnologias);
};

// GET /api/tecnologias/:id
const obtenerPorId = async (req, res) => {
  const tecnologia = await prisma.tecnologia.findUnique({
    where: { id: req.params.id },
    include: { proyectos: { select: { id: true, titulo: true } } },
  });
  if (!tecnologia) return res.status(404).json({ error: 'Tecnología no encontrada' });
  res.json(tecnologia);
};

// POST /api/tecnologias
const crear = async (req, res) => {
  const tecnologia = await prisma.tecnologia.create({
    data: datosTecnologia(req.body),
  });
  res.status(201).json(tecnologia);
};

// PUT /api/tecnologias/:id
const actualizar = async (req, res) => {
  const tecnologia = await prisma.tecnologia.update({
    where: { id: req.params.id },
    data: datosTecnologia(req.body),
  });
  res.json(tecnologia);
};

// DELETE /api/tecnologias/:id
const eliminar = async (req, res) => {
  await prisma.tecnologia.delete({ where: { id: req.params.id } });
  res.status(204).send();
};

module.exports = { obtenerTodas, obtenerPorId, crear, actualizar, eliminar };
