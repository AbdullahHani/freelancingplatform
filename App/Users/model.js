const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
    userName: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['Buyer', 'Seller']
    },
    designation: {
        type: String
    },
    avatar: {
        type: String
    },
    avatar_ext: {
        type: String
    },
    about: {
        type: String
    },
    is_deleted: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    registerationCode: {
        type: String,
        trim: true
    },
    changePasswordCode: {
        type: String,
        trim: true
    },
    authType: {
        type: String,
        trim: true
    },
    dob: {
        type: Date
    },
    referral: {
        type: String
    },
    interests: [{
        type: String
    }],
    country: {
        type: String
    }
}, { timestamps: true });

// const autoPopulate = function (next) {
//     this.populate('role');
//     next();
// }

// User
//     .pre('find', autoPopulate)
//     .pre('findOne', autoPopulate)
//     .pre('findAll', autoPopulate)
//     .pre('findMany', autoPopulate)

User.pre('save', function ( next ) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


User.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

User.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model("User", User);
