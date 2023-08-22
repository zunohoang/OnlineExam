const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, maxLength: 255 },
    username: { type: String, maxLength: 255 },
    password: { type: String, maxLength: 255 },
    skill: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 255 },
    role: { type: String, maxLength: 255 },
    sdt: { type: String, maxLength: 255 },
    room: Array,
});

module.exports = mongoose.model('User', User);