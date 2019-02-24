const express = require('express');
const { check,validationResult} = require('express-validator/check');
const Usuario = require('../controllers/Usuario');

const Rutas = express.Router();

//Registro de Usuario
Rutas.post('/Registro',[
    check('Nombre')
        .not().isNumeric()
        .not().isEmpty(),
    
    check('ApellidoPaterno')
        .not().isNumeric()
        .not().isEmpty(),

    check('ApellidoMaterno')
        .not().isNumeric(),

    check('Correo')
        .isEmail(),
    
    check('ClaveAcceso', 'La Contraseña debe ser mayor de 5 letras y contener al menos un número')
        .isLength({ min: 5 })
        .matches(/\d/)

],(request,response) => 
{

    let NUsuario = 
    {

        Nombre: request.body.Nombre,
        ApellidoPaterno:request.body.ApellidoPaterno,
        ApellidoMaterno:request.body.ApellidoMaterno,
        Correo:request.body.Correo,
        ClaveAcceso:request.body.ClaveAcceso

    }

    //Validar Errores
    const errores = validationResult(request);

    if(!errores.isEmpty()){
        return response.status(422).json(
        { 
            error : errores.array() 
        })
    }

    Usuario.RegistrarUsuario(NUsuario)
    .then(usuario => 
    {
        response.status( 201 ).send(
        {
            success: 'Usuario ' + usuario.Nombre + ' fue agregado correctamente'
        });
    })
    .catch(error =>
    {
        response.status( 200 ).send(
        {
            error: 'Error al ingresar a ' + request.body.Nombre + " " + error
                
        })
    })

});

//Eliminar
Rutas.delete('/Eliminar',[
    check('IdUsuario')
        .isNumeric()
],(request,response)=> 
{
    let IdUsuario = request.body.IdUsuario;

    //Validar Errores
    const errores = validationResult(request);

    if(!errores.isEmpty())
    {
        return response.status(422).json(
        { 
            error : errores.array() 
        })
    }

    Usuario.Eliminar(IdUsuario)
    .then(usuario => 
    {
      response.status( 201 ).send(
        { 
            success: "Datos del usuario eliminados" 
        });
    })
    .catch(error => 
    {
      response.status( 201 ).send(
        {
            Error: error 
        });
    });
});

//Buscar por ID
Rutas.get('/BuscarPorId',[
    check('IdUsuario')
        .not().isEmpty()
        .isNumeric()
],(request,response) => 
{
    let IdUsuario = request.body.IdUsuario;

    //Validar Errores
    const errores = validationResult(request);

    if(!errores.isEmpty()){
        return response.status(422).json(
        { 
            error : errores.array() 
        })
    }

    Usuario.BuscarUsuarioPorCodigo(IdUsuario)
    .then(usuario =>
    {
        response.status( 201 ).send({
            success: usuario
        });      
    })
    .catch(error =>
    {
        response.status( 200 ).send(
        { 
            error: "Sucedio un error al mostrar usuario " + error 
        });
    })
});

//Buscar por Correo
Rutas.get('/BuscarPorCorreo',[
    check('Correo')
        .not().isEmpty()
        .isEmail()
],(request,response) => 
{
    let Correo = request.body.Correo;

    //Validar Errores
    const errores = validationResult(request);

    if(!errores.isEmpty()){
        return response.status(422).json(
        { 
            error : errores.array() 
        })
    }

    Usuario.BuscarUsuarioPorUsuarioPorCorreo(Correo)
    .then(usuario =>
    {
        response.status( 201 ).send({
            success: usuario
        });      
    })
    .catch(error =>
    {
        response.status( 200 ).send(
        { 
            error: "Sucedio un error al mostrar usuario " + error 
        });
    })
});

//Ver todos los Usuarios
Rutas.get('/VerTodos',(request,response)=>
{
    Usuario.VerTodosUsuarios()
    .then(usuario => 
    {
        response.status( 201 ).send(
        { 
            success : usuario
        });
    })
    .catch(error => 
    {
        response.status( 200 ).send(
        { 
            error: "Sucedio un error al mostrar los usuario " + error 
        });
    });
});

module.exports = Rutas;