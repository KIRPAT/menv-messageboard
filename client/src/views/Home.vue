<!--
This website is built in English. 
You might wanna use markup for different languages. 
Make it dynamic. Import language files from a json, or a js library.
You can even keep languga json in database. 
Fetch them to the database using the "server"
than with an API request, send them to client. 
-->

<!--The Home Page Template-->
<template>
  <div id="msgFeedView">
    
    <!--Form Toggle (Purple Button) -->
    <button @click="showMessageForm = !showMessageForm" type="button" class="btn btn-info" id="frmToggleButton">{{ toggleTextSwitch }}</button>
    <!--Form Stuff-->
    <form v-if="showMessageForm" @submit.prevent="addMessage" id="msgForm">
      <!--Alert (if there is a validation error)-->
      <div v-if="error && showError" class="alert alert-dismissible alert-warning">
        <button @click="showError =false" type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Ups!</h4>
        <p class="mb-0">Something went wrong: <a href="#" class="alert-link">{{error}}</a>.</p>
      </div>
      <!--The Actual Form-->
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="msgFormUsername" placeholder="Who might you be?" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="message.subject" type="text" class="form-control" id="msgFormSubject" placeholder="What is the message about?" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="msgFormMessage" rows="3" placeholder="Tell us thy message!"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Would you like to include an image? (Optional)</label>
        <input v-model="message.imageURL" type="text" class="form-control" id="msgFormImgURL" placeholder="Paste the image link here.">
      </div>
      <button type="submit" class="btn btn-primary" id="msgFormButton" >Post</button>
    </form>
    <hr>
  
    <!--Messages-->
    <div class="list-unstyled" id="msgFeed" v-for="message in reversedMessages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" id="msgIMG" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h6 class="mt-0 mb-1">{{message.username}}</h6>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br/>
          <small>{{message.created}}</small>
        </div>
      </li>
      <hr>
    </div>
    

  </div>
</template>

<!--Scripts-->
<script>
/*
I tried using an "apiConnections" environment
here to not to hard code anything in the views.
Unfortunately, importing crashed the "cient".
So, I used a cheap workaround. 
Gonna fix that in the future if it's possible. 
*/ 
 //const api = require('../../apiConnections'); //Not working
 const api = {message:'http://localhost:4789/message'}
 
 export default {
  name: 'home',
  //Holds the data (dynamic)
  data: () => ({
    //State Keepers
    showMessageForm: false,
    showError: false,
    //Dynamic Text Holders
    toggleText:"",
    error: "", 
    //Home View - Message Feed is stored here
    messages: [], //the following mounted method will feed this array with data.. yum
    //Message Form Body
    message: { //for creating new messages
      username: 'Anonymous', // defaults to 'Anonymous'
      subject: '',
      message: '',
      imageURL: ''
    }
  }),

  /*
  Operations listed here executed upon state changes.
  I will have a look if we can store functions 
  in the methods and call them from there.
   */ 
  computed:{
    reversedMessages(){
      return this.messages.slice().reverse();
    },

    toggleTextSwitch(){
      if (this.showMessageForm == true){
        return this.toggleText = "Hide the form!"
      }else{
        return this.toggleText = "Fancy a message?"
      }
    },

  },

  //Loads upon receiving the web site
  mounted(){
    fetch(api.message) //fetches the body of api link
    .then(response => response.json()) //turns it into json
    .then(result =>{
      this.messages = result; //populates the messages property in data using the json
      console.log(result); //also logs it in the console
    });
  },
  //Methods to use in the web site. Can be bindend to framework events.
  methods: {
    addMessage() {
      console.log(this.message);
      
      //POST request
      fetch(api.message, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type':'application/json'
        } 
      })
      .then(response => response.json()) //turns it into json
      .then(result =>{
        console.log(result); //also logs it in the console
        if (result.details){ //if the json contained "details", it means there is an error"
           const error = result.details.map(detail => detail.message).join('. ');
           this.error = error;  
           this.showError = true;
        } else{ //if there is no error
          this.error = '' //error is null
          this.showMessageForm = false; //hides the form upon success
          //Sets the form to default
          this.message.username = 'Anonymous';
          this.message.subject = '';
          this.message.imageURL= '';
          this.message.message = '';
          //pushes the result immediately into the "messages" array, 
          //without requiring a refresh of the page. 
          this.messages.push(result); 
        };
      });
    },
  }, 
 };
</script>

<style>
/* element */
hr {
  border-top: 1px solid white;
}

img {
  min-width: 150px;
  max-width: 200px;
  height: auto;
}

/* class */


/* id */

#frmToggleButton{
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}

#msgFeedView{
  align-self: center;
}

#msgForm {
  max-width: 500px;
  min-width: 200px;
}

#msgFormFeed {
  max-width: 500px;
}

#msgFormButton {
  margin-bottom: 1rem;
  justify-content: center 
}

#msgIMG {
  min-width: 200px;
}

#msgFormImgURL {

}
</style>


