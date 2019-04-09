const Product = require('../models/product');
const User = require('../models/user');

const { normalizeErrors } = require('../helpers/mongoose');

exports.getUserProduct = function(req,res){
	const user = res.locals.user;

	Product.where({user})
		  .populate('shoppingCarts')
		  .exec(function(err, foundProducts){

			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			return res.json(foundProducts);

		  });
}

exports.verifyProductUser = function(req, res){
	const user = res.locals.user;
	Product.findById(req.params.id)
		  .populate('user')
		  .exec(function(err, foundProduct){
				if(err){
					return res.status(422).send({errors: normalizeErrors(err.errors)});
				}

				if(foundProduct.user.id !== user.id){
					return res.status(422).send({errors: [{title: 'Invalid User!',detail:'You are not rental owner'}]});
				}

				return res.json({status: 'verified'});
		  });
}

exports.updateProduct = function(req, res){

	const productData = req.body;
	const user = res.locals.user;

	Product
		.findById(req.params.id)
		.populate('user')
		.exec(function(err, foundProduct){
			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if(foundProduct.user.id !== user.id){
				return res.status(422).send({errors: [{title: 'Invalid User', detail: 'You are not product owner'}]})
			}
			foundProduct.set(productData);
			foundProduct.save(function(err){
				if(err){
					return res.status(422).send({errors: normalizeErrors(err.errors)});
				}

				return res.status(422).send(foundProduct);
			});

		});
}

exports.getProductById = function(req,res){
	const productId = req.params.id;

	Product.findById(productId)
		  .populate('user', 'username -_id')
		  .populate('shoppingCart', 'startAt endAt -_id')
		  .exec(function(err, foundProduct){
			if(err){
				return res.status(422).send({errors: [{title: 'Product error!',detail: 'Could not find Product'}]});
			}
	
			return res.json(foundProduct);
		  })
}

exports.deleteProduct = function(req, res){
	const user = res.locals.user;

	Product.findById(req.params.id)
		  .populate('user','_id')
		  .populate({
			  path: 'shoppingCarts',
			  select: 'startAt',
			  match: { startAt: { $gt: new Date()} }
		  })
		  .exec(function(err,foundProduct){

			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if(user.id !== foundProduct.user.id){
				return res.status(422).send({errors: [{title: 'Invalid User', detail: 'You are not rental owner'}]});
			}

			if(foundProduct.bookings.length >0){
				return res.status(422).send({errors: [{title: 'Active booking', detail: 'Cannot delete rental with active bookings'}]})
			}

			foundProduct.remove(function(err){
				if(err){
					return res.status(422).send({errors: normalizeErrors(err.errors)});
				}

				return res.json({'status': 'deleted'});
			});
		  });
}

exports.createProduct = function(req,res){
	const {  name, category, image, shared, bedrooms, description, price } = req.body;
	const user = res.locals.user;

	const product = new Product({  name,  category, image, shared, bedrooms, description, price });
	product.user = user;

	Product.create(product, function(err, newProduct){
		if(err){
			return res.status(422).send({errors: normalizeErrors(err.errors)});
		}

		User.update({_id: user.id}, { $push: {products: newProduct} }, function(){});

		return res.json(newProduct);
	});
}

exports.getProductByName = function(req,res){
	const name = req.query.name;
	const query = name ? {name: name.toLowerCase()} : {};

		Product.find(query)
		  .select('-shoppingCarts')
		  .exec(function(err, foundProducts){

			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			if(name && foundProducts.length === 0){
				return res.status(422).send({errors: [{title: `No result found!`,detail: `There is no result  ${name}`}]});
			}

			return res.json(foundProducts);
		});
	
}