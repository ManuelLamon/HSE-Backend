const {Sequelize} = require ('sequelize');

//Francia
/* const db = new Sequelize('bd1uxuqvwusrqb3vtiyp', 'upwkopf9gvobzd3s', '60EaGHEPpZYS0oGA0CZN', {
    host: 'bd1uxuqvwusrqb3vtiyp-mysql.services.clever-cloud.com',
    port: '3306',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    },
    operatorAliases: false
}) */

//Canada

const db = new Sequelize('bjzugu68h1kzsybqfeoz', 'ushtttmr9irbcbnz', 'OBXzIN2TtIBswv5Eel9J', {
    host: 'bjzugu68h1kzsybqfeoz-mysql.services.clever-cloud.com',
    port: '3306',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    },
    operatorAliases: false
})

/* const db = new Sequelize('homeservicesexpress', 'root', '', {
    host: '127.1.1.0',
    port: '3306',
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle:10000
    },
    operatorAliases: false
}) */

module.exports = db