const express = require("express");
const AccessProfile = require("../controllers/accessprofile"); //Obtenemos el objeto

const Routes = express.Router();

//Rutas a utilizar

//POST
Routes.post('/', AccessProfile.create);

//DELETE
Routes.delete('/:id',AccessProfile.delete);

//GET
Routes.get('/',AccessProfile.find);

module.exports = Routes; //Regresamos las rutas creadas