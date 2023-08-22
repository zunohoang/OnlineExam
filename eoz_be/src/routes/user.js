const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');

const classController = require('../app/controllers/ClassController.js');
const testController = require('../app/controllers/TestController.js');

router.get('/getAllClass', auth, classController.getAll);
router.get('/getAllTest/:idClass', auth, testController.getAll);
router.get('/getTest/:idTest', auth, testController.getTest);
router.post('/sendAnswer/:idTest', auth, testController.sendAnswer);
router.get('/getPoint/:idTest', auth, testController.getPoint)

module.exports = router;