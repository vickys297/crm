<template>
  <div class="container mb-10">
    <!-- <VueCtkDateTimePicker
        v-if="appointmentData.selectedDate != ''"
        input-size="lg"
        :min-date="minDate"
        @input="onAppointmentTimeChange"
        v-model="appointmentData.selectedDate"
        class="wrapper"
        :auto-close="true"
        :onlyDate="true"
        color="black"
        buttonColor="black"
        :format="dateFormat"
        formatted="ll"
      >
        <md-button class="md-title xlarge-font">{{
          appointmentData.selectedDate
        }}</md-button>
        <span class="md-error" v-if="!$v.appointmentData.selectedDate.required"
          >Appointment Date Required</span
        >
      </VueCtkDateTimePicker> -->

    <!-- <div class="group m-2">
        <md-field
          class="mr-1"
          :class="getValidationAppointmentClass('selectedTime')"
        >
          <label>Ordered Date (Read Only)</label>
          <md-select
            v-model="appointmentData.selectedTime"
            name="appointmentTime"
            id="appointmentTime"
            disabled
            @md-selected="onAppointmentTimeChange"
          >
            <md-option
              :value="item.time"
              v-for="item in getTimeSlot"
              :key="item.time"
              >{{ item.time }}</md-option
            >
          </md-select>
          <span
            class="md-error"
            v-if="!$v.appointmentData.selectedTime.required"
            >Select Start Time</span
          >
        </md-field>
        <md-field
          class="mr-1"
          :class="getValidationAppointmentClass('selectedTime')"
        >
          <label>Delivered Date</label>
          <md-select
            v-model="appointmentData.selectedTime"
            name="appointmentTime"
            id="appointmentTime"
            @md-selected="onAppointmentTimeChange"
          >
            <md-option
              :value="item.time"
              v-for="item in getTimeSlot"
              :key="item.time"
              >{{ item.time }}</md-option
            >
          </md-select>
          <span
            class="md-error"
            v-if="!$v.appointmentData.selectedTime.required"
            >Select Start Time</span
          >
        </md-field>
      </div> -->

    <!-- <div class="flex-container mt-2">
      <div class="align-center mr-3">
        <span class="md-body-1 mr-1">Order Date/ Time</span>
        <div class="md-caption">
          {{ responseData.bookingDate }} -- {{ responseData.bookingTime }}
        </div>
      </div>
      <div class="align-center">
        <span class="md-body-1 mr-1">Delivery Date/ Time</span>
        <div class="md-caption">
          {{ responseData.deliveryDate }} -- {{ responseData.deliveryTime }} ({{
            period
          }})
        </div>
      </div>
    </div> -->
    <div class="flex-container align-center mb-2 mt-5">
      <div class="mr-3">
        <div class="md-caption">Ordered Date</div>
        <span class="md-title">
          {{ this.getFormattedDate(responseData.bookingDate) }}
        </span>
        <div class="md-caption">{{ responseData.bookingTime }}</div>
      </div>
      <div>
        <div class="md-caption">Delivery Date</div>
        <span class="md-title">{{
          this.getFormattedDate(responseData.deliveryDate)
        }}</span>
        <div class="md-caption">{{ responseData.deliveryTime }}</div>
      </div>
    </div>
    <md-divider></md-divider>

    <div class="tab-view mt-2">
      <div class="md-layout">
        <div
          class="md-layout-item md-xlarge-size-60 md-large-size-60 md-medium-size-50 md-small-size-100 p-2"
        >
          <md-list
            class="md-triple-line mb-2"
            v-for="(item, index) in serviceList"
            :key="index"
          >
            <div class="flex-container mb-2">
              <md-button class="md-icon-button md-primary md-raised">
                <span class="md-icon-button">{{ index + 1 }}</span>
              </md-button>
              <div class="md-toolbar-section-end" v-if="serviceList.length > 1">
                <md-button
                  class="md-icon-button md-raised md-accent"
                  @click="removeItem(index)"
                >
                  <md-icon class="md-error">close</md-icon>
                </md-button>
              </div>
            </div>

            <div class="flex-container">
              <md-field :class="getValidationClass('selectedServiceId', index)">
                <label>Service</label>
                <md-select
                  v-model="item.selectedServiceId"
                  name="services"
                  id="services"
                  @md-selected="selectedService(selectedServiceId, index)"
                >
                  <md-option
                    :value="item.serviceId"
                    v-for="item in getServiceList"
                    :key="item.serviceId"
                    >{{ item.categoryName }} - {{ item.serviceName }}</md-option
                  >
                </md-select>
                <span
                  class="md-error"
                  v-if="
                    !$v.serviceList.$each.$iter[index].selectedServiceId
                      .required
                  "
                  >Select Service to perform</span
                >
              </md-field>
            </div>
            <div class="flex-container w-25">
              <md-field :class="getValidationClass('itemCount', index)">
                <label>Item Quantity</label>
                <md-input v-model="item.itemCount"></md-input>
                <span class="md-helper-text" v-if="staffList.required"
                  >Quantity Required</span
                >
              </md-field>
            </div>
            <div>
              <md-divider></md-divider>
            </div>
          </md-list>
          <div>
            <md-button
              @click="addAnotherService"
              v-if="validateItem"
              class="md-raised md-primary"
              >Add Item</md-button
            >
          </div>
          <div class="mt-2">
            <span>Description</span>
            <md-field>
              <md-textarea v-model="description"></md-textarea>
            </md-field>
          </div>
        </div>
        <div
          class="md-layout-item md-xlarge-size-40 md-large-size-40 md-medium-size-50 md-small-size-100 p-2 md-alingment-center"
        >
          <div v-if="loading" class="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
           <ClientView :clientData="appointmentData.clientDetails" :deliveryAddress="deliveryAddress" v-else></ClientView>
          <!-- <div v-else>
            <div class="md-wrap-content mt-2">
              <div class="md-center-item">
                <md-avatar class="md-avatar-icon md-primary md-large">
                  <md-ripple>{{
                    appointmentData.clientDetails.name[0].toUpperCase()
                  }}</md-ripple>
                </md-avatar>
                <span class="md-title mt-2">
                  {{ appointmentData.clientDetails.name }}
                </span>
                <span class="md-caption mt-1">
                  {{ appointmentData.clientDetails.email }}
                </span>
              </div>
              <md-tabs class="mt-2 md-primary" md-alignment="centered">
                <md-tab id="tab-home" md-icon="date_range">
                  <span class="md-title mb-1">
                    Appointments (Past
                    {{ appointmentData.clientDetails.pastAppointments.length }})
                  </span>
                  <div>
                    <md-list
                      class="mt-2"
                      v-for="appointments in appointmentData.clientDetails
                        .pastAppointments"
                      :key="appointments"
                    >
                      <span class="md-subheading">
                        {{ appointments.appointmentDate }}
                      </span>
                      <md-list-item
                        class="mt-2"
                        v-for="services in appointments.services"
                        :key="services"
                      >
                        <span class="md-body-2 m-1">
                          {{ services.startTime }}
                        </span>
                        <div class="md-list-item-text">
                          <span
                            >{{ services.categoryName }} -
                            {{ services.serviceName }}</span
                          >
                          <p class="md-caption">with {{ services.staff }}</p>
                        </div>
                        <div>
                          <span>{{ services.cost }}</span>
                        </div>
                      </md-list-item>
                    </md-list>
                  </div>
                </md-tab>
                <md-tab id="tab-pages" md-icon="receipt">
                  <span class="md-title mb-1">Invoice</span>
                  <md-list class="mt-1">
                    <md-list-item
                      class="mt-1"
                      v-for="invoice in appointmentData.clientDetails.invoices"
                      :key="invoice"
                    >
                      <div class="md-list-item-text">
                        <span>{{ invoice.date }}</span>
                        <span class="md-caption">#{{ invoice.id }}</span>
                      </div>
                      <md-button
                        class="md-icon-button md-raised md-primary md-list-action"
                      >
                        <md-icon>check</md-icon>
                      </md-button>
                    </md-list-item>
                  </md-list>
                </md-tab>
                <md-tab id="tab-posts" md-icon="account_circle">
                  <md-list class="md-double-line">
                    <md-subheader>Phone</md-subheader>
                    <md-list-item>
                      <md-icon class="md-primary">phone</md-icon>
                      <div class="md-list-item-text">
                        <span>
                          {{ appointmentData.clientDetails.phoneNumber }}
                        </span>
                        <span>Mobile</span>
                      </div>
                    </md-list-item>
                    <md-divider></md-divider>
                    <md-subheader>Email</md-subheader>
                    <md-list-item>
                      <md-icon class="md-primary">email</md-icon>

                      <div class="md-list-item-text">
                        <span>{{ appointmentData.clientDetails.email }}</span>
                        <span>Personal</span>
                      </div>
                    </md-list-item>
                  </md-list>
                </md-tab>
              </md-tabs>
            </div>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Confirm Edit Dialog -->
    <md-dialog-confirm
      :md-active.sync="confirmDialog"
      md-title="Confirm changes"
      md-content="Are you sure do you want to update the changes?"
      md-confirm-text="Confirm"
      md-cancel-text="Cancel"
      @md-cancel="onUpdateCancel"
      @md-confirm="onUpdateConfirm"
    />
    <!-- Confirm Edit Dialog -->
    <div class="align-end">
      <md-button class="md-raised md-primary" @click="cancelAppointment"
        >Cancel</md-button
      >
      <md-button @click="confirmDialog = true">Update</md-button>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import ClientView from '../../components/common/client/ClientView.vue'
