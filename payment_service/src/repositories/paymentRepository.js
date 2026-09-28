const { pool } = require('../config/db');

const getPayments = async () => {
    const result = await pool.query("SELECT * FROM payments ORDER BY id");
    return result.rows;
};

const createPayment = async (studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes) => {
    const result = await pool.query(
        `INSERT INTO payments (student_id, amount, payment_month, payment_year, payment_date, payment_method, notes)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`,
        [studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes]
    );
    return result.rows[0];
};

const getPaymentById = async (id) => {
    const result = await pool.query(`SELECT * FROM payments WHERE id = $1`, [id]);
    return result.rows[0];
};

const getPaymentsByStudentId = async (studentId) => {
    const result = await pool.query(`SELECT * FROM payments WHERE student_id = $1 ORDER BY payment_year ASC, payment_month ASC`, [studentId]);
    return result.rows;
};

const updatePayment = async (studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes, id) => {
    const result = await pool.query(
        `UPDATE payments
        SET student_id = $1,
            amount = $2,
            payment_month = $3,
            payment_year = $4,
            payment_date = $5,
            payment_method = $6,
            notes = $7
        WHERE id = $8
        RETURNING *`,
        [studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes, id]
    );
    return result.rows[0];
};

const deletePayment = async (paymentId) => await pool.query("DELETE FROM payments where id = $1", [paymentId]);

module.exports = { getPayments, createPayment, getPaymentById, getPaymentsByStudentId, updatePayment, deletePayment };