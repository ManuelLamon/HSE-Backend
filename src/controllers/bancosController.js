const Banco = require("../models/banco.js")
const SolicitudBanco = require("../models/solicitud_banco.js")
const moment = require('moment')
const shortid = require('shortid')
const CONTANTES = require('../config/constantes.js')

const Bancos = {
    mostrarBancoPorEmpleado: async function(req,res){
       
            let id_empleado = req.params.idEmpleado

            console.log(id_empleado);

            try {
            const bEmpleado = await Banco.findOne({where:{id_empleado}})
            res.status(200).json(bEmpleado)
            } catch (error) {
                console.log(error)
            }
        
    },
    mostrarSolicitudes: async function(req,res){
       
            try {
            const bEmpleado = await SolicitudBanco.findAll({})
            res.status(200).json(bEmpleado)
            } catch (error) {
                console.log(error)
            }
        
    },
    mostrarSolicitudesPorEmpleados: async function(req,res){
       
            try {

            const id_empleado = req.body.id_empleado

            const consultaSolicitud = await SolicitudBanco.findAll({where:{id_empleado}})
            res.status(200).json(consultaSolicitud)
            } catch (error) {
                console.log(error)
            }
        
    },
    InsertarSolicitudDePago:async function(req,res){

        try {
            const fecha = moment().format('DD/MM/YYYY')
            const hora = moment().format('hh:mm:ss a')
            const body = req.body
            const cod_ref = shortid.generate().replace(/[&\/\\#,+()$~%.'":*?<>{}_-]/g, '').toUpperCase()

            const {
                id_empleado,
                nom_empleado,
                monto,
                saldo_actual,
            }= body

            await SolicitudBanco.create({
                cod_ref,
                id_empleado,
                nom_empleado,
                monto,
                saldo: saldo_actual - monto,
                fecha,
                hora,
                estatus:CONTANTES.pendiente,
                tipo_operacion:CONTANTES.retiro
            })

            /* await Banco.update({haber:(saldo_actual - monto).toFixed(2)},{where : {id_empleado}}) */
            res.status(200).json({mensaje: 'Listo'})
        } catch (error) {
            res.status(404).json({mensaje: 'Hubo un error, intente de nuevo'})
            console.log(error)
        }

    },
    recargarBanco:async function(req,res){
        try {
            const fecha = moment().format('DD/MM/YYYY')
            const hora = moment().format('hh:mm:ss a')
            const body = req.body
            const cod_ref = shortid.generate().replace(/[&\/\\#,+()$~%.'":*?<>{}_-]/g, '').toUpperCase()

            const {
                id_empleado,
                cantidad,
                monto,
                saldo,
                tipo_operacion
            }= body

            await SolicitudBanco.create({
                cod_ref,
                id_empleado,
                cantidad,
                monto,
                saldo,
                fecha,
                hora,
                estatus:CONTANTES.pendiente,
                tipo_operacion
            })
            res.status(200).json({mensaje: 'Listo'})
        } catch (error) {
            res.status(404).json({mensaje: 'Hubo un error, intente de nuevo'})
            console.log(error)
            next();
        }

    },
    pagarAEmpleados:async function(req,res){
        try {
            const fecha = moment().format('DD/MM/YYYY')
            const hora = moment().format('hh:mm:ss a')
            const body = req.body

            const {
                id_empleado,
                id_empresa,
                cod_ref,
                monto,
                saldo,
                saldo_empresa,
            }= body


            await Banco.update({haber:saldo, tipo_operacion:CONTANTES.completo},{where : {id_empleado}})
            await SolicitudBanco.update({estatus:CONTANTES.completo},{where : {cod_ref}})
            await Banco.update({haber:saldo_empresa - monto},{where : {id_empleado:id_empresa}})

            res.status(200).json({mensaje: 'Listo'})
        } catch (error) {
            res.status(404).json({mensaje: 'Hubo un error, intente de nuevo'})
            console.log(error)
            next();
        }

    },


}

module.exports = Bancos;