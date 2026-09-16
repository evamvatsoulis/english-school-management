const { studentSchema, updateStudentSchema } = require('../schemas/studentSchema');
const {
    getStudentById,
    getStudents: getStudentsRepository,
    createStudent: createStudentRepository,
    updateStudent: updateStudentRepository,
    deactivateStudent: deactivateStudentRepository,
    activateStudent: activateStudentRepository,
} = require('../repositories/studentRepository');

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
        const result = await getStudentsRepository();
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch students" });
    }
};

const createStudent = async (req, res) => {
    try {
        const { error, value } = studentSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ err: error.details[0].message });
        }

        const { firstName, lastName, phone, email } = value;
        const result = await createStudentRepository(firstName, lastName, phone, email);

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

        const currentStudent = await getStudentById(id);

        if (studentDoesNotExist(currentStudent)) {
            return res.status(404).json({ error: "Student not found" });
        }

        const { firstName, lastName, phone, email } = updatedStudentData(value, currentStudent.rows[0]);
        const result = await updateStudentRepository(firstName, lastName, phone, email, id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to update student" });
    }
};

const deactivateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const currentStudent = await getStudentById(id);

        if (studentDoesNotExist(currentStudent)) {
            return res.status(404).json({ error: "Student not found" });
        }

        const result = await deactivateStudentRepository(id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to deactivate student" });
    }
};

const activateStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const currentStudent = await getStudentById(id);

        if (studentDoesNotExist(currentStudent)) {
            return res.status(404).json({ error: "Student not found" });
        }

        const result = await activateStudentRepository(id);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ error: "Failed to activate student" });
    }
};

module.exports = { getStudents, createStudent, updateStudent, deactivateStudent, activateStudent };