<template>
  <div class="tab-view">
    <md-tabs>
      <md-tab id="tab-pages-1" md-label="General">
        <div class="container">
          <div class="md-layout md-gutter">
            <div class="md-layout-item">
              <div class="md-layout md-gutter">
                <div class="md-layout-item">
                  <md-field :class="getValidationClass('firstName')">
                    <label>First Name</label>
                    <md-input v-model="newStaff.firstName" required></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.newStaff.firstName.required"
                      >First name is required</span
                    >
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field :class="getValidationClass('lastName')">
                    <label>Last Name</label>
                    <md-input v-model="newStaff.lastName" required></md-input>
                    <span class="md-error" v-if="!$v.newStaff.lastName.required"
                      >Last name is required</span
                    >
                  </md-field>
                </div>
              </div>
              <vue-tel-input
                v-model="newStaff.phoneNumber"
                wrapperClasses="md-field no-border md-theme-default"
                inputClasses="tel-input"
              ></vue-tel-input>
              <md-field class="mt-1" :class="getValidationClass('email')">
                <label>Email</label>
                <md-input
                  v-model="newStaff.email"
                  required
                  placeholder="UserName@Domain.com"
                ></md-input>
                <span class="md-error" v-if="!$v.newStaff.email.required"
                  >Email is required</span
                >
                <span class="md-error" v-if="!$v.newStaff.email.email"
                  >Enter valid email id</span
                >
              </md-field>
              <span class="md-subheading">Gender</span>
              <div>
                <md-radio v-model="newStaff.gender" value="Male">Male</md-radio>
                <md-radio v-model="newStaff.gender" value="Female"
                  >Female</md-radio
                >
              </div>
              <md-checkbox
                v-model="newStaff.allowOnline"
                :true-value="true"
                :false-value="false"
                >Allow Online booking</md-checkbox
              >
              <br />
              <span class="md-caption"
                >Note: Enable to show staff in your shops staff list</span
              >
              <div class="md-list-item  mt-2">
                <span class="md-subheading">Appointment Color</span>
                <br />
                <span class="md-caption"
                  >Note: Selected color will be indicated in calander for the
                  particular staff</span
                >
                <ColorCode
                  :colorCodeData="getColorCode"
                  :selectedColorCode="newStaff.appointmentColorId"
                  class="mt-1"
                  @colorSelected="onColorSelected"
                ></ColorCode>
                <md-filed :class="getValidationClass('appointmentColorId')">
                  <span
                    class="md-error"
                    v-if="!$v.newStaff.appointmentColorId.required"
                    >Last name is required</span
                  >
                </md-filed>
              </div>
            </div>
            <div class="md-layout-item">
              <md-field :class="getValidationClass('staffPosition')">
                <label>Staff Position</label>
                <md-input v-model="newStaff.staffPosition" required></md-input>
                <span
                  class="md-error"
                  v-if="!$v.newStaff.staffPosition.required"
                  >Staff Position is required</span
                >
              </md-field>
              <label>Note</label>
              <md-field :class="getValidationClass('staffNote')">
                <md-textarea
                  v-model="newStaff.staffNote"
                  placeholder="Private notes about the staff"
                ></md-textarea>
              </md-field>
            </div>
          </div>
        </div>
      </md-tab>
      <md-tab id="tab-pages-2" md-label="Services">
        <div class="container">
          <span class="md-title">Service List</span>
          <br />
          <span class="md-caption"
            >select the service list performed by the staff</span
          >
          <br />
          <md-filed :class="getValidationClass('selectedService')">
            <span class="color-red" v-if="!$v.newStaff.selectedService.required"
              >Please select the services</span
            >
          </md-filed>
          <br />
          <md-checkbox
            v-model="selectAllService"
            :true-value="true"
            :false-value="false"
            @change="selectAllServiceFun(selectAllService)"
            >Select All Service</md-checkbox
          >
          <md-list
            v-for="item in getCategoryList"
            :key="item.name"
            class="md-card mt-2"
          >
            <md-list-item>
              <span>{{ item.name }}</span>
              <md-list-item>
                <div v-for="(service, index) in item.services" :key="index">
                  <md-checkbox
                    v-model="newStaff.selectedService"
                    :value="service.id"
                    >{{ service.name }}</md-checkbox
                  >
                </div>
              </md-list-item>
            </md-list-item>
          </md-list>
        </div>
      </md-tab>
    </md-tabs>
    <div class="align-end">
      <md-button @click="cancelNewStaff" class="md-raised md-primary">Cancel</md-button>
      <md-button @click="validate">Create</md-button>
    </div>

    <md-snackbar
      :md-position="position"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ getAddStaffResponse }}</span>
      <md-button class="md-accent" @click="cancelNewStaff">Ok</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import ColorCode from '../color/ColorView.vue'
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
export default {
  name: 'addStaff',
  mixins: [validationMixin],
  components: {
    ColorCode
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      showSnackbar: false,
      serviceList: '',
      selectAllService: false,
      newStaff: {
        firstName: '',
        lastName: '',
        email: '',
        gender: 'Male',
        phoneNumber: '',
        allowOnline: true,
        appointmentColorId: '1',
        staffPosition: '',
        staffNote: '',
        selectedService: [],
        outlet_id: ''
      }
    }
  },
  validations: {
    newStaff: {
      firstName: { required, minLength: minLength(4) },
      lastName: { required },
      email: { required, email },
      phoneNumber: { required },
      allowOnline: { required },
      appointmentColorId: { required },
      staffPosition: { required },
      selectedService: { required },
      staffNote: { maxLength: maxLength(250) }
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
      this.$store
        .dispatch('staff/addNewStaff', this.newStaff)
        .then(response => {
          this.$notify(response.data.message)
          if (response.data.status === 1) {
            this.$router.go(-1)
          }
        })
    },
    cancelNewStaff: function () {
      this.showSnackbar = false
      this.$router.back(-1)
    },
    getValidationClass (fieldName) {
      const field = this.$v.newStaff[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    getValidationBoolean (fieldName) {
      const field = this.$v.newStaff[fieldName]
      if (field) {
        return {
          true: field.$invalid && field.$dirty
        }
      }
    },
    validate () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.addNewStaff()
      }
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Add New Staff')
    this.$store.dispatch('service/category', this.getOutletId)
    this.newStaff.outlet_id = this.getOutletId
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
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    }
  }
}
</script>

<style lang="scss" scoped>
.vti__dropdown:hover {
  background-color: #f3f3f3;
  z-index: 10000;
}
</style>
