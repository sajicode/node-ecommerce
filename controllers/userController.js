const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

config();

const User = require('../models/User');

const createUser = async (req, res) => {
	const { first_name, last_name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ msg: 'User already exists' });
		}

		user = new User({
			first_name,
			last_name,
			email,
			password,
			role: 'customer'
		});

		const salt = await bcrypt.genSalt(10);

		user.password = await bcrypt.hash(password, salt);

		await user.save();

		const payload = {
			user: {
				id: user.id,
				first_name: user.first_name,
				last_name: user.last_name,
				role: user.role
			}
		};

		jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 }, (err, token) => {
			if (err) throw err;
			res.status(200).send({
				status: 'success',
				data: user,
				token
			});
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send({
			status: 'fail',
			message: 'Server error.'
		});
	}
};

const getUsers = async (req, res) => {
	const { id } = req.params;

	if (req.user.id !== id && req.user.role !== 'admin') {
		return res.status(403).send({
			status: 'fail',
			message: 'Unauthorized request.'
		});
	}

	try {
		const user = await User.findById(req.user.id).select('-password');
		res.status(200).send({
			status: 'success',
			data: user
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send({
			status: 'fail',
			message: 'Server error.'
		});
	}
};

const getOneUser = async (req, res) => {
	if (req.user.role !== 'admin') {
		res.status(403).send({
			status: 'fail',
			message: 'Unauthorized request.'
		});
	}

	try {
		const users = await User.find({}).select('-password');
		res.status(200).send({
			status: 'success',
			data: users
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send({
			status: 'fail',
			message: 'Server error.'
		});
	}
};

module.exports = {
	createUser,
	getUsers,
	getOneUser
};
