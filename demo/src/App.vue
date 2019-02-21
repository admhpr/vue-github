<template>
  <div id="app">
    <div class="sidebar">
      <div class="inputs">
        <div class="input-group">
          <input type="checkbox" v-model="showCalendar">
          <label for="checkbox">Show Calendar: {{ showCalendar }}</label>
        </div>
        <div class="input-group">
          <input type="checkbox" v-model="showFeed">
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
        <vue-github
          :text="text"
          :showFeed="showFeed"
          :showCalendar="showCalendar"
          username="harps116"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data: function() {
    return {
      showCalendar: true,
      showFeed: true,
      text: "",
      username: "harps116"
    };
  }
};
</script>

<style lang="scss">
$grey: #dddddd;
.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
  width: 90%;
  display: flex;
  justify-content: center;
}

.vue-github-wrapper {
  width: 100%;
  margin-left: 1em;
}

.inputs {
  display: flex;
  flex-direction: column;
}

.input-group {
  padding: 1em;
  border: 1px solid $grey;
}

#app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "sidebar main main main" "sidebar main main main";
}
</style>
