<template>
  <div class="container mb-10">
    <div class="group">
      <VueCtkDateTimePicker
        input-size="lg"
        @input="getAvailableTimeSlot"
        :min-date="getStartTime"
        v-model="appointmentData.selectedDate"
        class="wrapper"
        auto-close="true"
        :onlyDate="true"
        color="black"
        buttonColor="black"
        format="YYYY-MM-DD"
        formatted="ll"
      >
        <md-button class="md-title xlarge-font">
          <md-icon>calander</md-icon>
          {{ selectedDate }}
        </md-button>
        <span class="md-error" v-if="!$v.appointmentData.selectedDate.required"
          >Appointment Date Required</span
        >
      </VueCtkDateTimePicker>

      <md-field
        class="mr-1"
        :class="getValidationAppointmentClass('selectedTime')"
      >
        <label>Appointment Start Time</label>
        <md-select
          v-model="appointmentData.selectedTime"
          name="movie"
          id="movie"
        >
          <md-option
            :value="item"
            v-for="(item, index) in availableTimeSlotData.appointmentTime"
            :key="index"
            >{{ item }}</md-option
          >
        </md-select>
        <span class="md-error" v-if="!$v.appointmentData.selectedTime.required"
          >Select Start Time</span
        >
      </md-field>
    </div>
    <div class="tab-view">
      <div class="md-layout mt-1">
        <div
          class="md-layout-item md-large-size-60 md-medium-size-50 md-small-size-100 p-2"
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
                <label>Select Service</label>
                <md-select
                  v-model="item.selectedServiceId"
                  name="services"
                  id="services"
                  :md-selected="selectedService(selectedServiceId, index)"
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
            <div class="flex-container">
              <md-field
                :class="getValidationClass('selectedServiceDuration', index)"
                class="mr-1 w-25"
              >
                <label>Duration</label>
                <md-input
                  v-model="item.selectedServiceDuration"
                  readonly
                ></md-input>
                <span
                  class="md-error"
                  v-if="
                    !$v.serviceList.$each.$iter[index].selectedServiceDuration
                      .required
                  "
                  >Duration Required</span
                >
              </md-field>

              <md-field :class="getValidationClass('selectedStaffId', index)">
                <label>Staff</label>
                <md-select
                  v-model="item.selectedStaffId"
                  name="movie"
                  id="movie"
                >
                  <md-option
                    :value="item.id"
                    v-for="item in staffList"
                    :key="item.id"
                    >{{ item.name }}</md-option
                  >
                </md-select>
                <span
                  class="md-error"
                  v-if="
                    !$v.serviceList.$each.$iter[index].selectedStaffId.required
                  "
                  >Select Staff</span
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
          class="md-layout-item md-large-size-40 md-medium-size-50 md-small-size-100 p-2 md-alingment-center"
        >
          <div v-if="loading" class="loading">
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
          <div v-else>
            <div
              class="md-center-item md-wrap-content mt-2"
              v-if="appointmentData.clientDetails === ''"
            >
              <md-icon class="md-size-4x md-primary">person_add</md-icon>
              <span class="md-body-1 mt-2">No Client Selected</span>
              <md-button class="md-primary md-raised" @click="showDialog = true"
                >Select Client</md-button
              >
            </div>
            <div v-else class="md-wrap-content mt-2">
              <div class="md-toolbar-section-end">
                <md-button
                  class="md-raised md-primary"
                  @click="showDialog = true"
                  >Change</md-button
                >
              </div>
              <div class="md-center-item">
                <md-avatar class="md-large">
                  <img src="https://source.unsplash.com/random" alt="client" />
                </md-avatar>
                <span class="md-title mt-2">{{
                  appointmentData.clientDetails.name
                }}</span>
                <span class="md-caption mt-1">{{
                  appointmentData.clientDetails.email
                }}</span>
              </div>
              <md-tabs class="mt-2 md-primary" md-alignment="centered">
                <md-tab id="tab-home" md-icon="date_range">
                  <span class="md-title mb-1"
                    >Appointments (Past
                    {{
                      appointmentData.clientDetails.pastAppointments.length
                    }})</span
                  >
                  <div>
                    <md-list
                      class="mt-2"
                      v-for="appointments in appointmentData.clientDetails
                        .pastAppointments"
                      :key="appointments"
                    >
                      <span class="md-subheading">{{
                        appointments.appointmentDate
                      }}</span>
                      <md-list-item
                        class="mt-2"
                        v-for="services in appointments.services"
                        :key="services"
                      >
                        <span class="md-body-2 m-1">{{
                          services.startTime
                        }}</span>
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
                        <span>{{
                          appointmentData.clientDetails.phoneNumber
                        }}</span>
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
          </div>
        </div>
      </div>

      <!-- ADD Client -->
      <md-dialog
        :md-active.sync="showDialog"
        :md-click-outside-to-close="false"
        :md-close-on-esc="false"
        class="p-2 w-50"
      >
        <md-dialog-title>Select Client</md-dialog-title>

        <div class="flex-container align-center">
          <md-button
            class="md-primary md-raised"
            @click="searchEnabled"
            v-if="!searchClient"
          >
            <md-icon>search</md-icon>Search Client
          </md-button>
          <md-field class="w-50" v-else md-clearable>
            <md-icon>search</md-icon>
            <label>Search</label>
            <md-input
              v-model="clientSearchValue"
              placeholder="Example: Vicky or 9876543210"
            ></md-input>
            <span class="md-helper-text">Minimum 3 character required</span>
          </md-field>
          <md-button
            class="md-primary md-raised"
            @click="searchDisabled"
            v-if="searchClient"
            >Cancel</md-button
          >
          <div class="md-toolbar-section-end">
            <md-button class="md-raised md-primary" to="/clients/add"
              >Add New Client</md-button
            >
          </div>
        </div>

        <div
          class="md-content md-layout md-gutter md-scrollbar m-2 p-1 mt-2 md-alignment-center"
          v-if="!searchClient"
        >
          <div
            class="md-layout-item md-size-45 md-card m-1"
            v-for="item in clientList"
            :key="item.id"
            @click="addToCustomerList(item)"
          >
            <md-list
              class="md-triple-line"
              v-if="item.name !== null && item.name !== ''"
            >
              <md-list-item>
                <md-avatar class="md-avatar-icon md-primary">{{
                  item.name[0].toUpperCase()
                }}</md-avatar>

                <div class="md-list-item-text">
                  <span class="md-title">{{ item.name }}</span>
                  <span class="mt-1 md-body-1"
                    >Phone: {{ item.phoneNumber }}</span
                  >
                  <span class="md-caption">Email: {{ item.email }}</span>
                </div>
              </md-list-item>
            </md-list>
          </div>
        </div>

        <div
          class="md-content md-layout md-gutter md-scrollbar p-1 mt-2 align-center"
          v-else
        >
          <div
            class="md-layout-item md-size-45 md-card m-1"
            v-for="item in getClientSearch"
            :key="item.id"
            @click="addToCustomerList(item)"
          >
            <md-list
              class="md-triple-line"
              v-if="item.name !== null && item.name !== ''"
            >
              <md-list-item>
                <md-avatar class="md-avatar-icon md-primary">{{
                  item.name[0].toUpperCase()
                }}</md-avatar>

                <div class="md-list-item-text">
                  <span class="md-title">{{ item.name }}</span>
                  <span class="mt-1 md-body-1"
                    >Phone: {{ item.phoneNumber }}</span
                  >
                  <span class="md-caption">Email: {{ item.email }}</span>
                </div>
              </md-list-item>
            </md-list>
          </div>
        </div>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false"
            >Close</md-button
          >
        </md-dialog-actions>
      </md-dialog>
      <!-- ADD Client -->
    </div>
    <div class="align-end">
      <md-button class="md-raised md-primary" @click="cancelAppointment"
        >Cancel</md-button
      >
      <md-button @click="validate">Confirm</md-button>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import moment from 'moment'
