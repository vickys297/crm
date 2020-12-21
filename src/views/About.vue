<template>
  <div>
    <md-toolbar>
     <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
        </div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>refresh</md-icon>
          </md-button>

          <md-button class="md-icon-button">
            <md-icon>more_vert</md-icon>
          </md-button>
        </div>
      </div>
    </md-toolbar>

    <md-toolbar md-elevation="0">
      <h3 class="md-title">No Elevation</h3>
    </md-toolbar>

    <md-toolbar class="md-transparent">
      <h3 class="md-title">Transparent</h3>
    </md-toolbar>

    <md-toolbar class="md-primary">
      <h3 class="md-title">Primary</h3>
    </md-toolbar>

    <md-toolbar class="md-accent">
      <h3 class="md-title">Accent</h3>
    </md-toolbar>
  </div>
</template>

<script>
export default {
}
</script>
