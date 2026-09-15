const express = require('express');
const router = express.Router();
const { getPayments } = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', getPayments);

module.exports = router;