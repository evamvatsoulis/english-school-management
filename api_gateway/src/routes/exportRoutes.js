const express = require('express');
const router = express.Router();
const { exportToPdf } = require('../controllers/exportController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.post('/pdf', exportToPdf);

module.exports = router;