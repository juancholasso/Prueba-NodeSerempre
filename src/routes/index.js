var express = require('express');
var router = express.Router();
var passport = require('passport');

const { generateJWT, getAuth } = require('../controllers/AuthController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res, next) => {
  generateJWT(res,req)
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  getAuth(res, req);
});


module.exports = router;
