const {Sequelize} = require ('sequelize');

const db = require ('../config/db.js');

const Categoria = db.define('categorias',{
    nombre: {
        type: Sequelize.STRING
    },
    imagen: {
        type: Sequelize.STRING
    },
});

module.exports = Categoria