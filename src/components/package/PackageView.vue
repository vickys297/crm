<template>
    <div class="loading" v-if="getPackageList == ''">
        <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
    </div>
    <div v-else>
        <div class="md-toolbar-section-end">
            <md-button to="/services/package/add" class="md-raised md-primary">Add Package</md-button>
        </div>
        <md-dialog :md-active.sync="showAddNewPackage">
            <md-dialog-title>Create New Package</md-dialog-title>

            <md-dialog-actions>
                <md-button class="md-primary" @click="showAddNewPackage = false">Close</md-button>
                <md-button class="md-primary" @click="showAddNewPackage = false">Save</md-button>
            </md-dialog-actions>
        </md-dialog>

        <div class="list container">
            <md-list :md-expand-single="expandSingle" class="mt-2">
                <md-list-item md-expand v-for="item in getPackageList" :key="item.id" class="package mb-1">
                    <md-avatar>
                        <img src="https://source.unsplash.com/random" alt="Avatar">
                    </md-avatar>
                    <span class="md-list-item-text">{{item.name}}</span>
                    <md-button class="md-icon-button md-accent" @click="deletePackage(item)">
                        <md-icon>delete</md-icon>
                    </md-button>
                    <md-button class="md-icon-button md-primary" @click="editPackage(item)">
                        <md-icon>edit</md-icon>
                    </md-button>
                    <md-list slot="md-expand">
                        <md-list-item class="md-inset selected-service mt-1 md-layout" v-for="service in item.services" :key="service.id">
                            <span class="md-layout-item md-section-start">{{service.name}}</span>
                            <span class="md-layout-item md-toolbar-section-end">{{service.duration}}</span>
                            <span class="md-layout-item md-toolbar-section-end">{{service.retailPrice}} AED</span>
                        </md-list-item>
                    </md-list>
                </md-list-item>
            </md-list>
        </div>

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
  name: 'package',
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
      }
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
          this.$store.dispatch('service/getPackageList')
        })
    }
  },
  created: function () {
    this.$store.dispatch('service/getServiceList', this.getOutletId)
    this.$store.dispatch('service/getPackageList', this.getOutletId)
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
.text-end {
    text-align: end;
}

.md-section-start {
    justify-content: flex-start;
}

.list {
    margin-bottom: 100px;
}

</style>
