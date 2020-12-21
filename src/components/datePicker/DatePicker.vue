<template>
    <div class="group align-center float-right p-1">
        <md-button class="  md-icon-button mr-1">
            <md-icon>keyboard_arrow_left</md-icon>
        </md-button>
        <md-button class="md-primary">Today</md-button>
        <md-button class=" md-icon-button">
            <md-icon>keyboard_arrow_right</md-icon>
        </md-button>
    </div>
</template>

<script>

export default {

  name: 'date-picker',
  data () {
    return {
      yourValue: ''
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
