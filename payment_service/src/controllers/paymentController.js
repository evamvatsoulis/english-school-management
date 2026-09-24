const config = require('../config/config');
const { paymentSchema, updatePaymentSchema } = require('../schemas/paymentSchema');
const {
    getPayments: getPaymentsRepository,
    createPayment: createPaymentRepository,
    getPaymentById: getPaymentByIdRepository,
    getPaymentsByStudentId: getPaymentsByStudentIdRepository,
    updatePayment: updatePaymentRepository,
    deletePayment: deletePaymentRepository
} = require('../repositories/paymentRepository');

const paymentDoesNotExist = (payment) => payment.rows.length === 0;

const updatePaymentData = (value, payment) => {
    const studentId = value.studentId ?? payment.student_id;
    const amount = value.amount ?? payment.amount;
    const paymentMonth = value.paymentMonth ?? payment.payment_month;
    const paymentYear = value.paymentYear ?? payment.payment_year;
    const paymentDate = value.paymentDate ?? payment.payment_date;
    const paymentMethod = value.paymentMethod ?? payment.payment_method;
    const notes = value.notes ?? payment.notes;

    return { studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes };
};

const fetchStudent = async (studentId) => {
    try {
        const response = await fetch(`http://${config.host}:${config.services.student.port}/students/${studentId}`);
        const result = await response.json();
        if (!response.ok) {
            return { status: response.status, error: result };
        }
        return null;
    } catch (error) {
        return { status: 503, error: 'Student service is currently unavailable' }
    }
};

const getPayments = async (req, res) => {
    try {
        const result = await getPaymentsRepository();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch payments" });
    }
};

const createPayment = async (req, res) => {
    try {
        const { error, value } = paymentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const studentError = await fetchStudent(value.studentId);

        if (studentError) {
            return res.status(studentError.status).json({ error: studentError.error });
        }

        const { studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes } = value;
        const result = await createPaymentRepository(studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes);

        return res.status(201).json({ message: "Payment added", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to create payment" });
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

const getPaymentsByStudentId = async (req, res) => {
    try {
        const { studentId } = req.params;

        const studentError = await fetchStudent(studentId);

        if (studentError) {
            return res.status(studentError.status).json({ error: studentError.error });
        }

        const payment = await getPaymentsByStudentIdRepository(studentId);

        if (paymentDoesNotExist(payment)) {
            return res.status(200).json({ message: "There are no payments", result: [] });
        }

        return res.status(200).json({ message: "Payments were successfully loaded", result: payment.rows });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch payments" });
    }
};

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = updatePaymentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const currentPayment = await getPaymentByIdRepository(id);

        if (paymentDoesNotExist(currentPayment)) {
            return res.status(404).json({ error: "Payment not found" });
        }

        const { studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes } = updatePaymentData(value, currentPayment.rows[0]);
        const result = await updatePaymentRepository(studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes, id);

        return res.status(200).json({ message: "Payment edited", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to update payment" });
    }
};

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;

        const currentPayment = await getPaymentByIdRepository(id);

        if (paymentDoesNotExist(currentPayment)) {
            return res.status(404).json({ error: "Payment not found" });
        }

        const result = await deletePaymentRepository(id);

        return res.status(200).json({ message: "Payment deleted", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to delete payment" });
    }
};

module.exports = { getPayments, createPayment, getPaymentById, getPaymentsByStudentId, updatePayment, deletePayment };