//imports
const Joi = require('joi');

//Scheme
const createMessage = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject : Joi.string().required(),
    message : Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
      scheme: [
        /https?/
      ]
    })
});

const editMessage = Joi.object().keys({
  _id     : Joi.string().required(),
  subject : Joi.string().required(),
  message : Joi.string().max(500).required(),
  imageURL: Joi.string().uri({
    scheme: [
      /https?/
    ]
  }).required()
});



module.exports = { createMessage, editMessage };