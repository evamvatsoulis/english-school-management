const express = require('express');
const router = express.Router();
const { getPayments, createPayment, getPaymentById, getPaymentsByStudentId, updatePayment, deletePayment } = require('../controllers/paymentController');

router.get('/', getPayments);
router.post('/', createPayment);
router.get('/:id', getPaymentById);
router.get('/students/:studentId', getPaymentsByStudentId);
router.patch('/:id', updatePayment);
router.delete('/:id', deletePayment);

module.exports = router;