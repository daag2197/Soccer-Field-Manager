const express = require("express");
const Match = require("../controllers/match");

const Routes = express.Router();

//Create 
Routes.post('/',Match.create);

//Show All
Routes.get('/findall',Match.findAll);

//Search One
Routes.get('/:id',Match.findOne);

//Delete
Routes.put('/delete/:id',Match.delete);

//Update
Routes.put('/:id',Match.update);

module.exports = Routes;