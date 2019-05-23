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
const MatchEventRoute = require('./matchevent');
const Match = require('./match');
const MatchDetail = require('./matchdetail');
const Tournament = require('./tournament');

const userController = require('../controllers/user');

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
router.use('/matchevent',MatchEventRoute);
router.use('/match',Match);
router.use('/matchdetail',MatchDetail);
router.use('/tournament', Tournament);

router.post('/login', userController.login);

module.exports = router;