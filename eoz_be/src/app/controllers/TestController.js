const Room = require('../models/Room.js');
const Test = require('../models/Test.js')
const express = require('express');
const app = express();
const fs = require('fs');
const pdf = require('pdf-parse');
class TestController {

    createTestv2(req, res, next) {
        if (!req.files) {
            return res.status(500).send({ msg: "file is not found" })
        }
        // accessing the file
        const myFile = req.files.file;

        //  mv() method places the file inside public directory
        myFile.mv(`${__dirname}/../../public/${myFile.name}`, function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            // returing the response with file path and name
            let dataBuffer = fs.readFileSync(`${__dirname}/../../public/${myFile.name}`);
            pdf(dataBuffer).then(function (data) {
                console.log(data.text);

                function extra(x) {
                    var res = [];
                    var start = 0;
                    var end;
                    for (var i = 0; i < x.length; i++) {
                        var s = x[i] + x[i + 1] + x[i + 2];
                        if (s == "Câu") {
                            end = i;

                            console.log(i);
                            res.push(x.slice(start, end));

                            start = i;
                        }
                    }
                    var obj = [];
                    res.push(x.slice(end, x.search('--Hết--')));
                    for (var i = 0; i < res.length; i++) {
                        var a = res[i].slice(res[i].search("A."), res[i].length - 1);
                        var A = a.slice(0, a.search("B.")).trim();
                        var B = a.slice(a.search("B."), a.search("C.")).trim();
                        var C = a.slice(a.search("C."), a.search("D.")).trim();
                        var D = a.slice(a.search("D."), a.length - 1).trim();
                        obj.push({
                            content: res[i].slice(0, res[i].search("A.")),
                            key: [A, B, C, D]
                        });
                    }
                    return obj;
                }

                var Text = data.text;

                var Qx = extra(Text)
                var i = 0;
                var test = {
                    name: req.body.name,
                    timeCreate: new Date(),
                    timeLimit: null,
                    timeTake: req.body.timeTake,
                    question: Qx,
                    keyTrue: req.body.keyTrue,
                    dashboard: [],
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

                const filter = {
                    _id: req.params.idClass,
                };
                const update = {
                    $push: {
                        "test": test
                    }
                };
                const options = {
                    new: true,
                };

                Room.updateOne(filter, update, options)
                    .then(createdTest => {
                        res.json({ mes: 'ok' });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json(err);
                    })
            });
        });
    }

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