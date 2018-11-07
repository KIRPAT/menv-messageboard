const env = require('../../environment');
const db = require('monk')(env.adrs.db.msg);

module.exports = db;