const User = require('../models/User.js')
const express = require('express');
const app = express();

var jwt = require('jsonwebtoken');

class LoginController {

    // POST /api/v1/login
    index(req, res, next) {
        var datajson = req.body;
        User.findOne(datajson)
            .then(data => {
                if (data == null) { // not find
                    return res.json({
                        code: false,
                        message: 'That Bai',
                    });
                } else {
                    var token = jwt.sign({
                        _id: data._id,
                    }, 'hoangapk');
                    return res.json({
                        code: true,
                        message: 'Thanh Cong',
                        token: token,
                        role: data.role,
                    })
                }
            })
            .catch(err => res.status(500).json('Lỗi sever'))

    }

}

module.exports = new LoginController;