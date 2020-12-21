import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store/index'
// import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import StaffComponent from '../views/Staff.vue'
import StaffWorkingTab from '../components/staff/StaffWorkingTab.vue'
import StaffTab from '../components/staff/StaffProfileTab.vue'
import Services from '../views/Services.vue'

import AddNewService from '../components/services/AddService/AddNewService.vue'
import EditServiceItem from '../components/services/EditService/EditServiceItem.vue'

import Login from '../views/Login.vue'
import Calander from '../views/Calander.vue'

import NewAppointment from '../components/appointment/NewAppointment.vue'
import ViewAppointment from '../components/appointment/ViewAppointment.vue'
import EditAppointment from '../components/appointment/EditAppointment.vue'
import AppointmentSearch from '../components/appointment/AppointmentSearch.vue'

import AddNewStaff from '../components/staff/AddNewStaff'
import EditStaff from '../components/staff/EditStaff'

import AddPackage from '../components/package/AddPackageView.vue'
import EditPackageView from '../components/package/EditPackageView.vue'

import Sales from '../views/Sales.vue'

import Clients from '../views/Clients.vue'
import ViewClient from '../components/client/ViewClient.vue'

// Exception Page
import PageNotFound from '../views/exceptionPage/404Page.vue'
import PageNotAuthorized from '../views/exceptionPage/401Page.vue'

import Chats from '../views/Chats.vue'

import Setup from '../views/Setup.vue'
import LocationSetup from '../components/setup/outlet/Location.vue'
import ViewOutlets from '../components/setup/outlet/ViewOutlets.vue'
import Outlet from '../components/setup/outlet/Outlet.vue'
import MyAccount from '../components/setup/account/MyAccount.vue'
import Configuration from '@/components/setup/Configuration.vue'

import InvoiceDetails from '../components/Invoice/ViewInvoice.vue'

import AddClient from '../components/client/AddClient.vue'
import Profile from '../views/Profile.vue'

import ImportServices from '../views/ImportServices.vue'

import DeviceLogin from '../views/DeviceLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/calander',
    name: 'calander',
    component: Calander
  },
  {
    path: '/appointments/add',
    name: 'appointment',
    component: NewAppointment
  },
  {
    path: '/appointments/search',
    name: 'appointmentSearch',
    component: AppointmentSearch
  },
  {
    path: '/appointments/edit/:id',
    name: 'editAppointment',
    component: EditAppointment
  },
  {
    path: '/appointments/:id',
    name: 'viewAppointment',
    component: ViewAppointment
  },
  {
    path: '/staff',
    name: 'staff',
    component: StaffComponent,
    children: [
      {
        path: '/staff/tab/staffWorking',
        name: 'staffWorking',
        component: StaffWorkingTab
      },
      {
        path: '/staff/tab/staffTab',
        name: 'staffTab',
        component: StaffTab
      }
    ]
  },
  {
    path: '/deviceLogin/:id',
    component: DeviceLogin,
    name: 'DeviceLogin'
  },
  {
    path: '/staff/add',
    name: 'addNewStaff',
    component: AddNewStaff
  },
  {
    path: '/staff/edit/:id',
    name: 'editStaff',
    component: EditStaff
  },
  {
    path: '/services',
    name: 'services',
    component: Services
  },
  {
    path: '/services/edit/:id',
    name: 'editServicesItem',
    component: EditServiceItem
  },
  {
    path: '/services/add',
    name: 'addNewService',
    component: AddNewService
  },
  {
    path: '/services/package/add',
    name: 'add package',
    component: AddPackage
  },
  {
    path: '/services/package/edit/:id',
    name: 'editNewStaff',
    component: EditPackageView
  },
  {
    path: '/sales',
    name: 'sales',
    component: Sales
  },
  {
    path: '/clients',
    name: 'clients',
    component: Clients
  },
  {
    path: '/clients/add',
    name: 'addClient',
    component: AddClient
  },
  {
    path: '/clients/:id/profile',
    name: 'viewClient',
    component: ViewClient
  },
  {
    path: '/chats',
    name: 'chats',
    component: Chats
  },
  {
    path: '/setup',
    name: 'setup',
    component: Setup
  },
  {
    path: '/setup/account',
    name: 'myAccount',
    component: MyAccount
  },
  {
    path: '/setup/configuration',
    name: 'configuration',
    component: Configuration
  },
  {
    path: '/profile',
    name: 'myProfile',
    component: Profile
  },
  { path: '/setup/location', name: 'locationSetup', component: LocationSetup },
  { path: '/setup/outlets', name: 'ViewOutlets', component: ViewOutlets },
  { path: '/setup/outlet/:id', name: 'viewOutlet', component: Outlet },
  {
    path: '/setup/services/import',
    name: 'importServices',
    component: ImportServices
  },
  {
    path: '/sales/invoices/:id',
    name: 'viewInvoice',
    component: InvoiceDetails
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound
  },
  {
    path: '/undefiled',
    name: 'page-not-authorized',
    component: PageNotAuthorized
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log('router to-', to)
  if (to.name === 'DeviceLogin' && !isAuthenticated()) {
    // console.log('router 1')
    next()
  } else if (to.name === 'DeviceLogin' && isAuthenticated()) {
    // console.log('router 2')
    next('/undefiled')
  } else if (to.name === 'login') {
    // console.log('router 3')
    next()
  } else {
    // console.log('router 4  isLogged in- ', isAuthenticated())
    if (!isAuthenticated()) {
      // console.log('router 5')
      next('/login')
    } else {
      // console.log('router 6')
      next()
    }
  }
})

function isAuthenticated () {
  const token = localStorage.getItem('token')
  return token !== null
}

export default router
