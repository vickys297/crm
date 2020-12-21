<template>
    <div class="fill-view">
        <md-tabs class="fill-view">
            <md-tab id="tab-pages-1" md-label="Working Hours">
                <StaffWorkingTab></StaffWorkingTab>
            </md-tab>
            <md-tab id="tab-pages-2" md-label="Staff Profile">
                <StaffTab></StaffTab>
            </md-tab>
        </md-tabs>
    </div>
</template>

<script>
import StaffWorkingTab from '../components/staff/StaffWorkingTab'
import StaffTab from '../components/staff/StaffProfileTab'
export default {
  name: 'Staff',
  components: {
    StaffWorkingTab,
    StaffTab
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Staff')
    this.$store.dispatch('setLoading', 'true')
  }
}
</script>

<style lang="scss" scoped>
.md-tabs {
    width: '100%';
    height: '100%';
    padding: "100px";
}

#tab-pages-2 {
    background-color: white;
}

#tab-pages-1 {
    background-color: white;
}

.md-tabs-navigation {
    border-bottom: 1px solid #111;
}

.md-tab-content{
    height: 100vh;
}
</style>>
