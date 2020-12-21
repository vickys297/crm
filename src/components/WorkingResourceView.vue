<template>
    <div>

        <md-dialog :md-active.sync="showAlertDialog">
            <md-dialog-title>Add New Shift</md-dialog-title>
            <md-dialog-content class="p-1">

                <!-- first shift timing -->
                <span>First Shift</span>
                <div class="md-layout md-dynamic-height">
                    <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                        <md-field>
                            <label for="country">From Time</label>
                            <md-select v-model="country" name="country" id="country" md-dense>
                                <md-option value="australia">Australia</md-option>
                                <md-option value="brazil">Brazil</md-option>
                                <md-option value="japan">Japan</md-option>
                                <md-option value="united-states">United States</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                        <md-field>
                            <label for="country">To Time</label>
                            <md-select v-model="country" name="country" id="country" md-dense>
                                <md-option value="australia">Australia</md-option>
                                <md-option value="brazil">Brazil</md-option>
                                <md-option value="japan">Japan</md-option>
                                <md-option value="united-states">United States</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
                <!-- first shift timing -->
                <md-button class="md-raised md-primary" v-if="showSecondShift!=true" @click="showSecondShiftFun">
                    add shift
                </md-button>
                <!-- second shift timing -->
                <span v-if="showSecondShift">Second Shift</span>
                <div class="md-layout md-dynamic-height" v-if="showSecondShift">
                    <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                        <md-field>
                            <label for="country">From Time</label>
                            <md-select v-model="country" name="country" id="country" md-dense>
                                <md-option value="australia">Australia</md-option>
                                <md-option value="brazil">Brazil</md-option>
                                <md-option value="japan">Japan</md-option>
                                <md-option value="united-states">United States</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100 ">
                        <md-field>
                            <label for="country">To Time</label>
                            <md-select v-model="country" name="country" id="country" md-dense>
                                <md-option value="australia">Australia</md-option>
                                <md-option value="brazil">Brazil</md-option>
                                <md-option value="japan">Japan</md-option>
                                <md-option value="united-states">United States</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
                <!-- second shift timing -->

                <!-- repeat dialog -->
                <span>Repeat</span>
                <div class="md-layout-item">
                    <md-field>
                        <md-select class="md-outlined" v-model="repeat" name="Set Repeat" id="country" md-dense>
                            <md-option value="0">No Repeat</md-option>
                            <md-option value="1">Every Specific Day</md-option>
                            <md-option value="2">From Today</md-option>
                            <md-option value="2">Weekly Once</md-option>
                            <md-option value="2">Monthly Once</md-option>
                        </md-select>
                    </md-field>
                </div>
                <!-- repeat dialog -->
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showAlertDialog = false">Close</md-button>
                <md-button class="md-primary" @click="showAlertDialog = false">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
        <md-table class="table">
            <md-table-row>
                <md-table-head class="text-center" v-for="item  in workingHoursTitle" :key="item.id">
                    <span class="md-body-2">{{item.name}}</span>
                </md-table-head>
            </md-table-row>
            <md-table-row v-for="item  in workingHoursData" :key="item.name">
                <md-table-cell class="text-center table-data">
                    <span class="md-title"> {{item.name}} </span>
                </md-table-cell>
                <md-table-cell class="text-center table-data" v-for="working  in item.workingDate" :key="working.date">
                    <md-button v-if="getWorkingStatus(working.status)" @click="addNewShift(working)">
                        <md-icon class="md-primary add-button">add</md-icon>
                    </md-button>
                    <div v-else class="time-badge">
                        <div v-for="shift in working.shift" :key="shift.id">
                            <!-- <span class="time-slot"> {{shift.time.start}} to {{shift.time.end}} </span> -->
                            <md-button class="md-raised md-primary m-05">{{shift.time.start}} to {{shift.time.end}}</md-button>
                            <br>
                        </div>
                    </div>
                </md-table-cell>
            </md-table-row>
        </md-table>

    </div>
</template>

<script>
export default {
  name: 'master-table',
  data () {
    return {
      showAlertDialog: false,
      showSecondShift: false,
      showAlertData: null,
      repeat: 0,
      newShift: {
        firstShift: {
          startTime: '',
          endTime: ''
        },
        secondShift: {
          startTime: '',
          endTime: ''
        },
        date: '',
        repeat: '', // 0 - no repeat, 1 - from today, 2 - once in week, 3 - once in month
        staffId: '',
        outletId: ''
      }
    }
  },
  methods: {
    getStatus: function (status) {
      if (status === 'Not Available') {
        return 'Not Available'
      } else {
        return 'Available'
      }
    },
    getStatusClass: function (status) {
      if (status === 'Not Available') {
        return 'status-not-available'
      } else {
        return 'status-available'
      }
    },
    getWorkingStatus: function (status) {
      if (status === 'Not Available') {
        return true
      } else {
        return false
      }
    },
    addNewShift (working) {
      // // console.log('sjgdysgydgyg')
      this.showAlertDialog = true
      this.showAlertData = working
    },
    showSecondShiftFun: function () {
      this.showSecondShift = true
    }
  },
  created: function () {
    this.$store.dispatch('staff/staffWorkingHours')
  },
  computed: {
    workingHoursTitle: function () {
      // // console.log('workingHoursTitle', this.$store.getters['staff/workingHoursTitle'])
      return this.$store.getters['staff/workingHoursTitle']
    },
    workingHoursData: function () {
      // // console.log('workingHoursData', this.$store.getters['staff/workingHoursData'])
      return this.$store.getters['staff/workingHoursData']
    }
  }
}
</script>

<style lang="scss" scoped>
.title-layout {
    border: 1px solid #dee3e2;
    padding: 0.8rem;
    color: #323232;
}

.add-button {
    padding: 1rem;
    width: '100%';
    height: '100%';
}

.master-table {
    overflow: hidden;
}

.status-available {
    color: black;
    background-color: greenyellow;
}

.status-not-available {
    background-color: black;
    color: white;
}

.table {
    width: 100%;
    min-width: 50%;
    margin-bottom: 1rem;
    border-collapse: collapse;
    table-layout: fixed;
    overflow-x: auto;
}

.table-head {
    padding: 2px;
    vertical-align: bottom;
    border-bottom: 2px solid #dee2e6;
    width: 100px;
}

.table-data {
  justify-content: center;
    text-align: center;
    vertical-align: middle;
    cursor: default;
}

.time-badge {
    width: 100px;
    height: fit-content;
}

.time-slot {
    width: 100px;
    text-align: start;
    background-color: cadetblue;
}
</style>
