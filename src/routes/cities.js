var express = require('express');
var router = express.Router();

const { cityGet, cityCreate, cityUpdate, cityDelete } = require('../controllers/CityController');

router.get('/', (req, res, next) => {
    cityGet(res,req)
});

router.put('/', (req, res, next) => {
    cityCreate(res,req)
});

router.post('/:id', (req, res, next) => {
    cityUpdate(res,req)
});

router.delete('/:id', (req, res, next) => {
    cityDelete(res,req)
});

module.exports = router;
