var express = require ('express');
var adminControl = require('../controlador/adminControl');
var api = express.Router();
var md_auth = require('../middleware/autentificar');
var multipart = require('connect-multiparty');
var dir_fotos = multipart({uploadDir:'../cargas/imagenesAdmin'});


api.get('/mostrarAdmin/:id',adminControl.mostrarAdmin);
api.post('/registrarAdmin', adminControl.registrarAdmin);
api.post('/loginAdmin',adminControl.accesoAdmin);
api.put('/editarAdmin/:id',adminControl.actualizarAdmin);
api.get('/mostrarAdmins',adminControl.mostrarAdmins);
api.delete('/borrarAdmin/:id',adminControl.borrarAdmin);
api.get('/getImagen/:imageFile',adminControl.getFotoAdmin);
api.post('/actuzalicarFoto/:id',[dir_fotos],adminControl.actualizarFoto);


module.exports = api;