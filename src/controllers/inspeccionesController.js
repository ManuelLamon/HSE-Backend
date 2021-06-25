const Inspecciones = require ("../models/inspecciones.js");

 const agregarInspeccion = async(req, res, next) => {
    
    const {id_empleado, id_usuario, problema, ubicacion, contacto, estado} = (req.body);

    try {
        const inspeccion = await Inspecciones.create({id_empleado, id_usuario, problema, ubicacion, contacto, estado})
        res.json({mensaje: 'Solicitud creada correctamente'})
    } catch (error) {
        console.log(error)
        next();
    }
}

 const mostrarInspecciones = async(req, res, next) => {
    try {
        const inspecciones = await Inspecciones.findAll({})
        res.json(inspecciones);
    } catch (error) {
        console.log(error)
        next();
    }
}

 const mostrarInspeccion = async(req, res, next) => {
    const id = req.params.idInspeccion
    try {
        
        const inspeccion = await Inspecciones.findAll({where: {id}})

        if(inspeccion.length === 0){
            res.json({mensaje: 'Esa Solicitud no existe'});
            return;
        }
        res.json(inspeccion);
    } catch (error) {
        console.log(error)
        next();
    }
}

module.exports = {
    agregarInspeccion,
    mostrarInspecciones,
    mostrarInspeccion,

}