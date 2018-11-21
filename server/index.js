//imports
const express = require('express'); //the framework
const cors = require('cors'); //google it, no time to explain
const bodyParser = require('body-parser'); //self explanatory
const morgan = require('morgan'); //Logs incoming requests

//assigning express to an object named app
const app = express();

//express-middleware assignments
app.use(morgan('tiny'));
app.use(cors()); //Lets the client talk to server
app.use(bodyParser.json());

//Database connection
//I would like to establish connection 
//when the app starts and use a connection pooll


///////////////////
//Main API Routes//

//HOME
app.get('/', (req, res) => {
    res.json({
        message: 'Wellcome to Messageboard API. (WIP)'
    });
});

//MESSAGE
//importing messagesRoutes from the directory.
const messageRoutes = require('./routes/messageRoutes');
//This is a Request Handler. 
//This particular middleware directs incoming requests to messageRoutes.
app.use('/message', messageRoutes);

/*ERROR HANDLING
Any request that has a route that,
the ones other than I directed above 
(the routing code I wrote earlier),
will return a predefined error as a response. */
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
///////////////////


//We choose the port here, but the hosting method may decide it for us.
const port = process.env.PORT || 4789;
app.listen(port, () => {
    console.log('Server is listening on: ' + port);
});