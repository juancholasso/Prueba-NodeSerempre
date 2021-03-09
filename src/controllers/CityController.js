let sequelize = require('../config/Database');
const { DataTypes } = require('sequelize');
const paginate = require('express-paginate');
const City = require('../models/City')(sequelize, DataTypes);

const cityGet = async (res, req)=>{
    let cities = await City.findAll({
        attributes: { exclude: ['id'] },
        offset: req.skip, 
        limit: req.query.limit
    });

    const itemCount = await City.count();
    const pageCount = Math.ceil(itemCount / req.query.limit);

    res.json({
        data: cities,
        pageCount,
        itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    }, 200);
}

const cityCreate = async (res, req)=>{
    let city = await City.create({ 
        name: req.body.name
    });
    await city.save();
    res.json(city,201);
}

const cityUpdate = async (res, req)=>{
    await City.update(req.body, 
    {
        where: {
          cod: req.params.id
        }
    });
    let city = await City.findByPk(req.params.id);
    res.json(city,200);
}

const cityDelete = async (res, req)=>{
    let city = await City.findByPk(req.params.id);
    await City.destroy({
        where: {
            cod: req.params.id
        }
    });
    res.json(city,200);
}

module.exports = {
    cityGet,
    cityCreate,
    cityUpdate,
    cityDelete
}