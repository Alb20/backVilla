var express = require ('express');
var adminControl = require('../controlador/adminControl');

var api = express.Router();

api.get('/pruebasss', adminControl.prueba);
api.post('/registrarAdmin', adminControl.registrarAdmin);
api.post('/login',adminControl.accesoAdmin);


module.exports = api;