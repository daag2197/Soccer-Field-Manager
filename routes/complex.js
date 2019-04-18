const express = require('express');
const Complex = require('../controllers/complex');

const Routes = express.Router();

Routes.get('/test',Complex.test);

//Create
Routes.post('/', Complex.create);

//Show all
Routes.get('/findall', Complex.findAll);

//Search One
Routes.get('/:id', Complex.findOne);

//Update
Routes.put('/:id', Complex.update);

//Delete
Routes.put('/delete/:id', Complex.delete);

//Recovery
Routes.put('/recovery/:id', Complex.recovery);

module.exports = Routes;