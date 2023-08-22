const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subUser = new mongoose.Schema({
    _idStudent: String,
    nameStudent: String,
    key: Array,
    timeStart: String,
    timeEnd: String,
    point: Number,
})

const subQuestion = new mongoose.Schema({
    id: Number,
    content: String,
    key: Array,
})

const subTest = new mongoose.Schema({
    id: Number,
    name: String,
    timeCreate: String,
    timeLimit: String,
    timeTake: String,
    numberTake: Number,
    question: [subQuestion],
    keyTrue: Array,
    dashboard: [subUser],
})

const Room = new Schema({
    id: Number,
    name: String,
    timeCreate: String,
    teacher: String,
    sdtTeacher: String,
    _idTeacher: String,
    _idStudent: Array,
    nameStudent: Array,
    sdtStudent: Array,
    test: [subTest],
    aaabbb: String
});

module.exports = mongoose.model('Room', Room);