<template>
  <event-container :event="event">
    <div slot="activity">
      <div class="event-user">
        <span class="event-octicon octicon octicon-repo-push dashboard-event-icon"></span>
        <a class="event-link">{{event.actor.login}}</a>
        pushed to
        <a
          class="event-link"
          :href="'https://github.com/' + event.repo.name + '/tree/' + branch(event.payload.ref)"
          target="_blank"
        >{{branch(event.payload.ref)}}</a>
        on
        <a
          class="event-link"
          :href="'https://github.com/' + event.repo.name"
          target="_blank"
        >{{event.repo.name}}</a>
      </div>
    </div>
    <li slot="list-info" v-for="commit in event.payload.commits" :key="commit.id">
      <span class="event-octicon octicon octicon-git-commit dashboard-event-icon"></span>
      <a
        :href="'https://github.com/' + event.repo.name + '/commit/' + commit.sha"
        target="_blank"
        class="event-link"
      >{{hash(commit.sha)}}</a>
      {{commit.message}}
    </li>
  </event-container>
</template>

<script>
import EventContainer from "../containers/EventContainer.vue";
import { hash, branch } from "../../utils/utils";
export default {
  props: {
    event: { required: true }
  },
  components: {
    EventContainer
  },
  methods: {
    hash,
    branch
  }
};
</script>

<style scoped></style>