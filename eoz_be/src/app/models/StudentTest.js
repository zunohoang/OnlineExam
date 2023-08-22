const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Test = new Schema({
    class: { type: String, maxLength: 255 },
    name: { type: String, maxLength: 255 },
});
module.exports = mongoose.model("Test", Test);