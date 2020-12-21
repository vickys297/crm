<template>
  <div v-if="loading" class="loading">
    <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
  </div>
  <div class="background" v-else>
    <div class="login">
      <md-content class="w-50 md-login md-empty p-2">
        <span class="md-title">Business Login</span>
        <form novalidate class="align-item-center" @submit.prevent="login">
          <md-field class="mt-2" :class="messageClass">
            <md-icon>person</md-icon>
            <label>Email</label>
            <md-input v-model="email" type="email" placeholder="Example@sample.com"></md-input>
            <span class="md-error">Enter email</span>
          </md-field>
          <md-field :class="messageClass">
            <md-icon>lock</md-icon>
            <label>Password</label>
            <md-input v-model="password" type="password" placeholder="Password"></md-input>
            <span class="md-error">Enter password</span>
          </md-field>
          <div>
            <md-button type="submit" class="md-raised md-primary">Login</md-button>
          </div>
        </form>

        <span class="md-caption mt-1">Forgot password?</span>
        <span class="md-body-2 mt-1">To create an account visit Broz Comminity website or</span>
        <div>
          <md-button class="md-raised w-50 md-accent wrap-content">Sign Up for business</md-button>
        </div>
        <span class="md-caption mt-1">&copy; 2020 Broz Community</span>
      </md-content>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login: function () {
      this.loading = true
      const email = this.email
      const password = this.password

      var delayInMilliseconds = 2000 // 1 second

      setTimeout(() => {
        this.$store
          .dispatch('login/login', { email, password })
          .then((response) => {
            if (response.data.status === 2) {
              this.loading = false
              this.$toast.warning('Wrong Credentials!. Unable to Login', {
                position: 'top',
                duration: '5000'
              })
              this.password = ''
            } else {
              this.loading = false
              this.$toast.open({
                message:
                  'Success, Welcome ' + response.data.userInfo.name + '!',
                type: 'success',
                duration: 5000,
                position: 'top',
                dismissible: true
              })
            }
          })
          .catch(() => {
            this.loading = false
            this.$toast.warning('Wrong Credentials!. Unable to Login', {
              position: 'top',
              duration: '5000'
            })
            this.password = ''
          })
      }, delayInMilliseconds)
    },
    checkLogin: function () {
      if (!this.$store.getters['login/isLoggedIn']) {
        this.$router.push('/login')
      } else {
        this.$router.push('/')
      }
    }
  },
  created: function () {
    this.checkLogin()
  },
  computed: {
    messageClass () {
      return {
        'md-invalid': this.hasMessages
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  display: grid;
  text-align: center;
}

.md-login {
  height: fit-content;
  display: grid;
  padding: 10px;
  width: 30% !important;
  background-color: white !important;
  color: black;
  place-self: center;
  border-radius: 5px;
}

.background {
  position: "fixed";
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://source.unsplash.com/random");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
