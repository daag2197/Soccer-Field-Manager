const express = require('express');
const League = require('../controllers/league');

const Routes = express.Router();

Routes.get('/test', League.test);

//Create
Routes.post('/', League.create);

//Show all
Routes.get('/findall', League.findAll);

//Search One
Routes.get('/:id', League.findOne);

//Update
Routes.put('/:id', League.update);

//Delete
Routes.put('/delete/:id', League.delete);

//Recovery
Routes.put('/recovery/:id', League.recovery);

module.exports = Routes;