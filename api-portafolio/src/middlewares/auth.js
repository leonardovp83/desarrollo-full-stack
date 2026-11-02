// middlewares/auth.js
// Middleware que valida la API key (header `x-api-key`) para las
// rutas de escritura (POST / PUT / DELETE) comparándola con la
// variable de entorno ADMIN_API_KEY.

const requireApiKey = (req, res, next) => {
  const receivedKey = req.headers['x-api-key'];
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    // No se configuró la clave en el servidor → error de configuración
    return res.status(500).json({
      error: 'El servidor no configuró ADMIN_API_KEY',
    });
  }

  if (!receivedKey || receivedKey !== expectedKey) {
    return res.status(401).json({
      error: 'Falta la API key o es incorrecta',
    });
  }

  next();
};

module.exports = { requireApiKey };
