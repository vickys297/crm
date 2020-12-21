<template>
    <div>
        <div class="md-toolbar-section-end">
          <md-button class="md-raised md-primary">Reset Password</md-button>
            <md-menu md-size="medium" md-align-trigger>
              <div class="align-center">
                <span class="md-body-1">Take Action</span>
                <md-button class="md-icon-button md-raised md-primary" md-menu-trigger>
                    <md-icon>edit</md-icon>
                </md-button>
              </div>
                <md-menu-content>
                    <md-menu-item value="1">Disable</md-menu-item>
                    <md-menu-item value="2">Enabled</md-menu-item>
                    <md-menu-item value="3">Recover</md-menu-item>
                    <md-menu-item value="4" class="md-button md-raised md-accent">Removed</md-menu-item>
                </md-menu-content>
            </md-menu>
        </div>
        <md-tabs class="tab-view">
            <md-tab id="tab-pages-1" md-label="General">
                <div class="container">
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <div class="md-layout md-gutter">
                                <div class="md-layout-item">
                                    <md-field>
                                        <label>First Name</label>
                                        <md-input v-model="newStaff.firstName" required></md-input>
                                    </md-field>
                                </div>
                                <div class="md-layout-item">
                                    <md-field>
                                        <label>Last Name</label>
                                        <md-input v-model="newStaff.lastName" required></md-input>
                                    </md-field>
                                </div>
                            </div>
                            <vue-tel-input v-model="newStaff.phoneNumber"></vue-tel-input>
                            <md-field class="mt-1">
                                <label>Email</label>
                                <md-input v-model="newStaff.email" required placeholder="UserName@Domain.com"></md-input>
                            </md-field>
                            <span class="md-subheading">Gender</span>
                            <div>
                                <md-radio v-model="newStaff.gender" value="male">Male</md-radio>
                                <md-radio v-model="newStaff.gender" value="female">Female</md-radio>
                            </div>
                            <md-checkbox v-model="newStaff.allowOnline" true-value="true" false-value="false">Allow Online booking</md-checkbox>
                            <br>
                            <span class="md-caption">Note: Enable to show staff in your shops staff list</span>
                            <div class="md-list-item  mt-2">
                                <span class="md-subheading">Appointment Color *</span>
                                <br>
                                <span class="md-caption">Note: Selected color will be indicated in calander for the particular staff</span>
                                <ColorCode :colorCodeData="getColorCode" :selectedColorCode="newStaff.appointmentColorId" class="mt-1" @colorSelected="onColorSelected"></ColorCode>
                            </div>
                        </div>
                        <div class="md-layout-item">
                            <md-field>
                                <label>Staff Position</label>
                                <md-input v-model="newStaff.staffPosition" placeholder="Manager, Employee, Staff" required></md-input>
                            </md-field>
                            <label>Note</label>
                            <md-field>
                                <md-textarea v-model="newStaff.staffNote" placeholder="Private notes about the staff"></md-textarea>
                            </md-field>
                        </div>
                    </div>
                </div>
            </md-tab>
            <md-tab id="tab-pages-2" md-label="Services">
                <div class="container">
                    <span class="md-title">Service List</span>
                    <br>
                    <span class="md-caption">select the service list performed by the staff</span>
                    <br>
                    <md-checkbox v-model="selectAllService" :true-value="true" :false-value="false" @change="selectAllServiceFun(selectAllService)">Select All Service</md-checkbox>
                    <md-list v-for="item in getCategoryList" :key="item.name" class="md-card mt-2">
                        <md-list-item>
                            <span class="md-title">{{item.name}}</span>
                            <md-list-item>
                                <div v-for="(service,index) in item.services" :key="index">
                                    <md-checkbox v-model="newStaff.selectedService" :value="service.id">{{service.name}}</md-checkbox>
                                </div>
                            </md-list-item>
                        </md-list-item>
                    </md-list>
                </div>
            </md-tab>
        </md-tabs>
        <div class="align-end">
            <md-button @click="cancelNewStaff" class="md-raised md-primary">Cancel</md-button>
            <md-button @click="updateStaff">Save</md-button>
        </div>

        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSnackbar" md-persistent>
            <span>{{getAddStaffResponse}}</span>
            <md-button class="md-accent" @click="cancelNewStaff">Ok</md-button>
        </md-snackbar>
    </div>
</template>

<script>
import ColorCode from '../color/ColorView.vue'
export default {
  name: 'Edit Staff',
  components: {
    ColorCode
  },
  data () {
    return {
      showSnackbar: false,
      serviceList: '',
      colorSelected: '',
      selectAllService: false,
      newStaff: {
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        phoneNumber: '',
        allowOnline: false,
        appointmentColorId: '',
        staffPosition: '',
        staffNote: '',
        selectedService: [],
        outlet_id: '1',
        staffStatus: '1',
        staffId: ''
      }
    }
  },
  methods: {
    selectAllServiceFun: function (value) {
      if (value) {
        this.getCategoryList.forEach(element => {
          element.services.forEach(service => {
            this.newStaff.selectedService.push(service.id)
          })
        })
      } else {
        this.newStaff.selectedService = []
      }
    },
    onColorSelected: function (colorId) {
      this.newStaff.appointmentColorId = colorId
    },
    addNewStaff: function () {
      this.$store.dispatch('staff/addNewStaff', this.newStaff)
        .then(() => {
          this.showSnackbar = true
        })
    },
    cancelNewStaff: function () {
      this.showSnackbar = false
      this.$router.back(-1)
    },
    getStaffData: function () {
      this.$store.dispatch('staff/getStaffId', this.$route.params.id)
        .then(resposne => {
          this.newStaff = resposne.data.responseData
        })
    },
    updateStaff: function () {
      this.newStaff.staffId = this.$route.params.id
      this.$store.dispatch('staff/updateStaff', this.newStaff)
        .then(response => {
          this.$notify(response.data.responseData)
        })
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Edit Staff')
    this.$store.dispatch('service/category')
    this.getStaffData()
  },
  computed: {
    getColorCode: function () {
      return JSON.parse(this.$store.getters.getColorCode)
    },
    getCategoryList: function () {
      return this.$store.getters['service/getCategoryItem']
    },
    getAddStaffResponse: function () {
      return this.$store.getters['staff/addNewServiceResponse']
    }
  }
}
</script>

<style lang="scss" scoped>
.vue-tel-input {
    z-index: 999999;
}
</style>
