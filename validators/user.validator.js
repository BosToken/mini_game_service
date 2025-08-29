const Joi = require("joi");

const createSchema = Joi.object({
  username: Joi.string().max(30),
  email: Joi.string(),
  password: Joi.string(),
  discordId: Joi.string(),
});

const updateSchema = Joi.object({
    username: Joi.string().max(30),
    email: Joi.string(),
    password: Joi.string(),
    discordId: Joi.string()
})

module.exports = {
    createSchema,
    updateSchema
}