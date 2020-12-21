import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import store from './store/index.js'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './assets/element-variables.scss'
import './assets/style.scss'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import Moment from 'moment'
import VueJsonToCsv from 'vue-json-to-csv'
import JsonExcel from 'vue-json-excel'
import Vuelidate from 'vuelidate'
import VueTelInput from 'vue-tel-input'
import Notifications from 'vue-notification'
import LoadingScreen from './components/common/LoadingScreen'
import * as VueGoogleMaps from 'vue2-google-maps'
import { Pagination, Upload } from 'element-ui'
import LottieAnimation from 'vue-lottie' // import lottie-vuejs
import VueApexCharts from 'vue-apexcharts'
import { Plugin as VBreakpoint } from 'vue-breakpoint-component'
import VueToast from 'vue-toast-notification'
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css'

Vue.use(VueToast)
Vue.use(VBreakpoint)
Vue.use(VueGoogleMaps, {
  load: {
    // key: 'AIzaSyAmtFkbP1QwPI9ZR_fTaji5lYN-kJE785w',
    libraries: 'places,drawing' // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    /// / If you want to set the version, you can do so:
    // v: '3.26',
  },
  /// / If you intend to programmatically custom event listener code
  /// / (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  /// / instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  /// / you might need to turn this on.
  // autobindAllEvents: false,

  /// / If you want to manually install components, e.g.
  /// / import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  /// / Vue.component('GmapMarker', GmapMarker)
  /// / then set installComponents to 'false'.
  /// / If you want to automatically install all the components this property must be set to 'true':
  installComponents: true
})

Vue.prototype.$http = Axios

const token = localStorage.getItem('token')

if (token != null) {
  Vue.prototype.$http.defaults.headers.common['api-token'] = token
  // Vue.prototype.$http.defaults.headers.common['language'] = 'en'
  // Vue.prototype.$http.defaults.headers.common['x-token'] = '123456789'
}

Axios.interceptors.response.use(
  response => {
    // // console.log('interceptors', response.status)
    if (response.status === 200 || response.status === 201) {
      switch (response.data.status) {
        case 1:
          break
        case 2:
          break

        default:
          break
      }
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          // do something
          break

        case 401:
          alert('Unauthorized access')
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        case 403:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
        case 404:
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          Vue.$root.$emit('interceptors-error')
          break
        case 502:
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }, 1000)
      }
      return Promise.reject(error.response)
    }
  }
)

Vue.component('apexchart', VueApexCharts)
Vue.use(VueApexCharts)
Vue.component('downloadExcel', JsonExcel)
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)
Vue.use(VueMaterial)
Vue.use(VueJsonToCsv)
Vue.use(LoadingScreen)
Vue.component('pagination', Pagination)
// Vue.component('upload', Upload)
Vue.use(Vuelidate)
Vue.use(Pagination)
Vue.use(Upload)
Vue.use(Moment)
Vue.use(VueTelInput)
Vue.use(Notifications)
Vue.use(LottieAnimation) // add lottie-animation to your global scope
Vue.material.locale.dateFormat = 'dd-MM-yyyy'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    showAlert: function () {
      this.$root.emit('interceptors-error')
    }
  }
}).$mount('#app')
