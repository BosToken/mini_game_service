const Joi = require("joi");

const createSchema = Joi.object({
    level: Joi.number().max(100).required(),
    cardId: Joi.string().required(),
    rarityId: Joi.string().required(),
    roleId: Joi.string().required(),
    atk: Joi.number().required(),
    health: Joi.number().required()
})

const updateSchema = Joi.object({
    level: Joi.number().max(100),
    cardId: Joi.string(),
    rarityId: Joi.string(),
    roleId: Joi.string(),
    atk: Joi.number(),
    health: Joi.number()
})

module.exports = {
    createSchema,
    updateSchema
}