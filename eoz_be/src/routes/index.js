const loginRouter = require('./login.js');
const studentRouter = require('./student.js');
const teacherRouter = require('./teacher.js');
const adminRouter = require('./admin.js');
const userRouter = require('./user.js');
const jwt = require('jsonwebtoken');


function route(app) {

    app.use('/v1/login', loginRouter);
    app.use('/v1/student', studentRouter);
    app.use('/v1/teacher', teacherRouter);
    app.use('/v1/admin', adminRouter);
    app.use('/v1', userRouter);

}

module.exports = route;