const { enrollmentSchema } = require('../schemas/enrollmentSchema');
const {
    createEnrollment: createEnrollmentRepository,
    getEnrollmentsByStudent: getEnrollmentsByStudentRepository,
    getEnrollmentsByClass: getEnrollmentsByClassRepository
} = require('../repositories/enrollmentRepository');

const zeroRows = (result) => result.length === 0;

const createEnrollment = async (req, res) => {
    try {
        const { error, value } = enrollmentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const { studentId, classId } = value;
        const result = await createEnrollmentRepository(studentId, classId);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getEnrollmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const result = await getEnrollmentsByStudentRepository(studentId);

        if(zeroRows(result)) {
            return res.status(404).json({ error: "Student not found or student does not have enrollments" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const getEnrollmentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;
        const result = await getEnrollmentsByClassRepository(classId);

        if(zeroRows(result)) {
            return res.status(404).json({ error: "Class not found or student does not have students" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass };