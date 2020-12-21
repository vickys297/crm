<template>
    <div>
        <div class="md-layout container mb-5">
            <div class="md-layout-item p-1">
                <div class="">
                    <md-list>
                        <md-field :class="getValidationClass('name')">
                            <label>Package Name</label>
                            <md-input v-model="newPackage.name" required></md-input>
                            <span class="md-error" v-if="!$v.newPackage.name.required">Enter a Package Name</span>
                            <span class="md-error" v-if="!$v.newPackage.name.minLength">Enter valid Package Name</span>
                        </md-field>

                        <md-field :class="getValidationClass('description')">
                            <label>Description</label>
                            <md-textarea v-model="newPackage.description" required md-autogrow></md-textarea>
                            <span class="md-error" v-if="!$v.newPackage.description.required">Description required</span>
                        </md-field>

                        <div class="mt-2">
                            <md-field :class="getValidationClass('bookingType')">
                                <label for="booking-type" class="md-subheading">Booking Type</label>
                                <md-select v-model="newPackage.bookingType" required name="booking-type" id="booking-type">
                                    <md-option :value="1">Booked in Parallel</md-option>
                                    <md-option :value="2">Booked in Sequence</md-option>
                                </md-select>
                                <span class="md-error" v-if="!$v.newPackage.name.required">Select Booking Type</span>
                            </md-field>
                        </div>

                        <div class="mt-2">
                            <md-field :class="getValidationClass('pricingType')">
                                <label for="pricing-type" class="md-subheading">Price Type</label>
                                <md-select v-model="newPackage.pricingType" required name="pricing-type" id="pricing-type">
                                    <md-option :value="1">Actual Price</md-option>
                                    <md-option :value="2">Custom Price</md-option>
                                    <md-option :value="3">Discount in Percentage</md-option>
                                </md-select>
                                <span class="md-error" v-if="!$v.newPackage.name.required">Select Price Type</span>
                            </md-field>
                        </div>

                        <div class="mt-2" v-if="newPackage.pricingType=='2'">
                            <md-field :class="getValidationClass('customAmount')">
                                <label>Custom Amount</label>
                                <md-input v-model="newPackage.customAmount" type="number" required min="0"></md-input>
                                <span class="md-error" v-if="!$v.newPackage.customAmount.required">Set Your Custom Amount</span>
                            </md-field>
                        </div>
                        <div class="mt-2" v-if="newPackage.pricingType=='3'">
                            <md-field :class="getValidationClass('discountPercentage')">
                                <label>Discount in Percentage</label>
                                <md-input v-model="newPackage.discountPercentage" type="number" required min="0"></md-input>
                                <span class="md-error" v-if="!$v.newPackage.discountPercentage.required">Set You Discount Percentage</span>
                            </md-field>
                        </div>
                    </md-list>
                </div>
            </div>
            <div class="md-layout-item p-1">
                <div class="">
                    <div class="mt-2">
                        <md-checkbox v-model="newPackage.enableOnlineBooking" :true-value="1" :false-value="2">Enable online booking</md-checkbox>
                        <br>
                        <span class="md-caption">Note: Enable to show this package in your shop</span>
                    </div>
                    <div class="mt-2">
                        <md-field :class="getValidationClass('category')">
                            <label for="categoryType" class="md-subheading">Category</label>
                            <md-select v-model="newPackage.category" name="categoryType" required id="categoryType" :md-selected="onCategorySelect()">
                                <md-option :value="item.id" v-for="item in getCategoryList" :key="item.name">{{item.name}}</md-option>
                            </md-select>
                            <span class="md-error" v-if="!$v.newPackage.name.required">Select a Category</span>
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
                                    <div v-if="newPackage.serviceId.length > 0">
                                        <md-list-item class="mt-1" v-for="(item,index) in newPackage.serviceId" :key="item">
                                            <div class="md-layout-item md-layout md-gutter selected-service">
                                                <div class="md-layout-item align-center">{{item.serviceName}}</div>
                                                <div class="md-layout-item md-toolbar-section-end">{{item.retailPrice}} AED</div>
                                                <div class="md-layout-item md-toolbar-section-end">
                                                    <md-button class="md-icon-button md-raised md-accent" @click="onRemoveService(item,index)">
                                                        <md-icon>close</md-icon>
                                                    </md-button>
                                                </div>
                                            </div>
                                        </md-list-item>
                                        <md-divider class="mt-2"></md-divider>
                                        <md-list-item class="mt-1 md-primary md-toolbar-section-end background-color-white" v-if="newPackage.serviceId.length > 0">
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
            </div>
        </div>

        <div class="align-end bring-front">
            <md-button @click="onCancelPackage">Cancel</md-button>
            <md-button @click="addNewPackage">Save</md-button>
        </div>

        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Select Service</md-dialog-title>
            <md-content class="md-scrollbar container">
                <md-list>
                    <md-list-item class="md-card mt-1" v-for="item in getServiceListData" :key="item.serviceName" @click="onSelectService(item)">
                        <div class="md-list-item-text">
                            <span class="md-subheading">{{item.serviceName}}</span>
                        </div>
                        <div class="md-list-item-text">
                            <span class="md-body-1">Category: {{item.categoryName}}</span>
                        </div>
                        <div class="md-list-item-text">
                            <span class="md-body-2">Duration: {{item.duration}}</span>
                        </div>
                        <div class="md-toolbar-section-end">
                            <span class="md-body-2">{{item.retailPrice}} AED</span>
                        </div>
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

