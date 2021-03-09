let sequelize = require('../config/Database');
const { DataTypes } = require('sequelize');
const paginate = require('express-paginate');

const Client = require('../models/Client')(sequelize, DataTypes);

const clientGet = async (res, req)=>{
    let arrayWhere = {};
    if(req.query.city){
        arrayWhere.city = req.query.city
    }

    console.log(arrayWhere)

    let clients = await Client.findAll({
        where : arrayWhere,
        attributes: { exclude: ['id'] },
        offset: req.skip, 
        limit: req.query.limit
    });

    const itemCount = await Client.count({where : arrayWhere});
    const pageCount = Math.ceil(itemCount / req.query.limit);

    res.json({
        data: clients,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    }, 200);
}

const clientCreate = async (res, req)=>{
    let client = await Client.create(req.body);
    await client.save();
    res.json(client,201);
}

const clientUpdate = async (res, req)=>{
    await Client.update(req.body, 
    {
        where: {
          cod: req.params.id
        }
    });
    let client = await Client.findByPk(req.params.id);
    res.json(client,200);
}

const clientDelete = async (res, req)=>{
    let client = await Client.findByPk(req.params.id);
    await Client.destroy({
        where: {
            cod: req.params.id
        }
    });
    res.json(client,200);
}

module.exports = {
    clientGet,
    clientCreate,
    clientUpdate,
    clientDelete
}