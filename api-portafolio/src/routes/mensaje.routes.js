const router = require('express').Router();
const ctrl = require('../controllers/mensaje.controller');
const { validarId, validarMensaje } = require('../middlewares/validar');
const { requireApiKey } = require('../middlewares/auth');

/**
 * @swagger
 * /api/mensajes:
 *   get:
 *     summary: Listar mensajes de contacto (con filtro opcional por leído)
 *     tags: [Mensajes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: leido
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado de lectura
 *     responses:
 *       200:
 *         description: Lista de mensajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mensaje'
 *       401:
 *         description: Falta la API key o es incorrecta
 */
router.get('/', requireApiKey, ctrl.obtenerTodos);

/**
 * @swagger
 * /api/mensajes/{id}:
 *   get:
 *     summary: Obtener un mensaje por ID
 *     tags: [Mensajes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       200:
 *         description: Mensaje encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       401:
 *         description: Falta la API key o es incorrecta
 *       404:
 *         description: Mensaje no encontrado
 */
router.get('/:id', requireApiKey, validarId, ctrl.obtenerPorId);

/**
 * @swagger
 * /api/mensajes:
 *   post:
 *     summary: Enviar un mensaje de contacto (público)
 *     tags: [Mensajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearMensaje'
 *     responses:
 *       201:
 *         description: Mensaje enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       400:
 *         description: Datos inválidos
 */
router.post('/', validarMensaje, ctrl.crear);

/**
 * @swagger
 * /api/mensajes/{id}:
 *   put:
 *     summary: Actualizar un mensaje (ej. marcar como leído)
 *     tags: [Mensajes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               leido:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Mensaje actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensaje'
 *       401:
 *         description: Falta la API key o es incorrecta
 *       404:
 *         description: Mensaje no encontrado
 */
router.put('/:id', requireApiKey, validarId, ctrl.actualizar);

/**
 * @swagger
 * /api/mensajes/{id}:
 *   delete:
 *     summary: Eliminar un mensaje
 *     tags: [Mensajes]
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Id'
 *     responses:
 *       204:
 *         description: Mensaje eliminado
 *       401:
 *         description: Falta la API key o es incorrecta
 *       404:
 *         description: Mensaje no encontrado
 */
router.delete('/:id', requireApiKey, validarId, ctrl.eliminar);

module.exports = router;
