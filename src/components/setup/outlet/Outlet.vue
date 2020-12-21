<template>
    <div class="mt-2">
        <div class="container">
            <div class="md-display-1">{{newOutlet.name}}</div>
            <div class="md-caption">#{{newOutlet.id}}</div>
        </div>
        <div class="container tab-view mt-2">
            <form novalidate @submit.prevent="validateUser">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <div>
                            <md-field :class="getValidationClass('name')">
                                <label>Outlet Name</label>
                                <md-input required v-model="newOutlet.name" type="text"></md-input>
                                <span class="md-error" v-if="!$v.newOutlet.name.required">Outlet Name is required</span
                    >
                    <span class="md-error" v-if="!$v.newOutlet.name.minLength"
                      >Minimum 4 character required</span
                    >
                  </md-field>
                  <div>
                    <vue-tel-input
                      required
                      v-model="newOutlet.phone_number"
                      @country-changed="updateCountryCode"
                      :wrapperClasses="
                        'md-field no-border md-theme-default ' +
                          getValidationClass('phone_number')
                      "
                      inputClasses="tel-input"
                      :placeholder="false"
                    >
                    </vue-tel-input>
                    <span
                      class="md-error color-red"
                      v-if="!$v.newOutlet.phone_number.required"
                      >Phone Number is required</span
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
                      >Email ID is required</span
                    >
                    <span class="md-error" v-if="!$v.newOutlet.email.email"
                      >Invalid Email ID</span
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
                    <GmapMap
                      :center="{ lat: 10, lng: 10 }"
                      :zoom="7"
                      map-type-id="terrain"
                      class="mt-1"
                      style="width: 100%; height: 300px"
                    >
                      <gmap-autocomplete class="introInput">
                        <template v-slot:input="slotProps">
                          <v-text-field
                            outlined
                            prepend-inner-icon="place"
                            placeholder="Location Of Event"
                            ref="input"
                            v-on:listeners="slotProps.listeners"
                            v-on:attrs="slotProps.attrs"
                          >
                          </v-text-field>
</template>
                  </gmap-autocomplete>
                  <GmapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    @click="center = m.position"
                  />
                </GmapMap>
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
              <md-field :class="getValidationClass('zip_code')">
                <label>Zip Code</label>
                <md-input required v-model="newOutlet.zip_code"></md-input>
                <span class="md-error" v-if="!$v.newOutlet.zip_code.required"
                  >The zip code is required</span
                >
              </md-field>
            </div>
          </div>
        </div>
        <div class="align-end">
          <div class="flex-container keep-start">
            <md-button class="md-accent md-raised">Remove</md-button>
            <md-button class="md-primary md-raised">Reset Password</md-button>
          </div>
          <md-button class="md-primary md-raised" @click="OnCancel">Cancel</md-button>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Update</md-button
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'viewOutlet',
  mixins: [validationMixin],
  data () {
    return {
      newOutlet: {
        name: '',
        phone_number: '',
        email: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        zip_code: '',
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
      phone_number: {
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
      zip_code: {
        required
      }
    }
  },
  created: function () {
    this.$store.dispatch('setTitle', 'Outlet Details')
    this.$store
      .dispatch('setup/viewOutlet', this.$route.params.id)
      .then(response => {
        this.newOutlet = response.data.responseData
      })
  },
  methods: {
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
    OnCancel: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.keep-start {
    justify-content: flex-start !important;
}
</style>
