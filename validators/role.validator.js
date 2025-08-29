const Joi = require("joi");

const createSchema = Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(200).required(),
})

const updateSchema = Joi.object({
    name: Joi.string().max(50),
    description: Joi.string().max(200)
})

module.exports = {
    createSchema,
    updateSchema
}