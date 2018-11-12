//imports
const express = require('express'); //the framework
const cors = require('cors'); //google it, no time to explain
const bodyParser = require('body-parser'); //self explanatory
const morgan = require('morgan'); //Logs incoming requests

/*
Since routes are redirected now, importing models directly to here has no meaning. 
const messages = require('./models/messages')
*/

//express assignment
const app = express();

//express-middleware assignments
app.use(morgan('tiny'));
app.use(cors()); //Lets the client talk to server
app.use(bodyParser.json());

///////////////////
//Main API Routes//
app.get('/', (req, res) => {
    res.json({
        message: 'Wellcome to Messageboard API. (WIP)'
    });
});

//Messages
//importing messagesRoutes from the directory. (I could have named that )
const messageRoutes = require('./routes/messageRoutes');
//This is a Request Handler. 
//This particular middleware directs incoming requests to messagesRoutes.
app.use('/message', messageRoutes);

/*
Following commented codes lives in the ./routes/messagesRoutes.js now.
Hance, there is no need for them here. 

// gets all messages
app.get('/messages', (req, res) => {
    messages.getAll().then((messages) => {
      res.json(messages);
    });
  });

// posts/inserts a message into the database
app.post('/messages', (req, res) => {
    console.log(req.body);
    messages.create(req.body)
    .then((message) => {
       res.json(message);
    })
    .catch((error) => {
    res.status(500);
    res.json(error);
    });
});
*/

//ERROR HANDLING
//Any request that has a route that,
//the ones other than I directed above (the code I wrote earlier),
//will return a predefined error as a response.
app.use((req, res, next) =>{
    //Error is a default object, no need to import.
    const error = new Error('Not found, chump :3');
    error.status = 404;
    next(error); //re-directs to error request
  
  });
  
  app.use((error, req, res, next) => {
    //Either 404 or 500
    res.status(error.status || 500);
    res.json({
      error:{
        message: error.message //'Not found, chump :3'
      }
    });
  });
/////////end/////////
/////////////////////

//We choose the port here, but the hosting method may decide it for us.
const port = process.env.PORT || 4789;
app.listen(port, () => {
    console.log('Server is listening on: ' + port);
});