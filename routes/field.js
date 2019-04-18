const express = require('express');
const Field = require('../controllers/field');

const Routes = express.Router();

Routes.get('/test', Field.test);

//Create
Routes.post('/', Field.create);

//Show all
Routes.get('/findall', Field.findAll);

//Search One
Routes.get('/:id', Field.findOne);

//Update
Routes.put('/:id', Field.update);

//Delete
Routes.put('/delete/:id', Field.delete);

//Recovery
Routes.put('/recovery/:id', Field.recovery);

module.exports = Routes;