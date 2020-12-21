<template>
    <div>
        <div class="container mt-2">
            <form novalidate @submit.prevent="validateUser">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <div>
                            <md-field :class="getValidationClass('name')">
                                <label>Name</label>
                                <md-input required v-model="newOutlet.name" type="text"></md-input>
                                <span class="md-error" v-if="!$v.newOutlet.name.required">The name is required</span
                    >
                    <span class="md-error" v-if="!$v.newOutlet.name.minLength"
                      >Minimum 4 character required</span
                    >
                  </md-field>
                  <div>
                    <vue-tel-input
                      required
                      v-model="newOutlet.phone"
                      @country-changed="updateCountryCode"
                      :wrapperClasses="
                        'md-field no-border md-theme-default ' +
                          getValidationClass('phone')
                      "
                      inputClasses="tel-input"
                      :placeholder="false"
                    >
                    </vue-tel-input>
                    <span
                      class="md-error color-red"
                      v-if="!$v.newOutlet.phone.required"
                      >The phone number is required</span
                    >
                  </div>
                  <md-field :class="getValidationClass('email')">
                    <label>Email</label>
                    <md-input
                      required
                      v-model="newOutlet.email"
                      type="email"
                    ></md-input>
                    <span class="md-error" v-if="!$v.newOutlet.email.required"
                      >The email id is required</span
                    >
                    <span class="md-error" v-if="!$v.newOutlet.email.email"
                      >Invalid email id</span
                    >
                  </md-field>
                  <md-field :class="getValidationClass('address')">
                    <label>Address</label>
                    <md-input
                      required
                      v-model="newOutlet.address"
                      type="address"
                    ></md-input>
                    <span class="md-error" v-if="!$v.newOutlet.address.required"
                      >The address is required</span
                    >
                  </md-field>
                  <div>
                    <label>Map Location</label>
                    <googleMap></googleMap>
                  </div>
                </div>
              </div>
              <div class="md-layout-item">
                <div>
                  <md-field :class="getValidationClass('landmark')">
                    <label>Landmark</label>
                    <md-input
                      required
                      v-model="newOutlet.landmark"
                      type="text"
                    ></md-input>
                    <span class="md-error" v-if="!$v.newOutlet.landmark.required"
                      >The landmark is required</span
                    >
                  </md-field>
                  <md-field :class="getValidationClass('city')">
                    <label>City</label>
                    <md-input required v-model="newOutlet.city"></md-input>
                    <span class="md-error" v-if="!$v.newOutlet.city.required"
                      >The city is required</span
                    >
                  </md-field>
                  <md-field :class="getValidationClass('state')">
                    <label>State</label>
                    <md-input required v-model="newOutlet.state"></md-input>
                    <span class="md-error" v-if="!$v.newOutlet.state.required"
                      >The state is required</span
                    >
                  </md-field>
                  <md-field :class="getValidationClass('zipcode')">
                    <label>Zip Code</label>
                    <md-input required v-model="newOutlet.zipcode"></md-input>
                    <span class="md-error" v-if="!$v.newOutlet.zipcode.required"
                      >The zip code is required</span
                    >
                  </md-field>
                </div>
              </div>
            </div>
            <div class="align-end">
              <md-button class="md-primary md-raised" @click="OnChange"
                >Cancel</md-button
              >
              <md-button type="submit" class="md-primary" :disabled="sending"
                >Create</md-button
              >
            </div>
          </form>
        </div>
      </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
import googleMap from '../../common/GoogleMapLocationPicker.vue'
export default {
  name: 'NewLocation',
  mixins: [validationMixin],
  components: {
    googleMap
  },
  data () {
    return {
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      lat: '',
      lng: '',
      newOutlet: {
        name: '',
        phone: '',
        email: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        zipcode: '',
        countryCode: '',
        vendorId: 1,
        latitude: '123213',
        longitude: '1232132'
      }
    }
  },
  validations: {
    newOutlet: {
      name: {
        required,
        minLength: minLength(4)
      },
      phone: {
        required
      },
      email: {
        required,
        email
      },
      address: {
        required
      },
      landmark: {
        required
      },
      city: {
        required
      },
      state: {
        required
      },
      zipcode: {
        required
      }
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Setup / Add Outlet')
  },
  methods: {
    locationUpdated (latlng) {
      // this.latitude = latlng.lat;
      // this.longitude = latlng.lng;
      // console.log('locationUpdated', latlng)
    },
    validateUser: function () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.createNewOutlet()
      }
    },
    createNewOutlet: function () {
      this.$store
        .dispatch('setup/addNewOutlet', this.newOutlet)
        .then(response => {
          this.$notify(response.data.message)
          this.$router.go(-1)
        })
    },
    getValidationClass (fieldName) {
      const field = this.$v.newOutlet[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    updateCountryCode: function (value) {
      this.newOutlet.countryCode = value.dialCode
      // // console.log('country code', value.dialCode)
    },
    OnChange: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
