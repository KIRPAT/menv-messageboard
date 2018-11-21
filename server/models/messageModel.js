/*
NOTE_1: I wanted Joi schemes to be seperated. 
They are in the "/server/database/schemas"
I like it when the stuff are plug and play.
The same code can be modified and used in a 
different project without much editing. 

Note_2: I will stop using MonkJS. 
Documentation is not easy enough for me to understand.
From now on, mongodb client alone will handle the CRUD. (No Mongoose)
Thus, the model codes are going to be different from the v1.0.
*/

//Schema Validators
const Joi = require('joi'); //Even though schemes are no longer here, we still need Joi for validations.
const messageSchema = require('../database/schemas/messageSchema')
//Database Connections
const database = require('../database/connection')
const mongodb = database.mongodb; 
const ObjectID = require('mongodb').ObjectID

/*
TEST
mongodb
  .then(client => 
    client
      .db('messageBoard')
      .collection('test')
      .find({},{ projection: {_id: 0}})
      .toArray(
        function(err, myDocs) {
          console.log("Mongo Find Test")
          if(err){console.log(err)}
          else console.log(myDocs)
        }
      )
  )
*/  
////////////////////////
//Message CRUD Models//

//GETS ALL MESSAGES with a QUERY, the query can be "null" -> {}
function getAll(){
  return mongodb.then(client => client
    .db('messageBoard')
    .collection('messages')
    .find({},{ projection: {}})
    .toArray()
  )
};

//CREATES A MESSAGE 
function create(messageContent) {
  //Validates the JSON according to schema, returns true or false
  const result = Joi.validate(messageContent, messageSchema.createMessage);
  if (result.error == null) 
    return mongodb.then(promise => promise
      .db("messageBoard")
      .collection("messages")
      .insertOne(messageContent)
    ) 
  else 
    return Promise.reject(result.error)
}

//UPDATES A MESSAGE
//query = ObjectID(_id) || updateContent = subject,message,imgURL
function update(newValues){
  const result = Joi.validate(newValues, messageSchema.editMessage);
  if (result.error == null) {
  console.log("Schema validation passed!")  
  const query = new ObjectID(newValues._id);
  const set = {
    $set: {
      "message" : newValues.message,
      "subject" : newValues.subject,
      "imageURL": newValues.imageURL
    }
  }; 
  console.log(set);
    return mongodb.then(promise => promise
      .db("messageBoard")
      .collection("messages")
      .findOneAndUpdate(query, set)    
    )
  } 
  else 
    console.log({
      message: "Validation Failed",
      error: result.error
    })
    return Promise.reject(result.error)
}

/////END//////////////////
//////////////////////////

module.exports = {
  create,
  getAll,
  update,
};