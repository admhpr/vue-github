<template>
  <div class="github-event">
    <span class="event-octicon octicon octicon-repo-push dashboard-event-icon"></span>
    <div class="event-text" v-if="event">
      <a>{{event.actor.login}}</a>
      <b>
        pushed to
        <a
          class="event-link"
          :href="'https://github.com/' + event.repo.name + '/tree/' + branch(event.payload.ref)"
          target="_blank"
        >{{branch(event.payload.ref)}}</a>
        at
        <a
          class="event-link"
          :href="'https://github.com/' + event.repo.name"
          target="_blank"
        >{{event.repo.name}}</a>
      </b>
    </div>
    <div class="event-time" v-if="event">{{this.daysAgo(event.created_at)}}</div>
    <ul>
      <li v-for="commit in event.payload.commits" :key="commit.id" class="event-detail">
        <span class="event-octicon octicon octicon-git-commit dashboard-event-icon"></span>
        <a
          :href="'https://github.com/' + event.repo.name + '/commit/' + commit.sha"
          target="_blank"
          class="event-link"
        >{{hash(commit.sha)}}</a>
        {{commit.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import { fromNow, hash, branch } from "../../utils/format";
export default {
  name: "push-event",
  props: {
    event: { required: true }
  },
  methods: {
    fromNow,
    hash,
    branch,
    daysAgo: function(createdAt) {
      const diff = fromNow(createdAt);
      const isPlural = diff > 1 ? "s" : "";
      return `${diff} day${isPlural} ago`;
    }
  }
};
</script>

<style></style>