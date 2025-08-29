const Joi = require("joi");

const createSchema = Joi.object({
    userId: Joi.string().required(),
    cardId: Joi.string().required(),
})

const updateSchema = Joi.object({
    userId: Joi.string(),
    cardId: Joi.string(),
})

module.exports = {
    createSchema,
    updateSchema
}