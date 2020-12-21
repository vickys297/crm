<template>
  <div class="page-container">
    <notifications position="top center" v-if="!isLoggedIn"></notifications>
    <notifications v-else-if="isLoggedIn != null"></notifications>
    <router-view v-if="!isLoggedIn"></router-view>
    <div v-else-if="isLoggedIn != null">
      <md-app class="md-fixed">
        <md-app-toolbar class="md-primary" md-elevation="0">
          <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
            <md-icon>menu</md-icon>
          </md-button>
          <div class="align-center">
            <div class="md-title">
              {{getTitleName}} by Broz Community
              <div class="md-body-2 color-white">{{getTitle}}</div>
            </div>
          </div>
          <div class="md-toolbar-section-end">
            <md-button class="md-button align-center" v-if="!isLoggedIn">
              <md-title class="mr-05">Login</md-title>
            </md-button>
            <md-button class="md-icon-button align-center" @click="showSidepanel = true">
              <md-icon>notifications</md-icon>
            </md-button>
            <md-menu md-direction="bottom-start">
              <md-button
                class="md-avatar-icon md-icon-button md-raised"
                v-if="isLoggedIn"
                md-menu-trigger
              >V</md-button>
              <md-menu-content>
                <md-menu-item to="/setup/account">Profile</md-menu-item>
                <md-menu-item>Notification Settings</md-menu-item>
                <md-menu-item>Contact us</md-menu-item>
                <md-menu-item>Help Center</md-menu-item>
                <md-menu-item @click="logout">Logout</md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>
        </md-app-toolbar>

        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
          <md-toolbar class="md-transparent" md-elevation="0">
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </md-toolbar>

          <md-list>
            <md-list-item to="/">
              <md-icon class="md-primary">dashboard</md-icon>
              <span class="md-list-item-text">Dashboard</span>
            </md-list-item>
            <md-list-item to="/staff">
              <md-icon class="md-primary">person</md-icon>
              <span class="md-list-item-text">Staff</span>
              <md-tooltip v-show="!menuVisible" md-direction="right">Staff</md-tooltip>
            </md-list-item>
            <md-list-item to="/services">
              <md-icon class="md-primary">work</md-icon>
              <span class="md-list-item-text">Services</span>
              <md-tooltip v-show="!menuVisible" md-direction="right">Services</md-tooltip>
            </md-list-item>
            <md-list-item to="/sales">
              <md-icon class="md-primary">attach_money</md-icon>
              <span class="md-list-item-text">Sales</span>
              <md-tooltip v-show="!menuVisible" md-direction="right">Sales</md-tooltip>
            </md-list-item>
            <md-list-item to="/Clients">
              <md-icon class="md-primary">account_circle</md-icon>
              <span class="md-list-item-text">Clients</span>
              <md-tooltip v-show="!menuVisible" md-direction="right">Clients</md-tooltip>
            </md-list-item>

            <md-list-item to="/setup">
              <md-icon class="md-primary">settings</md-icon>
              <span class="md-list-item-text">Setup</span>
              <md-tooltip v-show="!menuVisible" md-direction="right">Setup</md-tooltip>
            </md-list-item>
          </md-list>
        </md-app-drawer>
        <md-app-content>
          <md-progress-bar
            md-mode="query"
            class="md-accent"
            v-show="this.$store.getters.loadingStatus"
          ></md-progress-bar>
          <keep-alive :include="['AppointmentsSearch', 'invoice']">
            <router-view class="mt-2"></router-view>
          </keep-alive>
        </md-app-content>
      </md-app>
      <!-- <v-breakpoint>
                <v-show-at xlarge>
                    <md-app class="md-fixed">
                        <md-app-toolbar class="md-primary" md-elevation="0">
                            <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
                                <md-icon>menu</md-icon>
                            </md-button>
                            <span class="md-title">{{getTitle}}</span>
                            <div class="md-toolbar-section-end">
                                <md-button class="md-button align-center" v-if="!isLoggedIn">
                                    <md-title class="mr-05">Login</md-title>
                                </md-button>
                                <md-button class="md-icon-button align-center" @click="showSidepanel = true">
                                    <md-icon>notifications</md-icon>
                                </md-button>
                                <md-menu md-direction="bottom-start">
                                    <md-button class="md-avatar-icon md-icon-button md-raised" v-if="isLoggedIn" md-menu-trigger>
                                        V
                                    </md-button>
                                    <md-menu-content>
                                        <md-menu-item to="/profile">Profile</md-menu-item>
                                        <md-menu-item>Notification Settings</md-menu-item>
                                        <md-menu-item>Contact us</md-menu-item>
                    but                     <md-menu-item @click="logout">Logout</md-menu-item>
                                    </md-menu-content>
                                </md-menu>

                            </div>
                        </md-app-toolbar>

                        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
                            <md-toolbar class="md-transparent" md-elevation="0">

                                <div class="md-toolbar-section-end">
                                    <md-button class="md-icon-button md-dense" @click="toggleMenu">
                                        <md-icon>keyboard_arrow_left</md-icon>
                                    </md-button>
                                </div>
                            </md-toolbar>

                            <md-list>
                                <md-list-item to="/">
                                    <md-icon class="md-primary">dashboard</md-icon>
                                    <span class="md-list-item-text">Dashboard</span>
                                </md-list-item>
                                <md-list-item to="/staff">
                                    <md-icon class="md-primary">person</md-icon>
                                    <span class="md-list-item-text">Staff</span>
                                    <md-tooltip v-show="!menuVisible" md-direction="right">Staff</md-tooltip>
                                </md-list-item>
                                <md-list-item to="/services">
                                    <md-icon class="md-primary">work</md-icon>
                                    <span class="md-list-item-text">Services</span>
                                    <md-tooltip v-show="!menuVisible" md-direction="right">Services</md-tooltip>
                                </md-list-item>
                                <md-list-item to='/sales'>
                                    <md-icon class="md-primary">attach_money</md-icon>
                                    <span class="md-list-item-text">Sales</span>
                                    <md-tooltip v-show="!menuVisible" md-direction="right">Sales</md-tooltip>
                                </md-list-item>
                                <md-list-item to='/Clients'>
                                    <md-icon class="md-primary">account_circle</md-icon>
                                    <span class="md-list-item-text">Clients</span>
                                    <md-tooltip v-show="!menuVisible" md-direction="right">Clients</md-tooltip>
                                </md-list-item>

                                <md-list-item to='/setup'>
                                    <md-icon class="md-primary">settings</md-icon>
                                    <span class="md-list-item-text">Setup</span>
                                    <md-tooltip v-show="!menuVisible" md-direction="right">Setup</md-tooltip>
                                </md-list-item>
                            </md-list>
                        </md-app-drawer>
                        <md-app-content>
                            <md-progress-bar md-mode="query" class="md-accent" v-show="this.$store.getters.loadingStatus"></md-progress-bar>
                            <router-view></router-view>
                        </md-app-content>
                    </md-app>
                </v-show-at>
                <v-show-at medium>
                    <div class="mb-5 mobile-view">
                        <router-view></router-view>
                        <div class="md-bottom-bar">
                            <md-bottom-bar md-type="shift">
                                <md-bottom-bar-item to="/" id="bottom-bar-item-home" md-label="Dashboard" md-icon="dashboard"></md-bottom-bar-item>
                                <md-bottom-bar-item to="/staff" id="bottom-bar-item-home" md-label="Staff" md-icon="person"></md-bottom-bar-item>
                                <md-bottom-bar-item to="/services" id="bottom-bar-item-home" md-label="Services" md-icon="work"></md-bottom-bar-item>
                                <md-bottom-bar-item to='/sales' id="bottom-bar-item-home" md-label="Sales" md-icon="attach_money"></md-bottom-bar-item>
                                <md-bottom-bar-item to='/Clients' id="bottom-bar-item-home" md-label="Clients" md-icon="account_circle"></md-bottom-bar-item>
                                <md-bottom-bar-item to='/setup' id="bottom-bar-item-home" md-label="Setup" md-icon="settings"></md-bottom-bar-item>
                            </md-bottom-bar>
                        </div>
                    </div>
                </v-show-at>
      </v-breakpoint>-->
    </div>

    <!-- Notification Panel -->
    <md-drawer class="md-right" :md-active.sync="showSidepanel">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Notification</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <span class="md-list-item-text">Abbey Christansen</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Alex Nelson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon class="md-primary">chat_bubble</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <span class="md-list-item-text">Mary Johnson</span>

          <md-button class="md-icon-button md-list-action">
            <md-icon>chat_bubble</md-icon>
          </md-button>
        </md-list-item>
      </md-list>
    </md-drawer>
    <!-- Notification Panel -->

    <!-- Vendor Filter -->
    <md-drawer class="md-right" :md-active.sync="showFilter">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">Filter</span>
      </md-toolbar>

      <md-list>
        <md-list-item v-if="getLoginType == 1">
          <md-field class="md-warp-content">
            <label for="outlet-list">Outlet</label>
            <md-select v-model="selectedOutlet" name="outlet-list" id="outlet-list">
              <md-option :value="item.id" v-for="item in getOutlets" :key="item.id">{{ item.name }}</md-option>
            </md-select>
          </md-field>
        </md-list-item>

        <md-list-item>
          <div class="md-toolbar-section-end">
            <md-button class="md-button md-raised md-primary" @click="cancelOID">Cancel</md-button>
            <md-button class="md-button" @click="updatedOID" :disabled="getApplyButtonState">Apply</md-button>
          </div>
        </md-list-item>
      </md-list>
    </md-drawer>
    <!-- Vendor Filter -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import { VShowAt } from 'vue-breakpoint-component'
