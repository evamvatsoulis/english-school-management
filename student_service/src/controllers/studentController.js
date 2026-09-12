const { pool } = require("../config/db");
const { createStudentSchema, updateStudentSchema } = require('../schemas/studentSchema');
const { findAllStudents, createNewStudent, updateStudentDetails } = require('../repositories/studentRepository');

const studentDoesNotExist = (student) => student.rows.length === 0;

const updatedStudentData = (value, student) => {
    const firstName = value.firstName ?? student.first_name;
    const lastName = value.lastName ?? student.last_name;
    const phone = value.phone ?? student.phone;
    const email = value.email ?? student.email;

    return { firstName, lastName, phone, email };
};

const getStudents = async (req, res) => {
    try {
        const result = await findAllStudents();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const createStudent = async (req, res) => {
    try {
        const { error, value } = createStudentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const { firstName, lastName, phone, email } = value;
        const result = await createNewStudent(firstName, lastName, phone, email);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to create student" });
    }
};

const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = updateStudentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const currentStudent = await pool.query("SELECT * FROM students WHERE id=$1", [id]);

        if (studentDoesNotExist(currentStudent)) {
            return res.status(404).json({ error: "Student not found" });
        }

        const { firstName, lastName, phone, email } = updatedStudentData(value, currentStudent.rows[0]);
        const result = await updateStudentDetails(firstName, lastName, phone, email, id);
        
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to update student" });
    }
};

module.exports = { getStudents, createStudent, updateStudent };