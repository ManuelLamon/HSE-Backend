import Sequelize from 'sequelize';
import db from '../config/db.js'

const Usuario = db.define('usuarios',{
    nombre: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    telefono: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    direccion: {
        type: Sequelize.STRING
    },
    foto: {
        type: Sequelize.STRING
    },
    rol: {
        type: Sequelize.STRING
    }  
})

export default Usuario