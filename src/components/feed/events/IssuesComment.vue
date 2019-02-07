<template>
  <div class="row" v-if="event">
    <div style="display: inline-block;" class="column">
      <span class="event-octicon octicon dashboard-event-icon octicon-comment"></span>
      <a>{{event.actor.login}}</a>
      commented on {{event.payload.issue.pull_request?'pull request':'issue'}}
      <a
        class="event-link"
        :href="event.payload.issue.html_url"
        target="_blank"
      >#{{event.payload.issue.number}}</a>
      at
      <a
        class="event-link"
        :href="'https://github.com/' + event.repo.name"
        target="_blank"
      >{{event.repo.name}}</a>
    </div>
    <div class="column">{{daysAgo(event.created_at)}}</div>
    <div class="column">
      <ul>
        <li>
          <span class="event-octicon octicon octicon-chevron-right dashboard-event-icon"></span>
          {{event.payload.issue.title}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { daysAgo } from "../../utils/format";
export default {
  name: "watch-event",
  props: {
    event: { required: true }
  },
  methods: {
    daysAgo
  }
};
</script>
