<template>
    <div>
        <!-- <lottie-animation
            path="../../assets/404_anim.json"
            :loop="false"
            :autoPlay="true"
            :loopDelayMin="2.5"
            :loopDelayMax="5"
            :speed="1" :width="256" :height="256"></lottie-animation> -->
        <!-- <h1>404 <br><br> You are lost </h1> -->
        <md-empty-state md-icon="error_outline" md-label="404 You are lost" md-description="This is unavailable or disabled, dont worry click Go Home to we will take you back.">
            <md-button class="md-primary md-raised" to="/">Go Home</md-button>
        </md-empty-state>
    </div>
</template>

<script>
export default {
  name: 'page-not-found',
  data () {
    return {}
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    }
  }
}
</script>

<style>

</style>
