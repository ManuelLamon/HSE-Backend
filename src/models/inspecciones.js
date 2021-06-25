const {Sequelize} = require ('sequelize');
const db = require ('../config/db.js')

const Inspecciones = db.define('inspecciones',{
    id_empleado: {
        type: Sequelize.INTEGER
    },
    id_usuario: {
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
        type: Sequelize.INTEGER
    },
})

module.exports = Inspecciones