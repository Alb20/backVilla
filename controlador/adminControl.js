const bcrypt = require('bcrypt');
const { Admin } = require('mongodb');
var modelAdmin = require('../modelo/admin');
var admin = new modelAdmin();

function registrarAdmin (req,res){
    var params = req.body;
    console.log (params);

    admin.nombre = params.nombre;
    admin.apellidos = params.apellidos;
    admin.email = params.email;
    admin.password = params.password;

    if(params.password){
        bcrypt.hash(params.password,10,function(err,hash){
            admin.password=hash;
            if (admin.nombre != null && admin.apellidos != null && admin.email != null){
                //guardar al admin
                admin.save( (err,AdminAlmacenado) =>{
                    if(err){
                        res.status(500).send({message:'Error al guardar el administrador'});
                    }else{
                        if (!AdminAlmacenado){
                            res.status(404).send({message:'No se ha registrado al Administrador'})
                        }else{
                            //nos devuelve losdatos de l ususario añlmacenado
                            res.status(200).send({administrador:AdminAlmacenado});
                        }
                    }
                });
            }else{
                res.status(200).send({message:'Introduce los campos'});
            }
        });
    }else{
        res.status(500).send({message:'Inroduce la contraseña'})
    }
}
function accesoAdmin (req,res){
    var params = req.body;
    var email = params.email;
    var password =  params.password;

    modelAdmin.findOne({email:email},(err,Ad)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'});
        }else{
            if(!Ad){
                res.status(404).send({message:'El usuario no existe'});
            }else{
                bcrypt.compare(password,admin.password,function(err,check){
                    if(check){
                        //devolver los datos del ususario llegado
                        console.log('Coincide la contraseña');
                        if(params.gethash){

                        }else{
                            res.status(200).send({administrador:Ad});
                        }
                    }else{
                        res.status(404).send({message:'El usuario no se ha identificado'});
                    }
                });
            }
        }
    });
}

module.exports = {
    registrarAdmin,
    accesoAdmin
};