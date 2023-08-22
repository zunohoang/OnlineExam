const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subQuestion = new mongoose.Schema({
    id: { type: Number },
    content: { type: String },
    key: { type: Array },
    keyTrue: { type: Number },
})

const subDashboard = new mongoose.Schema({
    name: { type: String },
    idStudent: { type: String },
    class: { type: String },
    id: { type: Number },
    key: { type: Array },
    point: { type: Number }
})

const Test = new Schema({

    id: { type: Number },
    class: { type: String, maxLength: 255 },
    name: { type: String, maxLength: 255 },
    pass: { type: String },
    numberQuestion: { type: Number },
    numberTake: { type: Number },
    teacher: { type: String, maxLength: 255 },
    question: [subQuestion],
    dashboard: [subDashboard],
});
module.exports = mongoose.model("Test", Test);