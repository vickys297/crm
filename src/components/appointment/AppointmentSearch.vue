<template>
  <div class="fill-view">
    <div class="flex-container item-center">
      <div class="flex-container item-center">
        <!-- <md-datepicker v-model="filterData.fromDate" class="mr-3">
          <label>From Date</label>
        </md-datepicker>-->
        <div class="ml-2 mr-3 flex-container item-center">
          <!-- <div class="w-100 mr-2">Date Range</div> -->
          <VueCtkDateTimePicker
            v-model="filterDate"
            class="date-wrapper"
            @input="appointmentSearch"
            @formatted-value="appointmentSearch"
            :auto-close="true"
            :onlyDate="true"
            color="black"
            range
            buttonColor="black"
            format="DD-MM-YYYY"
            :formatted="dateFormat"
          >
            <md-button class="md-raised md-primary"></md-button>
          </VueCtkDateTimePicker>
          <md-field class="ml-2">
            <label for="status">Status</label>
            <md-select
              v-model="status"
              name="status"
              id="status"
              multiple
              @md-selected="appointmentSearch"
            >
              <md-option :value="1">New Order</md-option>
              <md-option :value="2">Picked Up</md-option>
              <md-option :value="3">Arrived</md-option>
              <md-option :value="4">Processing</md-option>
              <md-option :value="5">Out For Delivery</md-option>
              <md-option :value="6">Delivered</md-option>
              <md-option :value="7">Returned</md-option>
              <md-option :value="8">Completed</md-option>
              <md-option :value="0">Cancelled</md-option>
            </md-select>
          </md-field>
          <md-button class="md-primary" @click="status = []" :disabled="status.length == 0">Clear</md-button>
          <md-button
            class="md-primary md-raised"
            @click="status = [1,2,3,4,5,6,7,8,0]"
            :disabled="status.length == 9"
          >Select All</md-button>
        </div>
      </div>
      <div class="md-toolbar-section-end">
        <md-menu md-size="medium" md-align-trigger v-if="getAppointments != ''">
          <md-button md-menu-trigger class="md-raised md-primary">Generate</md-button>
          <md-menu-content>
            <md-menu-item>
              <download-excel
                :data="getAppointments.appointments"
                type="csv"
                name="Appointment.csv"
              >Export CSV</download-excel>
            </md-menu-item>
            <md-menu-item>
              <download-excel
                :data="getAppointments.appointments"
                name="Appointment.xls"
              >Export Excel</download-excel>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
        <md-button class="md-raised md-primary" @click="openFilter" v-if="getLoginType === 1">Filter</md-button>
        <md-button to="/appointments/add">New Order</md-button>
      </div>
    </div>
    <div class="mt-2">
      <div class="loading" v-if="loading">
        <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
      </div>
      <div v-else class="mb-5">
        <md-table
          class="table-response"
          v-model="getAppointments.appointments"
          md-sort="groupId"
          md-sort-order="desc"
        >
          <md-table-empty-state
            md-label="No Appointments Found"
            :md-description="
              'To create new appointment click New Appointment below or top right'
            "
          >
            <md-button class="md-primary md-raised" to="/appointments/add">New Appointment</md-button>
          </md-table-empty-state>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Order ID" md-sort-by="groupId" md-numeric>
              <md-button
                class="md-primary md-raised"
                @click="viewAppointment(item.groupId)"
              >#{{ item.groupId }}</md-button>
            </md-table-cell>
            <md-table-cell md-label="Client" md-sort-by="client.name">
              <md-button
                class="md-raised md-primary"
                @click="showCustomerDetails(item.client)"
              >{{ item.client.name }}</md-button>
            </md-table-cell>
            <md-table-cell md-label="Services">
              <span
                v-for="service in item.services"
                :key="service"
                class="wrapper"
              >{{ service.categoryName }} - {{ service.name }}</span>
            </md-table-cell>
            <md-table-cell md-label="Order Date" md-sort-by="orderDate">
              {{ item.appointmentDate }} --
              {{ item.appointmentTime }}
            </md-table-cell>
            <md-table-cell md-label="Received Date" md-sort-by="receivedDate">
              {{
              item.receivedDate || "Not Yet Arrived"
              }}
            </md-table-cell>
            <md-table-cell md-label="Deliver Date" md-sort-by="deliveryDate">
              {{ item.deliveryDate }} -- {{ item.deliveryTime }} ({{
              item.period.toUpperCase() || ""
              }})
            </md-table-cell>
            <md-table-cell md-label="Quantity" md-sort-by="totalItemQuantity">
              {{
              item.totalItemQuantity
              }}
            </md-table-cell>
            <md-table-cell md-label="Cost" md-sort-by="totalCost">
              {{
              item.totalCost
              }}
            </md-table-cell>
            <md-table-cell md-label="Status" md-sort-by="status">
              <AppointmentStatus :status="item.status"></AppointmentStatus>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <div class="md-toolbar-section-end mt-2">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="getAppointmentsSize"
            :current-page.sync="currentPageNumber"
            @current-change="onPagination"
          ></el-pagination>
        </div>
      </div>
    </div>

    <!-- show Client Details -->
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Customer Details</md-dialog-title>

      <md-content class="p-3">
        <div class="md-body-1">Name : {{ this.showClientDetails.name }}</div>
        <div class="md-body-1">Email : {{ this.showClientDetails.email }}</div>
      </md-content>

      <md-dialog-actions>
        <md-button class="md-raised md-primary" @click="viewClientDetails()">View Details</md-button>
        <md-button @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- show Client Details -->
  </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
