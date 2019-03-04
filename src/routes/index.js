const { Router } = require('express');

const router = Router();

// Cargamos la rutas de los modulos
const ComplexRoute = require('./Complex');

router.get('/', (req, res) => {
  res.send('Bienvenido a Inicio!');
});


// Cargamos la rutas de los modulos
router.use('/complex',ComplexRoute);
module.exports = router;