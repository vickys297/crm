import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  status: '',
  appointments: '',
  invoices: '',
  invoiceDetails: '',
  appointmentsData: '',
  availableTimeSlot: '',
  appointmentPendingData: ''
}
const getters = {
  getAppointmentPendingData: state => state.appointmentPendingData,
  getAppointments: state => state.appointments.responseData,
  getAppointmentsSize: state => state.appointments.totalAppointment,
  invoices: state => state.invoices.responseData,
  invoiceSize: state => state.invoices.totalInvoice,
  getInvoiceDetails: state => state.invoiceDetails,
  appointmentsData: state => state.appointmentsData,
  getAvailableTimeSlot: state => state.availableTimeSlot
}
const mutations = {
  auth_request (state) {
    state.status = 'loading'
  },
  setAppointments (state, response) {
    state.status = 'success'
    state.appointments = response
  },
  setAvailableTimeSlot (state, response) {
    state.status = 'success'
    state.availableTimeSlot = response
  },
  setInvoices (state, response) {
    state.status = 'success'
    state.invoices = response
  },
  setInvoice (state, response) {
    state.status = 'success'
    state.invoiceDetails = response
  },
  appointmentsData (state, response) {
    state.status = 'success'
    state.appointmentsData = response
  },
  setAppointmentPending (state, response) {
    state.status = 'success'
    state.appointmentPendingData = response
  },
  auth_error (state) {
    state.status = 'error'
  },
  logout (state) {
    state.status = ''
    state.token = ''
  }
}
const actions = {
  appointments ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url:
          'http://laundry.brozapp.com/api/appointment/list/' +
          requestData.outletId,
        method: 'POST',
        data: {
          pageSize: requestData.pageSize,
          pageNumber: requestData.pageNumber
        }
      })
        .then(response => {
          commit('setAppointments', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  appointmentsSearch ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/custom/appointment/list',
        method: 'POST',
        data: {
          status: requestData.status,
          startDate: requestData.startDate,
          endDate: requestData.endDate,
          pageSize: requestData.pageSize,
          pageNumber: requestData.pageNumber
        }
      })
        .then(response => {
          commit('setAppointments', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  appointmentsData ({ commit }, id) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/appointment/' + id,
        method: 'GET'
      })
        .then(response => {
          commit('appointmentsData', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  appointmentPending ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/appointment/pending/details',
        method: 'POST',
        data: {
          groupId: requestData
        }
      })
        .then(response => {
          commit('setAppointmentPending', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  availableTimeSlot ({ commit }, requestParams) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/appointmentTimeSlot',
        params: {
          outletId: requestParams.outletId,
          date: requestParams.selectedDate
        },
        method: 'GET'
      })
        .then(response => {
          commit('setAvailableTimeSlot', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  checkout ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/appointment/status/update',
        params: {
          id: requestData.appointGroupId,
          outletId: requestData.outletId
        },
        data: {
          paymentType: requestData.appointCheckOutdata.paymentType,
          description: requestData.appointCheckOutdata.description,
          status: requestData.appointCheckOutdata.status,
          type: 1
        },
        method: 'PUT'
      })
        .then(response => {
          commit('appointmentsData', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  invoices ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/invoices',
        data: {
          outletId: requestData.outletId,
          pageSize: requestData.pageSize,
          pageNumber: requestData.pageNumber
        },
        method: 'POST'
      })
        .then(response => {
          commit('setInvoices', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  invoiceDetails ({ commit }, invoiceId) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/invoice/' + invoiceId,
        method: 'GET'
      })
        .then(response => {
          commit('setInvoice', response.data.responseData)
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