import moment from 'moment'
export default {
  name: 'EditAppointment',
  components: {
    ClientView
  },
  data () {
    return {
      confirmDialog: false,
      show: true,
      showDialog: false,
      loading: true,
      dateFormat: 'DD-MM-YYYY',
      minDate: new Date(),

      appointmentData: {
        selectedDate: '',
        selectedTime: '',
        clientDetails: '',
        paymentId: ''
      },

      // client Details
      clientData: {
        clientId: '',
        addressId: ''
      },

      // Error Message
      selectedTimeError: false,
      clientDetailsError: false,

      deliveryAddress: '',

      description: '',
      searchClient: false,
      clientSearchValue: '',
      serviceList: [],

      availableTimeSlotData: '',

      responseData: ''
    }
  },
  validations: {
    serviceList: {
      $each: {
        selectedServiceId: { required },
        itemCount: { required }
      }
    },
    appointmentData: {
      selectedTime: { required },
      selectedDate: { required }
    }
  },
  methods: {
    getFormattedDate: function (date) {
      return moment(date, 'DD-MM-YYYY').format('dddd, Do MMMM YYYY')
    },
    searchEnabled: function () {
      this.searchClient = true
    },
    searchDisabled: function () {
      this.searchClient = false
      this.clientSearchValue = ''
      this.$store.dispatch('client/clearClientSearch')
    },
    selectedService: function (value, position) {
      const array = this.getServiceList
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        if (
          element.serviceId === this.serviceList[position].selectedServiceId
        ) {
          this.serviceList[position].selectedServiceDuration = element.duration
        }
      }
      this.onAppointmentTimeChange()
    },
    onUpdateCancel: function () {
      this.confirmDialog = false
    },
    onUpdateConfirm: function () {
      this.validate()
    },
    cancelAppointment: function () {
      this.$router.go(-1)
    },
    addAnotherService: function () {
      // console.log('adjustedStartTime', this.getAdjustedStartTime)
      this.serviceList.push({
        selectedServiceDuration: '',
        selectedServiceId: '',
        itemCount: ''
      })
    },
    removeItem: function (index) {
      this.serviceList.splice(index, 1)
    },
    addToCustomerList: function (clientId) {
      this.showDialog = false
      this.loading = true
      this.$store
        .dispatch('client/clientDetails', clientId)
        .then(response => {
          this.loading = false
          this.appointmentData.clientDetails = response.data.responseData
        })
        .catch(() => {
          this.loading = false
        })
    },
    getValidationClass (fieldName, index) {
      const field = this.$v.serviceList.$each.$iter[index][fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    getValidationAppointmentClass (fieldName) {
      const field = this.$v.appointmentData[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validate: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.updateAppointment()
      } else {
        // this.$notify({
        //   type: 'error',
        //   title: 'Fields Required',
        //   text: 'please check the required fields'
        // })
        // this.$notify('Fields Required')
        // console.log('validate error')
      }
    },
    updateAppointment: function () {
      const appointmentData = {
        outletId: this.getOutletId,
        vendorId: 1,
        clientId: this.appointmentData.clientDetails.id,
        addressId: this.appointmentData.addressId,
        groupId: this.$route.params.id,
        bookingDate: this.appointmentData.selectedDate,
        bookingTime: this.appointmentData.selectedTime,
        deliveryDate: this.responseData.deliveryDate,
        deliveryTime: this.responseData.deliveryTime,
        service: this.serviceList,
        status: this.responseData.status,
        description: this.description,
        paymentId: this.appointmentData.paymentId,
        type: 1
      }
      this.$store
        .dispatch('client/updateAppointment', appointmentData)
        .then(response => {
          if (response.data.status === 1) {
            this.$router.go(-1)
            this.$notify(response.data.message)
          } else {
            this.$notify(response.data.message)
          }
        })
    },
    getConvertedDate: function (date) {
      return moment(date).format('MM-DD-YYYY')
    },
    getAvailableTimeSlot: function (date) {
      const selectedDate = this.getFormatDate(date)
      const outletId = this.getOutletId
      this.$store
        .dispatch('sales/availableTimeSlot', { selectedDate, outletId })
        .then(response => {
          this.availableTimeSlotData = response.data.responseData
        })
    },
    getFormatDate: function (date) {
      return moment(date).format(this.dateFormat)
    },
    // searchByClientDetails: function (value) {},
    getStaffListByServices: function (requestData) {
      this.$store.dispatch('staff/staffListByService', requestData)
    },
    onAppointmentTimeChange: function () {
      const requestData = {
        outletId: this.getOutletId,
        vendorId: this.getVendorId,
        date: this.appointmentData.selectedDate,
        time: this.appointmentData.selectedTime,
        serviceId: this.serviceList[0].selectedServiceId
      }
      this.getStaffListByServices(requestData)
    },
    styleDateFormat (date) {
      return moment(date).format(this.dateFormat)
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Edit Appointment')

    // basic function
    this.$store.dispatch('service/getServiceList', this.getOutletId)
    this.$store.dispatch('staff/staffList', this.getOutletId)
    this.$store.dispatch('client/clientList', this.getDefaultClientList)

    // get Appointment Details
    this.$store
      .dispatch('sales/appointmentPending', this.$route.params.id)
      .then(response => {
        const responseData = response.data.responseData
        this.responseData = response.data.responseData
        this.appointmentData.description = responseData.description
        this.appointmentData.selectedDate = responseData.bookingDate
        this.appointmentData.selectedTime = responseData.bookingTime
        this.appointmentData.addressId = responseData.addressId
        this.appointmentData.paymentId = responseData.paymentId
        this.deliveryAddress = responseData.deliveryAddress
        this.serviceList = responseData.service

        this.clientData.clientId = responseData.clientId
        this.clientData.addressId = responseData.addressId

        this.addToCustomerList(responseData.clientId)
      })

    this.getAvailableTimeSlot(this.appointmentData.selectedTime)
  },
  computed: {
    getDefaultClientList: function () {
      const requestData = {
        outletId: this.getOutletId,
        pageSize: 10,
        pageNumber: 1
      }
      return requestData
    },
    getTimeSlot: function () {
      return JSON.parse(this.$store.getters.getTimeSlot)
    },
    getServiceList: function () {
      return this.$store.getters['service/serviceList']
    },
    staffList: function () {
      return this.$store.getters['staff/getStaffListByServices']
    },
    clientList: function () {
      return this.$store.getters['client/clientList']
    },
    getStartTime: function () {
      return moment(new Date()).format(this.dateFormat)
    },
    getStyledDateFormate: function (date) {
      return moment(date).format(this.dateFormat)
    },
    getOutletId: function () {
      return parseInt(localStorage.getItem('OID'))
    },
    validateItem: function () {
      let index = this.serviceList.length

      if (index === 1) {
        if (
          this.serviceList[0].selectedServiceId !== '' &&
          this.serviceList[0].selectedServiceDuration !== '' &&
          this.serviceList[0].itemCount !== ''
        ) {
          return true
        }
      }
      if (index > 1) {
        index = index - 1
        if (
          this.serviceList[index].selectedServiceId !== '' &&
          this.serviceList[index].selectedServiceDuration !== '' &&
          this.serviceList[index].itemCount !== ''
        ) {
          return true
        }
      }

      return false
    },
    getTimeSlotById: function () {
      const array = JSON.parse(this.$store.getters.getTimeSlot)

      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        if (element.time === this.getLastServiceStartTime) {
          return element.id
        }
      }
      return 0
    },
    getClientSearch: function () {
      return this.$store.getters['client/getSearchClient']
    },
    getVendorId: function () {
      return JSON.parse(this.$store.getters['login/userDetails']).vendorId
    }
  },
  watch: {
    clientSearchValue: function () {
      if (this.clientSearchValue.length >= 3) {
        const client = this.clientSearchValue
        const outletId = this.getOutletId
        this.$store.dispatch('client/searchClient', { client, outletId })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.content-end {
  justify-content: flex-end;
}

.md-list {
  overflow: auto;
}

.scrolls {
  overflow-x: scroll;
  overflow-y: hidden;
  height: fit-content;
  white-space: nowrap;
}

.md-error {
  color: red;
}

.xlarge-font {
  font-size: x-large;
}

.wrapper {
  background-color: transparent;
  border: 0;
  padding: 10px;
}

.md-wrap-content {
  height: fit-content;
}

.md-xlarge {
  min-width: 128px;
  min-height: 128px;
  border-radius: 128px;
  font-size: 64px;
}

.medium-font {
  font-size: large;
}

.md-content {
  max-height: 80%;
  overflow: auto;
}
</style>
