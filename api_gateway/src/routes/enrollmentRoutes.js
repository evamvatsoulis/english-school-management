const express = require('express');
const router = express.Router();
const { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass } = require('../controllers/enrollmentController');
const{ authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', createEnrollment);
router.get('/student/:studentId', getEnrollmentsByStudent);
router.get('/class/:classId', getEnrollmentsByClass);

module.exports = router;