<template>
  <div id="app">
    <div class="topbar">
      <div class="inputs">
        <div class="input-group">
          <input type="checkbox" id="checkbox" v-model="showFeed">
          <label for="checkbox">Show Feed: {{ showFeed }}</label>
        </div>
        <div class="input-group">
          <p>Text is set to: {{ text }}</p>
          <input v-model="text" placeholder="edit me">
        </div>
      </div>
    </div>
    <div class="main">
      <div class="vue-github-wrapper">
        <vue-github :text="text" :showFeed="showFeed" username="harps116"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data: function() {
    return {
      showFeed: true,
      text: ""
    };
  }
};
</script>

<style>
.topbar {
  grid-area: topbar;
}

.main {
  grid-area: main;
  width: 100%;
  display: flex;
  justify-content: center;
}

.vue-github-wrapper {
  width: 50%;
}

.inputs {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin: 1em;
}

#app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "topbar . ." "main main main";
}
</style>
