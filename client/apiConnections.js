/*
For this project, by default, every micro service lives 
in the same server. (same root folder even)
What if we needed to host these services in different servers?
Then, we would had to change API addresses for each hard coded view file. 
Thus, we need an API environment for convenience.    
*/

/*
Note: Since database connection is the job of "server",
no need to include environment info about it here. 
*/

const i = {
  port: {
    server: '4789',
    client: '8080',
  },

  host: {
    local: 'localhost',
    cstm1: '',
    cstm2: '',
    //You can add more...
  },

  misc: {
    https: 'https://',
    http : 'http://'
  } 
};

//This is the "server" address.
const adrsServer = i.misc.http + i.host.local + ':' + i.port.server


//API END-POINTS
const api = {
  getMessages: adrsServer+'/message',
}

module.exports = api;