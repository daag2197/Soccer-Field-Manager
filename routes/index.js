const { Router } = require('express');

const router = Router();


// Cargamos la rutas de los modulos
const AccessRoute = require('./accessprofile');
const ClubRoute = require('./club');
const HostRoute = require('./hostroute');
const ProfileRoute = require('./profile');
const UserRoute = require('./user');
const UserController = require('../controllers/user');


// const FieldRoute = require('./field')
// const DayRoute = require('./day');
// const LeagueRoute = require('./league');
// const TeamRoute = require('./team');
// const AthletesRoute = require('./athlete');
// const MatchEventRoute = require('./matchevent');
// const Match = require('./match');
// const MatchDetail = require('./matchdetail');
// const Tournament = require('./tournament');

// const userController = require('../controllers/user');

router.get('/', (req, res) => {
  res.send('Bienvenido a Inicio! para poder usar este proyecto por favor consulte la documentación');
});


// Cargamos la rutas de los modulos Ordenado alfabeticamente
router.use('/access',AccessRoute);
router.use('/club',ClubRoute);
router.use('/host',HostRoute)
router.post('/login',UserController.login);
router.use('/profile',ProfileRoute);
router.use('/user',UserRoute);

// router.use('/field', FieldRoute);
// router.use('/day',DayRoute);
// router.use('/league',LeagueRoute);
// router.use('/team',TeamRoute);
// router.use('/user',UserRoute);
// router.use('/athlete',AthletesRoute);
// router.use('/matchevent',MatchEventRoute);
// router.use('/match',Match);
// router.use('/matchdetail',MatchDetail);
// router.use('/tournament', Tournament);

module.exports = router;