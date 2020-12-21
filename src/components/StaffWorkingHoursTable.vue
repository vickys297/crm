<template>
    <div>
        <md-table :value="responseData.workingHours" md-sort="name">
            <md-table-row slot="md-table-row" slot-scope="{ item }" class="">
                <md-table-cell md-label="Staff Id" md-sort-by="staffId" md-numeric>{{ item.staffId }}</md-table-cell>
                <md-table-cell md-label="Staff Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell :md-label="shift.date" v-for="shift in item.shifts" :key="shift.date">
                    <div v-if="shift.shiftAvailable == 'false' || shift.shiftAvailable == false" class="md-center-item">
                        <md-button class="md-button md-primary" @click="updateShiftDialog(shift.date,item.staffId,shift)">
                            <md-icon>add</md-icon>
                        </md-button>
                    </div>
                    <span @click="updateShiftDialog(shift.date,item.staffId,shift)" class="md-center-item md-wrap-content" v-else>
                        <div v-if="shift.firstShift.startTime != ''">
                            <md-button class="md-raised md-primary">{{shift.firstShift.startTime}} to {{shift.firstShift.endTime}}</md-button>
                        </div>
                        <div v-if="shift.secondShift.endTime != ''">
                            <md-button class="md-raised md-primary">{{shift.secondShift.startTime}} to {{shift.secondShift.endTime}}</md-button>
                        </div>
                    </span>

                </md-table-cell>
            </md-table-row>
        </md-table>

        <md-dialog :md-active.sync="showAlertDialog" :md-click-outside-to-close="false" :md-close-on-esc="false" class="p-2">
            <md-dialog-title>Add New Shift</md-dialog-title>
            <md-dialog-content>
                <!-- first shift timing -->
                <span>First Shift</span>
                <div class="md-layout md-gutter md-dynamic-height">
                    <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                        <md-field>
                            <label for="shift-1-start-time">From Time</label>
                            <md-select v-model="newShift.firstShift.startTime" name="shift-1-start-time" id="shift-1-start-time" md-dense>
                                <md-option :value="item.time" v-for="item in timeList" :key="item">{{item.time}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                        <md-field>
                            <label for="shift-1-end-time">To Time</label>
                            <md-select v-model="newShift.firstShift.endTime" name="shift-1-end-time" id="shift-1-end-time" md-dense>
                                <md-option :value="item.time" v-for="item in timeList" :key="item">{{item.time}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
                <!-- first shift timing -->

                <!-- second shift timing -->
                <span>Second Shift</span>
                <div class="md-layout md-gutter md-dynamic-height">
                    <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100">
                        <md-field>
                            <label for="shift-2-start-time">From Time</label>
                            <md-select v-model="newShift.secondShift.startTime" name="shift-2-start-time" id="shift-2-start-time" md-dense>
                                <md-option :value="item.time" v-for="item in timeList" :key="item">{{item.time}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                    <div class="md-layout-item md-large-size-50 md-medium-size-50 md-small-size-50 md-xsmall-size-100 ">
                        <md-field>
                            <label for="shift-2-end-time">To Time</label>
                            <md-select v-model="newShift.secondShift.endTime" name="shift-2-end-time" id="shift-2-end-time" md-dense>
                                <md-option :value="item.time" v-for="item in timeList" :key="item">{{item.time}}</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
                <!--
                  Repeat disabled
                  <div class="mt-2">
                    <span class="md-raised md-primary">Repeat</span>
                </div>
                <div class="md-layout-item">
                    <md-field>
                        <md-select class="md-outlined" v-model="newShift.type" name="Set Repeat" id="country" md-dense>
                            <md-option value="0">No Repeat</md-option>
                            <md-option value="1">From Today</md-option>
                            <md-option value="2">Weekly Once</md-option>
                            <md-option value="3">Monthly Once</md-option>
                        </md-select>
                    </md-field>
                </div> -->
                <!-- repeat dialog -->
            </md-dialog-content>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showAlertDialog = false">Close</md-button>
                <md-button class="md-primary" @click="addShift">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
export default {
  props: {
    workingHours: Object
  },
  name: 'staffWorkingHoursTable',
  data () {
    return {
      attrs: [{
        key: 'today',
        highlight: true,
        dates: new Date()
      }],
      showAlertDialog: false,
      showSecondShift: false,
      showAlertData: null,
      updateShiftSelectedDate: '',
      updateShiftSelectedStaffId: '',
      timeList: [
        { id: 0, time: '12:00 AM' },
        { id: 0, time: '12:15 AM' },
        { id: 0, time: '12:30 AM' },
        { id: 0, time: '12:45 AM' },
        { id: 0, time: '01:00 AM' },
        { id: 0, time: '01:15 AM' },
        { id: 0, time: '01:30 AM' },
        { id: 0, time: '01:45 AM' },
        { id: 0, time: '02:00 AM' },
        { id: 0, time: '02:15 AM' },
        { id: 0, time: '02:30 AM' },
        { id: 0, time: '02:45 AM' },
        { id: 0, time: '03:00 AM' },
        { id: 0, time: '03:15 AM' },
        { id: 0, time: '03:30 AM' },
        { id: 0, time: '03:45 AM' },
        { id: 0, time: '04:00 AM' },
        { id: 0, time: '04:15 AM' },
        { id: 0, time: '04:30 AM' },
        { id: 0, time: '04:45 AM' },
        { id: 0, time: '05:00 AM' },
        { id: 0, time: '05:15 AM' },
        { id: 0, time: '05:30 AM' },
        { id: 0, time: '05:45 AM' },
        { id: 0, time: '06:00 AM' },
        { id: 0, time: '06:15 AM' },
        { id: 0, time: '06:30 AM' },
        { id: 0, time: '06:45 AM' },
        { id: 0, time: '07:00 AM' },
        { id: 0, time: '07:15 AM' },
        { id: 0, time: '07:30 AM' },
        { id: 0, time: '07:45 AM' },
        { id: 0, time: '08:00 AM' },
        { id: 0, time: '08:15 AM' },
        { id: 0, time: '08:30 AM' },
        { id: 0, time: '08:45 AM' },
        { id: 0, time: '09:00 AM' },
        { id: 0, time: '09:15 AM' },
        { id: 0, time: '09:30 AM' },
        { id: 0, time: '09:45 AM' },
        { id: 0, time: '10:00 AM' },
        { id: 0, time: '10:15 AM' },
        { id: 0, time: '10:30 AM' },
        { id: 0, time: '10:45 AM' },
        { id: 0, time: '11:00 AM' },
        { id: 0, time: '11:15 AM' },
        { id: 0, time: '11:30 AM' },
        { id: 0, time: '11:45 AM' },
        { id: 0, time: '12:00 PM' },
        { id: 0, time: '12:15 PM' },
        { id: 0, time: '12:30 PM' },
        { id: 0, time: '12:45 PM' },
        { id: 0, time: '01:00 PM' },
        { id: 0, time: '01:15 PM' },
        { id: 0, time: '01:30 PM' },
        { id: 0, time: '01:45 PM' },
        { id: 0, time: '02:00 PM' },
        { id: 0, time: '02:15 PM' },
        { id: 0, time: '02:30 PM' },
        { id: 0, time: '02:45 PM' },
        { id: 0, time: '03:00 PM' },
        { id: 0, time: '03:15 PM' },
        { id: 0, time: '03:30 PM' },
        { id: 0, time: '03:45 PM' },
        { id: 0, time: '04:00 PM' },
        { id: 0, time: '04:15 PM' },
        { id: 0, time: '04:30 PM' },
        { id: 0, time: '04:45 PM' },
        { id: 0, time: '05:00 PM' },
        { id: 0, time: '05:15 PM' },
        { id: 0, time: '05:30 PM' },
        { id: 0, time: '05:45 PM' },
        { id: 0, time: '06:00 PM' },
        { id: 0, time: '06:15 PM' },
        { id: 0, time: '06:30 PM' },
        { id: 0, time: '06:45 PM' },
        { id: 0, time: '07:00 PM' },
        { id: 0, time: '07:15 PM' },
        { id: 0, time: '07:30 PM' },
        { id: 0, time: '07:45 PM' },
        { id: 0, time: '08:00 PM' },
        { id: 0, time: '08:15 PM' },
        { id: 0, time: '08:30 PM' },
        { id: 0, time: '08:45 PM' },
        { id: 0, time: '09:00 PM' },
        { id: 0, time: '09:15 PM' },
        { id: 0, time: '09:30 PM' },
        { id: 0, time: '09:45 PM' },
        { id: 0, time: '10:00 PM' },
        { id: 0, time: '10:15 PM' },
        { id: 0, time: '10:30 PM' },
        { id: 0, time: '10:45 PM' },
        { id: 0, time: '11:00 PM' },
        { id: 0, time: '11:15 PM' },
        { id: 0, time: '11:30 PM' },
        { id: 0, time: '11:45 PM' }
      ],
      newShift: {
        firstShift: {
          startTime: null,
          endTime: null
        },
        secondShift: {
          startTime: null,
          endTime: null
        },
        date: null,
        type: 0, // 0 - no repeat, 1 - from today, 2 - once in week, 3 - once in month
        staffId: null,
        outletId: 1
      },
      showDialog: false,
      date: new Date().toISOString().substr(0, 10),
      responseData: this.workingHours
    }
  },
  methods: {
    setWorkingHoursData: function () {
      this.responseData = this.workingHours
      // // console.log('setWorkingHoursData', this.responseData)
    },
    showSecondShiftFun: function () {
      this.showSecondShift = true
    },
    addShift: function () {
      this.newShift.staffId = this.updateShiftSelectedStaffId
      this.newShift.date = this.updateShiftSelectedDate
      this.$store.dispatch('staff/updateShift', this.newShift)
        .then(() => {
          this.updateShiftResponse()
        })
    },
    updateShiftDialog: function (date, staffId, shift) {
      this.updateShiftSelectedDate = date
      this.updateShiftSelectedStaffId = staffId

      if (shift !== '') {
        this.newShift.firstShift = shift.firstShift
        this.newShift.secondShift = shift.secondShift
      } else {
        this.newShift.firstShift.startTime = null
        this.newShift.firstShift.endTime = null
        this.newShift.secondShift.startTime = null
        this.newShift.secondShift.endTime = null
      }

      this.showAlertDialog = true
    },
    updateShiftResponse: function () {
      // // console.log('updateShiftResponse', this.$store.getters['staff/updateShiftStatusResponse'])
      this.$notify(this.$store.getters['staff/updateShiftStatusResponse'].message)
      this.$emit('updateShitStatus')
      this.showAlertDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
table thead tr th.md-table-head {
    display: flex;
    text-align: center !important;
    justify-content: center;
}

.md-dialog-fit {
    width: 50% !important;
}

.md-table-head-container.md-ripple.md-disabled {
    text-align: center;
    justify-content: center;
}

th.md-table-head {
    text-align: center;
    justify-content: center;
}
</style>
