const express = require('express');
const router = express.Router();
const { getPayments, createPayment, getPaymentById, getPaymentByStudentId } = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', getPayments);
router.post('/', createPayment);
router.get('/:id', getPaymentById);
router.get('/students/:studentId', getPaymentByStudentId);

module.exports = router;