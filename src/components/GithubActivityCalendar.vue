<template>
  <div class="">
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
      <div class="calendar">
        <div v-html="this.rawCalendar.innerHTML"></div>

        <github-feed username="harps116"></github-feed>
      </div>
    </div>
  </div>
</template>

<script>
import parse from "github-calendar-parser";
import GithubFeed from "./feed/GithubFeed.vue";
export default {
  name: "GithubActivityCalendar",
  props: {
    username: { String, required: true },
    text: String,
    proxy: Function,
    stats: { Boolean, default: true }
  },
  components: {
    GithubFeed
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
      let summary =
        this.text ||
        `Summary of pull requests, issues opened, and commits made by <a href="https://github.com/${
          this.username
        }" target="blank">@${this.username}</a>`;
      div.innerHTML = body;
      let cal = div.querySelector(".js-yearly-contributions");
      cal.querySelector(".float-left.text-gray").innerHTML = summary;
      cal.querySelector(".contrib-legend").innerHTML = "";
      this.rawCalendar = cal;
    },
    setupSvg: function() {
      let svg = this.rawCalendar.querySelector("svg.js-calendar-graph-svg");
      let width = svg.getAttribute("width");
      let height = svg.getAttribute("height");
      // Dimension adjustment
      svg.removeAttribute("height");
      svg.setAttribute("width", "100%");
      svg.setAttribute("viewBox", "0 0 " + width + " " + height);
      this.rawSvg = svg;
    },
    parseSvg: function() {
      let parsed = parse(String(this.rawSvg.outerHTML));
      this.buildCalendar(parsed);
    },
    buildCalendar: function(data) {
      this.contribData = data;
      this.loading = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
h3 {
  margin: 40px 0 0;
}
a {
  color: #42b983;
}

.calendar {
  font-family: Helvetica, arial;
  border: 1px solid #dddddd;
  border-radius: 3px;
  min-height: 243px;
  text-align: center;
  margin: 0 auto;
  width: 50%;
}

.calendar-graph text.wday,
.calendar-graph text.month {
  font-size: 10px;
  fill: #aaa;
}

.contrib-legend {
  text-align: right;
  padding: 0 14px 10px 0;
  display: inline-block;
  float: right;
}

.contrib-legend .legend {
  display: inline-block;
  list-style: none;
  margin: 0 5px;
  position: relative;
  bottom: -1px;
  padding: 0;
}

.contrib-legend .legend li {
  display: inline-block;
  width: 10px;
  height: 10px;
}

.text-small {
  font-size: 12px;
  color: #767676;
}

.calendar-graph {
  padding: 5px 0 0;
  text-align: center;
}

.contrib-column {
  padding: 15px 0;
  text-align: center;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  font-size: 11px;
}

.contrib-column-first {
  border-left: 0;
}

.table-column {
  display: table-cell;
  width: 1%;
  padding-right: 10px;
  padding-left: 10px;
  vertical-align: top;
}

.contrib-number {
  font-weight: 300;
  line-height: 1.3em;
  font-size: 24px;
  display: block;
  color: #333;
}

.calendar img.spinner {
  width: 70px;
  margin-top: 50px;
  min-height: 70px;
}

.monospace {
  text-align: center;
  color: #000;
  font-family: monospace;
}

.monospace a {
  color: #1d75ab;
  text-decoration: none;
}

.contrib-footer {
  font-size: 11px;
  padding: 0 10px 12px;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  height: 26px;
}

.left.text-muted {
  float: left;
  margin-left: 9px;
  color: #767676;
}
.left.text-muted a {
  color: #4078c0;
  text-decoration: none;
}
.left.text-muted a:hover,
.monospace a:hover {
  text-decoration: underline;
}

h2.f4.text-normal.mb-3 {
  display: none;
}

.float-left.text-gray {
  float: left;
}
</style>
