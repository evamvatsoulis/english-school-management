const express = require('express');
const router = express.Router();
const { getPayments, createPayment, getPaymentById, getPaymentByStudentId, updatePayment, deletePayment } = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.use(authenticateToken);

router.get('/', getPayments);
router.post('/', createPayment);
router.get('/:id', getPaymentById);
router.get('/students/:studentId', getPaymentByStudentId);
router.patch('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;