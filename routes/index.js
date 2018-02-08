var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* User API's. */
router.post('/user/register', userController.createUser);
router.post('/user/login', userController.loginUser);

module.exports = router;
