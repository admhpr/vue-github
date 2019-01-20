<template>
  <div class="hello">
    <div v-if="loading">
      <img
        src="https://assets-cdn.github.com/images/spinners/octocat-spinner-128.gif"
        class="spinner"
      >
      <p class="spinner-text monospace">
        Crunching
        <a :href="'https://github.com/' + username">@{{username}}</a>'s contributions just for you.
      </p>
    </div>
    <div v-if="!loading">
      <div class="calendar"></div>
    </div>
    <h1>{{ username }}</h1>
  </div>
</template>

<script>
import parse from "github-calendar-parser";
export default {
  name: "GithubActivityCalendar",
  props: {
    username: String,
    text: String,
    proxy: String
  },
  data: function() {
    return {
      loading: true,
      rawCalendar: "",
      rawSvg: "",
      builtCalendar: ""
    };
  },
  mounted() {
    this.createCalendar();
  },
  methods: {
    createCalendar: function() {
      this.fetchCalendar();
    },
    fetchCalendar: function() {
      const proxy =
        this.proxy ||
        function(url) {
          return "https://urlreq.appspot.com/req?method=GET&url=" + url;
        };
      // We need a proxy for CORS
      // Thanks, @izuzak (https://github.com/izuzak/urlreq)
      fetch(proxy(`https://github.com/${this.username}`))
        .then(res => res.text())
        .then(body => {
          this.setupCalendar(body);
          // If 'include-fragment' with spinner img loads instead of the svg, fetchCalendar again
          if (this.rawCalendar.querySelector("includes-fragment")) {
            setTimeout(this.fetchCalendar, 500);
          } else {
            this.renderCalendar();
          }
        });
    },
    renderCalendar: async function() {
      await this.setupSvg();
      await this.parseSvg();
    },
    setupCalendar: function(body) {
      let div = document.createElement("div");
      div.innerHTML = body;
      let cal = div.querySelector(".js-yearly-contributions");
      cal.querySelector(".float-left.text-gray").innerHTML = this.text;
      this.rawCalendar = cal;
    },
    setupSvg: function() {
      let svg = this.rawCalendar.querySelector("svg.js-calendar-graph-svg");
      let width = svg.getAttribute("width");
      let height = svg.getAttribute("height");
      // Remove height property entirely
      svg.removeAttribute("height");
      // Width property should be set to 100% to fill entire container
      svg.setAttribute("width", "100%");
      // Add a viewBox property based on the former width/height
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      this.rawSvg = svg;
    },
    parseSvg: function() {
      let parsed = parse(String(this.rawSvg.outerHTML));
      this.buildCalendar(parsed);
    },
    buildCalendar: function(data) {
      console.log(data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
