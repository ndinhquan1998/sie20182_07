const ShoppingCart = require('../models/cart');
const Product = require('../models/product');
const Payment = require('../models/payment');
const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const moment = require('moment');

const config = require('../config/dev');
const stripe = require('stripe')(config.STRIPE_SK);

const CUSTOMER_SHARE = 0.8;

exports.createBooking = function(req, res){
    const {  totalPrice, guests, items, product, paymentToken } = req.body;
    const user = res.locals.user;

    const shoppingCart = new ShoppingCart({  totalPrice, guests, items  });

    Product.findById(product._id)
          .populate('shoppingCarts')
          .populate('user')
          .exec(async function(err, foundProduct) {

                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                if(foundProduct.user.id === user.id){
                    return res.status(422).send({errors: [{ title: 'Invalid User', detail: 'Cannot create booking on product' }]});
                }

         //       if(isValidBooking(shoppingCart, foundProduct)){
                  if(true) {
                    shoppingCart.user = user;
                    shoppingCart.product = foundProduct;
                    foundProduct.shoppingCarts.push(shoppingCart);
                    const { payment,err } = await createPayment(shoppingCart, foundProduct.user, paymentToken);

                    if(payment){
                        
                        shoppingCart.payment = payment;
                            
                        shoppingCart.save(function(err){
                            if(err){
                                return res.status(422).send({errors: normalizeErrors(err.errors)});
                            }
    
                            foundProduct.save();
                            User.update({_id: user.id}, {$push: {shoppingCarts: shoppingCart}}, function(){
                                
                            });
    
                            return res.json({ createdAt: shoppingCart.createdAt });
    
                        });
                    }else{
                        return res.status(422).send({errors: [{ title: 'Payment Error', detail: err }]});
                    }

                }else{
                    return res.status(422).send({errors: [{ title: 'Invalid Booking', detail: 'Chosen date are already taken' }]});
                }

        });
}

exports.getUserBookings = function(req, res){
    const user = res.locals.user;

    ShoppingCart
          .where({user})
		  .populate('product')
		  .exec(function(err, foundBookings){

			if(err){
				return res.status(422).send({errors: normalizeErrors(err.errors)});
			}

			return res.json(foundBookings);

		  });
}

function isValidBooking(proposedBooking, product){

    let isValid =true;

    if(product.shoppingCarts && product.shoppingCarts.length >0){

        isValid = product.shoppingCarts.every(function(shoppingCart){
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd = moment(proposedBooking.endAt);

            const actualStart = moment(shoppingCart.startAt);
            const actualEnd = moment(shoppingCart.endAt);

            return ((actualStart < proposedStart && actualEnd < proposedStart) || (proposedEnd<actualEnd && proposedEnd < actualStart));
                
            
        });

    }

    return isValid;
}

async function createPayment(shoppingCart, toUser, token){
    const { user } = shoppingCart;

    const customer = await stripe.customers.create({
        source: token.id,
        email: user.email
    });

    if(customer){
        User.update({_id: user.id}, { $set: { stripeCustomerId: customer.id }}, () => {})
    
        const payment = new Payment({
            fromUser: user,
            toUser,
            fromStripeCustomerId: customer.id,
            shoppingCart,
            tokenId: token.id,
            amount: shoppingCart.totalPrice * 100 * CUSTOMER_SHARE
        });

        try {
            const savedPayment = await payment.save();
            return { payment: savedPayment };
        }catch(err) {
            return { err: err.message };
        }

    }else{
        return {err: 'Cannot process Payment!'};
    }
}