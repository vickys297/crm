<template>
    <div class=" tab-view">
        <div class="loading" v-if="showLoading">
            <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
        </div>
        <div v-else class="container mb-5">
            <div v-if="clientData.length == 0">
                <span>No Details Found</span>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-warp-content md-large-size-30">
                    <div class="md-center-item ">
                        <md-avatar class="md-avatar-icon md-xlarge md-primary">{{clientData.name[0].toUpperCase()}}</md-avatar>
                        <span class="md-title mt-2">{{clientData.name}}</span>
                        <span class="md-caption mt-1">{{clientData.email}}</span>
                    </div>
                    <md-list class="md-double-line">
                        <md-list-item>
                            <md-icon class="md-primary">phone</md-icon>
                            <div class="md-list-item-text">
                                <span>{{clientData.phoneNumber}}</span>
                                <span>Mobile</span>
                            </div>
                        </md-list-item>
                        <md-divider></md-divider>
                        <md-list-item>
                            <md-icon class="md-primary">email</md-icon>
                            <div class="md-list-item-text">
                                <span>{{clientData.email}}</span>
                                <span>Personal</span>
                            </div>
                        </md-list-item>
                        <md-divider></md-divider>
                        <md-list-item>
                            <md-icon class="md-primary">wc</md-icon>
                            <div class="md-list-item-text">
                                <span>{{clientData.gender}}</span>
                                <span>Gender</span>
                            </div>
                        </md-list-item>
                    </md-list>
                </div>
                <div class="md-layout-item md-large-size-70 mb-2">

                    <md-divider></md-divider>
                    <div class="md-layout md-gutter mt-2">
                        <div class="md-layout-item">
                            <div class="text-center">
                                <span class="md-headline">{{clientData.pastAppointments.length}}</span>
                                <br>
                                <span class="md-body-1"><strong>All</strong></span>
                            </div>
                        </div>
                        <div class="md-layout-item text-center"><span class="md-headline">{{clientData.appointmentDetails.newAppointmentsCounts}}</span>
                            <br><span class="md-body-1">New</span></div>
                        <div class="md-layout-item text-center"><span class="md-headline">{{clientData.appointmentDetails.completedAppointmentsCounts}}</span>
                            <br><span class="md-body-1">Completed</span></div>
                        <div class="md-layout-item text-center"><span class="md-headline">{{clientData.appointmentDetails.cancelledAppointmentsCounts}}</span>
                            <br><span class="md-body-1">Cancelled</span></div>
                        <div class="md-layout-item text-center"><span class="md-headline">{{clientData.appointmentDetails.noShowAppointmentsCounts}}</span>
                            <br><span class="md-body-1">No Show</span></div>
                    </div>
                    <br>
                    <md-divider></md-divider>

                    <md-tabs class="mt-2" md-alignment="start">
                        <!-- <md-tab id="tab-home" md-icon="date_range" md-label="Appointments"> -->
                        <md-tab id="tab-home" :md-label="'Appointments ('+clientData.pastAppointments.length+')'">
                            <md-content class="mb-2 md-snap-view md-scrollbar">
                                <md-list class="mt-2" v-for="appointment in clientData.pastAppointments" :key="appointment.appointmentid">
                                    <div class="align-center">
                                        <span class="md-title">{{appointment.appointmentDate}}</span>
                                        <div class="md-toolbar-section-end">
                                            <span class="md-title">Total <Strong>{{appointment.totalCost}}</strong></span>
                                        </div>
                                    </div>
                                    <md-list-item v-for="service in appointment.services" :key="service" class="mt-2">
                                        <span class="md-body-2 m-1">{{service.startTime}}</span>
                                        <div class="md-list-item-text">
                                            <span>{{service.serviceName}}</span>
                                            <p class="md-caption">with {{service.staff}}</p>
                                        </div>
                                        <div>
                                            <span><strong>{{service.cost}}</strong></span>
                                        </div>
                                    </md-list-item>
                                    <md-divider class="mt-2"></md-divider>
                                </md-list>
                            </md-content>
                            <md-divider></md-divider>
                        </md-tab>
                        <!-- <md-tab id="tab-pages" md-icon="receipt" md-label="Invoice"> -->
                        <md-tab id="tab-pages" :md-label="'Invoice ('+clientData.invoices.length+')'">
                            <span class="md-subheading mb-1">Invoice</span>
                            <md-list class="mt-1 mb-2">
                                <md-list-item class="mt-1" v-for="invoice in clientData.invoices" :key="invoice">
                                    <div class="md-list-item-text">
                                        <span>#{{invoice.id}}</span>
                                        <span class="md-caption">{{invoice.date}} </span>
                                    </div>
                                    <md-button class="md-icon-button md-raised md-primary md-list-action">
                                        <md-icon>check</md-icon>
                                    </md-button>
                                </md-list-item>
                            </md-list>
                            <md-divider></md-divider>
                        </md-tab>
                    </md-tabs>
                </div>
            </div>
            <div class="md-center-item md-wrap-content mt-2" v-if="clientData === ''">
                <md-icon class="md-size-4x md-primary">person_add</md-icon>
                <span class="md-body-1 mt-2">No Client Selected</span>
                <md-button class="md-primary md-raised" @click="showDialog =true">Add Client</md-button>
            </div>
        </div>
        <div class="align-end">
            <md-button class="md-raised md-primary">Cancel</md-button>
            <md-button>Edit</md-button>
        </div>
    </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
export default {
  components: {
    HollowDotsSpinner
  },
  name: 'viewClient',
  data () {
    return {
      showLoading: false
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Client Profile')
    this.initClientView()
  },
  methods: {
    initClientView: function () {
      this.showLoading = true
      this.$store.dispatch('client/clientDetails', this.$route.params.id)
        .then(response => {
          // console.log('initClientView', response.data)
          this.showLoading = false
        })
    }
  },
  computed: {
    clientData: function () {
      return this.$store.getters['client/clientData']
    }
  }
}
</script>

<style lang="scss">
.md-snap-view {
    width: 100%;
    height: 60vh;
    overflow: auto;
}
</style>
