<template>
  <div class="vue-github-wrapper">
    <div v-if="loading" class="loading-wrapper">
      <img
        src="https://github.githubassets.com/images/spinners/octocat-spinner-128.gif"
        class="spinner"
      >
      <p class="spinner-text monospace">
        Crunching
        <a :href="'https://github.com/' + username">@{{username}}</a>'s contributions just for you.
      </p>
    </div>
    <div v-if="!loading">
      <div class="activity-calendar-wrapper">
        <div v-if="showCalendar" v-html="this.rawCalendar.innerHTML"></div>
        <br>
        <github-feed v-if="showFeed" username="harps116"></github-feed>
      </div>
    </div>
  </div>
</template>

<script>
import parse from "github-calendar-parser";
import GithubFeed from "./feed/GithubFeed.vue";
import { debounce } from "./utils/utils";
export default {
  props: {
    username: { String, required: true },
    text: String,
    proxy: Function,
    showFeed: { Boolean, default: true },
    showCalendar: { Boolean, default: true }
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
  watch: {
    text: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          debounce(this.createCalendar(), 100);
        }
      }
    }
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
      let summaryText = cal.querySelector(".float-left.text-gray");
      summaryText.innerHTML = summary;
      summaryText.className = "";
      summaryText.className = "summary-text";
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

<style lang="scss">
$green: #42b983;
$grey: #dddddd;

.vue-github-wrapper {
  h3 {
    margin: 40px 0 0;
  }

  a {
    color: $green;
  }
  // override github class
  .border {
    border: none !important;
  }
  .activity-calendar-wrapper {
    font-family: Helvetica, arial;
    border: 1px solid $grey;
    border-radius: 3px;
    min-height: 243px;
    text-align: center;
    width: 100%;
    padding: 1.8em;
  }

  .loading-wrapper {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    img {
      max-width: 75px;
      margin: auto;
    }
  }

  .calendar-graph text {
    &.wday,
    &.month {
      font-size: 10px;
      fill: darken($grey, 10);
    }
  }

  .text-small {
    font-size: 12px;
    color: darken($grey, 30);
  }

  .calendar-graph {
    padding: 5px 0 0;
    text-align: center;
  }

  .calendar img.spinner {
    width: 70px;
    margin-top: 50px;
    min-height: 70px;
  }

  // .contrib-footer {
  //   padding: 1em;
  //   text-align: center;
  //   width: 100%;
  //   height: 26px;
  // }

  .summary-text {
    margin-top: 1em;
  }
}
</style>
