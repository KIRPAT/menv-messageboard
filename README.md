# menv-messageboard
A MongoDB-ExpressJS-NodeJS-VueJS messageboad app.

This app has three services.
Server: API routes, models, controller logic.
Client: Client routes, styles, view templates, views.
Database: MongoDB database. 

As you can see front-end and back-end are different micro services. 

### environment.js variables 
Please fill null fields of "const i". 

Try not to hard-code ports, adresses, etc. This makes the app more portable. 

### you need a MongoDB database for this app 
Install it on your system first.
https://www.mongodb.com/

Then, go to your prefered directory in the terminal, and run the following command. MongoDB will automatically generate a database service for you and run it. You can use the same command to run existing servers.  
```
mongod --dbpath <yourDbDirectory> --port <yourPort>
```

### credits
Thanks CodingGarden for this awesome tutorial on https://www.youtube.com/watch?v=2xIoWm08SBM.

This app has been based on that tutorial. Some stuff has been changed and made easier to understand for beginners. Please take a look at README files for each micro service. 

Namely; client, server. Databesa part has already been covered here. 

  
