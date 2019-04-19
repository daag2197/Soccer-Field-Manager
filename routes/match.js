const express = require("express");
const Match = require("../controllers/match");

const Routes = express.Router();

//Create 
Routes.post('/',Match.create);
/*
//Show All
Routes.get('/findall',Match.findall);

//Search One
Routes.get('/:id',Match.findone);

//Delete
Routes.put('/delete/:id',Match.delete);

//Update
Routes.put('/:id',Match.update);

//Recovery
Routes.put('/recovery/:id',Match.recovery);*/


module.exports = Routes;