import Sequelize from 'sequelize';
import db from '../config/db.js'

const Subcategoria = db.define('subcategoria',{
    nombre: {
        type: Sequelize.STRING
    },
    id_categoria: {
        type: Sequelize.STRING
    }
})

export default Subcategoria