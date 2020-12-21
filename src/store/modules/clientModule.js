import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  status: '',
  clientList: '',
  clientData: '',
  addNewAppointmentData: '',
  addClientResponseData: '',
  searchClientResponse: '',
  updateAppointmentData: ''
}
const getters = {
  clientList: state => state.clientList.responseData,
  clientListSize: state => state.clientList.totalCount,
  clientData: state => state.clientData,
  getAppointmentResponse: state => state.addNewAppointmentData,
  getUpdateAppointmentResponse: state => state.updateAppointmentData,
  getAddClientResponseMessage: state => state.addClientResponseData.message,
  getSearchClient: state => state.searchClientResponse
}
const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  setClientList (state, response, user) {
    state.status = 'success'
    state.clientList = response
  },
  setClientDetails (state, response) {
    state.status = 'success'
    state.clientData = response
  },
  setAppointmentResponse (state, response) {
    state.status = 'success'
    state.addNewAppointmentData = response
  },
  setUpdateAppointmentResponse (state, response) {
    state.status = 'success'
    state.updateAppointmentData = response
  },
  setClientSearch (state, response) {
    state.status = 'success'
    state.searchClientResponse = response
  },
  auth_error (state) {
    state.status = 'error'
  },
  setAddClient (state, addClientResponseData) {
    state.status = 'success'
    state.addClientResponseData = addClientResponseData
  },
  logout (state) {
    state.status = ''
    state.token = ''
  },
  clearSearchClient (state) {
    state.searchClientResponse = ''
  }
}
const actions = {
  clientList ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url:
          'http://laundry.brozapp.com/api/client/list/' + requestData.outletId,
        params: {
          pageSize: requestData.pageSize,
          pageNumber: requestData.pageNumber
        },
        method: 'GET'
      })
        .then(response => {
          commit('setClientList', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  clientDetails ({ commit }, clientId) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/client/' + clientId,
        method: 'GET'
      })
        .then(response => {
          commit('setClientDetails', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  addNewAppointment ({ commit }, addAppointmentData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/createAppointment',
        method: 'POST',
        data: addAppointmentData
      })
        .then(response => {
          commit('setAppointmentResponse', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  updateAppointment ({ commit }, addAppointmentData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/appointment',
        method: 'PUT',
        data: addAppointmentData
      })
        .then(response => {
          commit('setUpdateAppointmentResponse', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  addClient ({ commit }, clientData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/client',
        method: 'POST',
        data: clientData
      })
        .then(response => {
          commit('setAddClient', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  searchClient ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/client/search',
        method: 'POST',
        data: {
          outletId: requestData.outletId,
          name: requestData.client
        }
      })
        .then(response => {
          commit('setClientSearch', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  clearClientSearch ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('clearSearchClient')
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
