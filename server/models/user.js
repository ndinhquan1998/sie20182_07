const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username:{
        type: String,
        min: [4,'too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    email:{
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is require',
        match: [/^\w+([\.-]?\w+)+@\w+([\.-]?\w+)+(\.\w{2,3})+$/]
    },
    password:{
        type: String,
        min: [4,'too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required: 'Password is required'
    },
    stripeCustomerId: String,
    revenue: Number,
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    shoppingCarts: [{type: Schema.Types.ObjectId, ref: 'ShoppingCart'}]
});

userSchema.methods.isSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next){

    const user =this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);