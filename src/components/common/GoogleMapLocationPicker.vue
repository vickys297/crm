<template>
  <div class="map-container"></div>
</template>

<script>
export default {
  props: {
    latitude: {
      type: Number,
      default: 55.01657628017477
    },
    longitude: {
      type: Number,
      default: -7.309233337402361
    }
  },
  data () {
    return {
      lat: this.latitude,
      lng: this.longitude
    }
  },
  mounted () {
    // Set coordinates
    const myLatlng = new window.google.maps.LatLng(this.lat, this.lng)
    // Options
    const mapOptions = {
      zoom: 12,
      center: myLatlng
    }
    // Apply options
    const map = new window.google.maps.Map(this.$el, mapOptions)
    // Add marker
    const marker = new window.google.maps.Marker({
      position: myLatlng,
      map: map
    })
    marker.setMap(map)
    const self = this
    window.google.maps.event.addListener(map, 'center_changed', function () {
      const lat = map.getCenter().lat()
      const lon = map.getCenter().lng()
      const newLatLng = { lat: lat, lng: lon }
      marker.setPosition(newLatLng)
      self.$emit('locationUpdated', newLatLng)
    })
  }
}
</script>
