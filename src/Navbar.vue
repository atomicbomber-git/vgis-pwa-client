<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <a class="navbar-brand"
       href="#">
      Virtual Tour Client
    </a>
    <button
      @click="collapsed = !collapsed"
      class="navbar-toggler d-lg-none"
      type="button"
      data-toggle="collapse"
      data-target="#collapsibleNavId"
      aria-controls="collapsibleNavId"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <i class="fas fa-list"></i>
    </button>

    <div
      class="collapse navbar-collapse"
      :class="{ show: !this.collapsed }"
      id="collapsibleNavId">


      <div class="ml-auto">
        <button class="btn btn-light w-100"
                @click="onUpdateButtonClick">
          Reload
          <i class="fas fa-sync-alt  "></i>
        </button>
      </div>

    </div>
  </nav>

</template>
<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        collapsed: true,
      }
    },

    methods: {
      onUpdateButtonClick() {
        window.location.reload()
      }
    }
  }
</script>
