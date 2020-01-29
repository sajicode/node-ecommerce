const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', auth, UserController.getUsers);

/* POST new user */
router.post('/', UserController.createUser);

/* GET one user */
router.get('/:id', UserController.getOneUser);

module.exports = router;
