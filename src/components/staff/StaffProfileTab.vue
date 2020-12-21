<template>
    <div>
        <div class="loading" v-if="loading">
            <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
        </div>
        <div v-else>
            <div class="flex-container">
                <div class="align-center">
                    <md-field class="mr-2" v-if="getLoginType === 1">
                        <label for="outlet-list">Outlet</label>
                        <md-select v-model="selectedOutlet" md-dense name="outlet-list" id="outlet-list" @md-selected="changeOutletId">
                            <md-option :value="item.id" v-for="item in getOutlets" :key="item.id">{{item.name}}</md-option>
                        </md-select>
                    </md-field>
                    <md-field md-clearable>
                        <label>Search</label>
                        <md-input placeholder="Search Staff Name" v-model="search" @input="searchOnTable" />
                    </md-field>
                </div>
                <div class="md-toolbar-section-end">
                    <md-button class="md-raised md-primary">
                        <download-excel :data="getStaffList" type="csv" name="StaffData.csv">
                            Export CSV
                        </download-excel>
                    </md-button>
                    <md-button class="md-raised md-primary">
                        <download-excel :data="getStaffList" name="StaffData.xls">
                            Export Excel
                        </download-excel>
                    </md-button>
                    <md-button to="staff/add">
                        Add Staff
                    </md-button>
                </div>
            </div>

            <md-table class="table-response" v-if="getStaffList != ''" v-model="searched" md-sort="id" md-sort-order="asc">
                <md-table-empty-state md-label="No Staff Found" :md-description="`You don't have any staff in your store. To add staff click here or top right`">
                    <md-button to="staff/add" class="md-primary md-raised">
                        Add Staff
                    </md-button>
                </md-table-empty-state>
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Staff Id" md-sort-by="id" md-numeric>
                        <md-button class="md-raised md-primary" @click="openEdit(item)">#{{ item.id }}</md-button>
                    </md-table-cell>
                    <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
                    <md-table-cell md-label="Phone" md-sort-by="phone">{{ item.phone }}</md-table-cell>
                    <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
                    <md-table-cell md-label="Job Title" md-sort-by="title">{{ item.title }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
const toLower = text => {
  return text.toString().toLowerCase()
}
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }

  return items
}
export default {
  components: {
    HollowDotsSpinner
  },
  name: 'staffProfileTab',
  data () {
    return {
      loading: false,
      staffSelected: 0,
      selectedOutlet: '',
      searched: [],
      search: null
    }
  },
  methods: {
    openEdit: function (item) {
      this.$router.push({ name: 'editStaff', params: { id: item.id } })
    },
    changeOutletId: function (selectedOutlet) {
      this.$store.dispatch('staff/staffList', this.selectedOutlet)
    },
    searchOnTable () {
      this.searched = searchByName(this.getStaffList, this.search)
    },
    initStaffList () {
      this.loading = true
      this.$store.dispatch('staff/staffList', this.getOutletId)
        .then(response => {
          this.loading = false
          this.searched = this.getStaffList
        })
    }
  },
  created: function () {
    this.selectedOutlet = this.$store.getters.getOutletId
    this.initStaffList()
  },
  computed: {
    getStaffList: function () {
      return this.$store.getters['staff/staffListData']
    },
    getLoginType: function () {
      return parseInt(localStorage.getItem('type'))
    },
    getOutlets: function () {
      return JSON.parse(this.$store.getters.getOutlets)
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    }
  }
}
</script>

<style lang="scss" scoped>
.md-field {
    max-width: 200px;
}
</style>
