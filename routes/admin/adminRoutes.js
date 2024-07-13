const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboardController');
const batchController = require('../../controllers/batchController')
const userController = require('../../controllers/userController')
const { verifyAdminToken } = require('../../middlewares/verifyAdminToken');


router.get('/dashboard',verifyAdminToken,dashboardController.getNoBatchesAndStudentsByAdmin);
router.get('/batches',verifyAdminToken,batchController.getBatchesByAdmin);
router.get('/batches/:email',verifyAdminToken,batchController.getBatchesEmailByAdmin);
router.patch('/changePassword',verifyAdminToken,userController.changePassword);
router.patch('/disableUser',verifyAdminToken, userController.disableUser);
router.patch('/permission', verifyAdminToken, userController.changePermessions);

module.exports = router;
