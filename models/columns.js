const mongoose = require('mongoose');

const columnsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: '#EAE7DC'
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

module.exports = mongoose.model('Column', columnsSchema);