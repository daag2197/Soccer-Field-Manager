const express = require('express');
const Tournament = require('../controllers/Tournament');

const Routes = express.Router();

//Create
Routes.post('/', Tournament.create);

//Show all
Routes.get('/', Tournament.findAll);

// //Search One
Routes.get('/:id', Tournament.findOne);

// //Update
Routes.put('/:id', Tournament.update);

// //Delete
Routes.put('/delete/:id', Tournament.delete);

module.exports = Routes;