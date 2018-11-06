const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'full stack message board!'
    });
});

//We choose the port here, but the hosting method may decide it for us.
const port = process.env.PORT || 4789;
app.listen(port, () => {
    console.log('listening on: ' + port);
});