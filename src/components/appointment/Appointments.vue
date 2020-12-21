<template>
  <div class="fill-view">
    <div class="md-toolbar-section-end">
      <md-menu md-size="medium" md-align-trigger v-if="getAppointments.length > 0">
        <md-button md-menu-trigger class="md-raised md-primary">Generate</md-button>
        <md-menu-content>
          <md-menu-item>
            <download-excel :data="getAppointments" type="csv" name="Appointment.csv">Export CSV</download-excel>
          </md-menu-item>
          <md-menu-item>
            <download-excel :data="getAppointments" name="Appointment.xls">Export Excel</download-excel>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-button class="md-raised md-primary" @click="openFilter" v-if="getLoginType === 1">Filter</md-button>
      <md-button to="/appointments/search" class="md-raised md-primary">Custom Search</md-button>
      <md-button to="/appointments/add">New Order</md-button>
    </div>
    <div class="mt-2">
      <div class="loading" v-if="loading">
        <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
      </div>
      <div v-else class="mb-5">
        <md-table
          class="table-response"
          v-model="getAppointments"
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
                @click="showCustomerDetailsDialog(item.client)"
              >{{ item.client.name }}</md-button>
            </md-table-cell>
            <md-table-cell md-label="Services">
              <span
                v-for="service in item.services"
                :key="service"
                class="wrapper"
              >{{ service.categoryName }} - {{ service.name }}</span>
            </md-table-cell>
            <md-table-cell
              md-label="Order Date"
              md-sort-by="orderDate"
            >{{ item.orderDate }} -- {{ item.orderTime }}</md-table-cell>
            <md-table-cell md-label="Received Date" md-sort-by="receivedDate">
              {{
              item.receivedDate || "Not Yet Arrived"
              }}
            </md-table-cell>
            <md-table-cell md-label="Deliver Date" md-sort-by="deliveryDate">
              {{ item.deliveryDate }} -- {{ item.deliveryTime }} ({{
              item.period.toUpperCase()
              }})
            </md-table-cell>
            <md-table-cell
              md-label="Quantity"
              md-sort-by="totalItemQuantity"
            >{{ item.totalItemQuantity }}</md-table-cell>
            <md-table-cell md-label="Cost" md-sort-by="totalCost">{{ item.totalCost }}</md-table-cell>
            <md-table-cell class="text-center" md-label="Status" md-sort-by="status">
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
        <md-button class="md-raised md-primary" @click="viewClientDetails">View Details</md-button>
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
  name: 'appointments',
  components: {
    AppointmentStatus,
    HollowDotsSpinner
  },
  data () {
    return {
      showDialog: false,
      loading: false,
      testdata: '',
      nextDate: '',
      previousDate: '',
      currentPageNumber: 1,
      selectedDate: new Date(),
      pageSize: 10,
      showClientDetails: {
        id: '',
        name: '',
        email: ''
      }
    }
  },
  created: function () {
    this.initAppointment()
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
    }
  },
  methods: {
    viewClientDetails: function () {
      this.$router.push({
        name: 'viewClient',
        params: { id: this.showClientDetails.id }
      })
    },
    showCustomerDetailsDialog: function (client) {
      this.showDialog = true
      this.showClientDetails = client
    },
    initAppointment: function () {
      this.loading = true
      const outletId = this.getOutletId
      const pageNumber = this.currentPageNumber
      const pageSize = this.pageSize

      this.$store
        .dispatch('sales/appointments', {
          outletId,
          pageNumber,
          pageSize
        })
        .then(response => {
          this.loading = false
        })
    },
    viewAppointment: function (itemID) {
      this.$router.push({ name: 'viewAppointment', params: { id: itemID } })
    },
    openFilter: function () {
      this.$root.$emit('showVendorFilter')
    },
    onPagination: function (value) {
      this.initAppointment()
    },
    getStartTime: function () {
      return moment(new Date()).format('YYYY-MM-DD')
    },
    groupByMainCategory: function (value, key) {
      return value.reduce(function (element, token) {
        (element[token[key]] = element[token[key]] || []).push(token)
        return element
      }, {})
    }
  },
  mounted: function () {
    this.$root.$on('oidFilter', this.initAppointment)
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
// .wrapper {
//     width: fit-content;
//     margin: 0 !important;
//     z-index: 98 !important;
// }
</style>
