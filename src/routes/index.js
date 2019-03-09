const { Router } = require('express');

const router = Router();

// Cargamos la rutas de los modulos
const ComplexRoute = require('./Complex');
const FieldRoute = require('./Field')
const DayRoute = require('./Day');
const LeagueRoute = require('./League');
const TeamRoute = require('./Team');

router.get('/', (req, res) => {
  res.send('Bienvenido a Inicio!');
});


// Cargamos la rutas de los modulos
router.use('/complex',ComplexRoute);
router.use('/field', FieldRoute);
router.use('/day',DayRoute);
router.use('/league',LeagueRoute);
router.use('/team',TeamRoute);

module.exports = router;