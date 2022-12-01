
var mongoose = require('mongoose');
var Shema  = mongoose.Schema;

var ShemaAdmin = Shema({
    nombre : String,
    apellidos: String,
    email: String,
    password : String
})
module.exports = mongoose.model('Admin',ShemaAdmin);