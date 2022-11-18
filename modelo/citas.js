// esquema para la tabala o coleccion de las citas que ira en la base de datos.

var mongoose = require('mongoose');
var Shema = mongoose.Schema;


var EsquemaCita = Shema({
    nombre: String,
    correo: String,
    telefono: Number,
    tipoEvento: String,
    fecha: String,
    salon: String,
    numInvitados: Number
});

module.exports = mongoose.model('Citas', EsquemaCita);