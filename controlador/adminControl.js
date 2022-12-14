const bcrypt = require('bcrypt');
var modelAdmin = require('../modelo/admin');
var jwt = require ('../servicio/jwt');
var fs = require('fs');
var path = require('path');


function  mostrarAdmin (req,res){

var adminId = req.params.id;
modelAdmin.findById(adminId,(err,administrador)=>{
    if (err){
        res.status(500).send({message:'Error de conexion '});
    }else if (!administrador){
        res.status(404).send({message:`El admin con el id ${adminId} no existe`});
    }else if (administrador){
        res.status(200).send({Administrador : administrador});
    }
})
}
function registrarAdmin (req,res){
    var admin = new modelAdmin();
    var params = req.body;
    console.log (params);

    admin.nombre = params.nombre;
    admin.apellidos = params.apellidos;
    admin.email = params.email;
    admin.password = params.password;
    admin.imagen = 'null';

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
                            res.status(200).send([{
                                "id": AdminAlmacenado._id,
                                "nombre": AdminAlmacenado.nombre,
                                "apellido":AdminAlmacenado.apellidos,
                                "email": AdminAlmacenado.email,
                                "password":AdminAlmacenado.password
                            }]);
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
                            res.status(200).send({token:jwt.createToken(admin)});

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

function actualizarAdmin (req,res){
    const adminId = req.params.id;
    const update = req.body;

    modelAdmin.findByIdAndUpdate(adminId,update,(err,AdminActualizado)=>{
        if (err){
            res.status(500).send({message:'Error al actualizar al Administrador'});
        }else{
            if (!AdminActualizado){
                res.status(404).send({message:'No se ha poido ncontra el usuario'});
            }else{
                res.status(200).send({administradorActu:AdminActualizado});
            }
        }
    });
}

function mostrarAdmins (req,res){
    modelAdmin.find({},(err,admins)=>{
        if(err){
            res.status(500).send({message:'Error de peticion'});
        }else{
            if(!admins){
                res.status(404).send({message:'No hay administradores'});
            }else{
                res.status(200).send({Administradores:admins});
            }
        }
    });
}
function borrarAdmin (req,res){
    const adminId = req.params.id;
    modelAdmin.findByIdAndDelete(adminId,(err,adminEliminado)=>{
        if(err){
            res.status(500).send({message:'Error de conexion'});
        }else{
            if(!adminEliminado){
                res.status(404).send({message:`No existe un adminstrador con ese id  ${adminId}`});
            }else{
                res.status(200).send({message:`Se elimino correctamente el administrador con id ${adminId} `});
            }
        }
    });
}
function getFotoAdmin (req,res){
    var imageFile = req.params.imageFile;
    var rutaFoto = './cargas/imagenesAdmin/' + imageFile;
    console.log(imageFile);
    fs.exists(rutaFoto,function(existe){
        if(existe){
            res.sendFile(path.resolve(rutaFoto));
        }else{
            res.status(404).send({message:'No hay una imgen con ese nombre'});
        }
    });
}
function actualizarFoto (req,res){
    var AdminId = req.params.id;
    if (req.files){
        var file_path =  req.files.image.path;
        var file_arreglo = file_path.split('./cargas/imagenesAdmin/');
        var file_name = file.split[2];
        var extension = file_arreglo[2].split('\.');
        if (extension[1]== 'png'||extension[1] =='gif'|| extension[1] == 'jpg'){
            modelAdmin.findByIdAndUpdate(AdminId,{imagen:file_arreglo[2]},(err,Adm)=>{
                if(err){
                    res.status(500).send({message:'Error al buscar el usuario'});
                }
                if ( !Adm){
                    res.status(404).send({message:'Error en el id'});
                }else{
                    res.status(200).send({image:file_name,Admin:Adm});
                }
            });
        }else{
            res.status(404).send({message:'El formato no es adecuado'});
        }
    }else{
        res.status(404).send({message:'No cargo el archivo...'});
    }
}

module.exports = {
    registrarAdmin,
    accesoAdmin,
    actualizarAdmin,
    mostrarAdmins,
    borrarAdmin,
    mostrarAdmin,
    getFotoAdmin,
    actualizarFoto
};