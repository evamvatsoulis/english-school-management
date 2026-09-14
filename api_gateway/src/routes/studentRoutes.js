const express = require('express');
const router = express.Router();
const { getStudents, createStudent, updateStudent } = require('../controllers/studentController');

router.get('/', getStudents);
router.post('/', createStudent);
router.patch('/:id', updateStudent);

module.exports = router;