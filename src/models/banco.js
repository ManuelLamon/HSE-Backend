const {Sequelize} = require ('sequelize');
const db = require ('../config/db.js')

const Banco = db.define('banco',{
    id_empleado: {
        type: Sequelize.INTEGER
    },
    haber: {
        type: Sequelize.INTEGER
    },
    n_cedula: {
        type: Sequelize.INTEGER
    },
    nombre: {
        type: Sequelize.STRING
    },
    fecha: {
        type: Sequelize.STRING
    },
    hora: {
        type: Sequelize.STRING
    },
})

module.exports = Banco