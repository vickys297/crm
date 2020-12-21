import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  status: '',
  addNewOutletResponse: '',
  viewOutletResponse: '',
  updateServiceItemOrderLimitResponse: ''
}
const actions = {
  addNewOutlet ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/outlet',
        data: requestData,
        method: 'POST'
      })
        .then(response => {
          commit('addNewoutlet_success', response)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  updateServiceItemOrderLimit ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/update/order/configuration',
        data: requestData,
        method: 'POST'
      })
        .then(response => {
          commit('set_updateServiceItemOrderLimit', response)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  viewOutlet ({ commit }, outletData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/outlet/' + outletData,
        method: 'GET'
      })
        .then(response => {
          commit('addOutlet_success', response)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  }
}
const getters = {
  getAddNewOutletResponse: state => state.addNewOutletResponse,
  getViewOutletResponse: state => state.getViewOutletResponse,
  getUpdateServiceItemOrderLimitResponse: state => state.updateServiceItemOrderLimitResponse
}
const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  addNewoutlet_success (state, response) {
    state.status = 'success'
    state.addNewOutletResponse = response
  },
  addOutlet_success (state, response) {
    state.status = 'success'
    state.viewOutletResponse = response
  },
  set_updateServiceItemOrderLimit (state, response) {
    state.status = 'success'
    state.viewOutletResponse = response
  },
  auth_error (state) {
    state.status = 'error'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
