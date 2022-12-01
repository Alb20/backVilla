var express = require ('express');
var adminControl = require('../controlador/adminControl');
var api = express.Router();
var multipart = require('connect-multiparty');
var dir_fotos = multipart({uploadDir:'../cargas/imagenesAdmin'});

// api.get('/pruebasss',md_auth.validarAcceso, adminControl.prueba);
api.get('/mostrarAdmin/:id',adminControl.mostrarAdmin);
api.post('/registrarAdmin', adminControl.registrarAdmin);
api.post('/loginAdmin',adminControl.accesoAdmin);
api.put('/editarAdmin/:id',adminControl.actualizarAdmin);
api.get('/mostrarAdmins',adminControl.mostrarAdmins);
api.delete('/borrarAdmin/:id',adminControl.borrarAdmin);
api.get('/getimagen/:imageFile',adminControl.getFotoAdmin);


module.exports = api;