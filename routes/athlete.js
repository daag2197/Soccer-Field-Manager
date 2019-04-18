const express = require("express");
const Athlete = require("../controllers/athlete");

const Routes = express.Router();

Routes.get('/test', Athlete.test);

//Create
Routes.post('/', Athlete.create);

//Show all
Routes.get('/findall', Athlete.findAll);

//Search One
Routes.get('/:id', Athlete.findOne);

//Update
Routes.put('/:id', Athlete.update);

//Delete
Routes.put('/delete/:id', Athlete.delete);

//Recovery
Routes.put('/recovery/:id', Athlete.recovery);

module.exports = Routes; 