const { paymentSchema } = require('../schemas/paymentSchema');
const { getPayments: getPaymentsRepository, createPayment: createPaymentRepository } = require('../repositories/paymentRepository');

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

module.exports = { getPayments, createPayment };