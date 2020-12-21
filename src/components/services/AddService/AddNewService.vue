<template>
    <div class="tab-view">
        <md-tabs md-dynamic-height>
            <md-tab md-label="General">
                <md-content class="md-scrollbar container">
                    <md-field :class="getValidationClass('serviceName')">
                        <label>Service Name</label>
                        <md-input v-model="addNewService.serviceName" required></md-input>
                        <span class="md-error" v-if="!$v.addNewService.serviceName.required">The Service Name is required</span>
                        <span class="md-error" v-else-if="!$v.addNewService.serviceName.minlength">Invalid Service Name</span>
                    </md-field>
                    <md-field>
                        <label>Description</label>
                        <md-textarea v-model="addNewService.description" md-autogrow></md-textarea>
                    </md-field>
                    <md-field :class="getValidationClass('categoryId')">
                        <label>Category</label>
                        <md-select required v-model="addNewService.categoryId" name="serviceCategory" id="serviceCategory" md-dense>
                            <md-option :value="item.id" v-for="item in categoryList" :key="item.name">{{item.name}}</md-option>
                        </md-select>
                        <span class="md-error" v-if="!$v.addNewService.categoryId.required">Category Required</span>
                    </md-field>
                    <div class="md-layout-item mt-1">
                        <span class="md-subheading">Duration</span>
                        <div class="md-layout">
                            <div class="md-layout-item mr-1">
                                <md-field :class="getValidationDurationClass('hours')">
                                    <label>Hours</label>
                                    <md-input v-model="addNewService.duration.hours" type="number"></md-input>
                                    <span class="md-error" v-if="!$v.addNewService.duration.hours.between">Enter valid Hours</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item">
                                <md-field :class="getValidationDurationClass('minutes')">
                                    <label>Minutes</label>
                                    <md-input v-model="addNewService.duration.minutes" required type="number"></md-input>
                                    <span class="md-error" v-if="!$v.addNewService.duration.minutes.required">Enter Minutes</span>
                                    <span class="md-error" v-if="!$v.addNewService.duration.minutes.between">Enter valid Minutes</span>
                                </md-field>
                            </div>
                        </div>
                    </div>
                    <div class="md-layout-item mt-1">
                        <span class="md-subheading">Additional Duration (Optional)</span>
                        <div class="md-layout">
                            <div class="md-layout-item mr-1">
                                <md-field :class="getValidationAdditionalDurationClass('hours')">
                                    <label>Hours</label>
                                    <md-input v-model="addNewService.additionalDuration.hours" type="number"></md-input>
                                    <span class="md-error" v-if="!$v.addNewService.duration.hours.between">Enter valid Hours</span>
                                </md-field>
                            </div>
                            <div class="md-layout-item">
                                <md-field :class="getValidationAdditionalDurationClass('minutes')">
                                    <label>Minutes</label>
                                    <md-input v-model="addNewService.additionalDuration.minutes" type="number"></md-input>
                                    <span class="md-error" v-if="!$v.addNewService.duration.minutes.between">Enter valid Minutes</span>
                                </md-field>
                            </div>
                        </div>
                    </div>
                    <div class="md-layout-item mt-1">
                        <span class="md-subheading w-100">Booking Type</span>
                        <md-checkbox class="w-100" v-model="addNewService.onlineBooking" :true-value="1" :false-value="2">Allowed for online booking</md-checkbox>
                    </div>
                    <div class="md-layout-item mt-1">
                        <span class="md-subheading w-100">Service Applicable</span>
                        <div class="w-100">
                            <md-radio v-model="addNewService.serviceApplicant" :value="1">Male</md-radio>
                            <md-radio v-model="addNewService.serviceApplicant" :value="2">Female</md-radio>
                            <md-radio v-model="addNewService.serviceApplicant" :value="3">Everyone</md-radio>
                        </div>
                    </div>
                </md-content>
            </md-tab>
            <md-tab md-label="Price">
                <div class="container">
                    <div class="md-layout-item mt-1">
                        <md-field :class="getValidationClass('price')">
                            <label>Price</label>
                            <md-input v-model="addNewService.price" required type="number"></md-input>
                            <span class="md-error" v-if="!$v.addNewService.price.required">Price Required</span>
                        </md-field>
                    </div>
                    <div class="md-layout-item mt-1">
                        <md-field>
                            <label>Discounted Price (optional)</label>
                            <md-input v-model="addNewService.discountedPrice" type="number"></md-input>
                        </md-field>
                    </div>
                </div>
            </md-tab>

            <md-tab md-label="Staff">
                <div class="md-layout-item mt-1 container">
                    <span class="md-subheading w-100">Select Staff *</span>
                    <br />
                    <span class="md-caption w-100">selected staff will provide the service to the customers</span>
                    <div>
                        <md-checkbox v-model="addNewService.staff" :value="item.id" v-for="item in staffList" :key="item">{{item.name}}</md-checkbox>
                    </div>
                    <div>
                        <span class="md-error" v-if="addNewService.staff.length == 0">No Staff Selected</span>
                    </div>
                </div>
            </md-tab>
        </md-tabs>
        <div class="align-end">
            <md-button class="md-raised md-primary" @click="exitAddNewService">Cancel</md-button>
            <md-button @click="saveNewService">Create</md-button>
        </div>
    </div>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      addNewService: {
        serviceName: '',
        description: '',
        categoryId: null, // category id
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

  // validation
  validations: {
    addNewService: {
      serviceName: {
        required,
        minLength: minLength(4)
      },
      categoryId: {
        required
      },
      duration: {
        hours: {
          between: between(1, 12)
        },
        minutes: {
          required,
          between: between(1, 59)
        }
      },
      additionalDuration: {
        hours: {
          between: between(1, 12)
        },
        minutes: {
          between: between(1, 59)
        }
      },
      price: {
        required
      }
    }

  },
  // validation

  created: function () {
    this.$store.dispatch('setTitle', 'Add New Service')
    this.getCategoryList()
    this.getStaffList()
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.addNewService[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    getValidationDurationClass (fieldName) {
      const field = this.$v.addNewService.duration[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    getValidationAdditionalDurationClass (fieldName) {
      const field = this.$v.addNewService.additionalDuration[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    showServiceByCategory: function (item) {
      this.services = item
      // // console.log('showServiceByCategory ', item)
    },
    // get category list
    getCategoryList: function () {
      this.$store.dispatch('service/getCategoryList', this.getOutletId)
    },

    // get staff list
    getStaffList: function () {
      this.$store.dispatch('staff/staffList', this.getOutletId)
    },
    saveNewService: function () {
      this.$v.$touch()
      if (!this.$v.$invalid && this.addNewService.staff.length !== 0) {
        this.addNewService.outletId = this.getOutletId
        this.addService()
      } else {
        this.$notify({
          type: 'error',
          title: 'Details Missings',
          text: 'Please check all the required fields in all sections',
          duration: 5000
        })
      }
    },
    addService: function () {
      this.$store.dispatch('service/saveNewService', this.addNewService)
        .then(response => {
          this.$notify(response.data.message)
          this.$router.go(-1)
        })
    },
    exitAddNewService: function () {
      this.$router.go(-1)
    },
    TestFunction: function () {
      // // console.log('test')
    }
  },
  computed: {
    categoryList: function () {
      // // console.log('categoryList', this.$store.getters['service/categoryList'])
      return this.$store.getters['service/categoryList']
    },
    staffList: function () {
      return this.$store.getters['staff/staffListData']
    },
    messageClass: function () {
      return {
        'md-invalid': this.hasMessages
      }
    },
    addNewServiceReponse: function () {
      return this.$store.getters['service/addNewService']
    },
    errorMessage: function () {
      return 'md-invalid'
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    }
  }
}
</script>

<style lang="scss" scoped>
.md-error {
    color: red;
}
</style>
