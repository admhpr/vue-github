<template>
  <div class="row" v-if="event">
    <div class="column">
      <div class="event-user">
        <span class="event-octicon octicon octicon-git-pull-request dashboard-event-icon"></span>
        <a>{{event.actor.login}}</a>
        {{event.payload.action}} pull request
        <a
          class="event-link"
          :href="event.payload.pull_request.html_url"
          target="_blank"
        >#{{event.payload.number}}</a>
        at
        <a
          class="event-link"
          :href="'https://github.com/' + event.repo.name"
          target="_blank"
        >{{event.repo.name}}</a>
      </div>
      <a
        class="event-link"
        :href="'https://github.com/' + event.repo.name"
        target="_blank"
      >{{event.repo.name}}</a>
    </div>
    <div class="column">{{this.daysAgo(event.created_at)}}</div>
    <div class="column">
      <ul>
        <li v-for="commit in event.payload.commits" :key="commit.id" class="event-detail">
          <span class="event-octicon octicon octicon-chevron-right dashboard-event-icon"></span>
          <b v-if="event.payload.pull_request.merged">[MERGED]</b>
          {{event.payload.pull_request.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { daysAgo } from "../../utils/format";
export default {
  name: "push-event",
  props: {
    event: { required: true }
  },
  methods: {
    daysAgo
  }
};
</script>

<style></style>