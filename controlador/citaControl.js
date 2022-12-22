var citaModelo = require('../modelo/citas');



function registrarCita(req, res) {
    const cita = new citaModelo();
    var params = req.body;
   
    console.log(params);
    

    cita.nombre = params.nombre;
    cita.correo = params.correo;
    cita.telefono = params.telefono;
    cita.tipoEvento = params.tipoEvento;
    cita.fecha = params.fecha;
    cita.salon = params.salon;
    cita.numInvitados = params.numInvitados;

    if (cita.nombre != null && cita.correo != null && cita.telefono != null && cita.tipoEvento != null && cita.fecha != null && cita.salon != null && cita.numInvitados != null) {
        // guardar datos
        cita.save((err, CitaRegistrada) => {
            if (err) {
                res.status(500).send({
                    message: 'Error al guardar la cita'
                });
            } else {
                if (!CitaRegistrada) {
                    res.status(404).send({ message: 'No se puede guardar la cita' });
                } else {
                    res.status(200).send({
                        "id":CitaRegistrada._id,
                        "Nombre": CitaRegistrada.nombre,
                        "Correo":CitaRegistrada.correo,
                        "Telefono":CitaRegistrada.telefono,
                        "TipoEvento":CitaRegistrada.tipoEvento,
                        "Fecha":CitaRegistrada.fecha,
                        "Salon":CitaRegistrada.salon,
                        "NumInvitados":CitaRegistrada.numInvitados
                    });
                    console.log('Se registro la cita correctamente')
                    console.log(`Con id ${CitaRegistrada._id}`)
                }
            }
        });
    } else {
        res.status(500).send({
            message: 'Introduce los datos'
        });
    }
}

function getCita(req, res) {
    var citaId = req.params.id;
    citaModelo.findById(citaId, (err, citaBD) => {
        if (err) {
            res.status(500).send({ message: 'Error en mostrar los datos' });
        } else if (!citaBD) {
            res.status(404).send({ message: `No exitse una cita con el id ${citaId}` });
        } else if (citaBD) {
            res.status(200).send({
                "id":citaBD._id,
                "Nombre": citaBD.nombre,
                "Correo":citaBD.correo,
                "Telefono":citaBD.telefono,
                "TipoEvento":citaBD.tipoEvento,
                "Fecha":citaBD.fecha,
                "Salon":citaBD.salon,
                "NumInvitados":citaBD.numInvitados
            });
        }
    })
}

function mostartCitas(req, res) {

    citaModelo.find((err, citas) =>{
            if (err) {
                res.status(500).send({ message: 'Error de peticion' });
            } else if (!citas) {
                    res.status(404).send({ message: `No existen citas registradas` });
                } else if(citas){
                    res.status(200).send({citas});
                }
            });
}

function borrarCita(req, res) {
    var citaId = req.params.id;
    citaModelo.findByIdAndRemove(citaId, (err, citaRemovida) => {
        if (err) {
            res.status(500).send({
                message: `Error al eliminar la cita con el id  ${citaId}`
            });
        }if (!citaRemovida){
            res.status(404).send({message:`Ya se eleimino la cita con el Id ${citaId}` })
        } 
        else {
            res.status(200).send({
                message: 'Cita borrada correctamente'
            });
            console.log(`Se borro correctamente la cita con el id ${citaId}`)
        }
    });
}

function actualizarCita(req, res) {
    var citaId = req.params.id; //EL ID QUE CORRESPONDE A ESA CITA
    var datos = req.body; //post
    nombre = datos.nombre;

    citaModelo.findByIdAndUpdate(citaId, datos, (err, actuCita) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar los datos' });
        } else {
            if (!actuCita) {
                res.status(404).send({ message: 'La cita no ha sido actualizada' });
            } else {
                res.status(200).send({  
                "id":actuCita._id,
                "Nombre": actuCita.nombre,
                "Correo":actuCita.correo,
                "Telefono":actuCita.telefono,
                "TipoEvento":actuCita.tipoEvento,
                "Fecha":actuCita.fecha,
                "Salon":actuCita.salon,
                "NumInvitados":actuCita.numInvitados  });
            }
        }
    });
}
module.exports = {
    registrarCita,
    getCita,
    borrarCita,
    actualizarCita,
    mostartCitas
};