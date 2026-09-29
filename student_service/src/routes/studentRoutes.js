const express = require('express');
const router = express.Router();
const { getStudents, getStudentById, createStudent, updateStudent, deactivateStudent, getStudentsByIds } = require('../controllers/studentController');

router.get('/', getStudents);
router.post('/batch', getStudentsByIds);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.patch('/:id', updateStudent);
router.patch('/:id/deactivate', deactivateStudent);

module.exports = router;