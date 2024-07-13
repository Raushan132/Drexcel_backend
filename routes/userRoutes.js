const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const { protect } = require('../middlewares/authMiddleware');
const { verifyAdminToken } = require('../middlewares/verifyAdminToken');

router.get('/', verifyAdminToken, userController.getUsers);
// router.post('/', protect, userController.createUser);

module.exports = router;
