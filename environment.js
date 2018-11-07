//I prefer not to hard code variables.

//Please write your own ports and variables here. 
const i = {
    port={
    server: '',
    client: '',
    database: '',
    },
    host: {
        local: 'localhost',
        cstm0: '',
        cstm1: '',
        //You can add more...
    },
};

const env = {
    address ={
        srv  = i.host.local+":"+i.port.server,
        clnt = i.host.local+":"+i.port.client,
        db   = i.host.local+":"+i.port.database  
    },
    port ={
        srv  = i.port.server,
        clnt = i.port.clnt,
        db   = i.port.database 
    },
};

module.exports = {env};