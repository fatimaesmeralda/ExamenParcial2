const app = require('./app/app');
const CONFIG = require('./app/configuracion/config');
const morgan = require('morgan');
const conexion = require('./app/configuracion/conexion');



conexion.connect();

app.use(morgan('dev'));

//Ejecutar el servidor DE EXPESS
app.listen(CONFIG.PORT,function(erro){
    if(erro) returnconsole.log(error);
    console.log(`servidor en el puerto ${CONFIG.PORT}`);
});

