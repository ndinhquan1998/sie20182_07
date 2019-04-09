const User = require('../models/user');
const ShoppingCart = require('../models/cart');
const Product = require('../models/product');

const Payment = require('../models/payment');
const { normalizeErrors } = require('../helpers/mongoose');

const config = require('../config/dev');
const stripe = require('stripe')(config.STRIPE_SK);

exports.getPendingPayments = function(req, res){
    const user = res.locals.user;

    Payment.where({toUser: user})
            .populate({
                path: 'shoppingCart',
                populate: {path: 'product'}
            })
            .populate('fromUser')
            .exec(function(err, foundPayments){
                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                return res.json(foundPayments);
            })
}

exports.confirmPayment = function(req, res){
    const payment = req.body;
    const user = res.locals.user;

    Payment.findById(payment._id)
            .populate('toUser')
            .populate('shoppingCart')
            .exec(async function(err, foundPayment){

                if(err){
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }

                if(foundPayment.status === 'pending' && user.id === foundPayment.toUser.id){

                    const shoppingCart = foundPayment.shoppingCart;  
                    
                    const charge = await stripe.charges.create({
                        amount: shoppingCart.totalPrice,
                        currency: 'usd',
                        customer: payment.fromStripeCustomerId
                    })

                    if(charge){
                        ShoppingCart.update({_id: shoppingCart}, { status: 'active' }, function(){});

                        foundPayment.charge = charge;
                        foundPayment.status = 'paid';

                        foundPayment.save(function(err){
                            if(err){
                                return res.status(422).send({errors: normalizeErrors(err.errors)});
                            }
                            User.update({_id: foundPayment.toUser}, {$inc: {revenue: foundPayment.amount}}, function(err, user){
                                if(err){
                                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                                }

                                return res.json({status: 'paid'});
                            })
                        })
                    }

                }
            });
}

exports.declinePayment = function(req, res){
    const payment = req.body;
    const { shoppingCart } = payment;

    ShoppingCart.deleteOne({id: shoppingCart._id}, (err,deletedBooking) => {
        
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        Payment.update({_id: payment._id}, {status: 'declined'}, function(){});
        Product.update({_id: shoppingCart.product}, {$pull: {shoppingCarts: shoppingCart._id}}, () => {});
    
        return res.json({status: 'deleted'});
    });
}