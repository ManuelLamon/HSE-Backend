const {Sequelize} = require ('sequelize');
const db = require ('../config/db.js')

const Empleados = db.define('empleados',{
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
        type: Sequelize.STRING
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
    n_cedula: {
        type: Sequelize.INTEGER
    },
    id_categoria: {
        type: Sequelize.INTEGER
    },
    id_subcategoria: {
        type: Sequelize.INTEGER
    },
    usuario: {
        type: Sequelize.STRING
    },
    rol: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
})

module.exports = Empleados;