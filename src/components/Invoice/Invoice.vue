<template>
  <div>
    <div class="md-toolbar-section-end">
      <md-menu md-size="medium" md-align-trigger>
        <md-button md-menu-trigger class="md-raised md-primary">Generate</md-button>
        <md-menu-content>
          <md-menu-item>
            <download-excel :data="getInvoice" type="csv" name="Invoice.csv">Export CSV</download-excel>
          </md-menu-item>
          <md-menu-item>
            <download-excel :data="getInvoice" name="Invoice.xls">Export Excel</download-excel>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
      <md-button class="md-raised md-primary" @click="openFilter" v-if="getLoginType === 1">Filter</md-button>
    </div>
    <!-- <div v-if="getInvoice.length == 0 && !loading">
            <md-empty-state md-icon="description" md-label="No invoice found" md-description="View all your invoices and you can easily manage here.">
            </md-empty-state>
    </div>-->
    <div>
      <div class="loading" v-if="loading">
        <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
      </div>
      <div v-else>
        <md-table
          class="table-response"
          :value="getInvoice"
          md-sort="invoiceId"
          md-sort-order="desc"
        >
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Invoice ID" md-sort-by="invoiceId" md-numeric>
              <md-button
                class="md-raised md-primary"
                @click="viewInvoice(item.invoiceId)"
              >#{{ item.invoiceId }}</md-button>
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
            :total="getInvoiceSize"
            :current-page.sync="currentPageNumber"
            @current-change="onPagination"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppointmentStatus from '@/components/common/button/AppointmentStatus.vue'
import { HollowDotsSpinner } from 'epic-spinners'
export default {
  name: 'invoice',
  components: {
    AppointmentStatus,
    HollowDotsSpinner
  },
  data () {
    return {
      loading: false,
      currentPageNumber: 1,
      pageSize: 10
    }
  },
  methods: {
    openFilter: function () {
      this.$root.$emit('showVendorFilter')
    },
    viewInvoice: function (id) {
      this.$router.push({ name: 'viewInvoice', params: { id: id } })
    },
    initInvoice: function () {
      this.loading = true
      const outletId = this.getOutletId
      const pageNumber = this.currentPageNumber
      const pageSize = this.pageSize
      this.$store
        .dispatch('sales/invoices', {
          outletId,
          pageNumber,
          pageSize
        })
        .then(response => {
          this.loading = false
        })
    },
    onPagination: function () {
      this.initInvoice()
    }
  },
  mounted: function () {
    this.$root.$on('oidFilter', this.initInvoice)
  },
  created: function () {
    this.initInvoice()
  },
  computed: {
    getOutletId: function () {
      return this.$store.getters.getOutletId
    },
    getInvoice: function () {
      return this.$store.getters['sales/invoices']
    },
    getLoginType: function () {
      return parseInt(localStorage.getItem('type'))
    },
    getInvoiceSize: function () {
      return this.$store.getters['sales/invoiceSize']
    }
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
</style>
