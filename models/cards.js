const mongoose = require('mongoose');

const cardsSchema = new mongoose.Schema({
    column: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column'
    },
    title: {
        type: String,
        required: true
    },
    content: String,
    order: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model('Card', cardsSchema);