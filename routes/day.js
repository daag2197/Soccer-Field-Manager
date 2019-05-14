const express = require('express');
const Day = require('../controllers/day');

const Routes = express.Router();

Routes.get('/test', Day.test);

Routes.post('/', Day.create);

Routes.get('/',Day.findall);

module.exports = Routes;