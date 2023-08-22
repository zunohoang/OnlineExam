const jwt = require('jsonwebtoken');
const authStudent = (req, res, next) => {
    if (req.user.role == ('student' || 'admin')) {
        next();
    } else res.status(401).json({
        code: false,
        mes: 'Không có quyền truy cập'
    })

}


module.exports = authStudent;