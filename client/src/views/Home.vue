<template>
  <div>
    <ul class="list-unstyled">
      <li class="media" v-for="message in messages" :key="message._id">
        <img class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h5 class="mt-0 mb-1">{{message.username}}</h5>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br/>
          <small>{{message.created}}</small>
         </div>
      </li>
    </ul>
  </div>
</template>

<script>
/*
An API connections environment has been used 
here to not to hard code anything in the views.
*/
 const api = require('../../apiConnections');

 export default {
   name: 'home',
  
  data: () => ({
    messages: [],
  }),

  mounted(){
    fetch(api.getMessages) //fetches the body of api link
    .then(response => response.json()) //turns it into json
    .then(result =>{
      this.messages = result; //populates the messages property in data using the json
      console.log(result); //also logs it in the console
    });
  },
 };
</script>

<!--
If you haven't stored anything in the messages database before, 
you will not see anything here.
-->

