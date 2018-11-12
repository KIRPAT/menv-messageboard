# menv-messageboard (WIP)
A MongoDB-ExpressJS-NodeJS-VueJS messageboad app.

This app is not monolithic like most of the web apps. Front-end and back-end are seperated. They are independant services. Which means, you can write yourself, for example, a mobile application using the server API. And you don't have to touch on a single line of code from the client or the server. Cool, right?

**Note:** This project has been written without caring about the ***design patterns.*** After finishing up everything, we will focus on that, and gonna release it on a different branch. 

##### we have three services 
* Server: API routes, models, controller logic.
* Client: Client routes, styles, view templates, views.
* Database: MongoDB database.  

### environment.js variables 
Please fill the fields on the "i" constant. 

Try not to hard-code ports, addresses, etc. This makes the app more portable, but also, more vulnerable. Make sure your environment.js file is not accessable by third parties.  

### you need a MongoDB database for this app 
Install it on your system first.
https://www.mongodb.com/

Then, go to your prefered directory in the terminal, and run the following command. MongoDB will automatically generate a database service for you and run it. You can use the same command to run existing servers.  
```
mongod --dbpath <yourDbDirectory> --port <yourPort>
```

### credits
Thanks **CodingGarden with CJ** for his awesome tutorial!

* Check it on: https://www.youtube.com/watch?v=2xIoWm08SBM

I have used it to study MENV work flow. This app is primarily based on his tutorial, but I modified it for my own liking.  