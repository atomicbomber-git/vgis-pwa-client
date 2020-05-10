<template>
  <div class="bg-primary text-white d-flex flex-column justify-content-center vh-100">
    <h1 class="text-center">
      Virtual Tour
    </h1>
  </div>
</template>

<script>
  export default {
    name: "SplashScreen",

    data() {
      return {
        countdown_seconds: 3,
        countdown_interval_handle: null,
      }
    },

    watch: {
      countdown_seconds(new_value) {
        if (new_value === 0) {
          window.clearInterval(this.countdown_interval_handle)
          this.$router.push('/home')
        }
      },
    },

    mounted() {
      this.countdown_interval_handle = window
        .setInterval(() => {
        this.countdown_seconds--
      }, 1000)
    }
  }
</script>
