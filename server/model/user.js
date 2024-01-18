const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username:{
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: [4, "Username must be at least 4 characters long"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters long"],
        maxlength: [24, "Password must be less than 24 characters long"],
    },
});

userSchema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
});

//cb = callback function
userSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}

userSchema.plugin(uniqueValidator, {message: "Username already exists"});

userSchema.set('toJSON', {
    transform: function(doc, ret, options){
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;