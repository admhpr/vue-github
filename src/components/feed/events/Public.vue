<template>
  <event-container :event="event">
      <div slot="activity">
        <span class="event-octicon octicon octicon-radio-tower dashboard-event-icon"></span>
        <a>{{event.actor.login}}</a>
        open sourced 
        <a class="event-link" :href="'https://github.com/' + event.repo.name" target="_blank">{{event.repo.name}}</a>
      </div>
      <li slot="list-info"></li>
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

<style scoped>
</style>