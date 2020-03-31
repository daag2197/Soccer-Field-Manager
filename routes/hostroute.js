const express = require("express");
const HostRoutes = require("../controllers/hostroute"); //Obtenemos el objeto
const authenticate = require('../middleware/auth');

const Routes = express.Router();

//Rutas a utilizar

//GET
Routes.get('/(:id)?', authenticate, HostRoutes.find);
//POST
Routes.post('/', authenticate, HostRoutes.create);
//PUT
Routes.put('/:id', authenticate, HostRoutes.update);
//DELETE
Routes.delete('/:id', authenticate, HostRoutes.delete);


module.exports = Routes; //Regresamos la Rutas Creadas