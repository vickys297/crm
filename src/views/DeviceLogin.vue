<template>
  <div>
    <h1>Device Login</h1>

    <LoadingScreen v-if="loading"></LoadingScreen>
  </div>
</template>

<script>
import LoadingScreen from '../components/common/LoadingScreen.vue'
export default {
  components: {
    LoadingScreen
  },
  name: 'Device Login',
  loading: true,
  created: function () {
    // var userId = this.$route.params.id
    // console.log('UserID :', userId)
  }
}
</script>
<style lang="scss" scoped>
</style>
