const express = require('express');
const router = express.Router();
const { createEnrollment } = require('../controllers/enrollmentController');
const{ authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/', createEnrollment);

module.exports = router;