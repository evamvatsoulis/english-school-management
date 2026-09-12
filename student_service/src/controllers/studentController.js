const e = require("express");
const db = require("../config/db");
const { createStudentSchema } = require('../schemas/studentSchema');

const getStudents = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM students");
        return res.status(200).json(result.rows);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch students" });
    }
};

const createStudent = async (req, res) => {
    try {
        const { error, value } = createStudentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const { firstName, lastName, phone, email } = value;

        const result = await db.query(
            `INSERT INTO students (first_name, last_name, phone, email)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [firstName, lastName, phone, email]
        );

        return res.status(201).json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: "Failed to create student" });
    }
};

module.exports = { getStudents, createStudent };