export default {
  name: 'NewAppointment',

  data () {
    return {
      show: true,
      showDialog: false,
      loading: false,
      startDate: new Date(),

      appointmentData: {
        selectedDate: new Date(),
        selectedTime: '',
        clientDetails: ''
      },

      // Error Message
      selectedTimeError: false,
      clientDetailsError: false,

      description: '',
      searchClient: false,
      clientSearchValue: '',
      serviceList: [
        {
          selectedServiceId: '',
          selectedServiceDuration: '',
          selectedStaffId: ''
        }
      ],

      availableTimeSlotData: ''
    }
  },
  validations: {
    serviceList: {
      $each: {
        selectedServiceDuration: { required },
        selectedServiceId: { required },
        selectedStaffId: { required }
      }
    },
    appointmentData: {
      selectedTime: { required },
      selectedDate: { required }
    }
  },
  methods: {
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
    },
    cancelAppointment: function () {
      this.$router.go(-1)
    },
    addAnotherService: function () {
      // console.log('adjustedStartTime', this.getAdjustedStartTime)
      this.serviceList.push({
        selectedServiceDuration: '',
        selectedServiceId: '',
        selectedStaffId: ''
      })
    },
    removeItem: function (index) {
      this.serviceList.splice(index, 1)
    },
    addToCustomerList: function (client) {
      this.showDialog = false
      this.appointmentData.clientDetails = client
      this.loading = true
      this.$store
        .dispatch('client/clientDetails', client.id)
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
        this.addNewAppointment()
      } else {
        this.$notify({
          type: 'error',
          title: 'Fields Required',
          text: 'please check the required fields'
        })
      }
    },
    addNewAppointment: function () {
      const appointmentData = {
        outletId: this.getOutletId,
        vendorId: 1,
        clientId: this.appointmentData.clientDetails.id,
        bookingDate: this.getConvertedDate(this.appointmentData.selectedDate),
        bookingTime: this.appointmentData.selectedTime,
        service: this.serviceList,
        description: this.description,
        addressId: 0,
        paymentId: 5
      }
      this.$store
        .dispatch('client/addNewAppointment', appointmentData)
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
      return moment(date).format('DD-MM-YYYY')
    },
    getAvailableTimeSlot: function (date) {
      const selectedDate = this.getFormatedDate(date)
      const outletId = this.getOutletId
      this.$store
        .dispatch('sales/availableTimeSlot', { selectedDate, outletId })
        .then(response => {
          this.availableTimeSlotData = response.data.responseData
        })
    },
    getFormatedDate: function (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    searchByClientDetails: function (value) {
      // console.log('searchByClientDetails', value)
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Appointment')
    this.$store.dispatch('service/getServiceList', this.getOutletId)
    this.$store.dispatch('staff/staffList', this.getOutletId)

    const requestData = {
      outletId: this.getOutletId,
      pageSize: 20,
      pageNumber: 1
    }
    this.$store.dispatch('client/clientList', requestData)

    this.getAvailableTimeSlot(new Date())
  },
  computed: {
    getTimeSlot: function () {
      return JSON.parse(this.$store.getters.getTimeSlot)
    },
    getServiceList: function () {
      return this.$store.getters['service/serviceList']
    },
    staffList: function () {
      return this.$store.getters['staff/staffListData']
    },
    clientList: function () {
      return this.$store.getters['client/clientList']
    },
    getStartTime: function () {
      return moment(new Date()).format('YYYY-MM-DD')
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
          this.serviceList[0].selectedStaffId !== ''
        ) {
          return true
        }
      }
      if (index > 1) {
        index = index - 1
        if (
          this.serviceList[index].selectedServiceId !== '' &&
          this.serviceList[index].selectedServiceDuration !== '' &&
          this.serviceList[index].selectedStaffId !== ''
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
