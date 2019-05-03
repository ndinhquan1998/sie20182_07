const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoppingCartSchema = new Schema({
	totalPrice: Number,
	items: Number,
	guests: Number,
	createAt: { type: Date, dafaut: Date.now},
	user: { type: Schema.Types.ObjectId, ref: 'User'},
	product: { type: Schema.Types.ObjectId, ref: 'Product'},
	payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
	status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);