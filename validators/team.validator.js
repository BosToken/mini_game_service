const Joi = require("joi");

const createSchema = Joi.object({
    userId: Joi.string().required(),
    cardId: Joi.array().max(3),
})

const updateSchema = Joi.object({
    cardId: Joi.array().max(3)
})

module.exports = {
    createSchema,
    updateSchema
}