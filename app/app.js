const express = require('express');
const rutasVinos = require('./rutas/rutasVino');
const rutasRefrescos = require('./rutas/rutasRefresco')

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/vinos',rutasVinos),//empoint raiz
app.use('/refrescos',rutasRefrescos); //Segunda raiz



module.exports = app;