const express = require("express");
const Profile = require("../controllers/profile"); //Obtenemos el objeto
const authenticate = require('../middleware/auth');

const Routes = express.Router();

//Rutas a utilizar

//GET
Routes.get('/(:id)?', authenticate, Profile.find);
//POST
Routes.post('/', authenticate, Profile.create);
//PUT
Routes.put('/:id', authenticate, Profile.update);
//DELETE
Routes.delete('/:id', authenticate, Profile.delete);


module.exports = Routes; //Regresamos la Rutas Creadas