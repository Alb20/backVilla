var mongdb = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3400;

mongdb.connect('mongodb://localhost:27017/backvilla', (err, res) => {
    if (err) {
        throw err
    } else {
        console.log('Conexion Exitosa');
        app.listen(port, function() {
            console.log(`El servidor esta corriendo en la ruta http://localhost:` + port);
        });
    }
});