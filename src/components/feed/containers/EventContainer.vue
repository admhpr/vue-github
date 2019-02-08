<template>
  <div class="row" v-if="event">
    <div class="column">
      <slot name="activity"></slot>
    </div>
    <div class="column">{{daysAgo(event.created_at)}}</div>
    <div class="column">
      <ul>
        <slot name="list-info"></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import { daysAgo } from "../../utils/utils";
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