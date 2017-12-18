const mongoose = require('mongoose')

const Access = mongoose.model('Access', {
    ip: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    accessId: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    userAgent: {
        type: String,
        default: null,
        trim: true
    },
    lastAccess: {
        type: Number,
        default: null
    },
    accessCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Number,
        default: null
    }
})

module.exports = {Access}