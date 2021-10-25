const Inspecciones = require ("../models/inspecciones.js");

 const agregarInspeccion = async(req, res, next) => {
    
    const {id_empleado, id_usuario,id_categoria, problema, ubicacion, contacto, estado} = (req.body);

    try {
        const inspeccion = await Inspecciones.create({id_empleado, id_usuario, id_categoria, problema, ubicacion, contacto, estado})
        res.status(200).json({mensaje: 'Solicitud creada correctamente'})
    } catch (error) {
        console.log(error)
        res.json({mensaje: 'Algo Salio mal, vuelve a  intentar'})
        next();
    }
}

 const mostrarInspecciones = async(req, res, next) => {
    try {
        const inspecciones = await Inspecciones.findAll({})
        res.status(200).json(inspecciones);
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
            res.status(200).json({mensaje: 'Esa Solicitud no existe'});
            return;
        }
        res.status(200).json(inspeccion);
    } catch (error) {
        console.log(error)
        next();
    }
}

 const EliminarInspeccion = async(req, res, next) => {
    const id = req.params.idInspeccion
    try {
        
        const inspeccion = await Inspecciones.destroy({where: {id}})
        res.status(200).json({mensaje: 'Inspeccion Cancelada'});
    } catch (error) {
        console.log(error)
        next();
    }
}

const mostrarInspeccionesUser = async(req, res, next) => {
    const id_usuario = req.params.idUser
    try {
        
        const inspeccion = await Inspecciones.findAll({where: {id_usuario}})

        res.status(200).json(inspeccion);
    } catch (error) {
        console.log(error)
        next();
    }
}

module.exports = {
    agregarInspeccion,
    mostrarInspecciones,
    mostrarInspeccion,
    mostrarInspeccionesUser,
    EliminarInspeccion

}
