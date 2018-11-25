//Please write your own ports and variables here. 
//I prefer not to hard code variables.

//Connection String Building Blocks
const i = {
    port: {
    server: '4789',
    client: '8080',
    database: '6987',
    },
    host: {
        local: 'localhost',
        cstm1: '',
        cstm2: '',
        //You can add more...
    },
    dbName: {
        db1: 'messageBoard',
        db2: 'users',
        db3: ''
    }
};

// Easy way!
const env = {
    //connection addresses and ports
    adrs :{
        //instead of "local", you might wanna use "cstm1" etc. here
        srv  : i.host.local+":"+i.port.server,
        clnt : i.host.local+":"+i.port.client,
        db   : {
            def: i.host.local+":"+i.port.database,
            msg: i.host.local+":"+i.port.database+"/"+i.dbName.db1,
            usr: i.host.local+":"+i.port.database+"/"+i.dbName.db2,
        }  
    },
    prt :{
        srv  : i.port.server,
        clnt : i.port.clnt,
        db   : i.port.database 
    },
};

module.exports = env;