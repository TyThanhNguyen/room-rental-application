const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        // token type
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// instance methods
UserSchema.methods.generateAuthToken = function(type) {
    let user = this;
    let access = ''
    if (type === 'tenant') {
        access = 'tenantAuth'
    } else if (type === 'admin') {
        access = 'adminAuth';
    } else if (type === 'host') {
        access = 'hostAuth';
    }
    
    let token = jwt.sign({_id: user._id.toHexString(), access}, 'fyp2018').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

// hash password
UserSchema.pre('save', function(next) {
    let user = this;
    if (user.isModified('password')) {
        let password = user.password;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});

// model methods
UserSchema.statics.findByCredentials = function(email, password) {
    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            })
        });
    });
};

UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        // decoding token
        decoded = jwt.verify(token, 'fyp2018');
    } catch (e) {
        return Promise.reject();
    }; 

    // find user with decoding data
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': decoded.access
    });
};

UserSchema.methods.removeToken = function (token) {
    let user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};

let User = mongoose.model('User', UserSchema);
module.exports = { User };