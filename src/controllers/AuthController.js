const bcryptjs = require('bcryptjs');
let sequelize = require('../config/Database');
const { DataTypes } = require('sequelize');
const User = require('../models/User')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');

const generateJWT = async (res, req) => {
    console.log(req.body)
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ where: { email : email }});

    if(user == null){
        return res.status(400).json({
            "msg": "E-mail and password invalid",
            "param": "email",
            "location": "body"
        }); 
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if(!validPassword){
        return res.status(400).json({
            "msg": "E-mail and password invalid",
            "param": "email",
            "location": "body"
        }); 
    }

    var token = jwt.sign({
        data: user
    }, 'secret', { expiresIn: 60 * 60 });

    return res.json({
        user: user.toJSON(),
        token: token
    });
}


const getAuth = async (res, req)=>{
    return res.json(req.user);
}

module.exports = {
    generateJWT,
    getAuth
}