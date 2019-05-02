const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: { type: String, required: true, lowercase: true },
	category: { type: String, required: true, lowercase: true},
	image: { type: String, required: true },
	quantity: Number,
	shared: Boolean,
	description: { type: String, required: true},
	price: Number,
	createAt: { type: Date, default: Date.now},
	user: {type: Schema.Types.ObjectId, ref: 'User'},
	shoppingCarts: [{type: Schema.Types.ObjectId, ref: 'ShoppingCart'}],
	picVersion: { type: String, default: '1555139651' },
    picId: { type: String, default: 'kaj4dizrpni4twp72yzr.png' },
    imgId: { type: String, default: '' },
    imgVersion: { type: String, default: '' }        
    
});

module.exports = mongoose.model('Product', productSchema);

/*
onst mongoose = require('mongoose');
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
*/ 