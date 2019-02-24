const express = require('express');
const {check,validationResult} = require('express-validator/check');
const Unidad = require('../controllers/unidad');

const Rutas = express.Router();

//Ruta para registro de unidad
Rutas.post('/Registro',[
  check('NombreUnidad')
    .isString()
    .not().isNumeric()
    .not().isEmpty(),
    
  check('Ubicacion')
    .isString()
    .not().isEmpty()
    .not().isNumeric(),
  
  check('Direccion')
    .isString()
    .not().isNumeric()
    .not().isEmpty(),

  check('CreadoPor')
    .isNumeric()
    .not().isEmpty(),

  check('ActualizadoPor')
    .isNumeric()
    .not().isEmpty()

],(request,response) =>
{

    let NUnidad = 
    {

        NombreUnidad: request.body.NombreUnidad,
        Ubicacion: request.body.Ubicacion,
        Direccion: request.body.Direccion,
        CreadoPor: request.body.CreadoPor,
        ActualizadoPor: request.body.ActualizadoPor

    }

    //Validar Errores
    const errores = validationResult(request);

    if(!errores.isEmpty())
    {
        return response.status(422).json(
        { 
            error : errores.array() 
        })

    }

    Unidad.RegistrarUnidad(NUnidad)
    .then(unidad =>
    {
        response.status( 201 ).send(
        {
            success: 'Unidad ' + unidad.NombreUnidad + ' fue agregado correctamente'
        });
    })
    .catch(error => 
    {
        response.status( 200 ).send(
        {
            error: 'Error al ingresar la unidad ' + request.body.NombreUnidad + ' ' + error            
        })
    })
})

//Ruta para buscar por ID
Rutas.get('/BuscarPorId',[
    check('IdUnidad')
        .isNumeric()
        .not().isEmpty()
],(request,response) =>
{
    let IdUnidad = request.body.IdUnidad;

    //Validar Errores
    const errores = validationResult(request);

    if(!errores.isEmpty()){
        return response.status(422).json(
        { 
            error : errores.array() 
        })
    }

    Unidad.BuscarUnidadPorId(IdUnidad)
    .then(unidad =>
    {
        response.status( 201 ).send({
            success: unidad
        }); 
    })
    .catch(error =>
    {
        response.status( 200 ).send(
        { 
            error: "Sucedio un error al mostrar usuario " + error 
        });
    })
})

//Ruta para eliminar Unidad
Rutas.delete('/Eliminar',[
    check('IdUnidad')
        .isNumeric()
],(request,response)=> 
{
    let IdUnidad = request.body.IdUnidad;

    //Validar Errores
    const errores = validationResult(request);

    if(!errores.isEmpty())
    {
        return response.status(422).json(
        { 
            error : errores.array() 
        })
    }

    Unidad.EliminarUnidad(IdUnidad)
    .then(unidad =>
    {
        response.status( 201 ).send(
        {
            success: "Datos de la unidad eliminados"
        })
    })
    .catch(error =>
    {
        response.status( 201 ).send(
            {
                Error: error 
            });
    });
})

//Rutas para obtener todos las unidades
Rutas.get('/VerTodas',(request,response)=>
{
    Unidad.VerTodasUnidades()
    .then(unidad => 
    {
        response.status( 201 ).send(
        { 
            success : unidad
        });
    })
    .catch(error => 
    {
        response.status( 200 ).send(
        { 
            error: "Sucedio un error al mostrar las unidades " + error 
        });
    });
});

//Actualizar Por Id
Rutas.post('/ActualizarPorId',[
    check('IdUnidad')
    .isNumeric()
    .not().isEmpty(),
    check('NombreUnidad')
    .isString(),
    check('Ubicacion')
    .isString(),
    check('Direccion')
    .isString(),
    check('ActualizadaPor')
    .isString()
    .not().isEmpty()
    .isNumeric()
],(request,response) =>
{
    let AUnidad = 
    {
        IdUnidad: request.body.IdUnidad,
        NombreUnidad: request.body.NombreUnidad,
        Ubicacion: request.body.Ubicacion,
        Direccion: request.body.Direccion,
        ActualizadaPor:request.body.ActualizadaPor
    }
    //Validar Errores
    const errores = validationResult(request);

    if(!errores.isEmpty())
    {
        return response.status(422).json(
        { 
            error : errores.array() 
        })
    }

    Unidad.ActualizarPorId(AUnidad)
    .then(unidad =>
    {
        response.status( 201 ).send(
        {
            success: 'La unidad con el codigo: ' + AUnidad.IdUnidad + ' fue actualizada correctamente'
        })
    })
    .catch(error =>
    {
        response.status( 201 ).send(
        {
            Error: error 
        });
    })
});


module.exports = Rutas;
