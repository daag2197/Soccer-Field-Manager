const express = require("express");
const MatchEvent = require("../controllers/matchevent");

const Routes = express.Router();

//Create 
Routes.post('/',MatchEvent.create);

//Show All
Routes.get('/findall',MatchEvent.findall);

//Search One
Routes.get('/:id',MatchEvent.findone);

//delete
Routes.put('/delete',MatchEvent.delete);

//update
Routes.put('/:id',MatchEvent.update);

//recovery
Routes.put('/recovery',MatchEvent.recovery);


module.exports = Routes;