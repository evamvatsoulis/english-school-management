const Joi = require("joi");

const paymentSchema = Joi.object({
    studentId: Joi.number().integer().positive().required(),

    amount: Joi.number().positive().precision(2).required(),

    paymentMonth: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required(),

    paymentYear: Joi.number()
        .integer()
        .min(2000)
        .max(2100)
        .required(),

    paymentDate: Joi.date().required(),

    paymentMethod: Joi.string()
        .trim()
        .max(50)
        .allow("", null),

    notes: Joi.string()
        .trim()
        .max(500)
        .allow("", null)
});

const updatePaymentSchema = Joi.object({
    studentId: Joi.number().integer().positive(),

    amount: Joi.number().positive().precision(2),

    paymentMonth: Joi.number()
        .integer()
        .min(1)
        .max(12),

    paymentYear: Joi.number()
        .integer()
        .min(2000)
        .max(2100),

    paymentDate: Joi.date(),

    paymentMethod: Joi.string()
        .trim()
        .max(50)
        .allow("", null),

    notes: Joi.string()
        .trim()
        .max(500)
        .allow("", null)
}).min(1);

module.exports = { paymentSchema, updatePaymentSchema };