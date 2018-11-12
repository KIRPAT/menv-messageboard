/*
NOTE: I wanted Joi schemes to be seperated. 
They are in the "/server/database/schemas"
I like it when the stuff are plug and play.
Same code dan be modified and used in a 
different project without much editing. 

Hance the following piece of scheme code
is no longer relevant. I commented and kept 
it for reference.
*/  

/*
const messageSchema = Joi.object().keys({
  username: Joi.string().alphanum().required(),
  subject : Joi.string().required(),
  message : Joi.string().max(500).required(),
  imageURL: Joi.string().uri({
    scheme: [
      /https?/
    ]
  })
});
*/


const db  = require('../database/connection');
const Joi = require('joi');
const messageSchema = require('../database/schemes/messageScheme')
const messages = db.get('messages');

////////////////////////
//Message CRUD Models//

//Gets all messages
function getAll() {
  return messages.find();
};

//Creates a message 
function create(message) {
  //Checks if a username has been entered
  if (!message.username) {
    message.username = 'Anonymous';
  };
  //Validates the JSON according to scheme
  const result = Joi.validate(message, messageSchema);
  //If result is true, creates a message, else throws an error.
  if (result.error == null) {
    message.created = new Date(); 
    return messages.insert(message);
  } else {
    return Promise.reject(result.error);
  }
}
/////END//////////////////
//////////////////////////

module.exports = {
  create,
  getAll
};