const Joi = require("joi");

const createSchema = Joi.object({
    name: Joi.string().max(50).required(),
    description: Joi.string().max(200).required(),
    rate: Joi.number().required(),
    minAtk: Joi.number().required(),
    maxAtk: Joi.number().required(),
    minHealth: Joi.number().required(),
    maxHealth: Joi.number().required(),
})

const updateSchema = Joi.object({
    name: Joi.string().max(50),
    description: Joi.string().max(200),
    rate: Joi.number(),
    minAtk: Joi.number(),
    maxAtk: Joi.number(),
    minHealth: Joi.number(),
    maxHealth: Joi.number(),
})

module.exports = {
    createSchema,
    updateSchema
}