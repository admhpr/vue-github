<template>
  <event-container :event="event">
    <div slot="activity">
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
    <li slot="list-info">
      <span class="event-octicon octicon octicon-chevron-right dashboard-event-icon"></span>
      <b v-if="event.payload.pull_request.merged">[MERGED]</b>
      {{event.payload.pull_request.title}}
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

<style></style>