export default {
  name: 'PersistentMini',
  //   components: { VShowAt },
  data: () => ({
    menuVisible: false,
    showFilter: false,
    showSidepanel: false,
    selectedOutlet: ''
  }),
  methods: {
    toggleMenu () {
      // if (!this.menuVisible) {
      //   this.$store.dispatch('navVisibile', true)
      // } else {
      //   this.$store.dispatch('navVisibile', false)
      // }
      this.menuVisible = !this.menuVisible
    },
    checkLogin: function () {
      // if (!this.$store.getters['login/isLoggedIn']) {
      //   this.$router.push('/login')
      // }
    },
    logout: function () {
      this.$store.dispatch('login/logout').then(() => {
        this.$router.push('/login')
      })
    },
    openContent: function () {},
    toogleFilter: function () {
      this.showFilter = !this.showFilter
    },
    changeOutletId: function (selectedOutletId) {},
    updatedOID: function () {
      if (
        parseInt(this.selectedOutlet) === parseInt(localStorage.getItem('OID'))
      ) {
        this.$notify('No Change Found')
      } else {
        this.$store.dispatch('setOutletId', this.selectedOutlet)
        this.showFilter = false
        this.$notify('Applying Filter')
        this.$root.$emit('oidFilter')
      }
    },
    cancelOID: function () {
      this.selectedOutlet = localStorage.getItem('OID')
      this.showFilter = false
    }
  },
  created: function () {
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch('login/logout')
        }
        throw err
      })
    })
    this.checkLogin()
    this.selectedOutlet = this.$store.getters.getOutletId
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters['login/isLoggedIn']
    },
    userName: function () {
      return this.$store.getters.userDetails
    },
    getTitle: function () {
      return this.$store.getters.getTitle
    },
    getOutlets: function () {
      return JSON.parse(this.$store.getters.getOutlets)
    },
    getLoginType: function () {
      return parseInt(localStorage.getItem('type'))
    },
    getApplyButtonState: function () {
      return (
        parseInt(this.selectedOutlet) === parseInt(localStorage.getItem('OID'))
      )
    },
    getTitleName: function () {
      return this.$store.getters.getOutletName
    }
  },
  mounted () {
    this.$root.$on('showVendorFilter', (data) => {
      this.toogleFilter()
    })

    this.$root.$on('interceptors-error', (data) => {
      this.$notify({
        type: 'error',
        title: 'Data Not Found',
        text: 'Unable to get some data'
      })
    })
    // window.intercepted.$on('response', data => {
    //   // console.log('intercepted', data) // { status: 404, code: 'Not found', body: null }

    //   // Display the message.
    // })
  }
}
</script>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, 0.12);
} // Demo purposes only
.md-drawer {
  width: 300px;
  max-width: calc(100vw - 125px);
}

.mr-05 {
  margin-right: 05px !important;
  text-align: center;
  align-content: center;
}

.page-container {
  overflow: hidden;
  position: relative;
}

.phone-viewport {
  display: inline-flex;
  align-items: flex-end;
  overflow: hidden;
  border: 1px solid rgba(#000, 0.26);
  background: rgba(#000, 0.06);
}
</style>
