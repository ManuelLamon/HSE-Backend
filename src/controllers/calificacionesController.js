import Calificacion from "../models/calificacion.js";

export const agregarCalificacion = async(req, res, next) => {
    
    const {id_empleado, id_usuario, puntuacion, comentario} = (req.body);

    try {
        const calificacion = await Calificacion.create({id_empleado, id_usuario, puntuacion, comentario})
        res.json({mensaje: 'Gracias por su Calificación'})
    } catch (error) {
        res.json({mensaje: 'Hubo un error, intente de nuevo'})
        console.log(error)
        next();
    }
}

export const mostrarCalificaciones = async(req, res, next) => {

    const id_empleado = req.params.idEmpleado

    try {
        
        const calificaciones = await Calificacion.findAll({where: {id_empleado}})

        if(inspeccion.length === 0){
            res.json({mensaje: 'No hay calificaciones para este empleado'});
            return;
        }
        res.json(calificaciones);
    } catch (error) {
        console.log(error)