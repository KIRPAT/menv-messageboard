const monk = require('monk');
const connectionString =  environment.env.db;
const db = monk(connectionString);

module.exports = db;