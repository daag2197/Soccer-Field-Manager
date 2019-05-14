const express = require("express");
const Athlete = require("../controllers/athlete");
const { adminAuthenticate, authenticate } = require('../middleware/auth');

const Routes = express.Router();

Routes.get('/test', Athlete.test);

//Create
Routes.post('/', Athlete.create);

//Show all
Routes.get('/findall', Athlete.findAll);

//Search One
Routes.get('/:id', Athlete.findOne);

//Update
Routes.put('/:id', authenticate, Athlete.update);

//Delete
Routes.put('/delete/:id', adminAuthenticate, Athlete.delete);

//Recovery
Routes.put('/recovery/:id', Athlete.recovery);

module.exports = Routes; 