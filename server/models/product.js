const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: { type: String, required: true, max:[128, 'Too long, max is 128 charaters'] },
	category: { type: String, required: true, lowercase: true},
	quantity: Number,
	image: { type: String, required: true },
	description: { type: String, required: true},
	rating: Number,
	createAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', productSchema);