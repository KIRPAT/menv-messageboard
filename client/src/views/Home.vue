<!--This website ie built in English You might wanna use markup for different languages. Make it dynamic.-->

<!--The Page Template-->
<template>
  <div id="msgFeedView">
        
    <!--Form--> 
    <form id="msgForm">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username" placeholder="Who might you be?">
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" class="form-control" id="subject" placeholder="What is the message about?">
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea class="form-control" id="message" rows="3" placeholder="Tell us thy message!"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Would you like to include an image? (Optional)</label>
        <input type="text" class="form-control" id="subject" placeholder="Paste the image link here.">
      </div>
    </form>

    <!--Messages-->
    <div class="list-unstyled" id="msgFeed" v-for="message in messages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
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
An API connections environment has been used 
here to not to hard code anything in the views.
*/
 const api = require('../../apiConnections');

 export default {
  name: 'home',
  
  data: () => ({
    messages: [], //the following mounted method will feed this array with data
    message: { //for creating new messages
      username: 'Anonymous', // defaults to 'Anonymous'
      subject: '',
      message: '',
      imageURL: '',

    }
  }),

  mounted(){
    fetch(api.getMessages) //fetches the body of api link
    .then(response => response.json()) //turns it into json
    .then(result =>{
      this.messages = result; //populates the messages property in data using the json
      console.log(result); //also logs it in the console
    });
  },

  methods: {
    addMessage(){

    }
  },
 };
</script>

<style>
#msgFeedView{
  align-self: center;
}


hr {
  border-top: 1px solid white;
}

img {
  max-width: 300px;
  height: auto;
}

#msgForm {
  max-width: 500px;
}

#msgFeed {
  max-width: 500px;
}

</style>


