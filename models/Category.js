const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	categoryName: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
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

module.exports = mongoose.model('categories', CategorySchema);
