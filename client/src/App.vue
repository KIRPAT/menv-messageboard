<!--
This is a single page application. The whole app lives here. 
Only the views inside this page change.

I will be working on dynamic URLs and Google indexing in the future.
-->

<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar">
      <a class="navbar-brand" href="" id="home-button">MEME MESSAGEBOARD!</a>
    </nav>
    <router-view class="container" id="feed"/>
  </div>
</template>

<style>
#navbar{
  min-width: 500px;
}
#feed {
  max-width: 500px;
}
</style>