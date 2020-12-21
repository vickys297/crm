<template>
  <div>
    <div class="container">
      <h1>Configuration</h1>
      <md-divider></md-divider>
      <div class="mt-3">
        <div class="md-title">Service Item Limit (Per Order)</div>
        <div class="md-caption">
          Set service item limit this will take affect while adding service item
          to appointment.
        </div>

        <!-- Service Item Limit -->
        <div class="flex-container align-center mt-2">
          <md-field class="w-25" :class="getOrderItemErrorClass">
            <label>Item Limit</label>
            <md-input
              v-model="orderItemLimit"
              type="number"
              max="10"
              min="1"
            ></md-input>
            <span class="md-error"
              >Enter valid limit minimum 1 item to maximum 10 items only
              applicable</span
            >
          </md-field>
        </div>
      </div>
      <div class="mt-3">
        <div class="md-title">Appointment Limit (Per Day)</div>
        <div class="md-caption">
          Set Appointment limit per day this will take affect while creating new
          appointment.
        </div>
        <!-- Service Item Limit -->
        <!-- Order Limit -->
        <div class="flex-container align-center mt-2">
          <md-field class="w-25" :class="getOrderErrorClass">
            <label>Order Limit</label>
            <md-input v-model="orderLimit" type="number" min="1"></md-input>
            <span class="md-error"
              >Enter valid limit minimum 1 order per day is required</span
            >
          </md-field>
        </div>
        <!-- Order Limit -->
      </div>
    </div>

    <div class="align-end">
      <md-button class="md-raised md-primary" @click="goBack">Cancel</md-button>
      <md-button @click="updateCount()">Update</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Configuration',
  data () {
    return {
      orderLimit: 1,
      orderItemLimit: 1,
      outletId: 1
    }
  },
  created: function () {
    this.orderItemLimit = localStorage.getItem('oilc')
    this.orderLimit = localStorage.getItem('olc')
  },
  methods: {
    updateCount: function () {
      if (
        !this.orderItemLimit >= 1 &&
        !this.orderItemLimit <= 10 &&
        !this.orderLimit >= 1 &&
        this.orderLimit === this.getOrderLimitCount &&
        this.orderItemLimit === this.getOrderItemLimitCount
      ) {
        this.$notify({
          title: 'Validation Error',
          text: 'Please validate the input',
          type: 'error'
        })
        return
      }
      if (
        this.orderLimit !== this.getOrderLimitCount ||
        this.orderItemLimit !== this.getOrderItemLimitCount
      ) {
        // this.$store.dispatch('updateCount', this.orderItemLimit)

        const requestData = {
          orderLimit: this.orderLimit,
          orderItemLimit: this.orderItemLimit,
          outletId: this.getOutletId
        }
        this.$store
          .dispatch('setup/updateServiceItemOrderLimit', requestData)
          .then(response => {
            this.$notify(response.data.message)
            this.$store.dispatch(
              'updateOrderLimit',
              this.orderLimit
            )
            this.$store.dispatch(
              'updateOrderItemLimit',
              this.orderItemLimit
            )
            this.goBack()
          })
      } else {
        this.$notify({
          title: 'No Change Found',
          type: 'error'
        })
      }
    },
    goBack: function () {
      this.$router.go(-1)
    }
  },
  computed: {
    getOrderItemErrorClass: function () {
      if (this.orderItemLimit > 0 && this.orderItemLimit <= 10) {
        return ''
      } else {
        return 'md-invalid'
      }
    },
    getOrderErrorClass: function () {
      if (this.orderLimit > 0) {
        return ''
      } else {
        return 'md-invalid'
      }
    },
    getOrderLimitCount: function () {
      return parseInt(this.$store.getters.getOrderLimitCount)
    },
    getOrderItemLimitCount: function () {
      return parseInt(this.$store.getters.getOrderItemLimitCount)
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    }
  }
}
</script>

<style lang="scss" scoped></style>
