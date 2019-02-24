const Sequelize = require('sequelize');
var models = require('../models');
var Equipo = models.equipo;

var db = require('../models/index');

let ABCEquipos = {};

//Registrar Equipo
ABCEquipos.RegistrarEquipo = function (EquipoReq) {
    return new Promise((resolve,reject) =>
    {
        Equipo.create(
        {
            
            NombreEquipo: EquipoReq.NombreEquipo

        }).then(resolve).catch(reject);
    })
}

//Buscar Por Id
ABCEquipos.BuscarPorIdEquipo = function (EquipoReq) {
    return new Promise((resolve,reject) => 
    {
        Equipo.findOne(
        {
            where:
            {
                IdEquipo: EquipoReq
            }
        }).then(resolve).catch(reject);
    })
}

module.exports = ABCEquipos;