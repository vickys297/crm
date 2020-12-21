<template>
    <div class="mb-2">
        <h2>Pagination View {{itemLength}}</h2>
        <div class="md-toolbar-section-end">
            <div class="group">
                <md-button class="md-icon-button mr-2">
                    <md-icon class="">navigate_before</md-icon>
                </md-button>
                <div v-if="itemLength <= 10">
                    <md-avatar class="md-avatar-icon md-primary mr-1 ml-1" v-for="item in itemLength" :key="item">{{item}}</md-avatar>
                </div>
                <div v-if="itemLength > 10">
                    <md-avatar class="md-avatar-icon md-primary mr-1 ml-1" v-for="item in getPagination(1)" :key="item">{{item}}</md-avatar>
                    <span class="mr-1 ml-1">...</span>
                    <md-avatar class="md-avatar-icon md-primary mr-1 ml-1" v-for="item in getPagination(2)" :key="item">{{item}}</md-avatar>
                </div>
                <md-button class="md-icon-button ml-2">
                    <md-icon class="">navigate_next</md-icon>
                </md-button>
            </div>

            <span class="md-body-2">Total {{itemLength}}</span>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    itemLength: Number
  },
  data () {
    return {
      size: 10
    }
  },
  computed: {
    getPagination: function (part) {
      if (part === 1) {

      }
      if (part === 2) {

      }

      return 20
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
