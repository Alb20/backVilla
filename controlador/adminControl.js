const bcrypt = require('bcrypt');
const {param} = require('../app');
const admin = require('../modelo/admin');
var adminModel = require('../modelo/admin');


function prueba (req,res){
    res.status(200).send({message:'Todo fuinciona correctamente'});
}


function registrarAdmin (req,res){
    var admin = new adminModel;
    var params = req.body;
    console.log(params);

    admin.nombre = params.nombre;
    admin.apellidos = params.apellidos;
    admin.correo = params.correo;
    admin.password = params.password;

    if(params.password){
        bcrypt.hash(params.password,10,function(err,hash){
            admin.password = hash;
            if(admin.nombre !=null&& admin.apellidos != null && admin.correo != null){
                admin.save ((err,AdminGuardado)=>{
                    if(err){
                        res.status(500).send({message : 'Error'});
                    }else{
                        if(!AdminGuardado){
                            res.status(404).send({message:'No se ha registrado al adamin '});
                        }else{
                            res.status(200).send({message:'Admin Guardado con exito',Administrador:AdminGuardado});
                        }
                    }
                });
            }else{
                res.status(200).send({message:'Introduce los datos en los campos'});
            }
        });
    }else{
        res.status(500).send({message:'Introduce la contraseña'});
    }
}
function accesoAdmin (req,res){
 var params = req.body;

 var correo = params.correo;
 var password = params.password;

 admin.findOne({correo:correo},(err,Admin)=>{
    if (err){
        res.status(500).send({message:'Error en la peticion'});
    }else{
        if(!Admin){
            res.status(404).send({message:'El usuario no existe'});
        }else{
            bcrypt.compare(password,admin.password,function (err,check){
                if(check){
                    console.log('La contraseña coincide');
                    if(params.gethash){

                    }else{
                        res.status(200).send({Administrador: Admin});
                    }
                }else{
                    res.status(404).send({message:'El usuario no se ha identifiacdo'});
                }
            });   
        }
    }
 });
}

module.exports = {
    registrarAdmin,
    prueba,
    accesoAdmin
};

