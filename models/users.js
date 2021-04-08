const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const config = require('../config/config').get(process.env.NODE_ENV)
const salt = 10
const jwt = require('jsonwebtoken')


const userSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        maxlength:100
    }, 
    lastname:{
        type:String, 
        required:true,
        maxlength: 100
    }, 
    email:{
        type:String, 
        required: true, 
        trim:true,
        unique: 1
    },
    bloodgroup:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    password2:{
        type:String,
        required:true,
        minlength:8
    },
    token:{
        type:String
    },
    cards:{
        type: Array
    }
});
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return err;
            bcrypt.compare(user.password2, hash, function(err, result){
                if(err) return cb(next);
                if(result){
                    console.log("User Registered");
                    user.password = hash;
                    user.password2 = hash;
                    next();
                }
            });
        });
        }
        else{
        next();
        }
    });
userSchema.methods.comparepassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, match){
        if(err) return cb(next);
        cb(null, match);
    });

}
userSchema.methods.gentoken = function(cb){
    var user = this;
    var token  = jwt.sign(user._id.toHexString(), config.SECRET);

    user.token = token;
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user) 
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    jwt.verify(token, config.SECRET, function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) returncb(err);
            cb(null, user);
        })
    })
}

userSchema.methods.deletetoken = function(token, cb){
    var user = this;
    user.update({$unset : {token:1}}, function(err, user){
        if(err) return cb(error);
        return cb(null, user);
    })
}
userSchema.methods.addcard = function(req, cb){
    var user = this
    var card = [req.body.disease, req.body.date, req.body.bloodgrp, req.body.bmi]
    user.cards.push(card)
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user) 
    })
}



module.exports = mongoose.model('User', userSchema)