<template>
    <div class="container">
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-medium-size-50">
                <md-list class="md-triple-line">
                    <md-list-item>
                        <span class="md-title">General Setup</span>
                    </md-list-item>
                    <md-list-item>
                        <md-avatar class="md-avatar-icon md-primary">
                            A
                        </md-avatar>

                        <div class="md-list-item-text">
                            <span class="md-title">My Account</span>
                            <span class="md-caption">Manage your account info</span>
                        </div>

                        <md-button class="md-icon-button md-raised md-primary" to="/setup/account">
                            <md-icon class="">edit</md-icon>
                        </md-button>
                    </md-list-item>

                    <!-- <md-list-item>
                        <md-avatar class="md-avatar-icon md-primary">
                            S
                        </md-avatar>

                        <div class="md-list-item-text">
                            <span class="md-title">Store Configuration</span>
                            <span class="md-caption">Manage your account info</span>
                        </div>

                        <md-button class="md-icon-button md-raised md-primary" to="/setup/configuration">
                            <md-icon class="">edit</md-icon>
                        </md-button>
                    </md-list-item> -->

                    <md-divider class="md-inset"></md-divider>

                    <md-list-item>
                        <md-avatar class="md-avatar-icon md-primary">
                            I
                        </md-avatar>

                        <div class="md-list-item-text">
                            <span class="md-title">Import Services | Package</span>
                            <span class="md-caption">Import your services and packages from your existing catalog with ease</span>
                        </div>
                        <md-button class="md-icon-button md-raised md-primary" to="/setup/services/import">
                            <md-icon class="">keyboard_arrow_right</md-icon>
                        </md-button>
                    </md-list-item>

                    <md-divider class="md-inset"></md-divider>
                </md-list>
            </div>
            <div class="md-layout-item md-medium-size-50">
                <md-list class="md-triple-line">
                    <md-list-item>
                        <span class="md-title">Templates Setup (Coming Soon)</span>
                    </md-list-item>
                    <md-list-item>
                        <md-avatar class="md-avatar-icon md-primary">
                            I
                        </md-avatar>
                        <div class="md-list-item-text">
                            <span class="md-title">Invoice Template</span>
                            <span class="md-caption">Set Invoice template, this will affect the invoice viewed by customer</span>
                        </div>
                        <md-button class="md-icon-button md-raised md-primary" to="/setup/services/import">
                            <md-icon class="">keyboard_arrow_right</md-icon>
                        </md-button>
                    </md-list-item>
                    <md-divider class="md-inset"></md-divider>
                    <md-list-item>
                        <md-avatar class="md-avatar-icon md-primary">
                            M
                        </md-avatar>
                        <div class="md-list-item-text">
                            <span class="md-title">Message Template</span>
                            <span class="md-caption">Set Message template, this will affect the sms and notifications viewed by customer</span>
                        </div>
                        <md-button class="md-icon-button md-raised md-primary" to="/setup/services/import">
                            <md-icon class="">keyboard_arrow_right</md-icon>
                        </md-button>
                    </md-list-item>
                    <md-list-item>
                        <md-avatar class="md-avatar-icon md-primary">
                            E
                        </md-avatar>
                        <div class="md-list-item-text">
                            <span class="md-title">Email Template</span>
                            <span class="md-caption">Set Email template, this will affect the email viewed by customer</span>
                        </div>
                        <md-button class="md-icon-button md-raised md-primary" to="/setup/services/import">
                            <md-icon class="">keyboard_arrow_right</md-icon>
                        </md-button>
                    </md-list-item>
                </md-list>
            </div>
        </div>
    </div>
</template>

<script>
export default {

  created: function () {
    this.$store.dispatch('setTitle', 'Setup')
  },
  methods: {
    alertFunction: function () {
      alert('click')
    },
    viewOutlets: function () {
      this.$router.push({ path: '/setup/outlets' })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-content {
    padding: 1px 16px;
}
</style>
