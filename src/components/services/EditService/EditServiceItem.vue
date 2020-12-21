<template>
  <div>
    <md-tabs class="tab-view">
      <md-tab md-label="General">
        <div class="container">
          <md-content class="md-scrollbar">
            <md-field :class="getValidationClass('serviceName')">
              <label>Service Name</label>
              <md-input v-model="serviceItem.serviceName" required></md-input>
              <span
                class="md-error"
                v-if="!$v.serviceItem.serviceName.required"
              >The Service Name is required</span>
              <span
                class="md-error"
                v-else-if="!$v.serviceItem.serviceName.minlength"
              >Invalid Service Name</span>
            </md-field>
            <md-field>
              <label>Description</label>
              <md-textarea v-model="serviceItem.description" md-autogrow></md-textarea>
            </md-field>
            <div class="md-layout-item">
              <md-field :class="getValidationClass('categoryId')">
                <md-select
                  v-model="serviceItem.categoryId"
                  placeholder="Category"
                  name="serviceCategory"
                  id="serviceCategory"
                  md-dense
                >
                  <md-option
                    :value="item.id"
                    v-for="item in categoryList"
                    :key="item.name"
                  >{{item.name}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.serviceItem.categoryId.required">Category Required</span>
              </md-field>
            </div>

            <div class="md-layout-item mt-1">
              <span class="md-subheading">Duration</span>
              <div class="md-layout">
                <div class="md-layout-item mr-1">
                  <md-field :class="getValidationDurationClass('hours')">
                    <label>Hours</label>
                    <md-input v-model="serviceItem.duration.hours" type="number"></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.serviceItem.duration.hours.between"
                    >Enter valid Hours</span>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field :class="getValidationDurationClass('minutes')">
                    <label>Minutes</label>
                    <md-input v-model="serviceItem.duration.minutes" required type="number"></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.serviceItem.duration.minutes.between"
                    >Enter valid Minutes</span>
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
                    <md-input v-model="serviceItem.additionalDuration.hours" type="number"></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.serviceItem.duration.hours.between"
                    >Enter valid Hours</span>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field :class="getValidationAdditionalDurationClass('minutes')">
                    <label>Minutes</label>
                    <md-input v-model="serviceItem.additionalDuration.minutes" type="number"></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.serviceItem.duration.minutes.between"
                    >Enter valid Minutes</span>
                  </md-field>
                </div>
              </div>
            </div>
            <div class="md-layout-item mt-1">
              <span class="md-subheading w-100">Booking Type</span>
              <md-checkbox
                class="w-100"
                v-model="serviceItem.onlineBooking"
                :true-value="1"
                :false-value="2"
              >Allowed for online booking</md-checkbox>
            </div>
            <div class="md-layout-item mt-1">
              <span class="md-subheading w-100">Service Applicable</span>
              <div class="w-100">
                <md-radio v-model="serviceItem.serviceApplicant" :value="1">Male</md-radio>
                <md-radio v-model="serviceItem.serviceApplicant" :value="2">Female</md-radio>
                <md-radio v-model="serviceItem.serviceApplicant" :value="3">Everyone</md-radio>
              </div>
            </div>
          </md-content>
        </div>
      </md-tab>
      <md-tab md-label="Price">
        <div class="container">
          <div class="md-layout-item mt-1">
            <md-field :class="getValidationClass('price')">
              <label>Price</label>
              <md-input v-model="serviceItem.price" required type="number" min="0"></md-input>
              <span class="md-error" v-if="!$v.serviceItem.price.required">Price Required</span>
              <span
                class="md-error"
                v-if="!$v.serviceItem.price.numeric"
              >Enter Only Amount (Symbol or Special Characters not allowed)</span>
            </md-field>
          </div>
          <div class="md-layout-item mt-1">
            <md-field :class="getValidationClass('discountedPrice')">
              <label>Discounted Price (optional)</label>
              <md-input v-model="serviceItem.discountedPrice" type="number" min="0"></md-input>
              <span
                class="md-error"
                v-if="!$v.serviceItem.discountedPrice.numeric"
              >Enter Only Amount (Symbol or Special Characters not allowed)</span>
              <span
                class="md-error"
                v-if="!$v.serviceItem.discountedPrice.maxValue"
              >Should be less than actual price</span>
            </md-field>
          </div>
        </div>
      </md-tab>

      <md-tab md-label="Staff">
        <div class="container">
          <div class="md-layout-item mt-1">
            <span class="md-subheading w-100">Staff</span>
            <br />
            <span class="md-caption w-100">selected staff will provide the service to the customers</span>
            <div>
              <md-checkbox
                v-model="serviceItem.staff"
                :value="item.id"
                v-for="item in staffList"
                :key="item"
              >{{item.name}}</md-checkbox>
            </div>
          </div>
        </div>
      </md-tab>
    </md-tabs>
    <div class="align-end">
      <md-button class="md-raised md-accent" @click="showDelete=true">Delete Service</md-button>
      <md-button @click="exitEditService" class="md-raised md-primary">Cancel</md-button>
      <md-button @click="updateServiceItem">Save Changes</md-button>
    </div>

    <md-dialog-confirm
      :md-active.sync="showDelete"
      md-title="Confirm Delete"
      md-content="Are you sure  do you want delete this service"
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="showDelete=false"
      @md-confirm="onConfirmDelete"
    ></md-dialog-confirm>
  </div>
</template>

<script>
import {
  required,
  minLength,
  between,
  numeric
} from 'vuelidate/lib/validators'
export default {
  name: 'viewServiceDetails',
  data () {
    return {
      showDelete: false,
      serviceItem: {
        serviceId: '',
        serviceName: '',
        categoryId: null,
        onlineBooking: null,
        duration: {
          hours: '',
          minutes: ''
        },
        additionalDuration: {
          hours: '',
          minutes: ''
        },
        serviceApplicant: null,
        price: '',
        discountedPrice: '',
        staff: [],
        outletId: 1
      }
    }
  },
  validations: {
    serviceItem: {
      serviceName: {
        required,
        minLength: minLength(4)
      },
      categoryId: {
        required
      },
      duration: {
        hours: {
          between: between(0, 12)
        },
        minutes: {
          required,
          between: between(1, 59)
        }
      },
      additionalDuration: {
        hours: {
          between: between(0, 12)
        },
        minutes: {
          between: between(1, 59)
        }
      },
      price: {
        required,
        numeric
      },
      discountedPrice: {
        numeric
      }
    }
  },
  computed: {
    categoryList: function () {
      return this.$store.getters['service/categoryList']
    },
    staffList: function () {
      return this.$store.getters['staff/staffListData']
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    },
    messageClass: function () {
      return {
        'md-invalid': this.hasMessages
      }
    }
  },
  methods: {
    updateServiceItem: function () {
      this.$v.$touch()
      if (!this.$v.$invalid && this.serviceItem.staff.length !== 0) {
        this.updateService()
      } else {
        this.$notify({
          type: 'error',
          title: 'Details Missing',
          text: 'Please check all the required fields in all sections',
          duration: 5000
        })
      }
    },
    updateService: function () {
      const data = this.serviceItem
      const id = this.$route.params.id
      this.$store
        .dispatch('service/updateServiceItem', { data, id })
        .then(response => {
          // // console.log('updateService', response.data)
          this.$notify(response.data.message)
          this.exitEditService()
        })
    },
    exitEditService: function () {
      this.$router.go(-1)
    },
    onConfirmDelete: function () {
      this.$store
        .dispatch('service/deleteService', this.$route.params.id)
        .then(response => {
          // // console.log('onConfirmDelete', response.data)
          this.$notify(response.data.message)
          this.exitEditService()
        })
    },
    getCategoryList: function () {
      this.$store
        .dispatch('service/getCategoryList', this.getOutletId)
        .then(response => {
          // // console.log('getCategoryList', response.data)
        })
    },
    getValidationClass (fieldName) {
      const field = this.$v.serviceItem[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },

    getValidationDurationClass (fieldName) {
      const field = this.$v.serviceItem.duration[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    getValidationAdditionalDurationClass (fieldName) {
      const field = this.$v.serviceItem.additionalDuration[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },

    // get staff list
    getStaffList: function () {
      this.$store.dispatch('staff/staffList', this.getOutletId)
    }
  },
  created: function () {
    this.$store
      .dispatch('service/getServiceItemDetails', this.$route.params.id)
      .then(response => {
        // // console.log('getServiceItemDetails', response.data)
        this.serviceItem = response.data.responseData
      })
    this.getCategoryList()
    this.getStaffList()
  }
}
</script>

<style lang="scss" scoped>
</style>
