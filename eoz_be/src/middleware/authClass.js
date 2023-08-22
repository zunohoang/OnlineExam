const User = require('../app/models/User.js')
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    for (var i = 0; i < req.user.room.length; i++) {
        if (req.user.room[i] == req.params.idClass) {
            next();
            return;
        }
    }
    res.json({
        mes: 'Lỗi id lớp không đủ quyền'
    })
}


module.exports = auth;