<template>
  <div class="row" v-if="event">
    <div class="column">
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
    <div class="column">{{daysAgo(event.created_at)}}</div>
    <div class="column">
      <ul>
        <li>
          <span class="event-octicon octicon octicon-chevron-right dashboard-event-icon"></span>
          <a
            class="event-link"
            :href="event.payload.comment.html_url"
            target="_blank"
          >Link to comment</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { daysAgo } from "../../utils/format";
export default {
  props: {
    event: { required: true }
  },
  methods: {
    daysAgo
  }
};
</script>

<style scoped>
</style>