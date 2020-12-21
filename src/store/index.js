import Vue from 'vue'
import Vuex from 'vuex'
// import api from "@/utils/backend-api"
import login from './modules/loginModule'
import service from './modules/serviceModule'
import staff from './modules/staffModule'
import client from './modules/clientModule'
import sales from './modules/salesModule'
import setup from './modules/setupModule'
import dashboard from './modules/dashboardModule'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    login,
    service,
    staff,
    client,
    sales,
    setup,
    dashboard
  },
  actions: {
    setTitle ({ commit }, title) {
      return new Promise((resolve, reject) => {
        commit('changeTitle', title)
        resolve()
      })
    },
    setOutletId ({ commit }, outletId) {
      return new Promise((resolve, reject) => {
        localStorage.setItem('OID', outletId)
        commit('setOID', outletId)
        resolve()
      })
    },
    loading ({ commit }, status) {
      return new Promise((resolve, reject) => {
        commit('setLoading', status)
        resolve()
      })
    },
    navVisibile ({ commit }, status) {
      return new Promise((resolve, reject) => {
        localStorage.setItem('navVisiblity', status)
        resolve()
      })
    },
    updateOrderLimit ({ commit }, orderLimit) {
      return new Promise((resolve, reject) => {
        localStorage.setItem('olc', orderLimit)
        resolve()
      })
    },
    updateOrderItemLimit ({ commit }, orderItemLimit) {
      return new Promise((resolve, reject) => {
        localStorage.setItem('oilc', orderItemLimit)
        resolve()
      })
    },
    setTimeSlot ({ commit }, value) {
      return new Promise((resolve, reject) => {
        commit('setTimeSlot', value)
        resolve()
      })
    },
    setColorCode ({ commit }, value) {
      return new Promise((resolve, reject) => {
        commit('setColorCode', value)
        resolve()
      })
    },
    setOutletName ({ commit }, name) {
      return new Promise((resolve, reject) => {
        commit('setOutletName', name)
        resolve()
      })
    },
    setOutletList ({ commit }, name) {
      return new Promise((resolve, reject) => {
        commit('setOutletList', name)
        resolve()
      })
    }
  },
  mutations: {
    changeTitle (state, title) {
      state.title = title
    },
    setLoading (state, status) {
      state.loading = status
    },
    setOID (state, outletId) {
      state.outletId = outletId
    },
    setTimeSlot (state, value) {
      state.timeSlot = value
    },
    setColorCode (state, value) {
      state.colorCode = value
    },
    setOrderLimit (value) {
      localStorage.setItem('olc', value)
    },
    setOrderItemLimit (value) {
      localStorage.setItem('oilc', value)
    },
    setOutletName (state, value) {
      state.outletName = value
    },
    setOutletList (state, value) {
      state.getOutlets = value
    }
  },
  state: {
    title: '',
    loading: false,
    navVisibile: localStorage.getItem('navVisiblity'),
    outletId: localStorage.getItem('OID') || '',
    orderItemLimitCount: localStorage.getItem('oilc') || 5,
    orderLimitCount: localStorage.getItem('olc') || 100,
    colorCode: localStorage.getItem('colorCodeCache') || '',
    timeSlot: localStorage.getItem('timeSlotCache') || '',
    outletName: localStorage.getItem('outletName') || '',
    outlets: localStorage.getItem('outlets') || []
  },
  getters: {
    getTitle: state => state.title,
    loadingStatus: state => state.loading,
    navVisibile: state => state.navVisibile,
    getOutletId: state => state.outletId,
    getTimeSlot: state => state.timeSlot,
    getColorCode: state => state.colorCode,
    getOrderItemLimitCount: state => state.orderItemLimitCount,
    getOrderLimitCount: state => state.orderLimitCount,
    getOutletName: state => state.outletName,
    getOutlets: state => state.outlets
  }
})
