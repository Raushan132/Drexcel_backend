const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { verifyToken } = require('../middlewares/verifyToken');


router.get('/',verifyToken,dashboardController.getNoBatchesAndStudents);

module.exports = router;
