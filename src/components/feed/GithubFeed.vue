<template>
  <div class="feed">
    <div class="header-wrapper">
      <div class="header">
        <div class="github-icon">
          <span class="github-octicon octicon octicon-mark-github"></span>
        </div>
        <a :href="user.html_url" target="_blank" class="github-profile">
          <div>{{user.name}}</div>
          <div class="github-username">{{user.username}}</div>
        </a>
        <div class="avatar-wrapper">
          <img class="avatar" :src="user.avatar_url">
        </div>
      </div>
    </div>
    <div class="events-wrapper">
      <div class="feed-list">
        <div class="event-list">
          <div :key="event.id" v-for="event in this.events">
            <component :event="event" :is="event.type"></component>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-wrapper"></div>
  </div>
</template>

<script>
import service from "../../services/GithubService";

import CommitCommentEvent from "./events/Commit";
import CreateEvent from "./events/Create";
import DeleteEvent from "./events/Delete";
import ForkEvent from "./events/Fork";
import IssueCommentEvent from "./events/Issue";
import PubliEvent from "./events/Public";
import PushEvent from "./events/Push";
import PullRequestEvent from "./events/PullRequest";
import WatchEvent from "./events/Watch";

export default {
  name: "github-feed",
  props: {
    username: { String, required: true }
  },
  components: {
    CommitCommentEvent,
    CreateEvent,
    DeleteEvent,
    ForkEvent,
    IssueCommentEvent,
    PubliEvent,
    PushEvent,
    PullRequestEvent,
    WatchEvent
  },
  data: () => ({
    user: {},
    events: [],
    loading: false,
    error: false
  }),
  async created() {
    try {
      await service.user(this.username).then(async response => {
        this.user = await response.json();
      });
    } catch (e) {
      this.loading = false;
      throw e;
    }
    try {
      await service.events(this.username).then(async events => {
        this.loading = false;
        this.events = await events.json();
      });
    } catch (e) {
      this.loading = false;
      throw e;
    }
  }
};
</script>

<style lang="scss">
.feed {
}
.header-wrapper {
}
.header {
  display: flex;
  align-items: baseline;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  img {
    max-height: 65px;
  }
}
.avatar-wrapper {
  margin-right: 10px;
  padding-right: 20px;
  max-width: 60px;
}
.avatar {
  padding: 3px;
  border: 1px solid #ddd;
  box-shadow: 1px 1px 3px #ccc;
}
.github-octicon {
  font: normal normal 40px "octicons";
}
.github-icon {
  padding: 9px 0 0;
  width: 35px;
  height: 35px;
}
.github-username {
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #666;
}
.github-profile {
  margin: 0 auto;
  padding: 6px 10px 5px;
  color: #495961;
  font-size: 20px;
  text-decoration: none;
  margin-left: 10px;
}
.github-profile:hover {
  color: #495961;
  text-decoration: none;
}
.footer-wrapper {
  padding: 5px;
  font-weight: bold;
  font-size: 13px;
  border-top: 1px solid #ddd;
  font-family: Helvetica, arial, freesans, clean, sans-serif;
}
.events-wrapper {
}
.feed-list {
}
.event-list {
}
.github-event {
  border-top: 1px solid #f1f1f1;
  display: flex;
  align-items: baseline;
  padding: 1em;
}
.event-octicon {
  color: #bbb;
  margin-right: 10px;
}
.event-time {
  font-size: 12px;
  margin-left: 3px;
  color: #bbb;
}
.event-link {
  color: #1798d8;
}
.event-link:hover {
  color: #1798d8;
}
.event-text {
  font-size: 13px;
  text-align: left;
  width: 50%;
}
.event-detail {
  font-size: 13px;
  color: #666666;
}
@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) {
  .event-octicon {
    display: none !important;
  }
}
</style>