<template>
    <div>
        <div class="align-center">
            <span class="md-headline w-100 p-1">{{servicesItem.name}} Services</span>
        </div>
        <md-divider></md-divider>
        <md-list class="md-triple-line">
            <div v-for="item in servicesItem" :key="item.name">
                <md-list-item @click="openItemView(item.id)">
                    <md-avatar class="md-large md-avatar-icon  md-primary">
                        <!-- <img src="https://placeimg.com/40/40/people/1" alt="People"> -->
                        {{item.name.toUpperCase()[0]}}
                    </md-avatar>
                    <div class="md-list-item-text">
                        <span class="md-title">{{item.name}}</span>
                        <span class="md-subheading mt-1">{{item.categoryName}}</span>
                        <span class="md-caption mt-1">{{item.description}}</span>
                    </div>
                    <span class="md-title"><medium>{{item.price}} AED</medium></span>
                </md-list-item>
                <md-divider></md-divider>
            </div>
        </md-list>
    </div>
</template>

<script>
export default {
  props: {
    servicesItem: Object
  },
  data () {
    return {
      selectedCategory: 0,
      radio: false,
      array: [],
      data: this.servicesItem
    }
  },
  methods: {
    loadData: function () {
      this.data = this.servicesItem
    },
    openItemView: function (itemId) {
      this.$router.push({ name: 'editServicesItem', params: { id: itemId } })
    }
  },
  created: function () {
    this.loadData()
    this.getCategoryList()
    this.getStaffList()
    this.getTaxList()
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.md-list-item:hover {
    background-color: white;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 2px; // transition-delay: 0.2s;
    transition: 0.3s;
    transform-style: flat;
}
</style>
