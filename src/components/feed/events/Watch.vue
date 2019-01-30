<template>
  <div class="row" v-if="event">
    <div style="display: inline-block;" class="column">
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
    <div class="column">{{daysAgo(event.created_at)}}</div>
    <div class="column">
      <ul>
        <li>
          <span class="event-octicon octicon octicon-organization dashboard-event-icon"></span>
          <a
            :href="'https://github.com/' + event.org.login"
            target="_blank"
            class="event-link"
          >{{event.org.login}}</a>
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
