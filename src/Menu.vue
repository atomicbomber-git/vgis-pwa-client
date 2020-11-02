<template>
  <div
      class="vh-100 d-flex flex-column justify-content-center px-5"
  >
    <h1 class="h4 font-weight-bolder text-center mb-5">
      VIRTUAL TOUR <br>
      <span class="text-primary"> SUPADIO </span>
    </h1>

    <div class="d-flex justify-content-center flex-column">
      <button
          @click="onVirtualTourButtonClick"
          style="
            border: none;
            background: linear-gradient(to right, #00aeff , #007bff)"
          class="btn btn-primary font-weight-bold mb-3">
        VIRTUAL TOUR
      </button>
      <button
          @click="onMapButtonClick"
          class="btn btn-primary font-weight-bold mb-3"
          style="
            border: none;
            background: linear-gradient(to right, #00aeff , #007bff)"
      >
        MAP
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onMapButtonClick() {
      this.$router.push({
        name: 'home',
        params: {
          virtualTour: false,
        }
      })
    },

    onVirtualTourButtonClick() {
      this.$router.push({
        name: 'home',
        params: {
          virtualTour: true,
        }
      })
    },
  }
}
</script>
