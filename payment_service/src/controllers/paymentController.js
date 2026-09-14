const { paymentSchema } = require('../schemas/paymentSchema');
const {
    getPayments: getPaymentsRepository,
    createPayment: createPaymentRepository,
    getPaymentById: getPaymentByIdRepository,
    getPaymentByStudentId: getPaymentByStudentIdRepository
} = require('../repositories/paymentRepository');

const paymentDoesNotExist = (payment) => payment.rows.length === 0;

const getPayments = async (req, res) => {
    try {
        const result = await getPaymentsRepository();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch payments" });
    }
}

const createPayment = async (req, res) => {
    try {
        const { error, value } = paymentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const { studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes } = value;
        const result = await createPaymentRepository(studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getPaymentById = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await getPaymentByIdRepository(id);

        if (paymentDoesNotExist(payment)) {
            return res.status(404).json({ error: "Payment not found" });
        }

        return res.status(200).json(payment.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch payment" });
    }
};

const getPaymentByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;
        const payment = await getPaymentByStudentIdRepository(studentId);

        if (paymentDoesNotExist(payment)) {
            return res.status(404).json({ error: "Payment not found" });
        }

        return res.status(200).json(payment.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch payment" });
    }
}

module.exports = { getPayments, createPayment, getPaymentById, getPaymentByStudentId };