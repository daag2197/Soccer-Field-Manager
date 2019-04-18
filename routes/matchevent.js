const express = require("express");
const MatchEvent = require("../controllers/matchevent");

const Routes = express.Router();

//Create 
Routes.post('/',MatchEvent.create);

//Show All
Routes.get('/findall',MatchEvent.findall);

//Search One
Routes.get('/:id',MatchEvent.findone);

//Delete
Routes.put('/delete/:id',MatchEvent.delete);

//Update
Routes.put('/:id',MatchEvent.update);

//Recovery
Routes.put('/recovery/:id',MatchEvent.recovery);


module.exports = Routes;