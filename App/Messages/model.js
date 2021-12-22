const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    text: {
        type: String,
        trim: true,
        required: true
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chatId: {
        type: String,
        required: true
    },
    is_deleted: {
        type: Number,
        default: 0
    },
    read: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    }
}, {timestamps: true});

const autoPopulate = function (next) {
    this.populate('user');
    next();
}

Message
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)
    .pre('findAll', autoPopulate)
    .pre('findMany', autoPopulate)


module.exports = mongoose.model("Message", Message);
