//imports
const Joi = require('joi');

//Scheme
const messageSchema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject : Joi.string().required(),
    message : Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
      scheme: [
        /https?/
      ]
    }).optional()
});

module.exports = messageSchema;