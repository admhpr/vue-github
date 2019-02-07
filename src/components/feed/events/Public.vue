<template>
  <event-container :event="event"></event-container>
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