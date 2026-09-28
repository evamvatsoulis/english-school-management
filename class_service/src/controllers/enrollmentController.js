const { enrollmentSchema } = require('../schemas/enrollmentSchema');
const { getClassById } = require('../repositories/classRepository');
const {
    createEnrollment: createEnrollmentRepository,
    getEnrollmentsByStudent: getEnrollmentsByStudentRepository,
    getEnrollmentsByClass: getEnrollmentsByClassRepository,
    getEnrollment,
    deleteEnrollment: deleteEnrollmentRepository
} = require('../repositories/enrollmentRepository');

const notFound = (result) => result.length === 0;

const createEnrollment = async (req, res) => {
    try {
        const { error, value } = enrollmentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const classResponse = await getClassById(value.classId);

        if (!classResponse) {
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

        const result = await getEnrollmentsByStudentRepository(studentId);

        if (notFound(result)) {
            return res.status(200).json({ message: "Student has no enrollments", result: [] });
        }

        return res.status(200).json({ message: "Student enrollments loaded", result });
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

        const enrollments = await getEnrollmentsByClassRepository(classId);

        if (notFound(enrollments)) {
            return res.status(200).json({ message: "Class does not have students", result: [] });
        }

        return res.status(200).json({ message: "Enrollments loaded successfully", result: enrollments });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch enrollments" });
    }
};

const deleteEnrollment = async (req, res) => {
    const { classId, studentId } = req.params;

    const classResponse = await getClassById(classId);

    if (!classResponse) {
        return res.status(404).json({ error: "Class not found" });
    }

    const enrollment = await getEnrollment(classId, studentId);

    if (!enrollment) {
        return res.status(404).json({ error: "Enrollment not found" });
    }

    await deleteEnrollmentRepository(classId, studentId);

    return res.status(200).json({ message: "Enrollment deleted" });
};

module.exports = { createEnrollment, getEnrollmentsByStudent, getEnrollmentsByClass, deleteEnrollment };