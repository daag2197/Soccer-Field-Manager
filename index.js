const express = require('express')
const app = express();
const Morgan = require('morgan')
const bodyParser  = require('body-parser')
const passport = require('passport')
const cors = require('cors')
const router = require('./src/routes');

// Ajustes de Puerto para servidor local
app.set('port',process.env.PORT || 3000)
// Respuesta en Consola
app.use(Morgan('dev'));
// Midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// Rutas de las diferentes tablas
app.use(router);

app.listen(app.get('port'),() => {
  console.log("Servidor en el Puerto 3000");
})
