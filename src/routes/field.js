const express = require('express');
const Field = require('../controllers/field');

const Routes = express.Router();

Routes.get('/test', Field.test);

Routes.post('/create',Field.create);

Routes.get('/findall',Field.findAll);

Routes.get('/findone',Field.findOne);

Routes.put('/update',Field.update);

module.exports = Routes;