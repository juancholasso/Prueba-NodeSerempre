const { body } = require('express-validator');
let sequelize = require('../config/Database');
const { DataTypes } = require('sequelize');
const User = require('../models/User')(sequelize, DataTypes);

const checkExistEmail = body('email').custom(value => {
    return User.findOne({ where: { email: value } }).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
})

module.exports = {
    checkExistEmail
}