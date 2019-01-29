<template>
  <div class="row">
    <div style="display: inline-block;" class="column" v-if="event">
      <span class="event-octicon octicon octicon-star dashboard-event-icon"></span>
      <a class="event-link">{{event.actor.login}}</a>
      <b>
        starred
        <a
          class="event-link"
          :href="'https://github.com/' + event.repo.name"
          target="_blank"
        >{{event.repo.name}}</a>
      </b>
    </div>
    <div class="column" v-if="event">{{daysAgo(event.created_at)}}</div>
    <div class="column"></div>
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
