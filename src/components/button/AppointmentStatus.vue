<template>
  <div>
    <md-avatar class="md-avatar-icon md-primary" v-if="status == 1">
      <md-icon>new_releases</md-icon>
      <md-tooltip md-direction="left">New</md-tooltip>
    </md-avatar>
    <md-avatar class="md-avatar-icon md-primary" v-if="status == 2">
      <md-icon>done</md-icon>
      <md-tooltip md-direction="left">Confirmed</md-tooltip>
    </md-avatar>
    <md-avatar class="md-avatar-icon md-primary" v-if="status == 3">
      <md-icon>verified</md-icon>
      <md-tooltip md-direction="left">Completed</md-tooltip>
    </md-avatar>
    <md-avatar class="md-avatar-icon md-primary" v-if="status == 4">
      <md-icon>person_outline</md-icon>
      <md-tooltip md-direction="left">No Show</md-tooltip>
    </md-avatar>
    <md-avatar class="md-avatar-icon md-primary" v-if="status == 0">
      <md-icon>clear</md-icon>
      <md-tooltip md-direction="left">Cancelled</md-tooltip>
    </md-avatar>
  </div>
</template>

<script>
export default {
  props: {
    status: Number
  }
}
</script>

<style></style>
