<template>
    <div class="page-container mb-5">
        <md-tabs>
            <md-tab id="tab-pages-1" md-label="Orders">
                <Appointments></Appointments>
            </md-tab>
            <md-tab id="tab-pages-2" md-label="Invoice">
                <Invoice></Invoice>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
import Appointments from '@/components/appointment/Appointments.vue'
import Invoice from '../components/Invoice/Invoice'
export default {
  name: 'sales',
  components: {
    Appointments,
    Invoice
  },
  data () {
    return {
      showSidepanel: false
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Sales')
  }
}
</script>

<style lang="scss" scoped>

</style>
