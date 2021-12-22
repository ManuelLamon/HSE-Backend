const {Sequelize} = require ('sequelize');
const db = require ('../config/db.js')

const Supervisor = db.define('subcategoria',{
    nombre: {
        type: Sequelize.STRING
    },
    id_categoria: {
        type: Sequelize.STRING
    }
})

module.exports = Subcategoria;