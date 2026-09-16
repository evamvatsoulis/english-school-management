const config = require('../config/config');

const { enrollmentSchema } = require('../schemas/enrollmentSchema');
const { getClassById } = require('../repositories/classRepository');
const {
    createEnrollment: createEnrollmentRepository,
    getEnrollmentsByStudent: getEnrollmentsByStudentRepository,
    getStudentsIdsByClass: getStudentsIdsByClassRepository
} = require('../repositories/enrollmentRepository');

const zeroRows = (result) => result.length === 0;

const fetchStudent = async (studentId) => await fetch(`http://${config.host}:${config.studentServicePort}/students/${studentId}`);

const createEnrollment = async (req, res) => {
    try {
        const { error, value } = enrollmentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const studentResponse = await fetchStudent(value.studentId);

        if (!studentResponse.ok) {
            return res.status(studentResponse.status).json(await studentResponse.json());
        }

        const classResponse = await getClassById(value.classId);

        if (!classResponse) {
            return res.status(404).json({ error: "Class not found" });
        }

        const { studentId, classId } = value;
        const result = await createEnrollmentRepository(studentId, classId);

        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to create enrollment" });
    }
};

const getEnrollmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const studentResponse = await fetchStudent(studentId);

        if (!studentResponse.ok) {
            return res.status(studentResponse.status).json(await studentResponse.json());
        }

        const result = await getEnrollmentsByStudentRepository(studentId);

        if (zeroRows(result)) {
            return res.status(404).json({ error: "Student has no enrollments" });
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch enrollments" });
    }
};

const getEnrollmentsByClass = async (req, res) => {
    try {
        const { classId } = req.params;

        const classResponse = await getClassById(classId);

        if (!classResponse) {
            return res.status(404).json({ error: "Class not found" });
        }

        const enrollments = await getStudentsIdsByClassRepository(classId);

        if (zeroRows(enrollments)) {
            return res.status(404).json({ error: "Class does not have students" });
        }

        const result = [];

        for(const enrollment of enrollments) {
            const student = await fetchStudent(enrollment.student_id);
            result.push(await student.json());
        }

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

module.exports = { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass };