const { Router } = require('express');

const router = Router();

// Cargamos la rutas de los modulos
const RutaUsuario = require('./usuario');
const RutaUnidad = require('./unidad');
const RutaDeportista = require('./deportista');

router.get('/', (req, res) => {
  res.send('Bienvenido a Inicio!');
});

// Cargamos la rutas de los modulos
router.use('/usuario',RutaUsuario);
router.use('/unidad',RutaUnidad);
router.use('/deportista',RutaDeportista);

module.exports = router;