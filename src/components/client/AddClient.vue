<template>
    <div>
        <div class="container tab-view mt-2">
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <md-field :class="getValidationClass('name')">
                        <label>Name</label>
                        <md-input v-model="clientData.name" required></md-input>
                        <span class="md-error" v-if="!$v.clientData.name.required">Name Required</span>
                    </md-field>
                    <md-field :class="getValidationClass('email')">
                        <label>Email</label>
                        <md-input v-model="clientData.email"></md-input>
                        <span class="md-error" v-if="!$v.clientData.email.email">Enter valid Email ID</span>
                    </md-field>
                    <vue-tel-input required v-model="clientData.phone" @country-changed="updateCountryCode" :wrapperClasses="'md-field no-border md-theme-default ' + getValidationClass('phone')" inputClasses="tel-input" :placeholder="false">
                    </vue-tel-input>
                    <div>
                        <label>Send Notification</label>
                        <br>
                        <div class="group">
                            <md-checkbox v-model="clientData.sendNotificationBy" value="1">App</md-checkbox>
                            <md-checkbox v-model="clientData.sendNotificationBy" value="2">Email</md-checkbox>
                            <md-checkbox v-model="clientData.sendNotificationBy" value="3">Call</md-checkbox>
                            <md-checkbox v-model="clientData.sendNotificationBy" value="4">Text Message</md-checkbox>
                        </div>
                    </div>
                    <div>
                        <label>Gender</label>
                        <br>
                        <div class="group">
                            <md-radio v-model="clientData.gender" value="Male">Male</md-radio>
                            <md-radio v-model="clientData.gender" value="Female">Female</md-radio>
                        </div>
                    </div>
                    <md-field :class="getValidationClass('description')">
                        <label>Description</label>
                        <md-textarea v-model="clientData.description" md-autogrow md-counter="250"></md-textarea>
                        <span class="md-error" v-if="!$v.clientData.description.maxLength">Only 250 Character allowed</span>
                    </md-field>
                    <md-field>
                        <label>Referal (Optional)</label>
                        <md-input v-model="clientData.referalSource"></md-input>
                        <span class="md-helper-text">Enter phone number of referal</span>
                    </md-field>
                </div>
                <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100">
                    <md-datepicker class="md-field" md-immediately>
                        <label>Date of Birth</label>
                        <md-input v-model="clientData.birthday" readonly></md-input>
                    </md-datepicker>
                    <md-field>
                        <label>Country</label>
                        <md-input v-model="clientData.country" readonly></md-input>
                    </md-field>
                    <md-field>
                        <label>Address</label>
                        <md-input v-model="clientData.address"></md-input>
                    </md-field>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                                <label>State</label>
                                <md-input v-model="clientData.state"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item">
                            <md-field>
                                <label>City</label>
                                <md-input v-model="clientData.city"></md-input>
                            </md-field>
                        </div>
                    </div>
                    <md-field :class="getValidationClass('postalCode')">
                        <label>Zip Code</label>
                        <md-input v-model="clientData.postalCode"></md-input>
                        <span class="md-error" v-if="!$v.clientData.postalCode.integer">Zip Code Required</span>
                    </md-field>
                </div>
            </div>
        </div>
        <div class="align-end">
            <md-button class="md-raised md-primary" @click="goBack">Cancel</md-button>
            <md-button @click="validate">Create</md-button>
        </div>
    </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import moment from 'moment'
import {
  required,
  email,
  integer,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
import CountryWithIso from '../../assets/utils/CountryWithISO.json'
export default {
  name: 'addClient',
  mixins: [validationMixin],
  data () {
    return {
      startDate: new Date(),
      selectedDate: new Date(),
      clientData: {
        name: '',
        email: '',
        phone: '',
        countryCode: '',
        sendNotificationBy: [''],
        description: '',
        language: '',
        gender: '',
        referalSource: '',
        birthday: '',
        address: '',
        country: '',
        city: '',
        state: '',
        postalCode: '',
        outletId: ''
      }
    }
  },
  validations: {
    clientData: {
      name: { required, minLength: minLength(4) },
      email: { email },
      description: { maxLength: maxLength(150) },
      postalCode: { integer }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.clientData[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    updateCountryCode: function (value) {
      const array = CountryWithIso
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        if (element.iso === value.iso2) {
          this.clientData.country = element.Country
        }
      }
    },
    validate () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.saveUser()
      } else {
        this.$notify({ type: 'error', title: 'Required Fields', text: 'enter all the required fields' })
      }
    },
    saveUser: function () {
      this.$store.dispatch('client/addClient', this.clientData)
        .then(response => {
          this.$notify(response.data.message)
        })
    },
    goBack: function () {
      this.$router.go(-1)
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Add Client')
    this.clientData.outletId = this.getOutlet
  },
  computed: {
    getStartTime: function () {
      return moment(new Date()).format('YYYY-MM-DD')
    },
    getOutlet: function () {
      return this.$store.getters.getOutletId
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
