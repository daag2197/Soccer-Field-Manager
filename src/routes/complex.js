const express = require('express');
const Complex = require('../controllers/complex');

const Routes = express.Router();

Routes.get('/test',Complex.test);

Routes.post('/Create',Complex.create);

Routes.get('/Findall',Complex.findAll);

Routes.get('/Findone',Complex.findOne);

Routes.put('/update',Complex.update);

Routes.put('/delete',Complex.delete);

Routes.put('/recovery',Complex.recovery);

module.exports = Routes;