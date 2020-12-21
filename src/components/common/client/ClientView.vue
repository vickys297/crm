<template>
  <div class="md-wrap-content mt-2">
    <div v-if="clientData.name == null">
      <span>No Name</span>
    </div>
    <div v-else class="md-center-item">
      <md-avatar class="md-avatar-icon md-large md-primary">
        <md-ripple>
          {{
          clientData.name[0].toUpperCase()
          }}
        </md-ripple>
      </md-avatar>
      <span class="md-title mt-2">
        {{
        clientData.name
        }}
      </span>
      <span class="md-caption mt-1">
        {{
        clientData.email
        }}
      </span>
    </div>
    <md-tabs class="mt-2 md-primary" md-alignment="centered">
      <md-tab id="tab-home" md-icon="date_range">
        <span class="md-title mb-1">
          Appointments (Past
          {{
          clientData.pastAppointments.length
          }})
        </span>
        <div>
          <md-list
            class="mt-2"
            v-for="item in clientData.pastAppointments"
            :key="item.appointmentDate"
          >
            <span class="md-subheading">
              {{
              item.appointmentDate
              }}
            </span>
            <md-list-item v-for="service in item.services" :key="service" class="mt-2">
              <span class="md-body-2 m-1">
                {{
                service.startTime
                }}
              </span>
              <div class="md-list-item-text">
                <span>{{ service.categoryName }} - {{ service.serviceName }}</span>
                <p class="md-caption">with {{ service.staff }}</p>
              </div>
              <div>
                <span>{{ service.cost }}</span>
              </div>
            </md-list-item>
          </md-list>
        </div>
      </md-tab>
      <md-tab id="tab-pages" md-icon="receipt">
        <span class="md-title mb-1">Invoice</span>

        <md-list class="mt-1">
          <md-list-item class="mt-1" v-for="invoice in clientData.invoices" :key="invoice">
            <div class="md-list-item-text">
              <span>{{ invoice.date }}</span>
              <span class="md-caption">#{{ invoice.id }}</span>
            </div>
            <md-button class="md-icon-button md-raised md-primary md-list-action">
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
              <span>{{ clientData.phoneNumber }}</span>
              <span>Mobile</span>
            </div>
          </md-list-item>

          <md-divider></md-divider>

          <md-subheader>Email</md-subheader>

          <md-list-item>
            <md-icon class="md-primary">email</md-icon>

            <div class="md-list-item-text">
              <span>{{ clientData.email }}</span>
              <span>Personal</span>
            </div>
          </md-list-item>

          <md-divider></md-divider>

          <md-subheader>Delivery Address</md-subheader>
          <md-list-item>
            <md-icon class="md-primary">place</md-icon>

            <div class="md-list-item-text">
              <p align="justify">{{ deliveryAddress }}</p>
              <span>Personal</span>
            </div>
          </md-list-item>
        </md-list>
      </md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
  name: 'ClientViewPanel',
  props: {
    clientData: Object,
    deliveryAddress: String
  },
  data () {
    return {}
  },
  created: function () {},
  computed: {},
  methods: {
    openInvoice: function (id) {
      this.$router.push({ name: 'viewInvoice', params: { id: id } })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
