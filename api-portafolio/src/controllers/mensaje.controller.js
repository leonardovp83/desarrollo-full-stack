// controllers/mensaje.controller.js
const prisma = require('../lib/prisma');

const datosMensaje = ({ nombre, email, servicio, presupuesto, fecha, mensaje }) => ({
  nombre: nombre.trim(),
  email: email.trim(),
  servicio: servicio || null,
  presupuesto: presupuesto !== undefined && presupuesto !== '' ? Number(presupuesto) : null,
  fecha: fecha ? new Date(fecha) : null,
  mensaje: mensaje.trim(),
});

// GET /api/mensajes?leido=false  (protegido con API key)
const obtenerTodos = async (req, res) => {
  const { leido } = req.query;
  const mensajes = await prisma.mensaje.findMany({
    where: leido !== undefined ? { leido: leido === 'true' } : undefined,
    orderBy: { creadoEn: 'desc' },
  });
  res.json(mensajes);
};

// GET /api/mensajes/:id  (protegido con API key)
const obtenerPorId = async (req, res) => {
  const mensaje = await prisma.mensaje.findUnique({ where: { id: req.params.id } });
  if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
  res.json(mensaje);
};

// POST /api/mensajes  (público — cualquiera puede enviar un mensaje)
const crear = async (req, res) => {
  const mensaje = await prisma.mensaje.create({ data: datosMensaje(req.body) });
  res.status(201).json(mensaje);
};

// PUT /api/mensajes/:id  (protegido — marca como leído / actualiza)
const actualizar = async (req, res) => {
  const { leido, nombre, email, servicio, presupuesto, fecha, mensaje } = req.body ?? {};

  // Si solo llega `leido` (caso típico: marcar como leído)
  if (leido !== undefined && nombre === undefined) {
    const actualizado = await prisma.mensaje.update({
      where: { id: req.params.id },
      data: { leido: Boolean(leido) },
    });
    return res.json(actualizado);
  }

  // Actualización completa
  const actualizado = await prisma.mensaje.update({
    where: { id: req.params.id },
    data: {
      ...datosMensaje(req.body),
      ...(leido !== undefined && { leido: Boolean(leido) }),
    },
  });
  res.json(actualizado);
};

// DELETE /api/mensajes/:id  (protegido con API key)
const eliminar = async (req, res) => {
  await prisma.mensaje.delete({ where: { id: req.params.id } });
  res.status(204).send();
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
