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
    estatus:{
        type: Sequelize.INTEGER
    },
    telefono:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    descripcion: {
        type: Sequelize.STRING
    },
    average: {
        type: Sequelize.INTEGER
    },
    N_cedula: {
        type: Sequelize.INTEGER
    },
    id_categoria: {
        type: Sequelize.INTEGER
    },
    id_subcategoria: {
        type: Sequelize.INTEGER
    },
    rol: {
        type: Sequelize.STRING
    },
})

module.exports = EmpleadosShow;