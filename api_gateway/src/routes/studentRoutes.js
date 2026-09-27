const express = require('express');
const router = express.Router();
const { getStudents, getStudentById, getStudentsByIds, createStudent, updateStudent, deactivateStudent, activateStudent } = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', getStudents);
router.post('/batch', getStudentsByIds);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.patch('/:id', updateStudent);
router.patch('/:id/deactivate', deactivateStudent);
router.patch('/:id/activate', activateStudent);

module.exports = router;