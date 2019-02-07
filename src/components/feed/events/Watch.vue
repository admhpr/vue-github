<template>
  <event-container :event="event">
    <div slot="activity">
      <span class="event-octicon octicon octicon-star dashboard-event-icon"></span>
      <a class="event-link">{{event.actor.login}}</a>
      starred
      <a
        class="event-link"
        :href="'https://github.com/' + event.repo.name"
        target="_blank"
      >{{event.repo.name}}</a>
    </div>
    <li slot="list-info">
      <span class="event-octicon octicon octicon-organization dashboard-event-icon"></span>
      <a
        v-if="event.org"
        :href="'https://github.com/' + event.org.login"
        target="_blank"
        class="event-link"
      >{{event.org.login}}</a>
      <span v-else>Independant</span>
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
