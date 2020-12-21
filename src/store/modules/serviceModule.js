import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { CategoryModel } from '../../models/CategoryModel'

Vue.use(Vuex)

const state = {
  status: '',
  category: '',
  updateCategoryResponseData: '',
  addCategoryData: '',
  deleteCategoryData: '',
  categoryList: '',
  serviceList: '',
  staffList: '',
  addNewService: '',
  addPackageResponseData: '',
  packageList: '',
  packageItem: '',
  updatePackage: '',
  deletePackage: '',
  serviceItemResponse: ''
}
const mutations = {
  setCategory (state, category) {
    state.category = category
  },
  api_request (state) {
    state.status = 'loading'
  },
  request_error (state) {
    state.status = 'error'
  },
  request_success (state, responseData) {
    state.status = 'success'
    state.updateCategoryResponseData = responseData
  },
  add_Category (state, responseData) {
    state.status = 'success'
    state.addCategoryData = responseData
  },
  delete_category (state, response) {
    state.status = 'success'
    state.deleteCategoryData = response
  },
  setCategoryList (state, resposne) {
    state.status = 'success'
    state.categoryList = resposne.data
  },
  setServiceList (state, resposne) {
    state.status = 'success'
    state.serviceList = resposne
  },
  setStaffList (state, resposne) {
    state.status = 'success'
    state.staffList = resposne.data
  },
  addNewService (state, response) {
    state.status = 'success'
    state.addNewService = response
  },
  addPackageResponse (state, response) {
    state.status = 'success'
    state.addPackageResponseData = response
  },
  addPackageList (state, response) {
    state.status = 'status'
    state.packageList = response
  },
  addPackageItem (state, response) {
    state.status = 'status'
    state.packageItem = response
  },
  updatePackageResponse (state, response) {
    state.status = 'status'
    state.updatePackage = response
  },
  deletePackageResponse (state, response) {
    state.status = 'status'
    state.deletePackage = response
  },
  serviceItemResponse (state, response) {
    state.status = 'status'
    state.serviceItemResponse = response
  }
}
const actions = {
  category ({ commit }, outletID) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'GET',
        url: 'http://laundry.brozapp.com/api/categoryWithServices',
        params: {
          outletID: outletID
        }
      })
        .then(category => {
          commit('setCategory', category.data.responseData)
          resolve(category)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getCategoryList ({ commit }, outletId) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios
        .get('http://laundry.brozapp.com/api/category/list?outletID=' + outletId)
        .then(resposne => {
          commit('setCategoryList', resposne.data)
          resolve(resposne)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getStaffList ({ commit }, outletId) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'GET',
        url: 'http://laundry.brozapp.com/api/staff/list',
        params: {
          outletID: outletId
        }
      })
        .then(resposne => {
          commit('setStaffList', resposne.data)
          resolve(resposne)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateCategory ({ commit }, updateData) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'PUT',
        url: 'http://laundry.brozapp.com/api/category',
        params: {
          id: updateData.categoryId
        },
        data: {
          categoryName: updateData.categoryName,
          description: updateData.description,
          colorCodeId: updateData.colorCodeId,
          mainCategoryId: updateData.mainCategoryId
        }
      })
        .then(response => {
          const responseData = response.data
          if (responseData.httpCode === 200) {
            commit('request_success', responseData.data)
            resolve(response)
          } else {
            commit('request_error')
            resolve(response)
          }
        })
        .catch(error => {
          commit('request_error')
          reject(error)
        })
    })
  },
  addCategory ({ commit }, addData) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'POST',
        url: 'http://laundry.brozapp.com/api/category',
        data: {
          categoryName: addData.categoryName,
          description: addData.description,
          colorCodeId: addData.colorCodeId,
          outletId: addData.outletId,
          mainCategoryId: addData.mainCategoryId
        }
      })
        .then(function (response) {
          const responseData = response.data
          if (responseData.httpCode === 200) {
            commit('add_Category', responseData.data)
            resolve(response)
          } else {
            commit('request_error')
            resolve(response)
          }
        })
        .catch(error => {
          commit('request_error')
          reject(error)
        })
    })
  },
  deleteCategory ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'DELETE',
        url: 'http://laundry.brozapp.com/api/category',
        params: {
          id: itemId
        }
      })
        .then(response => {
          commit('delete_category', response.data)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  saveNewService ({ commit }, newData) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'POST',
        url: 'http://laundry.brozapp.com/api/services',
        data: newData
      })
        .then(response => {
          commit('addNewService', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getServiceList ({ commit }, outletId) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'GET',
        url: 'http://laundry.brozapp.com/api/services/list',
        params: {
          outletID: outletId
        }
      })
        .then(response => {
          commit('setServiceList', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getServiceItemDetails ({ commit }, itemId) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'GET',
        url: 'http://laundry.brozapp.com/api/services',
        params: {
          id: itemId
        }
      })
        .then(response => {
          commit('serviceItemResponse', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updateServiceItem ({ commit }, { data, id }) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'PUT',
        url: 'http://laundry.brozapp.com/api/services',
        params: {
          id: id
        },
        data: data
      })
        .then(response => {
          commit('serviceItemResponse', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deleteService ({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'DELETE',
        url: 'http://laundry.brozapp.com/api/services',
        params: {
          id: id
        }
      })
        .then(response => {
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  // Package Block
  addPackage ({ commit }, newPackage) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'POST',
        url: 'http://laundry.brozapp.com/api/packages',
        data: newPackage
      })
        .then(response => response.data)
        .then(response => {
          commit('addPackageResponse', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  updatePackage ({ commit }, newPackage) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'PUT',
        url: 'http://laundry.brozapp.com/api/packages',
        params: {
          id: newPackage.id
        },
        data: newPackage
      })
        .then(response => response.data)
        .then(response => {
          commit('updatePackageResponse', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  deletePackage ({ commit }, packageId) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'DELETE',
        url: 'http://laundry.brozapp.com/api/packages',
        params: {
          id: packageId
        }
      })
        .then(response => response.data)
        .then(response => {
          commit('deletePackageResponse', response)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getPackageList ({ commit }, outletId) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'GET',
        url: 'http://laundry.brozapp.com/api/packages',
        params: {
          outletID: outletId
        }
      })
        .then(response => response.data)
        .then(response => {
          commit('addPackageList', response.responseData)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  getPackageItem ({ commit }, packageId) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        method: 'GET',
        url: 'http://laundry.brozapp.com/api/package',
        params: {
          id: packageId
        }
      })
        .then(response => response.data)
        .then(response => {
          commit('addPackageItem', response.responseData)
          resolve(response)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  // Package Block
}
const getters = {
  getCategoryItem: state => state.category,
  updateCategory: state => state.updateCategoryResponseData,
  addCategory: state => state.addCategoryData,
  categoryList: state => state.categoryList,
  serviceList: state => state.serviceList,
  getStaffList: state => state.staffList,
  addNewService: state => state.addNewService,
  getAddPackageResponse: state => state.addPackageResponseData,
  getPackageList: state => state.packageList,
  getPackageItem: state => state.packageItem,
  getUpdatePackageResponse: state => state.updatePackage,
  deletePackageResponse: state => state.deletePackage,
  getServiceItem: state => state.serviceItemResponse
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
