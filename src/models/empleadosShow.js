const {Sequelize} = require ('sequelize');
const db = require ('../config/db.js')

const EmpleadosShow = db.define('empleados',{
    nombre: {
        type: Sequelize.STRING
    },
    direccion: {
        type: Sequelize.STRING
    },
    foto: {
        type: Sequelize.STRING
    },
    etiqueta: {
        type: Sequelize.STRING
    },
    estado:{
        type: Sequelize.INTEGER
    },
    descripcion: {
        type: Sequelize.STRING
    },
    id_categoria: {
        type: Sequelize.INTEGER
    },
    id_subcategoria: {
        type: Sequelize.INTEGER
    }  
})

module.exports = EmpleadosShow;