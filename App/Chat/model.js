const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema({
    messages: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }],
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    is_deleted: {
        type: Number,
        default: 0
    }
}, {timestamps: true});

const autoPopulate = function (next) {
    this.populate('messages');
    this.populate('to');
    this.populate('from');
    next();
}

Chat
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)
    .pre('findAll', autoPopulate)
    .pre('findMany', autoPopulate)


module.exports = mongoose.model("Chat", Chat);
