const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	productName: {
		type: String,
		required: true,
		trim: true,
		minlength: 2
	},
	price: {
		type: Number,
		required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'categories'
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

module.exports = mongoose.model('product', ProductSchema);
