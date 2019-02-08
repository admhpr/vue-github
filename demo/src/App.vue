<template>
  <div id="app">
    <div class="topbar">
      <div class="inputs">
        <div class="input-group">
          <input type="checkbox" id="checkbox" v-model="showFeed">
          <label for="checkbox">Show Feed: {{ showFeed }}</label>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="vue-github-wrapper">
        <vue-github :showFeed="showFeed" username="harps116"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data: function() {
    return {
      showFeed: true
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

#app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "topbar topbar topbar" "main main main";
}
</style>
