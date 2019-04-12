const express = require("express");
const Athlete = require("../controllers/athlete");

const Routes = express.Router();

Routes.get('/test', Athlete.test);

Routes.post('/create', Athlete.create);

Routes.get('/findall', Athlete.findAll);

Routes.get('/findone', Athlete.findOne);

Routes.put('/update', Athlete.update);

Routes.put('/delete', Athlete.delete);

Routes.put('/recovery', Athlete.recovery);

module.exports = Routes; 