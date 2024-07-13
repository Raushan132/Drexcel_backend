const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken } = require('../middlewares/verifyToken');

router.post('/',verifyToken, studentController.createStudent);
router.get('/',verifyToken,studentController.getStudents);
router.get('/filter',verifyToken,studentController.getStudentsByQuery);
router.get('/:id',verifyToken,studentController.getStudentById);
router.get('/batches/:batchName',verifyToken, studentController.getStudentsByBatchName);
router.delete('/:id',verifyToken,studentController.deleteStudents);
router.patch('/:id',verifyToken,studentController.editStudent);

module.exports = router;
