/*
Note_1: In this router, we handle database operations. Basically CRUD.
To that end, we don't just need routes, we also need pre-defined CRUD functions, a.k.a "models"
So that we can use those model instances in the routes without writing them again and again and again...
I could have definded those models here, but that would be hard coding. What if I needed that model in an another route?
Am I really gonna export those models from here and import this entire route into yet another route just to use some models?
<"Oh, no, no, no..">
So, I decided on creating a subfolder dedicated only to models. 

Note_2: To use template literals you need to know the difference between these three bad boys: "",'',``.
You can use all of them to define strings, but the last one, back tick, lets you use temlate literals: `${yolo}`
*/



const express = require('express');
//"router" is like a sub package of express.
//I don't want to type "express.Router().blaBlaBla" every time, so...
const router = express.Router(); 
//model import
const messageModel = require('../models/messageModel')
//-----------------------------------------------------------------------
////////////
///ROUTES///

// GET - Gets all messages.
router.get('/', (req, res) => {
    messageModel.getAllMessages()
    .then(dbResponse => {
      res.json(dbResponse);
    });
  });

// POST - Posts/Inserts a message into the database
router.post('/', (req, res) => {
  //Since Morgan logs the request types for us already, I will only log the request body here.  
  console.log(req.body); 
  messageModel.createMessage(req.body)
    .then(dbResponse => {
      //save the create operation response into "response" variable
      console.log(`Created this: `)
      res.json(dbResponse); 
    })
    .catch(error => {
      res.status(500);
      res.json(error);
    });
});

// PATCH - Updates an existing message.
router.patch('/', (req, res) => {
  console.log(req.body);
  messageModel.updateMessage(req.body)
    .then(dbResponse => {
      console.log("Validation is ok, but is the update successful?");
      console.log(dbResponse);
      res.json(dbResponse.value);
    })
});

router.delete('/', (req, res) =>{
  console.log(`Delete request received for the document id: ${req.body._id}`)
  messageModel.deleteMessage(req.body._id)
    .then( dbResponse => {
      console.log("Delete operation is successful!");
      console.log(dbResponse.result);
      res.json(dbResponse.result);
    })
    .catch(error =>{
      console.log()
      res.status(500);
      res.json(error)
    })
});
/////END/////
/////////////
//----------------------------------------------------------------------------

//By exporting the router, I'm actually exporting every route operation. So that index.js can use it. 
module.exports = router;