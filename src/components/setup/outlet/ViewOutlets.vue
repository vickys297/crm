<template>
    <div>
        <!-- <md-empty-state v-if="getOutlets == ''" d-icon="devices_other" md-label="Create your first project" md-description="Creating project, you'll be able to upload your design and collaborate with people.">
            <md-button class="md-primary md-raised">Create first project</md-button>
        </md-empty-state> -->
        <div class="container mt-3">
            <md-list class="md-triple-line">
                <span class="md-display-1">{{this.getOutletName.name}}</span>
                <span class="md-caption">Manage all your oulet locations</span>
            </md-list>
            <md-list class="md-triple-line">
                <div v-for="item in getOutlets" :key="item.id">
                    <md-list-item @click="viewOutlet(item.id)">
                        <md-avatar>
                            <img src="https://source.unsplash.com/random" alt="People">
                        </md-avatar>

                        <div class="md-list-item-text">
                            <span alt="outlet-name" class="md-title">{{item.name}}</span>
                            <span class="md-caption">Phone: {{item.phone}} | Email: {{item.email}}</span>
                            <span>Address: {{item.address}}</span>
                        </div>
                        <span><md-icon class="md-primary">star</md-icon> 4.0 Ratings</span>
                    </md-list-item>
                    <md-divider class="md-inset"></md-divider>
                </div>
            </md-list>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ViewOutlets',
  created: function () {
    this.$store.dispatch('setTitle', 'View Outlets')
  },
  computed: {
    getOutlets: function () {
      // console.log('getOutlets', JSON.parse(this.$store.getters.getOutlets))
      return JSON.parse(this.$store.getters.getOutlets)
    },
    getOutletName: function () {
      return JSON.parse(this.$store.getters['login/userDetails'])
    }
  },
  methods: {
    viewOutlet: function (outletId) {
      this.$router.push({ name: 'viewOutlet', params: { id: outletId } })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
