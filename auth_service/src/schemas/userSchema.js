const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().trim().min(2).required(),
    password: Joi.string().trim().min(8).required(),
    role: Joi.string().trim().min(2).required()
});

const updateUserSchema = Joi.object({
    username: Joi.string().trim().min(2),
    password: Joi.string().trim().min(8),
    role: Joi.string().trim().min(2)
}).min(1);

module.exports = { userSchema, updateUserSchema };