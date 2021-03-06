<template>
  <div class="feed">
    <div class="header-wrapper">
      <div class="header">
        <div class="github-icon">
          <span class="github-octicon octicon octicon-mark-github"></span>
        </div>
        <a :href="user.html_url" target="_blank" class="github-profile">
          <div>{{ user.name }}</div>
          <div class="github-username">{{ user.username }}</div>
        </a>
        <div class="avatar-wrapper">
          <img class="avatar" :src="user.avatar_url" />
        </div>
      </div>
    </div>
    <div class="events-wrapper">
      <div :key="event.id" v-for="event in this.events" class="feed-list">
        <component :event="event" :is="event.type"></component>
      </div>
    </div>
    <div class="footer-wrapper"></div>
  </div>
</template>

<script>
import service from "../../services/githubService"

import CommitCommentEvent from "./events/CommitComment.vue"
import CreateEvent from "./events/Create.vue"
import DeleteEvent from "./events/Delete.vue"
import ForkEvent from "./events/Fork.vue"
import IssuesEvent from "./events/Issues.vue"
import IssuesCommentEvent from "./events/IssuesComment.vue"
import PublicEvent from "./events/Public.vue"
import PushEvent from "./events/Push.vue"
import PullRequestEvent from "./events/PullRequest.vue"
import WatchEvent from "./events/Watch.vue"

export default {
  name: "github-feed",
  props: {
    username: { String, required: true },
  },
  components: {
    CommitCommentEvent,
    CreateEvent,
    DeleteEvent,
    ForkEvent,
    IssuesEvent,
    IssuesCommentEvent,
    PublicEvent,
    PushEvent,
    PullRequestEvent,
    WatchEvent,
  },
  data: () => ({
    user: {},
    events: [],
    loading: false,
    error: false,
  }),
  async created() {
    try {
      await service.user(this.username).then(async (response) => {
        this.user = await response.json()
      })
    } catch (e) {
      this.loading = false
      throw e
    }
    try {
      await service.events(this.username).then(async (events) => {
        this.loading = false
        this.events = await events.json()
      })
    } catch (e) {
      this.loading = false
      throw e
    }
  },
}
</script>

<style lang="scss">
$grey: #666666;
$grey-blue: #495961;
$white: #f1f1f1;
$blue: #1798d8;

$font-size: 13px;

.header {
  display: flex;
  align-items: baseline;
  padding: 10px;
  border-bottom: 1px solid lighten($grey, 40);
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
  border: 1px solid lighten($grey, 40);
  box-shadow: 1px 1px 3px lighten($grey, 40);
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
  color: $grey;
}
.github-profile {
  margin: 0 auto;
  padding: 6px 10px 5px;
  color: $grey-blue;
  font-size: 20px;
  text-decoration: none;
  margin-left: 10px;
}
.github-profile:hover {
  color: $grey-blue;
  text-decoration: none;
}
.footer-wrapper {
  padding: 5px;
  font-weight: bold;
  font-size: $font-size;
  border-top: 1px solid ligten($grey, 40);
  font-family: Helvetica, arial, freesans, clean, sans-serif;
}

.event-octicon {
  color: $grey;
  margin-right: 10px !important;
}

.feed {
  li {
    text-align: left;
    list-style: none;
  }
}

.feed-list {
  border-bottom: 1px solid lighten($grey, 40);
}

.row {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: baseline;
  margin: 5px 0;
  > * {
    font-size: $font-size;
  }
}

.column {
  flex: 1;
  margin: 2px;
  padding: 10px;
  &:first-child {
    margin-left: 0;
    text-align: left;
  }
  &:nth-child(2) {
  }
  &:last-child {
    margin-right: 0;
    text-align: left;
  }
}
@media only screen and (min-device-width: 320px) and (max-device-width: 640px) and (-webkit-min-device-pixel-ratio: 2) {
  .row {
    display: flex;
    flex-direction: column;
  }
  .header {
    display: none !important;
  }
}
</style>
