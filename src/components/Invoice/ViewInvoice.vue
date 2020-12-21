<template>
  <div>
    <div>
      <div class="flex-container group align-center">
        <div class="md-toolbar-section-end">
          <md-button class="md-primary md-raised" disabled>View PDF</md-button>
          <md-button class="md-primary" disabled>Download</md-button>
        </div>
      </div>
    </div>
    <md-content class="mt-2">
      <div class="container">
        <!-- Date View -->
        <div class="container mt-5">
          <div class="flex-container align-center mb-2">
            <div class="mr-3">
              <div class="md-caption">Ordered Date</div>
              <span class="md-title">{{ this.getFormattedDate(invoiceData.orderDate) }}</span>
              <div class="md-caption">{{ invoiceData.orderTime }}</div>
            </div>
            <div>
              <div class="md-caption">Delivery Date</div>
              <span class="md-title">
                {{
                this.getFormattedDate(invoiceData.deliveryDate)
                }}
              </span>
              <div class="md-caption">{{ invoiceData.deliveryTime }} ({{ invoiceData.period }})</div>
            </div>
          </div>
          <md-divider></md-divider>
        </div>
        <!-- Date View -->

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
            <div class="p-1 md-layout align-center mb-5">
              <div class="md-layout-item">
                <span class="md-title pr-2">Total Quantity</span>
                <span class="md-title">
                  <strong>{{ invoiceData.totalItemQuantity }}</strong>
                </span>
              </div>
              <div class="md-layout-item md-toolbar-section-end">
                <span class="md-title pr-2">Total</span>
                <span class="md-title">
                  <strong>{{ invoiceData.totalCost }}</strong>
                </span>
              </div>
            </div>
            <!-- Order Footer -->
          </div>
          <div class="md-layout-item md-xlarge-size-40 md-large-size-40 md-medium-size-50">
            <div v-if="loading" class="loading">
              <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
            </div>
            <ClientView
              :clientData="getCustomerData"
              :deliveryAddress="invoiceData.deliveryAddress"
              v-else
            ></ClientView>
          </div>
        </div>
      </div>
    </md-content>
  </div>
</template>

<script>
import moment from 'moment'
import ClientView from '../common/client/ClientView.vue'
export default {
  name: 'ViewInvoice',
  components: {
    ClientView
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    invoiceData: function () {
      return this.$store.getters['sales/getInvoiceDetails']
    },
    getTime: function (time) {
      return moment(time).format('hh:mm:ss')
    },
    getFormatedDuration: function (value) {
      const date = this.invoiceData.totalDuration
      return date.split(':')[0] + ' Hours ' + date.split(':')[1] + ' Minutes'
    },
    getGroupedService: function () {
      return this.invoiceData.services.reduce(function (element, token) {
        (element[token.mainCategoryName] =
          element[token.mainCategoryName] || []).push(token)
        return element
      }, {})
    },
    getCustomerData: function () {
      return this.$store.getters['client/clientData']
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Invoice Details')
    this.$store
      .dispatch('sales/invoiceDetails', this.$route.params.id)
      .then((response) => {
        this.getCustomerDetails(response.data.responseData.client.id)
      })
  },
  methods: {
    moment: function () {
      return moment()
    },
    getFormattedDate: function (date) {
      return moment(date, 'DD-MM-YYYY').format('dddd, Do MMMM YYYY')
    },
    getCustomerDetails: function (value) {
      this.$store.dispatch('client/clientDetails', value).then((response) => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
