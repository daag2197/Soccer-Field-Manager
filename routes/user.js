const express = require("express");
const User = require("../controllers/user");
const authenticate = require('../middleware/auth');

const Routes = express.Router();

//Ruta a utilizar

//GET
Routes.get('/(:id)?', authenticate, User.find);
//POST
Routes.post('/', authenticate, User.create);
//PUT
Routes.put('/:id', authenticate, User.update);
//DELETE
Routes.delete('/:id', authenticate, User.delete);
//GET BY PROFILES
Routes.get('/profile/:id', authenticate, User.findbyprofile);

module.exports = Routes;