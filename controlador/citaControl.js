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
                        cita: CitaRegistrada,
                        message: 'Se registro correctamente la cita',
                        
                    });
                    console.log('Se registro la cita correctamente')
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
            res.status(404).send({ message: `No exitse una cita con ese id` });
        } else if (citaBD) {
            res.status(200).send({
                cita: citaBD,
                message: 'Esa es la cita'
            });
        }
    })
}

function mostartCitas(req, res) {

    citaModelo.find( function(err, citas, total) {
            if (err) {
                res.status(500).send({ message: 'Error de peticion' });
            } else {
                if (!citas) {
                    res.status(404).send({ message: 'La cita no existe' });
                } else {
                    res.status(200).send({ pages: total, citas: citas });
                }
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
        } else {
            res.status(200).send({
                cita: citaRemovida,
                message: 'Cita Removida'
            });
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
                res.status(200).send({ cita: actuCita });
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