const { Router } = require('express');

const router = Router();

// Cargamos la rutas de los modulos
const ComplexRoute = require('./complex');
const FieldRoute = require('./field')
const DayRoute = require('./day');
const LeagueRoute = require('./league');
const TeamRoute = require('./team');
const UserTypeRoute = require('./usertype');
const UserRoute = require('./user'); 
const AthletesRoute = require('./athlete');

router.get('/', (req, res) => {
  res.send('Bienvenido a Inicio!');
});


// Cargamos la rutas de los modulos
router.use('/complex',ComplexRoute);
router.use('/field', FieldRoute);
router.use('/day',DayRoute);
router.use('/league',LeagueRoute);
router.use('/team',TeamRoute);
router.use('/usertype',UserTypeRoute);
router.use('/user',UserRoute);
router.use('/athlete',AthletesRoute);
module.exports = router;