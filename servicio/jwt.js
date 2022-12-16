var jwt = require ('jwt-simple');
var momento = require ('moment');
var claveSecretaInterna  = 'clave_secreta_interna';

exports.createToken = function (admin){
    var payload ={
        sub: admin._id,
        nombre : admin.nombre,
        apellidos:admin.apellidos,
        image: admin.image,
        iat: momento().unix(),
        exp: momento().add(30,'days').unix
    };
    return jwt.encode(payload,claveSecretaInterna);
}