import AppointmentStatus from '@/components/common/button/AppointmentStatus.vue'
import moment from 'moment'
export default {
  name: 'AppointmentsSearch',
  components: {
    AppointmentStatus,
    HollowDotsSpinner
  },
  data () {
    return {
      showDialog: false,
      showClientDetails: {
        id: '',
        name: '',
        email: ''
      },
      filterDate: {
        start: this.getStartDate,
        end: this.getStartDate
      },
      dateFormat: 'DD-MM-YYYY',
      loading: false,
      testdata: '',
      nextDate: '',
      previousDate: '',
      currentPageNumber: 1,
      selectedDate: new Date(),
      pageSize: 10,
      allStatus: [1, 2, 3, 4, 5, 6, 7, 8, 0],
      status: []
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Custom Search')
    this.filterDate.start = this.getStartDate
    this.filterDate.end = this.getStartDate
    this.appointmentSearch()
    this.status = this.allStatus
  },
  computed: {
    getAppointments: function () {
      return this.$store.getters['sales/getAppointments']
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    },
    getLoginType: function () {
      return parseInt(localStorage.getItem('type'))
    },
    getAppointmentsSize: function () {
      return this.$store.getters['sales/getAppointmentsSize']
    },
    getStartDate: function () {
      return moment(new Date()).format('DD-MM-YYYY')
    }
  },
  methods: {
    onStatusSelected: function () {
      this.status = this.allStatus
      this.appointmentSearch()
    },
    viewClientDetails: function () {
      this.$router.push({
        name: 'viewClient',
        params: { id: this.showClientDetails.id }
      })
    },
    showCustomerDetails: function (client) {
      this.showDialog = true
      this.showClientDetails = client
    },
    appointmentSearch: function () {
      const startDate = this.filterDate.start
      const endDate = this.filterDate.end

      this.loading = true
      const pageNumber = this.currentPageNumber
      const pageSize = this.pageSize
      const status = this.status

      this.$store
        .dispatch('sales/appointmentsSearch', {
          startDate,
          endDate,
          pageNumber,
          pageSize,
          status
        })
        .then(response => {
          this.loading = false
        })
    },
    formatDate: function (date) {
      return moment(date).format('DD-MM-YYYY')
    },
    viewAppointment: function (itemID) {
      this.$router.push({ name: 'viewAppointment', params: { id: itemID } })
    },
    openFilter: function () {
      this.$root.$emit('showVendorFilter')
    },
    onPagination: function (value) {
      this.appointmentSearch()
    },
    getStartTime: function () {
      return moment(new Date()).format('YYYY-MM-DD')
    }
  },
  activated () {
    this.appointmentSearch()
  },
  deactivated () {},
  mounted: function () {
    this.$root.$on('updateAppointmentList', () => {
      this.appointmentSearch()
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: block;
  background-color: black;
  margin: 5px;
  padding: 5px;
  color: white;
  border-radius: 5px;
  text-align: center;
}
.date-wrapper {
  display: block;
  background-color: black;
  margin: 5px;
  color: white;
  border-radius: 5px;
  text-align: center;
}
// .wrapper {
//     width: fit-content;
//     margin: 0 !important;
//     z-index: 98 !important;
// }
</style>
