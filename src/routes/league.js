const express = require('express');
const League = require('../controllers/league');

const Routes = express.Router();

Routes.get('/test', League.test);

Routes.post('/create', League.create);

Routes.get('/findall', League.findAll);

Routes.get('/findone', League.findOne);

Routes.put('/update',League.update);

Routes.put('/delete', League.delete);

Routes.put('/recovery',League.recovery);

module.exports = Routes;