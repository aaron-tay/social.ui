<template>
  <nav class="nav has-shadow">
    <div class="nav-left">
      <a class="nav-item">
        <img src="https://placehold.it/64x64" alt="social-ui"/>&nbsp;social-ui
      </a>
    </div>

    <div class="nav-center">
    </div>

    <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
    <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
    <span class="nav-toggle" @click="toggleMenu">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <!-- This "nav-menu" is hidden on mobile -->
    <!-- Add the modifier "is-active" to display it on mobile -->
    <div class="nav-right nav-menu" :class="navMenuClass">
      <a class="nav-item">
        Profile
      </a>

      <span class="nav-item">
        <a class="button is-primary">
          <span class="icon">
            <i class="fa fa-cog"></i>
          </span>
          <span>Settings</span>
        </a>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {
      isNavMenuActive: false,
    };
  },
  computed: {
    navMenuClass() {
      return {
        'is-active': this.isNavMenuActive,
      };
    },
  },
  methods: {
    toggleMenu() {
      this.isNavMenuActive = !this.isNavMenuActive;
    },
  },
};
</script>

<style lang="scss">
</style>
