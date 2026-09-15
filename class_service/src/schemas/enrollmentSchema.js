const Joi = require("joi");

const enrollmentSchema = Joi.object({
    studentId: Joi.number().integer().positive().required(),
    classId: Joi.number().integer().positive().required()
});

module.exports = { enrollmentSchema };