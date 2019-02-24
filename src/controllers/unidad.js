const Sequelize = require('sequelize');
var models = require('../models');
var Unidad = models.unidad;

var db = require('../models/index');


const Op = Sequelize.Op;

let ABCUnidad = {};

//Dar de Alta una Unidad
ABCUnidad.RegistrarUnidad = function (UnidadReq) 
{
    return new Promise((resolve,reject) =>
    {
        Unidad.create(
        {
            NombreUnidad: UnidadReq.NombreUnidad,
            Ubicacion: UnidadReq.Ubicacion,
            Direccion: UnidadReq.Direccion
        }).then(resolve).catch(reject); //En caso de que falle cambiar catch(console.error)
    });    
}

//Buscar Unidad por Identificador
ABCUnidad.BuscarUnidadPorId = function (UnidadReq) 
{
    return new Promise((resolve,reject) =>
    {
        Unidad.findOne(
        {
            where: 
            {
                IdUnidad: UnidadReq
            },
            attributes:
            {
                exclude: ['createdAt','updatedAt']
            }
        }).then(resolve).catch(reject); //En dado caso de que falle utilizar un console.error para ver el error
    });
}

//Eliminar Unidad por Identificador
ABCUnidad.EliminarUnidad = function(UnidadReq)
{
    return new Promise((resolve,reject) => 
    {
        Unidad.destroy(
        {
            where:
            {
                IdUnidad: UnidadReq
            }
        }).then(resolve).catch(reject)//En dado caso que falle cambiar el reject por un console Log
    });
}

//Ver Todos las Unidades
ABCUnidad.VerTodasUnidades = function () 
{
    return new Promise((resolve,reject) =>
    {
        Unidad.findAll(
        {   
            attributes:
            {
                exclude: ['CreadoPor','ActualizadoPor','createdAt','updatedAt']
            }
        }).then(resolve).catch(reject); //En dado caso de que falle utilizar un console.error para ver el error
    });
}

//Actualiza Unidad
ABCUnidad.ActualizarPorId = function(UnidadReq)
{
    return new Promise((resolve,reject)=>
    {
        Unidad.update(
        {
            NombreUnidad: UnidadReq.NombreUnidad,
            Ubicacion: UnidadReq.Ubicacion,
            Direccion: UnidadReq.Direccion
        },
        {
            where:
            {
                IdUnidad: UnidadReq.IdUnidad
            }
        }).then(resolve).catch(reject) //En caso de debug cambiar reject por console.Log
    })
}
module.exports = ABCUnidad;