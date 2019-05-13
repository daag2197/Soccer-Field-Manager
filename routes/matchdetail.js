const express = require("express");
const MatchDetail = require("../controllers/matchdetail");

const Routes = express.Router();

//Create 
Routes.post('/',MatchDetail.create);

//Show All
Routes.get('/',MatchDetail.findAll);

//Search One
Routes.get('/:id',MatchDetail.findOne);

//Search One by id matchdetail
Routes.get('/findOneById/:id',MatchDetail.findOneById);

//Delete
Routes.put('/delete/:id',MatchDetail.delete);

//Update
Routes.put('/:id',MatchDetail.update);


module.exports = Routes;