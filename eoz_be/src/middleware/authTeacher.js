const jwt = require('jsonwebtoken');
const authTeacher = (req, res, next) => {
    if (req.user.role == ('teacher' || 'admin')) {
        next();
    } else res.status(401).json({
        code: false,
        mes: 'Không có quyền truy cập'
    })

}


module.exports = authTeacher;