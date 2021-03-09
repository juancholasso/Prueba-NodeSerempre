var express = require('express');
var router = express.Router();

const { clientGet, clientCreate, clientUpdate, clientDelete } = require('../controllers/ClientController');

router.get('/', (req, res, next) => {
    clientGet(res,req)
});

router.put('/', (req, res, next) => {
    clientCreate(res,req)
});

router.post('/:id', (req, res, next) => {
    clientUpdate(res,req)
});

router.delete('/:id', (req, res, next) => {
    clientDelete(res,req)
});

module.exports = router;
