const { pool } = require('../config/db');

const getPayments = async () => {
    const result = await pool.query("SELECT * FROM payments");
    return result.rows;
}

const createPayment = async (studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes) => {
    const result = await pool.query(
        `INSERT INTO payments (student_id, amount, payment_month, payment_year, payment_date, payment_method, notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
        [studentId, amount, paymentMonth, paymentYear, paymentDate, paymentMethod, notes]
    );
    return result.rows[0];
};

module.exports = { getPayments, createPayment };