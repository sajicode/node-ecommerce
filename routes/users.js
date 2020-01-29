const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

/* POST new user */
router.post('/', UserController.createUser);

module.exports = router;
