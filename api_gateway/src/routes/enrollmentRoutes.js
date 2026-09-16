const express = require('express');
const router = express.Router();
const { createEnrollment, getEnrollmentsByStudent } = require('../controllers/enrollmentController');
const{ authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', createEnrollment);
router.get('/student/:studentId', getEnrollmentsByStudent);

module.exports = router;