<template>
    <div class="fill-view">
        <div v-if="loading" class="loading">
            <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
        </div>
        <div v-else class="fill-view">
            <div class="flex-container pl-2 pr-2">
                <md-field class="md-warp-content" v-if="getLoginType == '1'">
                    <label for="outlet-list">Outlet</label>
                    <md-select v-model="selectedOutlet" name="outlet-list" id="outlet-list" @md-selected="changeOutletId">
                        <md-option :value="item.id" v-for="item in getOutlets" :key="item.id">{{item.name}}</md-option>
                    </md-select>
                </md-field>
                <div class="md-toolbar-section-end align-center">
                    <md-button class="md-icon-button mr-1" @click="getShiftDate(previousDate)">
                        <md-icon>keyboard_arrow_left</md-icon>
                    </md-button>
                    <md-button class="md-primary" @click="getShiftDate(new Date())">Today</md-button>
                    <!-- <md-button class="md-primary md-raised " @click="showDialog = true">{{getStartDate()}}</md-button> -->
                    <VueCtkDateTimePicker @input="onDateSelected" input-size="sm" :min-date="getStartTime" :right="true" v-model="selectedDate" class="wrapper" :auto-close="true" :onlyDate="true" color="black" buttonColor="black" format="YYYY-MM-DD" formatted="ll">
                        <md-button class="md-title md-raised md-primary pl-3 pr-3">{{selectedDate}}</md-button>
                    </VueCtkDateTimePicker>
                    <md-button class=" md-icon-button" @click="getShiftDate(nextDate)">
                        <md-icon>keyboard_arrow_right</md-icon>
                    </md-button>
                </div>
            </div>
            <StaffWorkingHoursTable class="mt-2" v-if="workingHoursData != ''" :workingHours="workingHoursData" :updateShitStatus="getShiftDate"></StaffWorkingHoursTable>
            <md-dialog :md-active.sync="showDialog" md-fullscreen>
                <md-dialog-title>Select Date</md-dialog-title>
                <md-content class="md-scrollbar">
                    <datepicker :format="format" :value="state.date" :inline="true" @selected="customFormatter"></datepicker>
                </md-content>
                <md-dialog-actions>
                    <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
    </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
import StaffWorkingHoursTable from '../StaffWorkingHoursTable.vue'
import Datepicker from 'vuejs-datepicker'
import * as moment from 'moment'

var state = {
  date: new Date()
}
export default {

  name: 'StaffWorkingHoursTab',
  components: {
    StaffWorkingHoursTable,
    HollowDotsSpinner,
    Datepicker
  },
  data () {
    return {
      loading: true,
      state: state,
      format: 'dddd, D MMM YYYY',
      selectedOutlet: 0,
      showDialog: false,
      selectedMovies: ['all'],
      setDate: new Date(),
      workingHoursData: '',
      selectedDate: new Date(),
      shortcut: [
        { key: 'thisWeek', label: 'This week', value: 'isoWeek' },
        { key: 'lastWeek', label: 'Last week', value: '-isoWeek' },
        { key: 'last7Days', label: 'Last 7 days', value: 7 }
      ]
    }
  },
  methods: {
    customFormatter: function (date) {
      this.setDate = moment(date).format(this.format)
      this.showDialog = false
    },
    getFormatedDate: function (date) {
      return moment(date).format(this.format)
    },
    getStartDate: function () {
      return moment(this.setDate).format(this.format)
    },
    changeDateFormat: function (date) {
      return moment(date).format('YYYY-MM-D')
    },
    getShiftDate: function (date) {
      this.workingHoursData = ''
      const selectedDate = this.changeDateFormat(date)
      const OID = this.getDefaultOID
      this.$store.dispatch('staff/staffWorkingHours', { selectedDate, OID })
        .then(response => {
          // // console.log('getShiftDate', response.data.responseData)
          this.workingHoursData = response.data.responseData
          this.nextDate = this.workingHoursData.nextDate
          this.previousDate = this.workingHoursData.previousDate
          this.loading = false
        })
    },
    changeOutletId: function (selectedOutlet) {
      this.$store.dispatch('setOutletId', selectedOutlet)
      this.getShiftDate(new Date())
    },
    onDateSelected: function (date) {
      this.getShiftDate(date)
    }
  },
  computed: {
    workingHoursResponseData: function () {
      return this.$store.getters['staff/workingHoursResponseData']
    },
    getOutlets: function () {
      return JSON.parse(this.$store.getters.getOutlets)
    },
    getLoginType: function () {
      return localStorage.getItem('type')
    },
    getDefaultOID: function () {
      return this.$store.getters.getOutletId
    },
    getStartTime: function () {
      return moment(new Date()).format('YYYY-MM-DD')
    }
  },
  created: function () {
    this.getShiftDate(new Date())
    this.selectedOutlet = this.$store.getters.getOutletId
  }
}
</script>

<style lang="scss" scoped>
.md-field {
    max-width: 200px;
}

.md-layout-item {
    margin: 0.1rem;
}

input#undefined-input {
    text-align: center;
    border: 0px;
}

.md-datepicker input {
    display: none;
}

.md-datepicker input {
    display: none;
}

.cell.selected {
    background-color: #111 !important;
}

.md-content {
    max-height: 80%;
    overflow: auto;
}

.wrapper {
    width: fit-content;
    margin: 0 !important;
    z-index: 10 !important;
}

</style>
