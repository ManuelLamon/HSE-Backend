const {Sequelize} = require ('sequelize');
const db = require ('../config/db.js')

const Calificacion = db.define('calificacione',{
    id_usuario: {
        type: Sequelize.INTEGER
    },
    id_empleado: {
        type: Sequelize.INTEGER
    },
    puntuacion: {
        type: Sequelize.INTEGER
    },
    comentario: {
        type: Sequelize.STRING
    },
})

module.exports = Calificacion