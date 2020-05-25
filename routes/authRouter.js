const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControler');
const {validateUser} = require('../validators/validateUser');

router.post('/', validateUser, userController.login);

exports.authRouter = router;