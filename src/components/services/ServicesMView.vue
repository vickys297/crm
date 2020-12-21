<template>
  <div class="loading" v-if="showLoading">
    <hollow-dots-spinner
      :animation-duration="1500"
      :size="60"
      :color="'#111'"
    />
  </div>
  <div v-else>
    <div class="md-toolbar-section-end">
      <md-button @click="showNewCategory = true" class="md-raised md-primary"
        >Add Category</md-button
      >
    </div>

    <!-- Add Category -->
    <md-dialog :md-active.sync="showNewCategory" class="p-2">
      <md-content class="md-match-parent">
        <md-dialog-title>Add Category</md-dialog-title>
        <div class="wt-100 mt-2">
          <span class="md-subheading">Category Name</span>
          <md-field class="w-100">
            <md-input v-model="addCategoryData.categoryName"></md-input>
          </md-field>
          <span class="md-subheading">Description</span>
          <md-field class="w-100">
            <md-input v-model="addCategoryData.description"></md-input>
          </md-field>
        </div>
        <div class="wt-100">
          <span class="md-subheading">Select Color</span>
          <ColorCode
            :colorCodeData="getColorCode"
            :selectedColorCode="addCategoryData.colorCodeId"
            class="mt-1"
            @colorSelected="onColorSelected"
          ></ColorCode>
        </div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showNewCategory = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="addCategory">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- Add Category -->

    <!-- Edit category -->
    <md-dialog :md-active.sync="showEditCategory" class="p-2">
      <md-content class="md-match-parent">
        <md-dialog-title>Edit Category</md-dialog-title>
        <div class="wt-100 mt-2">
          <md-field class="w-100">
            <label>Category Name</label>
            <md-input v-model="updateCategoryData.categoryName"></md-input>
          </md-field>
          <md-field class="w-100">
            <label>Description</label>
            <md-input v-model="updateCategoryData.description"></md-input>
          </md-field>
        </div>
        <div class="wt-100">
          <span class="md-subheading">Select Color</span>
          <ColorCode
            :colorCodeData="getColorCode"
            :selectedColorCode="updateCategoryData.colorCodeId"
            class="mt-1"
            @colorSelected="onColorSelected"
          ></ColorCode>
        </div>
      </md-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showEditCategory = false"
          >Close</md-button
        >
        <md-button class="md-primary" @click="updateCategory">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- Edit category -->

    <div class="list container">
      <div
        v-for="(item, name) in this.getGroupedService"
        :key="name"
        class="mb-2"
      >
        <span class="md-title">{{ name }}</span>
        <md-list :md-expand-single="expandSingle" class="mt-1">
          <md-list-item
            md-expand
            v-for="item in item"
            :key="item.id"
            class="package mb-1"
          >
            <md-avatar>
              <img src="https://source.unsplash.com/random" alt="Avatar" />
            </md-avatar>
            <span class="md-list-item-text">{{ item.name }}</span>
            <md-button
              class="md-icon-button md-accent"
              @click="deleteCategory(item.id, item.name)"
            >
              <md-icon>delete</md-icon>
            </md-button>
            <md-button
              class="md-icon-button md-primary"
              @click="editCategory(item)"
            >
              <md-icon>edit</md-icon>
            </md-button>
            <md-list slot="md-expand">
              <md-list-item
                class="md-inset selected-service mt-1 md-layout"
                v-for="service in item.services"
                :key="service.id"
                @click="openItemView(service.id)"
              >
                <span class="md-layout-item md-section-start">{{
                  service.name
                }}</span>
                <span class="md-layout-item md-toolbar-section-start md-body-1">{{
                  service.description
                }}</span>
                <span class="md-layout-item md-toolbar-section-end md-body-1"
                  >{{ service.price }} AED</span
                >
              </md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
        <md-divider></md-divider>
      </div>
    </div>

    <md-dialog-confirm
      :md-active.sync="showDeleteConfirmation"
      md-title="Confirm Delete"
      :md-content="
        'Are you sure do you want to delete <strong>' +
          deleteCategoryData.categoryName +
          '</strong> Package'
      "
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="showDeleteConfirmation = false"
      @md-confirm="confirmDeleteCategory"
    />
  </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
import ColorCode from '../color/ColorView.vue'
export default {
  components: {
    HollowDotsSpinner,
    ColorCode
  },
  name: 'ServiceMobileView',
  data () {
    return {
      showLoading: false,
      showNewCategory: false,
      showEditCategory: false,
      showDeleteConfirmation: false,
      expandSingle: true,
      colorSelected: '1',
      updateCategoryData: {
        categoryId: '',
        categoryName: '',
        description: '',
        colorCodeId: ''
      },
      addCategoryData: {
        categoryName: '',
        description: '',
        colorCodeId: '1'
      },
      deleteCategoryData: {
        categoryName: '',
        categoryId: ''
      }
    }
  },
  methods: {
    getCategory: function () {
      this.showLoading = true
      this.$store
        .dispatch('service/category', this.getOutletId)
        .then(response => {
          this.showLoading = false
        })
    },
    addCategory: function () {
      if (this.addCategoryData.categoryName === '') {
        this.$notify({
          type: 'error',
          title: 'Missing Details',
          text: 'Enter Category Name',
          duration: 5000
        })
      } else {
        this.showNewCategory = false
        this.$store
          .dispatch('service/addCategory', {
            categoryName: this.addCategoryData.categoryName,
            description: this.addCategoryData.description,
            colorCodeId: this.addCategoryData.colorCodeId,
            outletId: this.getOutletId
          })
          .then(response => {
            // // console.log('deleteCategory', response.data)
            this.$notify(response.data.message)
            this.getCategory()
            this.ClearData()
          })
      }
    },
    deleteCategory: function (id, name) {
      this.deleteCategoryData.categoryId = id
      this.deleteCategoryData.categoryName = name
      this.showDeleteConfirmation = true
    },
    editCategory: function (item) {
      this.updateCategoryData.categoryId = item.id
      this.updateCategoryData.categoryName = item.name
      this.updateCategoryData.description = item.description
      this.updateCategoryData.colorCodeId = item.colorCodeId
      this.showEditCategory = true
    },
    confirmDeleteCategory: function () {
      this.showNewCategory = false
      this.$store
        .dispatch('service/deleteCategory', this.deleteCategoryId)
        .then(response => {
          this.$notify(response.data.message)
          this.getCategory()
        })
    },
    updateCategory: function () {
      this.showEditCategory = false
      this.$store
        .dispatch('service/updateCategory', this.updateCategoryData)
        .then(response => {
          this.$notify(response.data.message)
          this.getCategory()
        })
    },
    onColorSelected: function (color) {
      this.colorSelected = color
    },
    openItemView: function (itemId) {
      this.$router.push({ name: 'editServicesItem', params: { id: itemId } })
    }
  },
  created: function () {
    this.getCategory()
  },
  computed: {
    getOutletId: function () {
      return this.$store.getters.getOutletId
    },
    getCategoryItem: function () {
      return this.$store.getters['service/getCategoryItem']
    },
    getColorCode: function () {
      return JSON.parse(this.$store.getters.getColorCode)
    },
    getGroupedService: function () {
      return this.getCategoryItem.reduce(function (element, index) {
        (element[index.mainCategoryName] =
          element[index.mainCategoryName] || []).push(index)
        return element
      }, {})
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
