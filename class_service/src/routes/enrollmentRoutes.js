const express = require('express');
const router = express.Router();
const { getEnrollments, createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass, deleteEnrollment } = require('../controllers/enrollmentController');

router.get('/', getEnrollments);
router.post('/', createEnrollment);
router.get('/students/:studentId', getEnrollmentsByStudent);
router.get('/class/:classId', getEnrollmentsByClass);
router.delete('/class/:classId/student/:studentId', deleteEnrollment);

module.exports = router;