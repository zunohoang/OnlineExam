const Room = require('../models/Room.js')
const express = require('express');
const app = express();

class ClassController {

    // POST /v1/teacher/createClass
    create(req, res, next) {
        const newClass = new Room(
            req.body
        );

        try {
            newClass.save();
        } catch (err) {
            console.log(err);
        }
        res.json(newClass);
    }

    // GET /v1/getAllClass
    getAll(req, res, next) {
        if (req.user.role == "student") {
            Room.find({
                sdtStudent: req.user.sdt
            })
                .then(data => {
                    if (data != (null && [])) {
                        var x = data.map((w) => {
                            return {
                                _id: w._id,
                                name: w.name,
                                timeCreate: w.timeCreate,
                                teacher: w.teacher,
                                test: w.test.map((v) => {
                                    return {
                                        _id: v._id,
                                        name: v.name,
                                        timeCreate: v.timeCreate,
                                        numberTake: v.numberTake,
                                        timeTake: v.timeTake,
                                        numberQuestion: v.question.length
                                    }
                                })
                            }
                        });
                        res.send(x);
                    } else {
                        res.json({ mes: 'khong tim thay' })
                    }
                })
        } else {
            Room.find({
                sdtTeacher: req.user.sdt
            }, "name student")
                .then(data => {
                    res.json(data)
                })
                .catch()
        }
    }

    // DELETE /v1/deleteClass
    delete(req, res, next) {

    }

    getStudent(req, res, next) {
        Room.findOne({
            _id: req.params.idClass
        }, "nameStudent")
            .then(data => {
                console.log(data)
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    }

}

module.exports = new ClassController;