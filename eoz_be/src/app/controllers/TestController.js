const Room = require('../models/Room.js');
const Test = require('../models/Test.js')
const express = require('express');
const app = express();

class TestController {

    // PUT /v1/teacher/createTest
    createTest(req, res, next) {
        const filters = {
            _id: req.params.idClass,
        }
        const create = {
            $push: {
                "test": req.body.newTest
            }
        }
        /*
        {
            name: "ABC",
            timeCreate: new Date(),
            timeLimit: null,
            timeTake: 15,
            numberTake: 0,
            question: [
                {
                    content: "1 + 1 = ?",
                    key: [1,2,3,4]
                },
                {
                    content: "1 + 2 = ?",
                    key: [1,2,3,4]
                }
            ],
            keyTrue: [1,2],
            dashboard: [],
        }
        */

        const options = {
            new: true,
        }
        Room.updateOne(filters, create, options)
            .then(createdTest => {
                res.json({ mes: 'ok' });
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
    }

    // GET /v1/getAll
    getAll(req, res, next) {

        Room.findOne({ _id: req.params.idClass })
            .then(data => {

                if (data != null && data.length != 0) {

                    let x = data.test.map((obj) => {
                        return {
                            name: obj.name,
                            timeCreate: obj.timeCreate,
                            numberTake: obj.numberTake,
                            _id: obj._id,
                        }
                    });
                    res.json(x);

                } else res.json({ code: false, mes: "Không có bài kiểm tra nào" });

            })
            .catch(err => res.status(500).json({ code: false, mes: "Lỗi server TestController" }));

    }

    // GET /v1/getTest
    getTest(req, res, next) {

        Room.findOne({
            "test._id": req.params.idTest
        }, "test.question test._id")
            .then(data => {
                res.json(data)
            })
            .catch(err => res.status(500).json({ code: false, mes: "Lỗi server TestCOntroller.getTest" }));

    }

    // POST /v1/sendAnswer
    sendAnswer(req, res, next) {

        console.log(req.params.idTest)

        const filter = {
            "test._id": req.params.idTest
        }
        const update = {
            $push: {
                "test.$[x].dashboard": {
                    $each: [
                        {
                            key: req.body.key,
                            timeStart: req.body.timeStart,
                            timeEnd: req.body.timeEnd,
                            point: 0,
                            nameStudent: req.user.name,
                            _idStudent: req.user._id
                        }
                    ]
                }
            }
        }
        const options = {
            new: true,
            arrayFilters: [
                {
                    "x._id": req.params.idTest
                }
            ]
        };


        Room.updateOne(filter, update, options)
            .then(updateRoom => {
                res.json({ mes: 'ok' });
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })

    }

    // GET /v1/getPoint
    getPoint(req, res, next) {

        Room.findOne({
            "test._id": req.params.idTest
        }, "test.keyTrue test._id test.dashboard test.name")
            .then(data => {
                console.log(data)
                var x;
                for (var i = 0; i < data.test.length; i++) {
                    if (data.test[i]._id == req.params.idTest) {
                        x = i;
                        break;
                    }
                }

                var points = []
                for (var i = 0; i < data.test[x].dashboard.length; i++) {
                    if (data.test[x].dashboard[i]._idStudent == req.user._id) {

                        let count = 0;
                        for (var j = 0; j < data.test[x].keyTrue.length; j++) {
                            if (data.test[x].keyTrue[j] == data.test[x].dashboard[i].key[j]) {
                                count++;
                            }
                        }
                        points.push(
                            {
                                point: (count / data.test[x].keyTrue.length) * 10,
                                keyTrue: data.test[x].keyTrue,
                                keyUser: data.test[x].dashboard[i].key
                            }
                        )


                    }
                }
                res.json({
                    id: req.params.idTest,
                    name: data.test[x].name,
                    Points: points
                })

            })
            .catch(err => {
                console.log(err)
                res.status(500).json({ code: false, mes: "Lỗi server TestCOntroller" })
            });

    }

}

module.exports = new TestController;