<template>
  <div class="loading" v-if="loading">
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </div>
  <div class="mb-5" v-else>
    <div class="group" v-for="item in cardData" :key="item">
      <div class="md-dash-card-small">
        <div class="md-dash-card-title">{{item.cardName}}</div>
        <div class="md-dash-card-subtitle">{{item.cardDescription}}</div>
        <div class="md-dash-card-content align-center">
          <span class="md-headline color-white md-fw-600">{{item.cardContent}}</span>
          <md-icon
            class="color-white md-toolbar-section-end"
            v-if="item.cardAction === 1"
          >arrow_upward</md-icon>
          <md-icon
            class="color-white md-toolbar-section-end"
            v-if="item.cardAction === 0"
          >arrow_downward</md-icon>
        </div>
        <div class="md-dash-card-footer align-center">
          <span class="md-body-1">{{item.cardFooter}}</span>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="md-headline mt-3">Detailed View</div>
      <md-divider></md-divider>
      <div class="md-layout">
        <div
          class="md-layout-item md-medium-size-50 md-xlarge-size-50 md-large-size-50 md-large-size-50 mt-2"
          v-for="data in graphCharts"
          :key="data"
        >
          <md-card>
            <md-card-header>
              <div class="md-body-1">{{data.series[0].name}}</div>
            </md-card-header>
            <md-card-content>
              <!-- <div class="md-title">Today: 20 AED</div>
              <div class="mt-1">
                <div class="md-body-1">
                  Appointments:
                  <strong>2 (Queue)</strong>
                </div>
                <div class="md-body-1">
                  Cost:
                  <strong>200 AED</strong>
                </div>
              </div>-->
              <apexchart
                class="mt-2"
                type="area"
                height="210"
                :options="data"
                :series="data.series"
              ></apexchart>
            </md-card-content>
            <!--
            <md-card-actions>
              <md-button class="md-raised md-primary">Refresh</md-button>
            </md-card-actions>-->
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  created: function () {
    this.$store.dispatch('setTitle', 'Dashboard')
    this.$store
      .dispatch('dashboard/getDashboardData', this.getOutletId)
      .then((response) => {
        setTimeout(() => {
          this.loading = false
        }, 2000)
        this.cardData = response.data.cardData
        response.data.dashboardGraphData.forEach((element) => {
          var data = {
            chart: {
              zoom: {
                enabled: true
              }
            },
            xaxis: {
              categories: element.categories
            },
            series: [
              {
                name: element.name,
                data: element.data
              }
            ]
          }

          this.graphCharts.push(data)
        })
      })
  },
  data () {
    return {
      loading: true,
      graphCharts: [],
      cardData: []
    }
  },
  methods: {},
  computed: {
    getOutletId: function () {
      return this.$store.getters.getOutletId
    },
    getDashboardData: function () {
      return this.$store.getters['dashboard/getDashboardData']
    }
  }
}
</script>

<style lang="scss" scoped>
.md-dash-card-small {
  min-width: 15rem;
  max-width: 20rem;
  min-height: 11rem;
  max-height: 16rem;
  margin: 10px;
  padding: 1rem;
  background-color: black;
  border-radius: 1.5rem;
  color: white;
}
.md-dash-card-small:hover {
  //   min-width: 15rem;
  //   min-height: 11rem;
  //   margin: 10px;
  //   padding: 1rem;
  //   background-color: black;
  //   border-radius: 1.5rem;
  //   color: white;
  transition: ease-in;
  -moz-transition: ease-in;
  -o-transition: ease-in;
  -webkit-transition: ease-in;
  -moz-transition-duration: 0.5s;
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-box-shadow: 0px 18px 23px -5px rgba(0, 0, 0, 0.63);
  -moz-box-shadow: 0px 18px 23px -5px rgba(0, 0, 0, 0.63);
  box-shadow: 0px 18px 23px -5px rgba(0, 0, 0, 0.63);
}
.md-dash-card-title {
  font-size: x-large;
  font-weight: 600;
  text-transform: capitalize;
}
.md-dash-card-subtitle {
  margin-top: 3px;
  font-size: small;
  font-weight: 100;
  text-transform: capitalize;
}
.md-dash-card-content {
  margin-top: 1rem;
  color: white;
  text-transform: capitalize;
}
.md-dash-card-footer {
  margin-top: 1rem;
  color: white;
}

.md-fw-600 {
  font-size: xx-large;
  font-weight: 600;
}
</style>
