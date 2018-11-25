/*
NOTE_1: I wanted Joi schemes to be seperated. 
They are in the "/server/database/schemas"
I like it when the stuff are plug and play.
The same code can be modified and used in a 
different project without much editing. 

Note_2: I will stop using MonkJS. 
From now on, native mongodb client alone will be handling the CRUD. (No Mongoose, we already got Joi for schemas.)
I'm doing this to further understand how JS promises work, and to practice it while coding.
Thus, the model codes are going to be different from the v1.0.  

Note_3: All the following CRUD functions are going to return a promise, 
so that we can use their data in the respective route modules
Note thet every promise can return 2 things, (data, error)
".then", handles the data, 
  you gotta name that data however you wish. 
  Like; .then(yoloData => console.log(yoloData))
".catch", handles the error.
if there are no errors, ".then" works.
if there is one, ".catch" kicks in. 
*/

//Schema Validators
const Joi = require('joi'); //Even though the schemes are not here, we still need Joi for validations.
const messageSchema = require('../database/schemas/messageSchema');
//Database Connections
const database = require('../database/connection');
  //Shortcutting connection strings.
  const messageCollection = database.mongodb
  .then(client => client.db("messageBoard").collection("messages"))
  .catch(console.log("Database: messageBoard.messageCollection failed!"));
  const mongodb = database.mongodb; //Gonna delete this one later.
const ObjectID = require('mongodb').ObjectID;


//-----------------------------------------------------------
/*Note: Here will be some TESTS. 
I will keep them here for reference. 
Each one is self contained, and do operations
only on the "test" database and "testCollection" collection.
*/
const testCollection = database.mongodb.then(client => client 
  .db("test").collection("testCollection")  
).catch(console.log("Database: test.testCollection failed!"))
/*

//TEST_1 (FIND)
var test;
testCollection.then(docs => docs
  .find()
  .toArray(
    function(err, myDocs) {
      console.log("Mongo Find Test")
      if(err){console.log(err)}
      else console.log(myDocs)
    }
  )  
)
.then(docs => test=docs)
console.log(typeof test)
console.log(test)
*/

//TEST_2 (DELETE)
/*
var led = "5bfb26fc06cceca65f2833b2";
var query = {"_id": new ObjectID(led)}
testCollection.then(client => client
  .deleteOne()  
).then(doc => console.log(doc.result))
*/

//-------------------------------------------------------------

//////////////////////////
//Message CRUD Functions//
//////////////////////////
//GETS ALL MESSAGES with a QUERY, the query can be "null" -> {}
function getAllMessages(){
  return messageCollection.then(client => client
    .find({},{ projection: {}})
    .toArray()
    /*
    Note: I will limit the document size that this function returns. 
    Returning all of the messages is.. a bit much. 
    Further data optimization is required.
    */
  )
};

//CREATES A MESSAGE 
function createMessage(messageContent) {
  //Validates the JSON according to schema, returns error or null.
  const result = Joi.validate(messageContent, messageSchema.createMessage);
  if (result.error == null) 
    return messageCollection.then(client => client
      .insert(messageContent)
      /*
      Note: insert vs. insertOne
      insert -> returns insertion success status + inserted document + inserted count + "_id" values of inserted documents.
      insertOne -> returns insertion success status
      */
    ) 
  else 
    return Promise.reject(result.error)
}

//UPDATES A MESSAGE (with _id)
function updateMessage(newValues){
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
    console.log(set); //lets see if the set values are looking good or not
    return messageCollection.then(client => client
      .findOneAndUpdate(query, set)
      /*
      Returns the not-edited message.  
      We can push that data into an array, store it in the DB,
      and finally fetch it to show an edit history on the client. 
      #FacebookStyle   
      */    
    )
  } 
  else{ 
    return Promise.reject(result.error)
  }  
}
//DELETE A MESSAGE (with _id)
function deleteMessage(msgID){
  const query = {_id: new ObjectID(msgID)}
  return messageCollection.then(client => client
    .deleteOne(query)
    /*
    Note: Returns lots of stuff. "result" alone is enough is 
    */
  )
}

/////END//////////////////
//////////////////////////

module.exports = {
  createMessage,
  getAllMessages,
  updateMessage,
  deleteMessage,
};