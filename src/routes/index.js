const { Router } = require('express');

const router = Router();

// Cargamos la rutas de los modulos

router.get('/', (req, res) => {
  res.send('Bienvenido a Inicio!');
});

// Cargamos la rutas de los modulos

module.exports = router;