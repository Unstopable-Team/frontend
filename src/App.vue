<template>
  <div id="app" class="w-screen h-screen">
    <router-view></router-view>
  </div>
</template>

<script>

import constants from "@/constants";

export default {
  name: 'App',
  mounted() {
    let self = this;
    setInterval(function(){
      console.log("Refreshing notifications")
      self.$store.dispatch('getNewData')
    }, constants.NOTIFICATIONS_REFRESH_RATE * 1000);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
