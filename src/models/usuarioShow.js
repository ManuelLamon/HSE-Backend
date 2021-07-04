const {Sequelize} = require ('sequelize');
const db = require ('../config/db.js')

const UsuarioShow = db.define('usuarios',{
    nombre: {
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

module.exports = UsuarioShow;