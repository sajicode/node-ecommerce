const jwt = require('jsonwebtoken');
const { config } = require('dotenv');

config();

module.exports = function(req, res, next) {
	// Get token from header
	const token = req.header('x-auth');

	// Check if not token
	if (!token) {
		return res.status(401).send({
			status: 'fail',
			message: 'No token, authorization denied'
		});
	}

	// Verify token
	try {
		const decoded = jwt.verify(token, process.env.jwtSecret);

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).send({ status: 'fail', message: 'Token is not valid' });
	}
};
