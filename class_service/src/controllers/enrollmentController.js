const config = require('../config/config');

const { enrollmentSchema } = require('../schemas/enrollmentSchema');
const { getClassById } = require('../repositories/classRepository');
const {
    createEnrollment: createEnrollmentRepository,
    getEnrollmentsByStudent: getEnrollmentsByStudentRepository,
    getStudentsIdsByClass: getStudentsIdsByClassRepository,
    getEnrollment,
    deleteEnrollment: deleteEnrollmentRepository
} = require('../repositories/enrollmentRepository');

const zeroRows = (result) => result.length === 0;

const fetchStudent = async (studentId) => {
    try {
        const response = await fetch(`http://${config.host}:${config.services.student.port}/students/${studentId}`);
        const result = await response.json();
        if (!response.ok) {
            return { status: response.status, error: result.error };
        }
        return { status: 200, data: result };
    } catch (error) {
        return { status: 503, error: 'Student service is currently unavailable' }
    }
};

const createEnrollment = async (req, res) => {
    try {
        const { error, value } = enrollmentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const studentError = await fetchStudent(value.studentId);

        if (studentError.status !== 200) {
            return res.status(studentError.status).json({ error: studentError.error });
        }

        const classResponse = await getClassById(value.classId);

        if (zeroRows(classResponse)) {
            return res.status(404).json({ error: "Class not found" });
        }

        const { studentId, classId } = value;
        const result = await createEnrollmentRepository(studentId, classId);

        return res.status(201).json({ message: "Student added to class", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to create enrollment" });
    }
};

const getEnrollmentsByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const studentError = await fetchStudent(studentId);

        if (studentError.status !== 200) {
            return res.status(studentError.status).json({ error: studentError.error });
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

        if (zeroRows(classResponse)) {
            return res.status(404).json({ error: "Class not found" });
        }

        const enrollments = await getStudentsIdsByClassRepository(classId);

        if (zeroRows(enrollments)) {
            return res.status(200).json({ message: "Class does not have students", result: [] });
        }

        const result = [];

        for (const enrollment of enrollments) {
            const student = await fetchStudent(enrollment.student_id);
            if (student.status === 200) {
                result.push(student.data);
            } 
        }

        return res.status(200).json({ message: "Enrollments were loaded successfully", result });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch enrollments" });
    }
};

const deleteEnrollment = async (req, res) => {
    const { classId, studentId } = req.params;

    const classResponse = await getClassById(classId);

    if (zeroRows(classResponse)) {
        return res.status(404).json({ error: "Class not found" });
    }

    const studentError = await fetchStudent(studentId);

    if (studentError.status !== 200) {
        return res.status(studentError.status).json({ error: studentError.error });
    }

    const enrollment = await getEnrollment(classId, studentId);

    if (zeroRows(enrollment)) {
        return res.status(404).json({ error: "Enrollment not found" });
    }

    const result = await deleteEnrollmentRepository(classId, studentId);

    return res.status(200).json({ message: "Enrollment deleted" });
};

module.exports = { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass, deleteEnrollment };