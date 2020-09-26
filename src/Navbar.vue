<template>
  <nav class="navbar navbar-expand-sm navbar-dark"
       style="background-color: #00aeff"
  >
    <a class="navbar-brand"
       href="#"
    >
      VT Supadio
    </a>
    <button
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
        class="navbar-toggler d-lg-none"
        data-target="#collapsibleNavId"
        data-toggle="collapse"
        type="button"
        @click="collapsed = !collapsed"
    >
      <i class="fas fa-list"></i>
    </button>

    <div
        id="collapsibleNavId"
        :class="{ show: !this.collapsed }"
        class="collapse navbar-collapse"
    >


      <div class="ml-auto">
        <button class="btn btn-light w-100"
                @click="onUpdateButtonClick"
        >
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
  data () {
    return {
      collapsed: true,
    }
  },

  methods: {
    onUpdateButtonClick () {
      window.location.reload()
    }
  }
}
</script>
