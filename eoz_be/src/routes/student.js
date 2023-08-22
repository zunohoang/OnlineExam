const express = require('express');
const auth = require('../middleware/auth');
const authStudent = require('../middleware/authStudent');
const testController = require('../app/controllers/TestController');
const router = express.Router();
const app = express();


module.exports = router;