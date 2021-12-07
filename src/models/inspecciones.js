const {Sequelize} = require ('sequelize');
const db = require ('../config/db.js')

const Inspecciones = db.define('inspecciones',{
    id_inspeccion: {
        type: Sequelize.STRING
    },
    id_empleado: {
        type: Sequelize.INTEGER
    },
    id_usuario: {
        type: Sequelize.INTEGER
    },
    id_categoria: {
        type: Sequelize.INTEGER
    },
    problema: {
        type: Sequelize.STRING
    },
    ubicacion: {
        type: Sequelize.STRING
    },
    contacto: {
        type: Sequelize.STRING
    },
    estado: {
        type: Sequelize.STRING
    },
    estatus: {
        type: Sequelize.STRING
    },
    fecha: {
        type: Sequelize.STRING
    },
    hora: {
        type: Sequelize.STRING
    },
    fecha_fin: {
        type: Sequelize.STRING
    },
    hora_fin: {
        type: Sequelize.STRING
    },
})

module.exports = Inspecciones