<template>
  <div
      class="main vh-100">
  </div>
</template>

<style>
  .main {
    background-size: cover;
    background-image: url("./assets/splash_screen.jpg");
  }
</style>

<script>

export default {
  name: 'SplashScreen',

  data () {
    return {
      countdown_seconds: 3,
      countdown_interval_handle: null,
    }
  },

  watch: {
    countdown_seconds (new_value) {
      if (new_value === 0) {
        window.clearInterval(this.countdown_interval_handle)
        this.$router.push('/home')
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
