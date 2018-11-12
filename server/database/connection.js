const env = require('../../environment');
const db = require('monk')(env.adrs.db.msg);

db.then(() => {
    console.log('Database connection has been established.')
  })

module.exports = db;