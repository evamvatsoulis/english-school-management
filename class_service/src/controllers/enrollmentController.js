const { enrollmentSchema } = require('../schemas/enrollmentSchema');
const { createEnrollment: createEnrollmentRepository } = require('../repositories/enrollmentRepository');

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

module.exports = { createEnrollment };