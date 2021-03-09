var express = require('express');
var router = express.Router();
const { checkSchema } = require('express-validator');
const { userGet, userCreate, userUpdate, userDelete } = require('../controllers/UserController');
let validatorConfig = require('../config/validator.json');
let emailMiddleware = require('../middleware/email');

router.get('/', (req, res, next) => {
    userGet(res,req)
});

router.put('/', [
        checkSchema(validatorConfig.user),
        emailMiddleware.checkExistEmail
    ], (req, res, next) => {
    userCreate(res,req)
});

router.post('/:id', [
        checkSchema(validatorConfig.user)
    ], (req, res, next) => {
    userUpdate(res,req)
});

router.delete('/:id', (req, res, next) => {
    userDelete(res,req)
});

module.exports = router;
