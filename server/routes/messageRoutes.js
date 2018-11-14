/*
Let's explain a few stuff here. In this router, we handle database operations. Basically CRUD.
To that end, we don just need routes, we also need pre defined operations too, a.k.a "models"
So that we can use those model instances in the routes without writing them again and again and again...
I could have definded those models here, but that would be hard coding. What if I needed that model in an another route?
Am I really gonna export those models from here and import this entire route into yet another route just to use models?
<"Oh, no, no, no..">
So, I decided on creating a subfolder dedicated only to models. 
*/

const express = require('express');

//"router" is like a sub package of express.
//I don't want to type "express.Router().blaBlaBla" every time, so...
const router = express.Router(); 

//model import
const messages = require('../models/messageModel')

////////////
///ROUTES///

// GET - Gets all messages.(We will work on this later. I mean... ALL MESSAGES!!! We need an Ajax code here.)
router.get('/', (req, res) => {
    messages.getAll().then(messages => {
      res.json(messages);
    });
  });

// POST - Posts/Inserts a message into the database
router.post('/', (req, res) => {
  //Let's log the incoming message content.  
  console.log(req.body);
  //Then, we can do the database insertion.
  messages.create(req.body)
  .then((message) => {
       res.json(message); //save the request body into "message" variable
  })
  .catch((error) => {
  res.status(500);
  res.json(error);
  });
});

/////END/////
/////////////

//By exporting the router, I'm actually exporting every route operation. So that index.js can use it. 
module.exports = router;