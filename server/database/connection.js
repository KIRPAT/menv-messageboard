const env = require('../../environment');
const apiTools = require('../apiTools')
/*
Remote servers usually have thair own environment values. Like ports and IP addresses. 
"the upcoming first line of the code" checks those values. If they exist, 
our server establishes the connection using those.
Otherwise, localhost:<port> kicks in.
*/

//MONGODB - messageBoard
//const messagesDbAddress = 'mongodb://'+(process.env.MONGODB_URI || env.adrs.db.msg);
const messagesDbAddress = 'mongodb://localhost:6987/'
const MongoClient = require('mongodb').MongoClient;

//Created and assigned the connection to a global variable. Default mongodb pool size is 5, but we can declare it otherwise it.
var mongodb = MongoClient.connect(messagesDbAddress /*,{poolSize:25}*/,{useNewUrlParser:true});
const connectionDate = apiTools.metaData().date;
console.log("\nConnected to mongoDB at: "+connectionDate.fulldate);

/*
//TEST
//If you wanna use the "_id" as a query, 
//you the "_id" as an object called ObjectID, not as a string.
const ObjectID = require('mongodb').ObjectID; 
mongodb.then(promise => promise
  .db("test")
  .collection("testCollection")
  .find({})
  .toArray()
  .then(result => console.log(result))
)

const obj_id = new ObjectID("5bf561e706cceca65f2804aa")
const query= {"_id":obj_id};
const set = {$set:{"yolo":"heyo"}}
mongodb.then(promise=>promise
  .db("test")
  .collection("testCollection")
  .findOneAndUpdate(query, set)
)
*/

//Meta Logger
mongodb.then(promise => promise
  .db("messageBoard")
  .collection("META")
  .insertOne(connectionDate, 
    (err, res) => {
      if (err) console.log(err)
      else console.log("Database connection has been logged at: " +res.ops[0].fulldate)  
    }
  )
)



/*
TEST
Gonna keep for reference.  
mongodb
  .then(myPromise => 
    myPromise
      .db('messageBoard')
      .collection('test')
      .find({})
      .toArray(
        function(err, docs) {
          if(err){console.log(err)}
          else console.log(docs)
        }
      )
  )
*/
module.exports = {mongodb, connectionDate};