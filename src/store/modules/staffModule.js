import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  status: '',
  workingHoursData: '',
  staffList: '',
  newStaffResponse: '',
  updateShiftStatusResponse: '',
  staffData: '',
  updateStaffResponse: '',
  staffListByServices: ''
}

const getters = {
  workingHoursResponseData: state => state.workingHoursData,
  staffListData: state => state.staffList.responseData,
  addNewServiceResponse: state => state.newStaffResponse,
  updateShiftStatusResponse: state => state.updateShiftStatusResponse,
  getStaffData: state => state.staffData,
  getStaffListByServices: state => state.staffListByServices
}

const mutations = {
  setWorkingHours (state, responseData) {
    state.status = 'success'
    state.workingHoursData = responseData.responseData
  },
  setStaffList (state, responseData) {
    state.status = 'success'
    state.staffList = responseData
  },
  api_request (state) {
    state.status = 'requested'
  },
  api_error (state) {
    state.status = 'error'
  },
  addNewUserReponse (state, responseData) {
    state.status = 'success'
    state.newStaffResponse = responseData
  },
  auth_request (state) {
    state.status = 'requested'
  },
  updateShiftStatus (state, response) {
    state.status = 'success'
    state.updateShiftStatusResponse = response
  },
  getStaffDetails (state, response) {
    state.status = 'success'
    state.staffData = response
  },
  getUpdateStaffData (state, response) {
    state.status = 'success'
    state.updateStaffResponse = response
  },
  setStaffListByService (state, response) {
    state.status = 'success'
    state.staffListByServices = response
  }
}

const actions = {
  staffWorkingHours ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios
        .get('http://laundry.brozapp.com/api/staff/workingHours', {
          params: {
            date: requestData.selectedDate,
            outletId: requestData.OID
          }
        })
        .then(response => {
          commit('setWorkingHours', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('api_error')
          reject(err)
        })
    })
  },
  staffList ({ commit }, selectedOutlet) {
    return new Promise((resolve, reject) => {
      commit('api_request')
      axios({
        url: 'http://laundry.brozapp.com/api/staff/list',
        params: {
          outletID: selectedOutlet
        },
        method: 'GET'
      })
        .then(response => {
          commit('setStaffList', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('api_error')
          reject(err)
        })
    })
  },
  addNewStaff ({ commit }, satffData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/staff/add',
        data: satffData,
        method: 'POST'
      })
        .then(response => {
          // // console.log('addNewUserReponse', response.data)
          commit('addNewUserReponse', response.data.message)
          resolve(response)
        })
        .catch(err => {
          commit('api_error')
          reject(err)
        })
    })
  },

  updateShift ({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/staffWorkingHours',
        params: {
          id: data.staffId
        },
        data: data,
        method: 'PUT'
      })
        .then(response => {
          commit('updateShiftStatus', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('api_error')
          reject(err)
        })
    })
  },

  getStaffId ({ commit }, staffId) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/staff',
        params: {
          id: staffId
        },
        method: 'GET'
      })
        .then(response => {
          commit('getStaffDetails', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('api_error')
          reject(err)
        })
    })
  },
  updateStaff ({ commit }, staffData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/staff/' + staffData.staffId,
        data: staffData,
        method: 'PUT'
      })
        .then(response => {
          commit('getUpdateStaffData', response.data)
          resolve(response)
        })
        .catch(err => {
          commit('api_error')
          reject(err)
        })
    })
  },
  staffListByService ({ commit }, requestData) {
    return new Promise((resolve, reject) => {
      commit('auth_request')
      axios({
        url: 'http://laundry.brozapp.com/api/available/staffList',
        data: requestData,
        method: 'POST'
      })
        .then(response => {
          commit('setStaffListByService', response.data.responseData)
          resolve(response)
        })
        .catch(err => {
          commit('api_error')
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
