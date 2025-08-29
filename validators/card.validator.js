const Joi = require("joi");

const createSchema = Joi.object({
    characterId: Joi.string().required(),
})

const updateSchema = Joi.object({
    characterId: Joi.string(),
})

module.exports = {
    createSchema,
    updateSchema
}