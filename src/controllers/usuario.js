const Sequelize = require('sequelize');
var models = require('../models');
var Usuario = models.usuario;

var db = require('../models/index');


const Op = Sequelize.Op;

let ABCUsuarios = {};

//Creacion de un Nuevo Usuario
ABCUsuarios.RegistrarUsuario = function (UsuarioRequest)
{
    return new Promise((resolve,reject) => 
    {
        Usuario.create(UsuarioRequest).then(resolve).catch(reject);//En dado caso de que falle utilizar un console.error para ver el error
    });
}

//Buscar por Codigo de Usuario
ABCUsuarios.BuscarUsuarioPorCodigo = function (UsuarioRequest) 
{
    return new Promise((resolve,reject) => 
    {
        Usuario.findOne(
        {
            where: 
            {
                IdUsuario: UsuarioRequest
            },
            attributes:
            {
                exclude: ['ClaveAcceso']
            }
        }).then(resolve).catch(reject); //En dado caso de que falle utilizar un console.error para ver el error
    });
}

//Buscar por Correo de Usuario
ABCUsuarios.BuscarUsuarioPorUsuarioPorCorreo = function (UsuarioRequest)
{
    return new Promise((resolve,reject) => 
    {
        Usuario.findOne(
        {
            where:
            {
                Correo: UsuarioRequest
            },
            attributes: 
            {
                exclude: ['ClaveAcceso']
            }
        }).then(resolve).catch(reject); //En dado caso de que falle utilizar un console.error para ver el error
    });
}

//Buscar Todos los Usuarios
ABCUsuarios.VerTodosUsuarios = function ()
{
    return new Promise((resolve,reject) => 
    {
        Usuario.findAll(
        {
            attributes:
            {
                exclude: ['ClaveAcceso']
            }
        }).then(resolve).catch(reject); //En dado caso de que falle utilizar un console.error para ver el error
    });
}

//Actualizar Usuario Creo que se puede mejorar
ABCUsuarios.Actualizar = function(UsuarioRequest)
{
    return new Promise((resolve,reject) => 
    {
      Usuario.update(
      {
        Nombre: UsuarioRequest.Nombre,
        ApellidoPaterno: UsuarioRequest.ApellidoPaterno,
        ApellidoMaterno: UsuarioRequest.ApellidoMaterno,
        Correo: UsuarioRequest.Correo,
        ClaveAcceso: UsuarioRequest.ClaveAcceso
      }, 
      {
        where:
        {
          IdUsuario: UsuarioRequest.IdUsuario
        }
      }).then(resolve).catch(reject);//En dado caso de que falle utilizar un console.error para ver el error
    });
}

//Eliminar Usuario
ABCUsuarios.Eliminar = function(UsuarioRequest)
{
    return new Promise((resolve,reject)=>
    {
      Usuario.destroy(
      {
        where:
        {
          IdUsuario: UsuarioRequest 
        }
      }).then(resolve).catch(reject);//En dado caso de que falle utilizar un console.error para ver el error
    });
}

//Queda pendiente el Autentificar para ver si lo puedo optimizar


module.exports = ABCUsuarios;