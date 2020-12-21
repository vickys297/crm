import Vue from 'vue'
var httpResponseValidateion = {
  data () {
    return {
      responseCode: [200, 401, 500]
    }
  },
  method: {
    validateResponse: function (httpCode) {
      if (httpCode === this.responseCode[0]) {
        return 1
      }
      if (httpCode === this.responseCode[1]) {
        return 2
      }
      if (httpCode === this.responseCode[2]) {
        return 3
      }
    }
  }
}

var HelperComponent = Vue.extend({
  mixins: [httpResponseValidateion]
})

export default HelperComponent
