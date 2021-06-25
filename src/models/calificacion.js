import Sequelize from 'sequelize';
import db from '../config/db.js'

const Calificacion = db.define('calificacion',{
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

export default Calificacion