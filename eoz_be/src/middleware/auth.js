const User = require('../app/models/User.js')
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        var a = jwt.verify(req.header('Authorization').replace('Bearer ', ''), 'hoangapk');
        User.findOne({
            _id: a
        })
            .then(data => {
                req.user = data;
                next();
            })
            .catch(err => res.status(500).json({ code: false, mes: 'Lỗi server' }))
    } catch {
        res.status(403).json({ mes: 'Chưa đăng nhập' });
    }

}


module.exports = auth;