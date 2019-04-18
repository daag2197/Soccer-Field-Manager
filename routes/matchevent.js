const express = require("express");
const MatchEvent = require("../controllers/matchevent");

const Routes = express.Router();

Routes.post('/create',MatchEvent.create);

Routes.get('/findall',MatchEvent.findall);

Routes.get('/findone',MatchEvent.findone);

Routes.put('/delete',MatchEvent.delete);

Routes.put('/update',MatchEvent.update);

Routes.put('/recovery',MatchEvent.recovery);

module.exports = Routes;