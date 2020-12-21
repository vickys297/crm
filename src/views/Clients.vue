<template>
  <div class="mb-5">
    <div class="loading" v-if="loading">
      <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
    </div>
    <div v-else>
      <div class="flex-container m-1">
        <div class="align-center">
          <md-field md-clearable>
            <label>Phone Number</label>
            <md-input placeholder="Search by Phone Number" v-model="search" @input="searchOnTable" />
          </md-field>
        </div>
        <div class="md-toolbar-section-end">
          <md-button
            class="md-raised md-primary"
            @click="openFilter"
            v-if="getLoginType === 1"
          >Filter</md-button>
          <md-menu md-size="medium" md-align-trigger>
            <md-button md-menu-trigger class="md-raised md-primary">Generate</md-button>
            <md-menu-content>
              <md-menu-item>
                <download-excel :data="searched" type="csv" name="Invoice.csv">Export CSV</download-excel>
              </md-menu-item>
              <md-menu-item>
                <download-excel :data="searched" name="Invoice.xls">Export Excel</download-excel>
              </md-menu-item>
            </md-menu-content>
          </md-menu>
          <md-button to="/clients/add">Add Client</md-button>
        </div>
      </div>

      <md-table v-model="searched" md-sort="name" md-sort-order="asc">
        <md-table-empty-state
          md-label="No Client Found"
          :md-description="`No client found. To add client click here or top right.`"
        >
          <md-button to="/clients/add" class="md-raised md-primary">Add Client</md-button>
        </md-table-empty-state>
        <md-table-row slot="md-table-row" slot-scope="{ item }">
          <md-table-cell md-label="Customer ID" md-sort-by="id">
            <md-button
              class="md-raised md-primary"
              @click="viewClientDetails(item.id)"
            >#{{ item.id }}</md-button>
          </md-table-cell>
          <md-table-cell md-label="Name" md-sort-by="name">
            <div v-if="item.name == null">
              <span>No Name</span>
            </div>
            <div v-else>
              <span>{{ item.name }}</span>
            </div>
          </md-table-cell>
          <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
          <md-table-cell md-label="Phone Number" md-sort-by="phoneNumber">{{ item.phoneNumber }}</md-table-cell>
          <md-table-cell md-label="Gender" md-sort-by="gender">{{ item.gender }}</md-table-cell>
        </md-table-row>
      </md-table>
      <div class="md-toolbar-section-end mt-2">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="getclientListSize"
          :current-page.sync="currentPageNumber"
          @current-change="onPagination"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
// const toLower = text => {
//   if (text !== '') {
//     return text.toString().toLowerCase()
//   }
// }

const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => item.phoneNumber.includes(term))
  }
  return items
}

export default {
  components: {
    HollowDotsSpinner
  },
  name: 'clients',
  data () {
    return {
      search: null,
      searched: [],
      clientData: '',
      loading: false,
      currentPageNumber: 1,
      pageSize: 10
    }
  },
  methods: {
    viewClientDetails: function (clientId) {
      this.$router.push({ name: 'viewClient', params: { id: clientId } })
    },
    openFilter: function () {
      this.$root.$emit('showVendorFilter')
    },
    callClient: function () {
      this.loading = true
      const outletId = this.getOutletId
      const pageNumber = this.currentPageNumber
      const pageSize = this.pageSize
      this.$store
        .dispatch('client/clientList', { outletId, pageNumber, pageSize })
        .then(response => {
          this.loading = false
          this.searched = this.clientList
        })
    },
    onPagination: function (pagination) {
      this.currentPageNumber = pagination
      this.callClient()
    },
    searchOnTable () {
      if (this.clientList != null) {
        this.searched = searchByName(this.clientList, this.search)
      }
    },
    handleEvent () {
      this.callClient()
      this.$notify('Getting Client List')
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Clients')
    this.callClient()
  },
  computed: {
    clientList: function () {
      return this.$store.getters['client/clientList']
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    },
    getLoginType: function () {
      return parseInt(localStorage.getItem('type'))
    },
    getclientListSize: function () {
      return this.$store.getters['client/clientListSize']
    }
  },
  beforeUpdate () {},
  mounted: function () {
    this.$root.$on('oidFilter', this.handleEvent)
  }
}
</script>

<style lang="scss" scoped>
.active {
  background-color: #111;
  color: #fff;
}
</style>
