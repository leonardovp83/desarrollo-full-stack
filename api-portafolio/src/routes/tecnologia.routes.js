const router = require('express').Router();
const ctrl = require('../controllers/tecnologia.controller');
const { validarId, validarTecnologia } = require('../middlewares/validar');
const { requireApiKey } = require('../middlewares/auth');

/**
 * @swagger
 * /api/tecnologias:
 *   get:
 *     summary: Listar tecnologías (con filtro opcional por área)
 *     tags: [Tecnologías]
 *     parameters:
 *       - in: query
 *         name: area
 *         schema:
 *           type: string
 *           enum: [FRONTEND, BACKEND, BASE_DATOS, HERRAMIENTA]
 *         description: Filtrar por área
 *     responses:
 *       200:
 *         description: Lista de tecnologías (incluye los proyectos asociados)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tecnologia'
 *       400:
 *         description: Filtro inválido
 */
router.get('/', ctrl.obtenerTodas);

/**
 * @swagger
 * /api/tecnologias/{id}:
 *   get:
 *     summary: Obtener una tecnología por ID
 *     tags: [Tecnologías]
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Tecnología encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnologia'
 *       404:
 *         description: Tecnología no encontrada
 */
router.get('/:id', validarId, ctrl.obtenerPorId);

/**
 * @swagger
 * /api/tecnologias:
 *   post:
 *     summary: Crear una tecnología
 *     tags: [Tecnologías]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearTecnologia'
 *     responses:
 *       201:
 *         description: Tecnología creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnologia'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Falta la API key o es incorrecta
 */
router.post('/', requireApiKey, validarTecnologia, ctrl.crear);

/**
 * @swagger
 * /api/tecnologias/{id}:
 *   put:
 *     summary: Actualizar una tecnología
 *     tags: [Tecnologías]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearTecnologia'
 *     responses:
 *       200:
 *         description: Tecnología actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tecnologia'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Falta la API key o es incorrecta
 *       404:
 *         description: Tecnología no encontrada
 */
router.put('/:id', requireApiKey, validarId, validarTecnologia, ctrl.actualizar);

/**
 * @swagger
 * /api/tecnologias/{id}:
 *   delete:
 *     summary: Eliminar una tecnología
 *     tags: [Tecnologías]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       204:
 *         description: Tecnología eliminada
 *       401:
 *         description: Falta la API key o es incorrecta
 *       404:
 *         description: Tecnología no encontrada
 */
router.delete('/:id', requireApiKey, validarId, ctrl.eliminar);

module.exports = router;
