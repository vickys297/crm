<template>
    <div>
        <h1>Edit Package</h1>
        <notifications class="mt-2"></notifications>
        <md-tabs v-if="ShowComponent">
            <md-tab id="tab-pages-1" md-label="General">
                <div class="container">
                    <md-list>
                        <md-field>
                            <label>Package Name</label>
                            <md-input v-model="packageItem.name" required></md-input>
                        </md-field>

                        <div class="mt-2">
                            <md-field>
                                <label for="booking-type" class="md-subheading">Booking Type</label>
                                <md-select v-model="packageItem.bookingType" name="booking-type" id="booking-type">
                                    <md-option :value="1">Booked in Parallel</md-option>
                                    <md-option :value="2">Booked in Sequence</md-option>
                                </md-select>
                                <span class="md-helper-text">Booking Type caption</span>
                            </md-field>
                        </div>

                        <div class="mt-2">
                            <md-field>
                                <label for="pricing-type" class="md-subheading">Price Type</label>
                                <md-select v-model="packageItem.pricingType" name="pricing-type" id="pricing-type">
                                    <md-option :value="1">Actual Price</md-option>
                                    <md-option :value="2">Custom Price</md-option>
                                    <md-option :value="3">Discount in Percentage</md-option>
                                </md-select>
                                <span class="md-helper-text">Pricing Type caption</span>
                            </md-field>
                        </div>

                        <div class="mt-2" v-if="packageItem.pricingType=='2'">
                            <md-field>
                                <label>Custom Price</label>
                                <md-input v-model="packageItem.customPrice" type="number"></md-input>
                                <span class="md-helper-text">Add Custom price to this package</span>
                            </md-field>
                        </div>
                        <div class="mt-2" v-if="packageItem.pricingType=='3'">
                            <md-field>
                                <label>Discount in Percentage</label>
                                <md-input v-model="packageItem.discountPercentage" type="number"></md-input>
                                <span class="md-helper-text">Add discount percentage from package total amount</span>
                            </md-field>
                        </div>
                    </md-list>
                </div>
            </md-tab>
            <md-tab id="tab-pages-2" md-label="Service">
                <div class="container">
                    <div class="mt-2">
                        <md-checkbox v-model="packageItem.onlineBooking" :true-value="1" :false-value="2">Enable online booking</md-checkbox>
                        <br>
                        <span class="md-caption">Note: Enable to show this package in your shop</span>
                    </div>
                    <div class="mt-2">
                        <md-field>
                            <label for="categoryType" class="md-subheading">Category</label>
                            <md-select v-model="packageItem.category.id" name="onSelectServicecategoryType" id="categoryType">
                                <md-option :value="item.id" v-for="item in getCategoryList" :key="item.id">{{item.name}}</md-option>
                            </md-select>
                            <span class="md-helper-text">Package will be displayed under this category</span>
                        </md-field>
                    </div>
                    <div class="mt-2">
                        <div class="md-layout">
                            <div class="md-layout-item">
                                <md-list>
                                    <md-list-item>
                                        <span class="md-title">Selected Services</span>
                                        <md-button class="md-raised md-primary" @click="showDialog=true">Add Service</md-button>
                                    </md-list-item>
                                </md-list>
                                <md-list>
                                    <div v-if="packageItem.services.length > 0">
                                        <md-list-item class="mt-1" v-for="(item,index) in packageItem.services" :key="item.serviceId">
                                            <div class="md-layout-item md-layout md-gutter selected-service">
                                                <div class="md-layout-item align-center">
                                                    <span class="md-subheading">{{item.serviceName}}</span>
                                                </div>
                                                <div class="md-layout-item align-center">
                                                    <span class="md-body-2">Duration {{item.duration}}</span>
                                                </div>
                                                <div class="md-layout-item md-toolbar-section-end">
                                                    <span class="md-body-2">{{item.retailPrice}} AED</span>
                                                </div>
                                                <div class="md-layout-item md-toolbar-section-end">
                                                    <md-button class="md-icon-button md-raised md-accent" @click="onRemoveService(item,index)">
                                                        <md-icon>close</md-icon>
                                                    </md-button>
                                                </div>
                                            </div>
                                        </md-list-item>
                                        <md-divider class="mt-2"></md-divider>
                                        <md-list-item class="mt-1 md-primary md-toolbar-section-end w-50" v-if="packageItem.services.length > 0">
                                            <span class="md-list-item-text md-headline">Total:</span>
                                            <span class="md-list-item-text md-subheading">{{totalServiceCost}} AED</span>
                                        </md-list-item>
                                    </div>
                                    <div v-else class="md-empty-state md-empty-state-background w-100">
                                        <md-icon class="md-size-3x">list</md-icon>
                                        <span class="md-body-1 mt-1">No Service Selected</span>
                                        <span class="md-caption mt-1">Select <b>ADD SERVICE</b> to add some service</span>
                                    </div>
                                </md-list>
                            </div>
                        </div>
                    </div>
                </div>
            </md-tab>
        </md-tabs>
        <div class="align-end">
            <md-button @click="onCancelPackage">Cancel</md-button>
            <md-button @click="updatePackage">Save</md-button>
        </div>

        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Select Service</md-dialog-title>
            <md-content class="md-scrollbar container">
                <md-list>
                    <md-list-item class="md-card mt-1" v-for="item in getServiceListData" :key="item.serviceName" @click="onSelectService(item)">
                        <span class="md-list-item-text">
                                                                <span class="md-subheading">{{item.serviceName}}</span>
                        </span>
                        <span class="md-list-item-text">
                                                                <span class="md-body-2">Duration {{item.duration}}</span>
                        </span>
                        <span class="md-toolbar-section-end">
                                                                <span class="md-body-2">{{item.retailPrice}} AED</span>
                        </span>
                    </md-list-item>
                </md-list>
            </md-content>
            <div class="md-toolbar-section-end">
                <md-button @click="showDialog = false">Cancel</md-button>
            </div>
        </md-dialog>
    </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: 'EditPackage',
  data () {
    return {
      showDialog: false,
      showAddNewPackage: false,
      ShowComponent: false,
      packageItem: {
        category: { id: '', name: '' },
        categoryId: '',
        categoryName: '',
        name: '',
        enableOnlineBooking: '',
        serviceId: [],
        bookingType: '',
        customAmount: '',
        discountPercentage: '',
        pricingType: '',
        outletId: '',
        vendorId: ''
      },
      selectedServiceList: []
    }
  },
  methods: {
    onSelectService: function (item) {
      // // console.log('onSelectService', item)
      this.packageItem.services.push(item)
      this.showDialog = false
    },
    onRemoveService: function (item, index) {
      this.packageItem.serviceId.splice(index, 1)
    },
    updatePackage: function () {
      const services = []
      this.packageItem.services.forEach(element => {
        services.push(element.serviceId)
      })

      this.packageItem.categoryId = this.packageItem.category.id
      this.packageItem.categoryName = this.packageItem.category.name
      this.packageItem.enableOnlineBooking = this.packageItem.onlineBooking

      this.packageItem.serviceId = services

      this.$store.dispatch('service/updatePackage', this.packageItem)
        .then(response => {
          this.$notify(response.message)
          this.$router.go(-1)
        })
    },
    onCancelPackage: function () {
      this.$router.go(-1)
    },
    getParams: function () {
      this.$store.dispatch('service/getPackageItem', this.$route.params.id)
        .then(response => {
          this.packageItem = response.responseData
          this.ShowComponent = true
        })
    }
  },
  created: function () {
    this.$store.dispatch('service/getServiceList', this.getOutletId)
    this.$store.dispatch('service/getCategoryList', this.getOutletId)
    this.getParams()
  },
  computed: {
    getServiceListData: function () {
      return this.$store.getters['service/serviceList']
    },
    totalServiceCost: function () {
      let amount = 0
      this.packageItem.services.forEach(element => {
        amount = (amount + parseInt(element.retailPrice))
      })
      return amount
    },
    getCategoryList: function () {
      return this.$store.getters['service/categoryList']
    },
    getPackageItem: function () {
      return this.$store.getters['service/getPackageItem']
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    }

  }
}
</script>

<style lang="scss" scoped>
.md-content {
    max-height: 80%;
    overflow: auto;
}

.md-empty-state-background {
    background-color: #f4f4f4;
    padding-bottom: 40px;
    border-radius: 5px;
}
</style>
