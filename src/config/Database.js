const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('mysql://root:1234@localhost:3306/nodetest') // Example for postgres

// Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });
console.log("asdasd")
module.exports = sequelize;
