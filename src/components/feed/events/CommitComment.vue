<template>
  <event-container :event="event">
    <div slot="activity">
      <a>{{event.actor.login}}</a>
      commented on commit
      <a
        class="event-link"
        :href="'https://github.com/' + event.repo.name + '/commit/' + event.payload.comment.commit_id"
        target="_blank"
      >{{hash(event.payload.comment.commit_id)}}</a>
      at
      <a
        class="event-link"
        :href="'https://github.com/' + event.repo.name"
        target="_blank"
      >{{event.repo.name}}</a>
    </div>
    <li slot="list-info">
      <span class="event-octicon octicon octicon-chevron-right dashboard-event-icon"></span>
      <a class="event-link" :href="event.payload.comment.html_url" target="_blank">Link to comment</a>
    </li>
  </event-container>
</template>

<script>
import EventContainer from "../containers/EventContainer";
export default {
  props: {
    event: { required: true },
  },
  components: {
    EventContainer
  }
};
</script>

<style scoped>
</style>