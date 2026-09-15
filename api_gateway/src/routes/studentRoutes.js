const express = require('express');
const router = express.Router();
const { getStudents, createStudent, updateStudent, deactivateStudent } = require('../controllers/studentController');

router.get('/', getStudents);
router.post('/', createStudent);
router.patch('/:id', updateStudent);
router.patch('/:id/deactivate', deactivateStudent);

module.exports = router;