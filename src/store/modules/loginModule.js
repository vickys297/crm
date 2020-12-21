import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import store from '@/store'

Vue.use(Vuex)

const state = {
  status: '',
  token: localStorage.getItem('token') || '',
  user: localStorage.getItem('user') || '',
  loginType: localStorage.getItem('type') || '',
  vendorDetails: ''
}
const getters = {
  isLoggedIn: state => !!state.token || '',
  authStatus: state => state.status,
  userDetails: state => state.user,
  getVendorId: state => state.user.vendorId,
  getColorCode: state => state.colorCode,
  getTimeSlot: state => state.timeSlot,
  getDefaultOutletId: state => state.outlets[0].id,
  loginType: state => state.loginType,
  getVendorDetails: state => state.vendorDetails
}
const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  auth_success (state, token, user, type) {
    state.status = 'success'
    state.token = token
    state.user = user
  },
  auth_error (state) {
    state.status = 'error'
  },
  setVendorDetails (state, responseData) {
    state.status = 'success'
    state.vendorDetails = responseData
  },
  logout (state) {
    state.status = ''
    state.token = ''
  }
}
const actions = {
  login ({ commit }, user) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/login',
        data: user,
        method: 'POST'
      })
        .then(response => {
          resolve(response)
          if (response.data.status === 1) {
            const token = response.data.token
            const user = JSON.stringify(response.data.userInfo)
            const colorCode = JSON.stringify(response.data.colorCode)
            const timeSlot = JSON.stringify(response.data.timeList)
            const type = JSON.stringify(response.data.userInfo.type)
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
            localStorage.setItem('colorCodeCache', colorCode)
            localStorage.setItem('timeSlotCache', timeSlot)
            localStorage.setItem('navVisiblity', true)
            localStorage.setItem('type', response.data.userInfo.type)
            if (response.data.userInfo.type === 1) {
              const outlets = JSON.stringify(response.data.outlets)
              localStorage.setItem('outlets', outlets)
              store.dispatch('setOutletList', outlets)
              store.dispatch('setOutletId', response.data.outlets[0].id)
            } else {
              store.dispatch('setOutletId', response.data.userInfo.outletId)
            }
            axios.defaults.headers.common['api-token'] = token
            store.dispatch('setTimeSlot', timeSlot)
            store.dispatch('setColorCode', colorCode)
            store.dispatch('setOutletName', response.data.userInfo.name)
            localStorage.setItem('outletName', response.data.userInfo.name)
            commit('auth_success', token, user, type)
          }
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('logout')
      localStorage.clear()
      delete axios.defaults.headers.common.Authorization
      resolve()
    })
  },
  vendor ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/vendor/' + requestData,
        method: 'GET'
      })
        .then(response => {
          commit('setVendorDetails', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
