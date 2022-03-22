const {Sequelize} = require('sequelize')
const db = require('../config/db.js')

const SolicitudBanco = db.define('solicitud_bancos',{
    id_empleado: {
        type: Sequelize.INTEGER
    },
    cod_ref: {
        type: Sequelize.STRING
    },
    monto: {
        type: Sequelize.STRING
    },
    saldo: {
        type: Sequelize.STRING
    },
    nom_empleado: {
        type: Sequelize.STRING
    },
    fecha: {
        type: Sequelize.STRING
    },
    hora: {
        type: Sequelize.STRING
    },
    tipo_operacion: {
        type: Sequelize.STRING
    },
    estatus: {
        type: Sequelize.STRING
    },
})

module.exports = SolicitudBanco
