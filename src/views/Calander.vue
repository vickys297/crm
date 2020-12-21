<template>
    <div>
        <div class="flex-container align-center">
            <div class="md-toolbar-section-end">
                <div class="group align-item-right">
                    <md-button class="md-raised md-primary" @click="showFilter">
                        Filter
                    </md-button>
                    <md-menu class="md-button" md-direction="bottom-start">
                        <md-button md-menu-trigger class="md-raised md-primary mr-1">Generate</md-button>
                        <md-menu-content>
                            <md-menu-item>Excel</md-menu-item>
                            <md-menu-item>CSV</md-menu-item>
                        </md-menu-content>
                    </md-menu>
                    <md-menu class="md-button">
                        <md-button @click="showNewService = true" to="/appointments/add">New Appointment</md-button>
                    </md-menu>
                </div>
            </div>
        </div>
        <StaffView class="mt-1"></StaffView>
        <div class="md-layout sm-gutter layout mt-1">
            <div class="md-layout-item group align-center p-1">
                <md-field>
                    <label for="movies">Staff</label>
                    <md-select v-model="selectedMovies" name="movies" id="movies" multiple>
                        <md-option value="fight-club">Fight Club</md-option>
                        <md-option value="godfather">Godfather</md-option>
                        <md-option value="godfather-ii">Godfather II</md-option>
                        <md-option value="godfather-iii">Godfather III</md-option>
                        <md-option value="godfellas">Godfellas</md-option>
                        <md-option value="pulp-fiction">Pulp Fiction</md-option>
                        <md-option value="scarface">Scarface</md-option>
                    </md-select>
                </md-field>
                <md-button class="md-raised md-primary">View All</md-button>
            </div>
            <div class=" md-layout-item align-center p-2">
                <span class="md-body-2 w-25">Date Range</span>
                <br>
                <VueCtkDateTimePicker class="date-layout" without-header no-label right v-model="selectedDate" color="black" noClearButton :custom-shortcuts="shortcut" only-date range formatted="DD-MM-YYYY" />
                <!-- <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDates" /> -->
            </div>
            <div class="md-layout-item">
                <DatePicker class="date-picker"></DatePicker>
            </div>
        </div>
    </div>
</template>

<script>
import DatePicker from '../components/datePicker/DatePicker.vue'
import StaffView from '../components/staff/StaffView.vue'
export default {
  name: 'calander',
  components: {
    StaffView,
    DatePicker
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Calander')
  },
  methods: {
    showFilter: function () {
      const data = 'sasdfhsidfuisdhfuihsduifhuidhfuishduih'
      this.$root.$emit('showVendorFilter', data)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
