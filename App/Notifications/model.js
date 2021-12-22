const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Notifications = new Schema({
    type: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    link: {
        type: String,
        trim: true
    },
    for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true
    },
    read: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    },
    name: {
        type: String
    },
    chat: {
        type: String
    },
    project: {
        type: String
    }
}, {
    timestamps: true
});

const autoPopulate = function (next) {
    this.populate('user');
    this.populate('for');
    next();
}

Notifications
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)
    .pre('findAll', autoPopulate)
    .pre('findMany', autoPopulate)

module.exports = mongoose.model('Notifications', Notifications);