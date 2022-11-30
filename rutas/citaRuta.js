var express = require('express');
var CitaControl = require('../controlador/citaControl');

var api = express.Router();
api.get('/mostrarCitas', CitaControl.mostartCitas);
api.get('/probando-pruebas', CitaControl.prueba);
api.post('/registrarCita', CitaControl.registrarCita);
api.get('/mostrarCita/:id', CitaControl.getCita);
api.delete('/borrarCita/:id', CitaControl.borrarCita);
api.put('/actualizarCita/:id', CitaControl.actualizarCita);

module.exports = api;