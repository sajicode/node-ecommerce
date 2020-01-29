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
			res.json({ token });
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

module.exports = {
	createUser
};
