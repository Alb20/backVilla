var express = require('express');
const bodyParser = require('body-parser');

var app = express();

var user_routers = require('./rutas/citaRuta');
var admin_routers = require('./rutas/adminRuta');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http

//ruta base

app.use('/api', user_routers);
app.use('/api', admin_routers);


module.exports = app;