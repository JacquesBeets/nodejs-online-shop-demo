const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-online-store', 'root', '831126', {
    dialect: 'mysql', 
    host: 'localhost'
})

module.exports = sequelize;