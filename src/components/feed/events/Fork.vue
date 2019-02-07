<template>
  <event-container :event="event">
    <div slot="activity">
      <span class="event-octicon octicon octicon-repo-forked dashboard-event-icon"></span>
      <a>{{event.actor.login}}</a>
      forked
      <a
        class="event-link"
        :href="'https://github.com/' + event.repo.name"
        target="_blank"
      >{{event.repo.name}}</a>
      to
      <a
        class="event-link"
        :href="event.payload.forkee.html_url"
        target="_blank"
      >{{event.payload.forkee.full_name}}</a>
    </div>
    <li slot="list activity"></li>
  </event-container>
</template>

<script>
import EventContainer from "../containers/EventContainer.vue";
export default {
  props: {
    event: { required: true }
  },
  components: {
    EventContainer
  }
};
</script>

<style scoped>
</style>