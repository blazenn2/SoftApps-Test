const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    accountType: {
        required: true,
        type: String,
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'posts'
    }]
});

module.exports = mongoose.model('Users', userSchema);