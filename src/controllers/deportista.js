const Sequelize = require('sequelize');
var models = require('../models');
var Deportista = models.deportista;

var db = require('../models/index');

let ABCDeportista = {};

//Registrar Deportista
ABCDeportista.RegistrarDeportista = function (DeportistasReq) {
    return new Promise((resolve,reject) =>
    {
        Deportista.create(
        {
            
            Usuario: DeportistasReq.Usuario,
            FechaNacimiento: DeportistasReq.FechaNacimiento,
            Equipo: DeportistasReq.Equipo

        }).then(resolve).catch(reject);
    })
}

//BuscarPorIdDeportista
ABCDeportista.BuscarPorIdDeportista = function (DeportistaReq) {
    return new Promise((resolve,reject) => 
    {
        Deportista.findOne(
        {
            include: 
            [{
                model: models.Equipo,
                attributes:
                {
                    exclude: ['IdEquipo']
                }
            },
            {
                model: models.Usuario,
                attributes:
                {
                    exclude:['ClaveAcceso']
                }
            }],
            where:
            {
                IdDeportista: DeportistaReq
            }
        })
    })
}

module.exports = ABCDeportista;