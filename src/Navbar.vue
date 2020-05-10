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
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      </ul>
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
    }
  }
</script>