import {
  required,
  minLength,
  requiredIf
} from 'vuelidate/lib/validators'
export default {
  name: 'addPackage',
  data () {
    return {
      showDialog: false,
      showAddNewPackage: false,
      showCustomPriceError: false,
      showDiscountError: false,
      newPackage: {
        category: '',
        name: '',
        description: '',
        categoryId: '',
        categoryName: '',
        enableOnlineBooking: 1,
        serviceId: [],
        bookingType: '',
        customAmount: '',
        discountPercentage: '',
        pricingType: '',
        outletId: 1,
        vendorId: 1,
        staffStatus: 1
      },
      selectedServiceList: []
    }
  },
  validations: {
    newPackage: {
      name: {
        required,
        minLength: minLength(3)
      },
      bookingType: {
        required
      },
      description: {
        required
      },
      pricingType: {
        required
      },
      category: {
        required
      },
      customAmount: {
        required: requiredIf(function () {
          return this.newPackage.pricingType === 2
        })
      },
      discountPercentage: {
        required: requiredIf(function () {
          return this.newPackage.pricingType === 3
        })
      },
      serviceId: {
        required
      }
    }
  },
  methods: {
    onSelectService: function (item) {
      this.newPackage.serviceId.push(item)
      this.showDialog = false
    },
    onRemoveService: function (item, index) {
      this.newPackage.serviceId.splice(index, 1)
    },
    getValidationClass (fieldName) {
      const field = this.$v.newPackage[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    addNewPackage: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveNewPackage()
      } else {
        this.$notify({
          type: 'error',
          title: 'Details Missings',
          text: 'Please check all the required fields and Services',
          duration: 5000
        })
      }
    },
    saveNewPackage: function () {
      const services = []
      this.newPackage.serviceId.forEach(element => {
        services.push(element.serviceId)
      })
      const requestdata = {
        categoryId: this.newPackage.categoryId,
        categoryName: this.newPackage.categoryName,
        description: this.newPackage.description,
        name: this.newPackage.name,
        enableOnlineBooking: this.newPackage.enableOnlineBooking,
        serviceId: services,
        bookingType: this.newPackage.bookingType,
        customAmount: this.newPackage.customAmount,
        discountPercentage: this.newPackage.discountPercentage,
        pricingType: this.newPackage.pricingType,
        outletId: this.getOutletID,
        vendorId: this.getVendorId
      }
      this.$store.dispatch('service/addPackage', requestdata)
        .then(response => {
          this.$notify(response.message)
          this.$router.go(-1)
        })
    },
    onCancelPackage: function () {
      this.$router.go(-1)
    },
    onCategorySelect: function () {
      // // console.log('onCategorySelect')
      const array = this.getCategoryList
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        if (element.id === this.newPackage.category) {
          this.newPackage.categoryId = element.id
          this.newPackage.categoryName = element.name
        }
      }
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Add Package')
    this.$store.dispatch('service/getServiceList', this.getOutletID)
    this.$store.dispatch('service/getCategoryList', this.getOutletID)
  },
  computed: {
    getServiceListData: function () {
      return this.$store.getters['service/serviceList']
    },
    totalServiceCost: function () {
      let amount = 0
      this.newPackage.serviceId.forEach(element => {
        amount = (amount + parseInt(element.retailPrice))
      })
      return amount
    },
    getCategoryList: function () {
      return this.$store.getters['service/categoryList']
    },
    getOutletID: function () {
      return this.$store.getters.getOutletId
    },
    getVendorId: function () {
      return JSON.parse(this.$store.getters['login/userDetails']).vendorId
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
