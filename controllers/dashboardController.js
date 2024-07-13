const { totalBatchesAndStudents, totalBatchesAndStudentsByAdmin } = require('../services/userService');

exports.getNoBatchesAndStudents = async (req, res) => {
    try {

        const userId = req.id;
        const data = await totalBatchesAndStudents(userId);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getNoBatchesAndStudentsByAdmin = async (req, res) => {
    try {

        const userId = req.id;
        const data = await totalBatchesAndStudentsByAdmin();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}