
var mongoose = require('mongoose');
var Shema  = mongoose.Schema;

var ShemaAdmin = Shema({
    nombre : String,
    apellidos: String,
    correo: String,
    password : String
})
module.exports = mongoose.model('Admin',ShemaAdmin);