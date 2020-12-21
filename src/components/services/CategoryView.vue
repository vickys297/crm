<template>
  <div class="loading" v-if="showLoading">
    <hollow-dots-spinner :animation-duration="1500" :size="60" :color="'#111'" />
  </div>
  <div v-else>
    <div class="align-center">
      <span class="md-headline w-100">Category</span>
      <div class="align-item-right">
        <md-button @click="showNewCategory = true">Add Category</md-button>
      </div>
    </div>

    <!-- Add new category Dialog -->
    <md-dialog :md-active.sync="showNewCategory" class="p-2">
      <md-content class="md-match-parent">
        <md-dialog-title>Add Category</md-dialog-title>
        <div class="wt-100 mt-2">
          <span class="md-subheading">Wash Type</span>
          <md-field class="wt-100">
            <md-select v-model="addCategoryData.mainCategoryId" name="wash-type" id="wash-type">
              <md-option :value="1">Wash & Fold</md-option>
              <md-option :value="2">Pressing Only</md-option>
              <md-option :value="3">Washing D/C</md-option>
            </md-select>
          </md-field>
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
        <md-button class="md-primary" @click="showNewCategory = false">Close</md-button>
        <md-button class="md-primary" @click="addCategory">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- Add new category Dialog -->

    <!-- Edit category Dialog -->
    <md-dialog :md-active.sync="showEditCategory" class="p-2">
      <md-content class="md-match-parent">
        <md-dialog-title>Edit Category</md-dialog-title>
        <md-field class="wt-100 mt-2">
          <label for="wash-type">Wash Type</label>
          <md-select v-model="updateCategoryData.mainCategoryId" name="wash-type" id="wash-type">
            <md-option value="1">Wash & Fold</md-option>
            <md-option value="2">Pressing Only</md-option>
            <md-option value="3">Washing D/C</md-option>
          </md-select>
        </md-field>
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
        <md-button class="md-primary" @click="showEditCategory = false">Close</md-button>
        <md-button class="md-primary" @click="updateCategory">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- Edit category Dialog -->

    <!-- Category List -->
    <md-list class="md-triple-line">
      <div v-for="(item, name) in this.getGroupService" :key="item">
        <div class="md-headline mt-2">{{ name }}</div>
        <div v-for="service in item" :key="service.id">
          <md-list-item @click="onSelectCategory(service)">
            <div class="md-list-item-text">
              <span class="md-title">{{ service.name }}</span>
              <span class="md-caption">{{ service.description }}</span>
              <div class="md-warp-content mt-1">
                <md-content class="md-primary p-05">{{ service.services.length }} services</md-content>
              </div>
            </div>
            <div class="align-center md-warp-content float-right p-1">
              <md-button class="md-icon-button md-primary" @click="editCategoryDialog(service)">
                <md-tooltip md-direction="bottom">Edit</md-tooltip>
                <md-icon>edit</md-icon>
              </md-button>
              <md-button
                class="md-icon-button md-primary"
                @click="deleteCategory(service.id, service.name)"
              >
                <md-tooltip md-direction="bottom">Delete</md-tooltip>
                <md-icon>delete</md-icon>
              </md-button>
              <md-button class="md-icon-button md-primary">
                <md-tooltip md-direction="bottom">View</md-tooltip>
                <md-icon>keyboard_arrow_right</md-icon>
              </md-button>
            </div>
          </md-list-item>
        </div>
        <md-divider></md-divider>
      </div>
    </md-list>
    <!-- Category List -->

    <md-dialog-confirm
      :md-active.sync="showDeleteConfirmation"
      md-title="Confirm Delete"
      :md-content="
        'Are you sure do you want to delete <strong>' +
          deleteCategoryName +
          '</strong> category'
      "
      md-confirm-text="Delete"
      md-cancel-text="Cancel"
      @md-cancel="showDeleteConfirmation = false"
      @md-confirm="confirmDeleteCategory"
    />
    <!-- Comfirmation Dialog -->
  </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
import ColorCode from '../color/ColorView.vue'
export default {
  name: 'category',
  components: {
    ColorCode,
    HollowDotsSpinner
  },
  data () {
    return {
      showLoading: false,
      showDeleteConfirmation: false,
      showNewCategory: false,
      showEditCategory: false,
      selectedCategory: '',
      deleteCategoryName: '',
      deleteCategoryId: '',
      colorSelected: '1',
      colorCodeData: '',
      addCategoryData: {
        mainCategoryId: 1,
        categoryName: '',
        description: '',
        colorCodeId: '1'
      },
      updateCategoryData: {
        mainCategoryId: '',
        categoryId: '',
        categoryName: '',
        description: '',
        colorCodeId: ''
      }
    }
  },
  methods: {
    onSelectCategory: function (item) {
      this.$emit('onSelectCategory', item.services)
    },
    onColorSelected: function (color) {
      this.colorSelected = color
      this.addCategoryData.colorCodeId = color
      this.updateCategoryData.colorCodeId = color
    },
    getCategory: function () {
      this.showLoading = true
      this.$store
        .dispatch('service/category', this.getOutletId)
        .then((response) => {
          this.showLoading = false
        })
    },
    alertEdit: function () {
      alert('Edit Alert')
    },
    alertDelete: function () {
      alert('Delete Alert')
    },
    editCategoryDialog: function (item) {
      this.updateCategoryData.categoryId = item.id
      this.updateCategoryData.categoryName = item.name
      this.updateCategoryData.description = item.description
      this.updateCategoryData.colorCodeId = item.colorCodeId
      this.updateCategoryData.mainCategoryId = item.mainCategoryId
      this.showEditCategory = true
    },
    updateCategory: function () {
      this.showEditCategory = false
      this.$store
        .dispatch('service/updateCategory', this.updateCategoryData)
        .then((response) => {
          this.$notify(response.data.message)
          this.getCategory()
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
            mainCategoryId: this.addCategoryData.mainCategoryId,
            outletId: this.getOutletId
          })
          .then((response) => {
            this.$notify(response.data.message)
            this.getCategory()
            this.ClearData()
          })
      }
    },
    deleteCategory: function (itemId, itemName) {
      this.deleteCategoryName = itemName
      this.deleteCategoryId = itemId
      this.showDeleteConfirmation = true
    },
    confirmDeleteCategory: function () {
      this.showNewCategory = false
      this.$store
        .dispatch('service/deleteCategory', this.deleteCategoryId)
        .then((response) => {
          this.$notify(response.data.message)
          this.getCategory()
        })
    },
    clearData: function () {
      this.selectedCategory = ''
      this.deleteCategoryName = ''
      this.deleteCategoryId = ''
      this.colorSelected = '1'
      this.colorCodeData = ''
      this.categoryName = ''
      this.description = ''
      this.colorCodeId = '1'
    }
  },
  created: function () {
    this.getCategory()
  },
  mounted: function (event) {
    this.$root.$on('oidFilter', (data) => {
      this.onSelectCategory('')
      this.getCategory()
    })
  },
  computed: {
    getCategoryItem: function () {
      return this.$store.getters['service/getCategoryItem']
    },
    getColorCode: function () {
      return JSON.parse(this.$store.getters.getColorCode)
    },
    getOutletId: function () {
      return this.$store.getters.getOutletId
    },
    getGroupService: function () {
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
.align-center {
  display: flex;
  align-content: center;
}

.md-list-item:hover {
  background-color: white;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 2px; // transition-delay: 0.2s;
  // animation-timing-function: ;
  transition: 0.3s;
  transform-style: flat;
}

.md-list-item {
  transition: 0.3s;
  transform-style: flat;
}
</style>
