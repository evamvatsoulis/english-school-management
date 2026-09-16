const Joi = require("joi");

const studentSchema = Joi.object({
    firstName: Joi.string().trim().min(2).required(),
    lastName: Joi.string().trim().min(2).required(),
    phone: Joi.string().trim().allow("", null),
    email: Joi.string().trim().email().allow("", null)
});

const updateStudentSchema = Joi.object({
    firstName: Joi.string().trim().min(2),
    lastName: Joi.string().trim().min(2),
    phone: Joi.string().trim().allow("", null),
    email: Joi.string().trim().email().allow("", null)
}).min(1);

module.exports = { studentSchema, updateStudentSchema };