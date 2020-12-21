<template>
  <div>
    <div class="md-toolbar-section-end">
      <div class="group align-center">
        <md-button
          class="md-raised md-primary"
          @click="openFilter"
          v-if="getLoginType === 1"
          >Filter</md-button
        >
        <md-button
          class="md-raised md-primary"
          v-if="getServiceListData.length > 0"
        >
          <download-excel
            :data="getServiceListData"
            type="csv"
            name="ServiceData.csv"
          >
            Export CSV
          </download-excel>
        </md-button>
        <md-button
          class="md-raised md-primary"
          v-if="getServiceListData.length > 0"
        >
          <download-excel :data="getServiceListData" name="ServiceData.xls">
            Export Excel
          </download-excel>
        </md-button>
        <md-button to="/services/add">Add Services</md-button>
        <!-- <md-button @click="showNewService = true" to="/services/add">Add Services</md-button> -->
      </div>
    </div>

    <md-dialog
      :md-active.sync="showNewService"
      :md-click-outside-to-close="false"
      :md-fullscreen="true"
    >
      <md-dialog-title>Add Service</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <md-content class="md-scrollbar">
            <md-field :class="messageClass">
              <label>Service Name</label>
              <md-input v-model="addNewService.serviceName" required></md-input>
            </md-field>
            <div class="md-layout-item">
              <md-field :class="messageClass">
                <md-select
                  v-model="addNewService.categoryId"
                  placeholder="Category"
                  name="serviceCategory"
                  id="serviceCategory"
                  md-dense
                >
                  <md-option
                    :value="item.id"
                    v-for="item in categoryList"
                    :key="item.name"
                    >{{ item.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item mt-1">
              <span class="md-subheading">Duration</span>
              <div class="md-layout">
                <div class="md-layout-item mr-1">
                  <md-field :class="messageClass">
                    <label>Hours</label>
                    <md-input
                      v-model="addNewService.duration.hours"
                      required
                      type="number"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field :class="messageClass">
                    <label>Minutes</label>
                    <md-input
                      v-model="addNewService.duration.minutes"
                      required
                      type="number"
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </div>
            <div class="md-layout-item mt-1">
              <span class="md-subheading">Additional Duration (Optional)</span>
              <div class="md-layout">
                <div class="md-layout-item mr-1">
                  <md-field>
                    <label>Hours</label>
                    <md-input
                      v-model="addNewService.additionalDuration.hours"
                      type="number"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label>Minutes</label>
                    <md-input
                      v-model="addNewService.additionalDuration.minutes"
                      type="number"
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </div>
            <div class="md-layout-item mt-1">
              <span class="md-subheading w-100">Booking Type</span>
              <md-checkbox
                class="w-100"
                v-model="addNewService.onlineBooking"
                :true-value="1"
                :false-value="2"
                >Allowed for online booking</md-checkbox
              >
            </div>
            <div class="md-layout-item mt-1">
              <span class="md-subheading w-100">Service Applicable</span>
              <div class="w-100">
                <md-radio v-model="addNewService.serviceApplicant" :value="1"
                  >Male</md-radio
                >
                <md-radio v-model="addNewService.serviceApplicant" :value="2"
                  >Female</md-radio
                >
                <md-radio v-model="addNewService.serviceApplicant" :value="3"
                  >Everyone</md-radio
                >
              </div>
            </div>
          </md-content>
        </md-tab>
        <md-tab md-label="Price">
          <div class="md-layout-item mt-1">
            <md-field :class="messageClass">
              <label>Price</label>
              <md-input
                v-model="addNewService.price"
                required
                type="number"
              ></md-input>
            </md-field>
          </div>
          <div class="md-layout-item mt-1">
            <md-field>
              <label>Discounted Price (optional)</label>
              <md-input
                v-model="addNewService.discountedPrice"
                type="number"
              ></md-input>
            </md-field>
          </div>
        </md-tab>

        <md-tab md-label="Staff">
          <div class="md-layout-item mt-1">
            <span class="md-subheading w-100">Staff</span>
            <br />
            <span class="md-caption w-100"
              >selected staff will provide the service to the customers</span
            >
            <div>
              <md-checkbox
                v-model="addNewService.staff"
                :value="item.id"
                v-for="item in staffList"
                :key="item"
                >{{ item.name }}</md-checkbox
              >
            </div>
          </div>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showNewService = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="saveNewService">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-tabs>
      <md-tab id="tab-pages-1" md-label="Services">
        <VShowAt xlarge>
          <div class="md-layout pl-3 pr-3 p-1 md-gutter">
            <div
              class="md-layout-item md-large-size-30 md-medium-size-50 md-small-size-100"
            >
              <CategoryView
                @onSelectCategory="showServiceByCategory"
              ></CategoryView>
            </div>
            <div
              class="md-layout-item md-large-size-70 md-medium-size-50 md-small-size-100"
            >
              <div
                v-if="services.length == 0"
                class="md-center-item mt-5 md-warp-contant"
              >
                <md-icon class="md-size-4x">playlist_add</md-icon>
                <span class="md-body-1 mt-2">No Services available</span>
                <span class="md-caption mt-2"
                  >click <strong>ADD SERVICES</strong> to add new Service</span
                >
                <span class="md-caption mt-1"
                  >click <strong>EXPORT CSV</strong> or
                  <strong>EXPORT EXCEL</strong> to download a copy of your
                  Services in csv or excel</span
                >
              </div>
              <ServicesView
                v-else-if="services.length > 0"
                :servicesItem="services"
              ></ServicesView>
              <div v-else class="md-center-item mt-5 md-warp-contant">
                <md-icon class="md-size-4x">help_outline</md-icon>
                <span class="md-body-1 mt-2"
                  >Select a category to list service</span
                >
                <span class="md-caption mt-2"
                  >click <strong>ADD SERVICES</strong> to add new Service or
                  Category</span
                >
                <span class="md-caption mt-1"
                  >click <strong>EXPORT CSV</strong> or
                  <strong>EXPORT EXCEL</strong> to download a copy of your
                  Services in csv or excel</span
                >
              </div>
            </div>
          </div>
        </VShowAt>

        <VShowAt medium>
          <ServiceMView></ServiceMView>
        </VShowAt>
      </md-tab>
      <md-tab id="tab-pages-2" md-label="Package">
        <v-show-at xlarge>
          <PackageDesktopView></PackageDesktopView>
        </v-show-at>
        <v-show-at medium>
          <PackageView></PackageView>
        </v-show-at>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
import CategoryView from '../components/services/CategoryView.vue'
import ServicesView from '../components/services/ServicesView.vue'
import ServiceMView from '../components/services/ServicesMView.vue'

import PackageView from '../components/package/PackageView.vue'
import PackageDesktopView from '../components/package/desktopView/PackageDesktop.vue'
import { required, between } from 'vuelidate/lib/validators'
import { VShowAt } from 'vue-breakpoint-component'

export default {
  name: 'services',
  components: {
    CategoryView,
    ServicesView,
    PackageDesktopView,
    VShowAt,
    PackageView,
    ServiceMView
  },
  data () {
    return {
      hasMessages: false,
      services: '',
      showNewService: false,
      addNewService: {
        serviceName: '',
        categoryId: 0, // category id
        onlineBooking: 1, // true online booking allowed
        duration: {
          hours: '',
          minutes: ''
        },
        additionalDuration: {
          hours: '',
          minutes: ''
        },
        serviceApplicant: 1, // 1 -male 2 female 3 both
        price: '',
        discountedPrice: '',
        staff: [], // staff id. Service will be provided by selected staff
        outletId: 1
      }
    }
  },
  validations: {
    serviceName: { required },
    categoryId: { required }, // category id
    onlineBooking: { required }, // true online booking allowed
    duration: {
      hours: { required, between: between(0, 24) },
      minutes: { required, between: between(0, 59) }
    },
    additionalDuration: {
      hours: { between: between(0, 23) },
      minutes: { between: between(0, 59) }
    },
    serviceApplicant: { required }, // 1 -male 2 female 3 both
    price: { required },
    discountedPrice: '',
    staff: { required } // staff id. Service will be provided by selected staff
  },
  created: function () {
    this.initServices()
  },
  methods: {
    showServiceByCategory: function (item) {
      this.services = item
    },
    // create new service
    saveNewService: function () {
      this.$v.$touch()
      this.$store.dispatch('service/saveNewService', this.addNewService)
      this.showNewService = false
    },

    openFilter: function () {
      this.$root.$emit('showVendorFilter')
    },

    initServices: function () {
      this.$store.dispatch('setTitle', 'Services')
      this.$store.dispatch('service/getStaffList', this.getOutletId)
      this.$store.dispatch('service/getCategoryList', this.getOutletId)
      this.$store.dispatch('service/getServiceList', this.getOutletId)
    }
  },
  computed: {
    categoryList: function () {
      return this.$store.getters['service/categoryList']
    },
    staffList: function () {
      return this.$store.getters['service/staffList']
    },
    messageClass: function () {
      return {
        'md-invalid': this.hasMessages
      }
    },
    addNewServiceReponse: function () {
      return this.$store.getters['service/addNewService']
    },
    getCategoryItem: function () {
    //   console.log(
    //     'getCategoryItem',
    //     this.$store.getters['service/getCategoryItem']
    //   )
      return this.$store.getters['service/getCategoryItem']
    },
    getServiceListData: function () {
      return this.$store.getters['service/serviceList']
    },
    getCategoryListData: function () {
      return this.$store.getters['service/categoryList']
    },
    getLoginType: function () {
      return parseInt(localStorage.getItem('type'))
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    }
  }
}
</script>

<style lang="scss" scoped>
.float-right {
  float: right;
}

@media (max-height: 600px) {
  .md-content {
    width: 100% !important;
    max-height: 400px !important;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
