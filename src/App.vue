<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <github-activity-calendar username="harps116"/>
  </div>
</template>

<script>
import GithubActivityCalendar from "./GithubActivityCalendar.vue";

export default {
  name: "app",
  components: {
    GithubActivityCalendar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
