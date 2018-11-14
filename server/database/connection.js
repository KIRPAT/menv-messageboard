const env = require('../../environment');

/*
Remote servers usually have thair own environment values. Like ports and IP addresses. 
Next line first checks those values. If they exist, our server establishes the connection using those.
Otherwise, localhost:<port> kicks in
*/
const db = require('monk')(process.env.MONGODB_URI || env.adrs.db.msg);

db.then(() => {
    console.log('Database connection has been established.')
  })

module.exports = db;