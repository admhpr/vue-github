<template>
  <event-container :event="event">
    <div slot="activity">
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
    <li slot="list-info">
      <span class="event-octicon octicon octicon-chevron-right dashboard-event-icon"></span>
      {{event.payload.issue.title}}
    </li>
  </event-container>
</template>

<script>
import EventContainer from "../containers/EventContainer";
export default {
  props: {
    event: { required: true }
  },
  components: {
    EventContainer
  }
};
</script>
