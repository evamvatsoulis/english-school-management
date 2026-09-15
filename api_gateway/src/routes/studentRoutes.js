const express = require('express');
const router = express.Router();
const { getStudents, createStudent, updateStudent, deactivateStudent, activateStudent } = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', getStudents);
router.post('/', createStudent);
router.patch('/:id', updateStudent);
router.patch('/:id/deactivate', deactivateStudent);
router.patch('/:id/activate', activateStudent);

module.exports = router;