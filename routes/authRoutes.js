const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyAdminToken } = require('../middlewares/verifyAdminToken');

router.post('/register',verifyAdminToken, authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
