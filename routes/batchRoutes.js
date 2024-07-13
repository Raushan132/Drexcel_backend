const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batchController');
const {verifyToken} = require('../middlewares/verifyToken');

router.post('/batch',verifyToken,batchController.saveBatch);

router.get('/batches',verifyToken,batchController.getBatches);

module.exports = router;