<template>
  <div
      @click="onScreenClick"
      class="main vh-100"
      :style="{
        'background-size': 'cover',
        'background-image': `url('${this.current_image}')`,
      }"
  >
  </div>
</template>

<script>

import splash_screen_image from "./assets/splash_screen.jpg";
import welcome_screen_image from "./assets/welcome_screen.jpg";

export default {
  name: 'SplashScreen',

  data () {
    return {
      countdown_seconds: 3,
      countdown_interval_handle: null,
    }
  },

  methods: {
    onScreenClick() {
      if (this.countdown_seconds > 0) {
        return
      }

      this.$router.push('/menu')
    },
  },

  computed: {
    current_image() {
      if (this.countdown_seconds > 0) {
        return splash_screen_image
      }
      return welcome_screen_image
    },
  },

  watch: {
    countdown_seconds (new_value) {
      if (new_value === 0) {
        window.clearInterval(this.countdown_interval_handle)
      }
    },
  },

  mounted () {
    this.countdown_interval_handle = window
      .setInterval(() => {
          this.countdown_seconds--
        }, 1000)
  }
}
</script>
