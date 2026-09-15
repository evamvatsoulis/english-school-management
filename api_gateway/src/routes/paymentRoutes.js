const express = require('express');
const router = express.Router();
const { getPayments, createPayment, getPaymentById } = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', getPayments);
router.post('/', createPayment);
router.get('/:id', getPaymentById);

module.exports = router;