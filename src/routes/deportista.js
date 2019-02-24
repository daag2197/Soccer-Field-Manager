const express = require('express');
const { check,validationResult} = require('express-validator/check');
const Deportista = require('../controllers/deportista');
const Usuario = require('../controllers/usuario');
const Equipo = require('../controllers/equipo');

const Rutas = express.Router();

Rutas.post('/Registro',[
    check('Usuario')
        .isNumeric()
        .not().isEmpty(),
    check('FechaNacimiento')
        .isString()
        .not().isEmpty(),
    check('Equipo')
        .isNumeric()
        .not().isEmpty()
],(request,response) =>{
    
    let NDeportista = {
        Usuario: request.body.Usuario,
        FechaNacimiento: request.body.FechaNacimiento,
        Equipo: request.body.Equipo
    }

    //Validar Datos ingresados
    const errores = validationResult(request);

    if(!errores.isEmpty())
    {
        return response.status(422).json(
        { 
            error : errores.array() 
        })
    }

    Usuario.BuscarUsuarioPorCodigo(NDeportista.Usuario)
    .then(usuario => 
    {
        if(usuario != null)
        {
            Equipo.BuscarPorIdEquipo(NDeportista.Equipo)
            .then(equipo =>
            {
                if(equipo != null)
                {
                    Deportista.RegistrarDeportista(NDeportista)
                    .then(deportista => 
                    {
                        response.status( 201 ).send(
                        {
                            success: 'Usuario ' + usuario.Nombre + ' fue agregado correctamente como deportista'
                        });
                    }).catch(error =>
                    {
                        response.status( 200 ).send(
                        { 
                            error: 'No se puede agregar el deportista ' + error
                        });
                    })      
                }
                else
                {
                    response.status( 200 ).send(
                    { 
                        error: 'El equipo que ingreso no existe'
                    });
                }
            })
            .catch(error => 
            {
                response.status( 200 ).send(
                { 
                    error: 'El equipo que ingreso no existe'
                });
            })
        }
        else
        {
            response.status( 200 ).send(
            { 
                error: 'El usuario que ingreso no existe'
            });
        }
    })
    .catch(error =>
    {
        response.status( 200 ).send(
        { 
            error: 'El usuario que ingreso no existe'
        });
    })
});


module.exports = Rutas;