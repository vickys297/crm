<template>
  <div class="no-scroll">
    <div>
      <div class="flex-container align-center">
        <div class="align-center">
          <span class="md-display-1 ml-2">#{{ getAppointmentId }}</span>
        </div>
        <div class="md-toolbar-section-end">
          <div
            v-if="this.appointmentData.appointmentStatus !== 0"
            class="flex-container align-center"
          >
            <md-menu>
              <md-button md-menu-trigger class="md-raised md-primary">Options</md-button>
              <md-menu-content>
                <md-menu-item>
                  <md-button @click="editAppointment">Edit</md-button>
                </md-menu-item>
                <!-- <md-menu-item>Reschedule</md-menu-item> -->
                <md-menu-item>
                  <md-button @click="updateAppointmentStatus(4)">No Show</md-button>
                </md-menu-item>
                <md-menu-item class="no-margin">
                  <md-button class="md-raised md-accent" @click="updateAppointmentStatus(0)">cancel</md-button>
                </md-menu-item>
              </md-menu-content>
            </md-menu>
            <div class="align-center ml-2">
              <span class="md-body-1 mr-1">Order Status</span>
              <span class="md-body-2 mr-1">
                <strong>
                  {{
                  this.getStatusText(this.appointmentData.appointmentStatus)
                  }}
                </strong>
              </span>
              <md-menu md-size="medium" md-align-trigger class="mr-1">
                <md-button md-menu-trigger class="md-icon-button md-raised md-primary">
                  <md-icon class="md-size-1x">edit</md-icon>
                </md-button>

                <md-menu-content>
                  <md-menu-item @click="updateAppointmentStatus(2)">Picked</md-menu-item>
                  <md-menu-item @click="updateAppointmentStatus(3)">Arrived</md-menu-item>
                  <md-menu-item @click="updateAppointmentStatus(4)">Processing</md-menu-item>
                  <md-menu-item @click="updateAppointmentStatus(5)">Out For Delivery</md-menu-item>
                  <md-menu-item @click="updateAppointmentStatus(6)">Delivered</md-menu-item>
                  <md-menu-item @click="updateAppointmentStatus(7)">Returned</md-menu-item>
                  <md-menu-item @click="updateAppointmentStatus(0)">Cancelled</md-menu-item>
                </md-menu-content>
              </md-menu>

              <md-button
                @click="updateAppointmentStatus(8)"
                class="md-primary md-raised"
                v-if="
                  this.appointmentData.appointmentStatus === 6 ||
                    this.appointmentData.appointmentStatus === 7
                "
              >Close Order</md-button>
            </div>
          </div>
          <div v-else>
            <md-button class="md-raised md-primary" @click="updateAppointmentStatus(3)">Rollback</md-button>
          </div>
        </div>
      </div>
    </div>

    <!-- Date View -->
    <div class="container mt-5">
      <div class="flex-container align-center mb-2">
        <div class="mr-3">
          <div class="md-caption">Ordered Date</div>
          <span class="md-title">{{ appointmentData.appointmentDate }}</span>
          <div class="md-caption">{{ appointmentData.orderTime }}</div>
        </div>
        <div>
          <div class="md-caption">Delivery Date</div>
          <span class="md-title">
            {{
            this.getFormattedDate(appointmentData.deliveryDate)
            }}
          </span>
          <div class="md-caption">{{ appointmentData.deliveryTime }} ({{ appointmentData.period }})</div>
        </div>
      </div>
      <md-divider></md-divider>
    </div>
    <!-- Date View -->

    <md-content class="mt-2">
      <div class="container">
        <div class="md-layout md-gutter mt-2">
          <div class="md-layout-item md-xlarge-size-60 md-large-size-60 md-medium-size-50">
            <!-- Order Items -->
            <div class="mt-2">
              <div v-for="(item, name, index) in this.getGroupedService" :key="index">
                <span class="md-headline">{{ name }}</span>
                <md-list class="md-triple-line" v-for="item in item" :key="item.serviceName">
                  <md-list-item>
                    <md-avatar class="md-avatar-icon md-primary">{{ item.itemQuantity }}</md-avatar>
                    <div class="md-list-item-text mr-2">
                      <span>{{ item.categoryName }} - {{ item.serviceName }}</span>
                      <span class="md-caption">#{{ item.itemNumber }}</span>
                    </div>
                    <span class="md-title">{{ item.cost }}</span>
                  </md-list-item>
                </md-list>
              </div>
            </div>
            <!-- Order Items -->

            <!-- Order Footer -->
            <md-divider></md-divider>
            <div class="p-1 md-layout align-center">
              <div class="md-layout-item">
                <span class="md-title pr-2">Total Quantity</span>
                <span class="md-title">
                  <strong>{{ appointmentData.totalItemQuantity }}</strong>
                </span>
              </div>
              <div class="md-layout-item md-toolbar-section-end">
                <span class="md-title pr-2">Total</span>
                <span class="md-title">
                  <strong>{{ appointmentData.totalCost }}</strong>
                </span>
              </div>
            </div>
            <!-- Order Footer -->
          </div>
          <div class="md-layout-item md-xlarge-size-40 md-large-size-40 md-medium-size-50">
            <div v-if="loading" class="loading">
              <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
            <ClientView :clientData="getCustomerData" :deliveryAddress="appointmentData.deliveryAddress" v-else></ClientView>
          </div>
        </div>
      </div>
    </md-content>
    <md-drawer class="md-right" :md-active.sync="showSidepanel">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Checkout</span>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <span class="md-subheading">Payment Type</span>
        </md-list-item>
      </md-list>
      <md-list>
        <md-list-item>
          <md-button
            @click="checkoutData.paymentType = '1'"
            :disabled="checkoutData.paymentType == '1'"
            class="md-primary md-raised"
          >Cash</md-button>
          <md-button
            @click="checkoutData.paymentType = '2'"
            :disabled="checkoutData.paymentType == '2'"
            class="md-primary md-raised"
          >Card</md-button>
          <md-button
            @click="checkoutData.paymentType = '3'"
            :disabled="checkoutData.paymentType == '3'"
            class="md-primary md-raised"
          >Wallet</md-button>
          <md-button
            @click="checkoutData.paymentType = '4'"
            :disabled="checkoutData.paymentType == '4'"
            class="md-primary md-raised"
          >Redeem</md-button>
        </md-list-item>
      </md-list>
      <md-list>
        <md-list-item>
          <md-field>
            <label>Description</label>
            <md-textarea v-model="checkoutData.description"></md-textarea>
            <span class="md-helper-text">Include Receipt Number if available</span>
          </md-field>
        </md-list-item>
      </md-list>
      <md-list>
        <md-list-item>
          <div class="md-toolbar-section-end">
            <md-button class="md-primary md-raised" @click="showSidepanel = false">cancel</md-button>
            <md-button @click="updateAppointmentStatus(3)">Apply</md-button>
          </div>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
