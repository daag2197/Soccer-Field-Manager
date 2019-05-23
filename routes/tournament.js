const express = require('express');
const Tournament = require('../controllers/Tournament');

const Routes = express.Router();

//Create
Routes.post('/', Tournament.create);

//Show all
// Routes.get('/findall', Tournament.findAll);

// //Search One
Routes.get('/:id', Tournament.findOne);

// //Update
// Routes.put('/:id', Tournament.update);

// //Delete
// Routes.put('/delete/:id', Tournament.delete);

// //Recovery
// Routes.put('/recovery/:id', Tournament.recovery);

module.exports = Routes;