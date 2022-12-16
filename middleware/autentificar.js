var jwt = require('jwt-simple');
var momento = require ('moment');
var claveSecretaInterna = 'clave_secreta_interna';

exports.validarAcceso = function(req,res,next){
    if (!req.headers.autorizacion){
        return res.status(404).send({message:'La peticion del ususario no tiene datos de autorizacion'});
    }
    var token = req.headers.autorizacion.replace(/['"]+/g,'');
    try{
        var payload = jwt.decode(token,claveSecretaInterna);
        if (payload.exp <= momento().unix()){
            return res.status(401).send({message:'Token ha expirado'});
        }
    }catch(err){
        return res.status(404).send({message:'Token no válido'}); 
    }
    req.admin = payload;
    next();
}