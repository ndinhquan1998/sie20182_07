const User = require('../models/user');
const { normalizeErrors } = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function(req,res){
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password!'}]});
    }

    User.findOne({email}, function(err,user){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if(!user){
            return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'User does not exist'}]});
        }

        if(user.isSamePassword(password)){
            const token =  jwt.sign({userId: user.id, username: user.username},
                config.SECRET,
                {expiresIn: '1h'});

            return res.json(token);
            //return JWT token
        }else{
            return res.status(422).send({errors: [{title: 'Wrong data', detail: 'Wrong user or password'}]});
        }
    });
}

exports.register = function(req,res){
    const {username, email, password, passwordConfirmation} = req.body;

    if(!username || !email){
        return res.status(422).send({errors: [{title: 'Data Missing!', detail: 'Provide email and password!'}]});
    }

    if(password !== passwordConfirmation){
        return res.status(422).send({errors: [{title: 'Invalid Password', detail:'Password is not a same as confirmation'}]});
    }

    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});   
        }

        if(existingUser){
            return res.status(422).send({errors: [{title: 'Invalid Email', detail:'User with email already exist!'}]});
        }

        const user = new User({
            username,
            email,
            password
        });

        user.save(function(err){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json({'registered':true});
        });

    });

}

exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    if(token){
        const user = parserToken(token);

        User.findById(user.userId, function(err, user){
            if(err){
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            if(user){
                res.locals.user = user;
                next();
            }else{
                return notAuthorized(res);
            }
        });
    }else{
        return notAuthorized(res);
    }
}

function parserToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res){
    return res.status(401).send({errors: [{title: 'Not authorized', detail:'You need to login to get access'}]});
}