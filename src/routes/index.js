const { Router } = require('express');

const router = Router();

// Cargamos la rutas de los modulos
const ComplexRoute = require('./Complex');
const FieldRoute = require('./Field')
const DayRoute = require('./Day');
router.get('/', (req, res) => {
  res.send('Bienvenido a Inicio!');
});


// Cargamos la rutas de los modulos
router.use('/complex',ComplexRoute);
router.use('/field', FieldRoute);
router.use('/day',DayRoute);

module.exports = router;