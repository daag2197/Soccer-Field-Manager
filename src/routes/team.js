const express = require("express");
const Team = require("../controllers/Team");

const Routes = express.Router();

Routes.get('/test', Team.test);

Routes.post('/create',Team.create);

Routes.get('/findall',Team.findAll);

Routes.get('/findone',Team.findOne);

Routes.put('/update',Team.update);

Routes.put('/delete',Team.delete);

Routes.put('/recovery',Team.recovery);

module.exports = Routes;