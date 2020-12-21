<template>
    <div>
        <div class="md-layout">
            <div class="md-layout-item">
                <md-button class="md-icon-button m-1" @click="checkColor(index, item)" v-for="(item,index) in colorCodeData" :key="index.backgroundColor" v-bind:style="item">
                    <md-icon v-show="item.id == selectedColor || item.id == selectedColorCode" class="color-white">done</md-icon>
                </md-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    colorCodeData: Array,
    selectedColorCode: Number
  },
  name: 'color-picker',
  data () {
    return {
      selectedColor: this.selectedColorCode
    }
  },
  methods: {
    checkColor: function (index, color) {
      this.selectedColor = color.id
      this.$emit('colorSelected', this.selectedColor)
    },
    startMethod: function () {
      // // console.log('selectedColorCode ', this.selectedColorCode)
    }
  },
  created: function () {
    this.startMethod()
  }
}
</script>

<style lang="scss" scoped>

</style>
