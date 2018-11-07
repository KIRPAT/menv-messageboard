//imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//model import
const messages = require('./models/messages')

//express assignment
const app = express();

//express-middleware assignments
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

///////////////////
//Main API Routes//
app.get('/', (req, res) => {
    res.json({
        message: 'Full stack message board!'
    });
});

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
/////////end/////////
/////////////////////

//We choose the port here, but the hosting method may decide it for us.
const port = process.env.PORT || 4789;
app.listen(port, () => {
    console.log('listening on: ' + port);
});