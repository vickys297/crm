<template>
    <div>
        <div class="wrapper">
            <div class="scrolls">
                <md-content class="wrap-content md-card-custom" v-for="(item,index) in getColorCode" :key="index">
                    <md-avatar class="mr-1 " @click="checkColor(index,item)" v-bind:style="item">
                        <img src="https://source.unsplash.com/random" alt="Avatar">
                    </md-avatar>
                    <br>
                    <div>
                        <span class="md-body-1">Staff Name</span>
                        <br>
                        <span class="md-caption">Title</span>
                    </div>
                </md-content>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'staff_view',
  data () {
    return {}
  },
  computed: {
    getColorCode: function () {
      return this.$store.getters.getColorCode
    }
  }
}
</script>

<style lang="scss" scoped>
.scrolls {
    overflow-x: scroll;
    overflow-y: hidden;
    height: fit-content;
    white-space: nowrap
}

div {
    box-sizing: border-box;
}

.md-content {
    width: fit-content;
    height: fit-content;
    margin: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}
</style>
