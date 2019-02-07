<template>
  <div class="row" v-if="event">
    <div class="column">
      <span
        class="event-octicon octicon dashboard-event-icon"
        :class="event.payload.ref_type === 'repository'?'octicon-repo':'octicon-git-branch'"
      ></span>
      <a>{{event.actor.login}}</a>
      created {{event.payload.ref_type}}
      <span v-if="event.payload.ref_type!== 'repository'">
        <a class="event-link" :href="link(event)" target="_blank">{{event.payload.ref}}</a>
        at
      </span>
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
          {{event.payload.issue.title}}
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
