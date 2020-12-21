<template>
    <div class="pl-3 pr-3 pt-1">
        <div class="loading" v-if="getPackageList == ''">
            <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
        </div>
        <div v-else class="md-layout md-gutter">
            <div class="md-layout-item md-large-size-30 md-medium-size-50 md-small-size-100">
                <div class="align-center">
                    <span class="md-headline w-100">Package</span>
                    <div class="align-item-right">
                        <md-button to="/services/package/add">Add Package</md-button>
                    </div>
                </div>
                <md-list class="md-triple-line">
                    <div v-for="item in getPackageList" :key="item.id" @click="viewPackageServices(item)">
                        <md-list-item>
                            <div class="md-list-item-text">
                                <span class="md-title">{{item.name}}</span>
                                <span class="md-caption">{{item.description}}</span>
                                <div class="md-warp-content mt-1">
                                    <md-content class="md-primary p-05">{{item.services.length}} services</md-content>
                                </div>
                            </div>
                            <div class="align-center md-warp-content float-right p-1">
                                <md-button class="md-icon-button md-primary" @click="editPackage(item)">
                                    <md-tooltip md-direction="bottom">Edit</md-tooltip>
                                    <md-icon>edit</md-icon>
                                </md-button>
                                <md-button class="md-icon-button md-primary" @click="deletePackage(item)">
                                    <md-tooltip md-direction="bottom">Delete</md-tooltip>
                                    <md-icon>delete</md-icon>
                                </md-button>
                                <md-button class="md-icon-button md-primary">
                                    <md-tooltip md-direction="bottom">View</md-tooltip>
                                    <md-icon>keyboard_arrow_right</md-icon>
                                </md-button>
                            </div>
                        </md-list-item>
                        <md-divider></md-divider>
                    </div>
                </md-list>
            </div>
            <div class="md-layout-item md-large-size-70 md-medium-size-50 md-small-size-100">
                <div v-if="selectedPackage == ''">
                    <div class="md-center-item mt-5 md-warp-contant">
                        <md-icon class="md-size-4x">help_outline</md-icon>
                        <span class="md-body-1 mt-2">Select a Package to view services</span>
                        <span class="md-caption mt-2">click <strong>ADD Package</strong> to add Package in your store's service list</span>
                        <span class="md-caption mt-1">click <strong>EXPORT CSV</strong> or <strong>EXPORT EXCEL</strong> to download a copy of your Services in csv or excel</span>
                    </div>
                </div>
                <div v-else>
                    <div v-if="selectedPackage.services == 0" class="md-center-item mt-5 md-warp-contant">
                        <md-icon class="md-size-4x">playlist_add</md-icon>
                        <span class="md-body-1 mt-2">No Services available</span>
                        <span class="md-caption mt-2">click <strong>ADD SERVICES</strong> to add new Service</span>
                        <span class="md-caption mt-1">click <strong>EXPORT CSV</strong> or <strong>EXPORT EXCEL</strong> to download a copy of your Services in csv or excel</span>
                    </div>
                    <div v-else>
                        <div class="align-center">
                            <span class="md-headline w-100 p-1">{{selectedPackage.name}}</span>
                        </div>
                        <md-divider></md-divider>
                        <md-list class="md-triple-line">
                            <div v-for="item in selectedPackage.services" :key="item.name">
                                <md-list-item @click="openItemView(item.id)">
                                    <md-avatar>
                                        <img src="https://placeimg.com/40/40/people/1" alt="People">
                                    </md-avatar>
                                    <div class="md-list-item-text">
                                        <span class="md-title">{{item.name}}</span>
                                        <p class="md-body-1">{{item.category}}</p>
                                        <p class="md-body-2">{{item.duration}}</p>
                                    </div>
                                    <span class="md-title"><medium>{{item.retailPrice}} AED</medium></span>
                                </md-list-item>
                                <md-divider></md-divider>
                            </div>
                        </md-list>
                        <div class="p-1 align-center">
                            <span class="md-headline">Total</span> <span class="md-toolbar-section-end md-headline">{{selectedPackage.serviceAmount}} AED</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Confirm Delete Package -->
        <md-dialog-confirm :md-active.sync="showDeleteConfirmation" md-title="Confirm Delete" :md-content="'Are you sure do you want to delete <strong>'+ deletepackage.name +'</strong> Package'" md-confirm-text="Delete" md-cancel-text="Cancel" @md-cancel="showDeleteConfirmation=false"
            @md-confirm="confirmDeletePackage" />
    </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
export default {
  components: {
    HollowDotsSpinner
  },
  name: 'packageDesktop',
  data () {
    return {
      showDeleteConfirmation: false,
      deletepackage: {
        id: '',
        name: ''
      },
      expandSingle: true,
      expandNews: true,
      showAddNewPackage: false,
      newPackage: {
        name: 'Corona offer',
        serviceId: [1, 2, 3],
        discountInPercentage: '10',
        maxDiscountInAmount: '100'
      },
      selectedPackage: ''
    }
  },
  methods: {
    showAlert: function () {},
    editPackage: function (item) {
      // // console.log('editNewStaffId', item.id)
      this.$router.push({ name: 'editNewStaff', params: { id: item.id } })
    },
    deletePackage: function (item) {
      this.deletepackage.id = item.id
      this.deletepackage.name = item.name
      this.showDeleteConfirmation = true
    },
    confirmDeletePackage: function () {
      this.showDeleteConfirmation = false
      this.$store.dispatch('service/deletePackage', this.deletepackage.id)
        .then(response => {
          this.$notify(response.message)
          this.callPackageList()
          this.selectedPackage = ''
        })
    },
    viewPackageServices: function (packages) {
      this.selectedPackage = packages
    },
    callPackageList: function () {
      this.$store.dispatch('service/getPackageList', this.getOutletId)
    }
  },
  created: function () {
    this.$store.dispatch('service/getServiceList', this.getOutletId)
    this.callPackageList()
  },
  computed: {
    getServiceListData: function () {
      return this.$store.getters['service/serviceList']
    },
    getPackageList: function () {
      return this.$store.getters['service/getPackageList']
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
