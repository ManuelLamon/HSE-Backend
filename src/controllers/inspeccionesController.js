
const Inspecciones = require ("../models/inspecciones.js");
const shortid = require ('shortid');
const moment = require('moment')

const inspeccionesController = {

    agregarInspeccion: async(req, res, next) => {
    
        const {id_empleado,id_subcategoria, id_usuario,id_categoria, problema, ubicacion, contacto, estado} = (req.body);
        const id_inspeccion = shortid.generate().replace(/[&\/\\#,+()$~%.'":*?<>{}_-]/g, '').toUpperCase()
        const fechaHoy = moment().format('DD/MM/YYYY')
        const horaHoy = moment().format('hh:mm:ss a')
        const estatus = 'A'
    
        try {
            await Inspecciones.create({
                                       id_empleado, 
                                       id_inspeccion, 
                                       id_usuario, 
                                       id_categoria,
                                       id_subcategoria, 
                                       problema,
                                       ubicacion,
                                       contacto,
                                       estado,
                                       estatus,
                                       fecha:fechaHoy,
                                       hora:horaHoy,
                                       fecha_fin:'',
                                       hora_fin:''
                                     })
            res.status(200).json({mensaje: 'Solicitud creada correctamente'})
        } catch (error) {
            console.log(error)
            res.json({mensaje: 'Algo Salio mal, vuelve a  intentar'})
            next();
        }
    },

    mostrarInspecciones: async(req, res, next) => {
        try {
            const inspecciones = await Inspecciones.findAll({})
            res.status(200).json(inspecciones);
        } catch (error) {
            console.log(error)
            next();
        }
    },

    mostrarInspeccion: async(req, res, next) => {
        const id = req.params.idInspeccion
        try {
            
            const inspeccion = await Inspecciones.findAll({where: {id}})
    
            if(inspeccion.length === 0){
                
                return res.status(404).json({mensaje: 'Esa Solicitud no existe'});
            }else{
                return res.status(200).json(inspeccion);
            }
        } catch (error) {
            console.log(error)
            next();
        }
    },

    EliminarInspeccion: async(req, res, next) => {
        const id = req.params.idInspeccion
        try {
            
            const inspeccion = await Inspecciones.destroy({where: {id}})
            res.status(200).json({mensaje: 'Inspeccion Cancelada'});
        } catch (error) {
            console.log(error)
            next();
        }
    },

    mostrarInspeccionesUser: async(req, res, next) => {

        const id_usuario = req.params.idUser
         
        try {
            
            const inspeccion = await Inspecciones.findAll({where: {id_usuario}})
       
            if(inspeccion.length != 0){
                
                return res.status(200).send(inspeccion);
            } else{
                return res.status(404).send({message:'No tiene inspecciones'});
            }
    
    
        } catch (error) {
            console.log(error)
            next();
        }
    },

    mostrarInspeccionesEmpleado: async(req, res, next) => {

        const id_empleado = req.params.idEmpleado
         
        try {
            
            const inspeccion = await Inspecciones.findAll({where: {id_empleado}})
    
    
            if(inspeccion.length != 0){
                
                return res.status(200).send(inspeccion);
            } else{
                return res.status(200).send({message:'No tiene inspecciones'});
            }
    
        } catch (error) {
            console.log(error)
            next();
        }
    },

    actualizarInspeccion: async (req, res, next) => {
        
        const {id_inspeccion,estado} = req.body
        const saberEstado = ()=>{
            if(estado == 'EA'){
                return 'EP'
            }else if(estado == 'EP'){
                return 'FN'
            }
        }

        let elStado = saberEstado()

        let fechaFin = elStado == 'EP'? '' : moment().format('DD/MM/YYYY')
        let horaFin = elStado == 'EP'? '' : moment().format('hh:mm:ss a')

        console.log(fechaFin, 'fechaFin')
        console.log(horaFin, 'horaFin')

        try {
            await Inspecciones.update({estado: elStado, fecha_fin: fechaFin, hora_fin: horaFin},{where : {id_inspeccion}})

            res.status(200).json({mensaje: 'Actualizado correctamente'})
            
        } catch (error) {
            console.log(error)
            next();
        }



    }


}

module.exports = inspeccionesController