const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 6
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 8
	},
	role: {
		type: String,
		trim: true,
		default: 'Customer'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('user', UserSchema);
