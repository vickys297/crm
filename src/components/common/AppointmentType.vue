  <template>
    <div>
        <!-- 1 Walk In, 2 Online Booking, 3 Private Booking, 4 APP Booking -->
        <span v-if="bookingType == 1">Walk-In</span>
        <span v-if="bookingType == 2">Online</span>
        <span v-if="bookingType == 3">Private</span>
        <span v-if="bookingType == 4">Over Call</span>
        <span v-if="bookingType == 5">Mobile App</span>
    </div>
</template>

<script>
export default {
  props: {
    bookingType: Number
  }
}
</script>

<style>

</style>
