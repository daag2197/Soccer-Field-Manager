const express = require("express");
const Team = require("../controllers/team");

const Routes = express.Router();

Routes.get('/test', Team.test);

//Create
Routes.post('/', Team.create);

//Show All
Routes.get('/findall', Team.findAll);

//Search One
Routes.get('/:id',Team.findOne);

//Update
Routes.put('/:id', Team.update);

//Delete
Routes.put('/delete/:id', Team.delete);

//Recovery
Routes.put('/recovery/:id', Team.recovery);


Routes.get('/:id/players',Team.findPlayersByIdTeam);

module.exports = Routes;