import moment from 'moment'
import ClientView from '../common/client/ClientView.vue'
export default {
  name: 'viewAppointment',
  components: {
    ClientView
  },
  data () {
    return {
      showSidepanel: false,
      loading: true,
      checkoutData: {
        paymentType: null,
        description: '',
        status: null
      }
    }
  },
  computed: {
    getAppointmentId: function () {
      return this.$route.params.id
    },
    appointmentData: function () {
      return this.$store.getters['sales/appointmentsData']
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    },
    getAppointmentStatus: function () {
      return this.appointmentData.appointmentStatus === 2
    },
    getGroupedService: function () {
      return this.appointmentData.services.reduce(function (element, token) {
        (element[token.mainCategoryName] =
          element[token.mainCategoryName] || []).push(token)
        return element
      }, {})
    },
    getCustomerData: function () {
      return this.$store.getters['client/clientData']
    }
  },
  methods: {
    checkout: function () {
      this.$store
        .dispatch('sales/checkout', this.$route.params.id)
        .then(response => {
          this.$root.$emit('updateAppointmentList')
          this.$notify(response.data.message)
          this.$router.go(-1)
        })
    },
    editAppointment: function () {
      this.$router.push({
        name: 'editAppointment',
        params: { id: this.$route.params.id }
      })
    },
    updateAppointmentStatus: function (status) {
      this.checkoutData.status = status
      const appointGroupId = this.$route.params.id
      const outletId = this.getOutletId
      const appointCheckOutdata = this.checkoutData
      this.$store
        .dispatch('sales/checkout', {
          appointGroupId,
          outletId,
          appointCheckOutdata
        })
        .then(response => {
          this.$root.$emit('updateAppointmentList')
          this.$notify(response.data.message)
          this.$router.go(-1)
        })
    },
    getFormattedDate: function (date) {
      return moment(date, 'DD-MM-YYYY').format('dddd, Do MMMM YYYY')
    },
    getStatusText: function (value) {
      switch (value) {
        case 1:
          return 'New Order'
        case 2:
          return 'Picked Up'
        case 3:
          return 'Arrived'
        case 4:
          return 'Processing'
        case 5:
          return 'Out For Delivery'
        case 6:
          return 'Delivered'
        case 0:
          return 'Cancelled'
        case 7:
          return 'Returned'

        default:
          break
      }
    },
    getCustomerDetails: function (value) {
      this.$store.dispatch('client/clientDetails', value).then(response => {
        this.loading = false
      })
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'View Appointment')
    this.$store
      .dispatch('sales/appointmentsData', this.$route.params.id)
      .then(response => {
        this.getCustomerDetails(response.data.responseData.client.id)
      })
  }
}
</script>

<style lang="scss" scoped>
.md-danger {
  background-color: #e43f5a;
  color: white;
}

.no-margin {
  padding: 2px;
}

.md-drawer {
  position: fixed;
}

.md-icon.md-size-1x {
  width: 24px;
  min-width: 24px;
  height: 24px;
  font-size: 24px !important;
}
</style>
