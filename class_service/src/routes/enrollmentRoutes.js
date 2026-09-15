const express = require('express');
const router = express.Router();
const { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass } = require('../controllers/enrollmentController');

router.post('/', createEnrollment);
router.get('/students/:studentId', getEnrollmentsByStudent);
router.get('/class/:classId', getEnrollmentsByClass);

module.exports = router;