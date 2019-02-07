<template>
  <event-container>
    <div slot="activity">
      <span
        class="event-octicon octicon dashboard-event-icon"
        :class="event.payload.action === 'opened'?'octicon-issue-opened':'octicon-issue-closed'"
      ></span>
      {{event.payload.action}} issue
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
    <li slot="list-info">
      <span class="event-octicon octicon octicon-chevron-right dashboard-event-icon"></span>
      {{event.payload.issue.title}}
    </li>
  </event-container>
</template>

<script>
import EventContainer from "../containers/EventContainer";
import { daysAgo } from "../../utils/format";
export default {
  props: {
    event: { required: true }
  },
  components: {
    EventContainer
  },
  methods: {
    daysAgo
  }
};
</script>
