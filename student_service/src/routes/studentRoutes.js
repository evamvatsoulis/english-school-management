const express = require('express');
const router = express.Router();
const { getStudents, getStudentById, createStudent, updateStudent, deactivateStudent, activateStudent } = require('../controllers/studentController');

router.get('/', getStudents);
router.get('/:id', getStudentById);
router.post('/', createStudent);
router.patch('/:id', updateStudent);
router.patch('/:id/deactivate', deactivateStudent);
router.patch('/:id/activate', activateStudent);

module.exports = router;