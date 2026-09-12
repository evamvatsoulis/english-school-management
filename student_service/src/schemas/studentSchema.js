const Joi = require("joi");

const createStudentSchema = Joi.object({
    firstName: Joi.string().trim().min(2).max(100).required(),
    lastName: Joi.string().trim().min(2).max(100).required(),
    phone: Joi.string().trim().max(30).allow("", null),
    email: Joi.string().trim().email().allow("", null)
});

module.exports = { createStudentSchema };