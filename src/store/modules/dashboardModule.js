import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  dashboardData: '',
  status: ''
}
const actions = {
  getDashboardData ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/dashboard',
        data: {
          outletId: requestData
        },
        method: 'POST'
      })
        .then(response => {
          commit('setDashboardData', response)
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
  getDashboardData: state => state.dashboardData
}
const mutations = {
  setDashboardData (state, responseData) {
    state.dashboardData = responseData
  },
  auth_error (state) {
    state.status = 'error'
  },
  auth_request (state) {
    state.status = 'loading'
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
