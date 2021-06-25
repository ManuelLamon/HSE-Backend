import Sequelize from 'sequelize';
import db from '../config/db.js'

const Categoria = db.define('categorias',{
    nombre: {
        type: Sequelize.STRING
    },
    imagen: {
        type: Sequelize.STRING
    },
})

export default Categoria