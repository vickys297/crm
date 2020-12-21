<template>
    <div class="container mb-5">
        <div class="mt-2">
            <div class="md-headline">Account Settings</div>
            <div class="md-caption">Manage your store account like name, store location, language.</div>
        </div>
        <md-divider class="mt-2"></md-divider>
        <div class="md-layout mt-2">
            <div class="md-layout-item">
                <div class="md-headline">Store Name</div>
                <md-content class="md-caption">
                    <p>This name will be displayed on the store listings. This also will be reflected in the business invoices, appointments, emails and contact name.</p>
                </md-content>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <md-field>
                            <label>Store Name</label>
                            <md-input v-model="getUserDetails.name"></md-input>
                        </md-field>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <div class="md-layout mt-2">
            <div class="md-layout-item">
                <div class="md-headline">Location</div>
                <div class="md-caption">Based on your location your store will be listed</div>

                <md-content class="md-caption">
                    <p>
                        Your billing and currency (<strong>{{this.getCurrencyCode}}</strong>) will be based on the location. To know more contact our Support Team
                    </p>
                </md-content>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <md-field>
                            <label>Location</label>
                            <md-input v-model="this.getLocation"></md-input>
                        </md-field>
                        <md-field>
                            <label>Currency</label>
                            <md-input v-model="this.getCurrencyCode"></md-input>
                        </md-field>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <div class="md-layout mt-2">
            <div class="md-layout-item">
                <div class="md-headline">Language</div>
                <div class="md-caption">Select your preferred language</div>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <md-field>
                            <label>Application Language</label>
                            <md-input v-model="this.getLanguage"></md-input>
                        </md-field>
                        <md-field>
                            <label>Communication Language</label>
                            <md-input v-model="this.getLanguage"></md-input>
                        </md-field>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <div class="md-layout mt-2">
            <div class="md-layout-item">
                <div class="md-headline">Social Media Accounts</div>
                <div class="md-caption">Update your social media account to display in your stores</div>
            </div>
            <div class="md-layout-item">
                <md-card>
                    <md-card-content>
                        <md-field>
                            <label>Facebook</label>
                            <md-input v-model="getUserDetails.socialMedia[0]"></md-input>
                        </md-field>
                        <md-field>
                            <label>Instagram</label>
                            <md-input v-model="getUserDetails.socialMedia[1]"></md-input>
                        </md-field>
                        <md-field>
                            <label>Whats App</label>
                            <md-input v-model="initial"></md-input>
                        </md-field>
                    </md-card-content>
                </md-card>
            </div>
        </div>
        <md-divider class="mt-2"></md-divider>
        <div class="md-toolbar-section-end mt-2">
            <md-button class="md-raised md-primary">Rest Password</md-button>
            <md-button class="md-raised md-primary">Update</md-button>
        </div>
    </div>
</template>

<script>
import CountryWithDialCode from '../../../assets/utils/CountryWithDialCode.json'
import CountryWithCurrencyCode from '../../../assets/utils/CountryWithCurrencyCode.json'
import Language from '../../../assets/utils/Language.json'
export default {
  name: 'myAccount',
  created: function () {
    this.$store.dispatch('setTitle', 'Account')
    this.$store.dispatch('login/vendor', this.getVendor)
  },
  computed: {
    getUserDetails: function () {
    //   console.log('getVendorDetails', this.$store.getters['login/getVendorDetails'])
      return this.$store.getters['login/getVendorDetails']
    },
    getVendor: function () {
      return JSON.parse(this.$store.getters['login/userDetails']).vendorId
    },
    getLocation: function () {
      const array = CountryWithDialCode
      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        if (element.dial_code === this.getUserDetails.countryCode) {
          return element.name
        }
      }
      return ''
    },
    getCurrencyCode: function () {
      const array = CountryWithCurrencyCode
      const CurrencyCode = array.find(element => element.country === this.getLocation)
      return CurrencyCode.currency_code
    },
    getLanguage: function () {
      const array = Language
      //   const language = array.find(element => element === this.getUserDetails.language)

      for (let index = 0; index < array.length; index++) {
        const element = array[index]
        // console.log('getLanguage', element.code)
        if (element.code === this.getUserDetails.language) {
          return element.data.name
        }
      }
      return ''
    }
  }
}
</script>
