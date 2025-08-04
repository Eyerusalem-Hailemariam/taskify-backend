const joi = require('joi');

const userSchema = joi.object({
    username: joi.string().min(3).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(100).required(),
    role: joi.string().valid('user', 'admin').default('user'),
});

module.exports = userSchema;
