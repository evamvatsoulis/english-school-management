const Joi = require("joi");

const classSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .required(),

    schoolYear: Joi.string()
        .pattern(/^\d{4}-\d{4}$/)
        .required()
});

const updateClassSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2),

    schoolYear: Joi.string()
        .pattern(/^\d{4}-\d{4}$/)
}).min(1);

module.exports = { classSchema, updateClassSchema };