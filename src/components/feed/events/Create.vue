<template>
  <event-container :event="event">
    <div slot="activity">
      <span
        class="event-octicon octicon dashboard-event-icon"
        :class="event.payload.ref_type === 'repository'?'octicon-repo':'octicon-git-branch'"
      ></span>
      <a>{{event.actor.login}}</a>
      created {{event.payload.ref_type}}
      <span v-if="event.payload.ref_type !== 'repository'">
        <a class="event-link" :href="getLink(event.repo)" target="_blank">{{event.payload.ref}}</a>
        at
      </span>
      <a
        class="event-link"
        :href="'https://github.com/' + event.repo.name"
        target="_blank"
      >{{event.repo.name}}</a>
    </div>
    <li slot="list-info"></li>
  </event-container>
</template>

<script>
import { getLink } from "@utils/utils"
import EventContainer from "../containers/EventContainer.vue";
export default {
  props: {
    event: { required: true }
  },
  components: {
    EventContainer
  }, 
  methods: {
    getLink
  }
};
</script>
