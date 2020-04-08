const express = require("express");
const Club = require("../controllers/club"); //Obtenemos el objeto

const Routes = express.Router();

//Rutas a utilizar

//POST
Routes.post('/', Club.create);

module.exports = Routes; //Regresamos las rutas creadas