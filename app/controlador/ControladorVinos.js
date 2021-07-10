const modeloVinos = require('../modelos/modeloVinos');

function index(req,res){
    console.log('ok');
    modeloVinos.find({})
    .then(vinos => {
       if(vinos.length) return res.status(200).send ({vinos});
       return res,status(204).send({message: 'No hay datos que mostrar'})
    }).catch (error => res.status(500).send(error));
}

function crear(req,res){
    new modeloVinos(req.body).save()
    .then(vinos => res.status(200).send({vinos}))
    .catch(error => res.status(500).send({error}));
}

function buscar(req,res,next){
     let consulta = {};
    consulta [req.params.key]=req.params.value;
    modeloVinos.find(consulta).then(vinos =>{
        if(!vinos.length) return next();
        req.body.vinos = vinos;
        return next();
    }).catch(error => {
        req.body.error =error;
         next();
    })

}

function mostrar(req,res){
    if(req.body.error)return res.status(500).send({error});
    if(!req.body.vinos) return res.status(404).send({message: 'No se encontro el producto'});
    let vinos = req.body.vinos;
    return res.status(200).send({vinos});
}


function actualizar(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.vinos) return res.status(404).send({message:'No se puede actualizar'});
    let vinoObj =  req.body.vinos[0];
    vinoObj= Object.assign(vinoObj,req.body);
    vinoObj.save().then(vinosAlta =>{
        res.status(200).send({message:'El registro se actualizo correctamente',vinosAlta});
    }).catch(error=> res.status(500).send({error}));

}

function eliminar(req,res){
if(req.body.error) return res.status(500).send({error});
if(!req.body.vinos) return res.status(404).send({message:'No se puede eliminar el registro'});
req.body.vinos[0].remove().then(vinosEliminar => {
    res.status(200).send({message: 'Eliminado correctamente', vinosEliminar});
}).catch(error => res.status(500).send({error}));


}

module.exports={
    index,
    crear,
    buscar,
    mostrar,
    actualizar,
    eliminar
}