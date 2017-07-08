<template>
  <div class="header-wrapper">
    <div class="container">
      <nav class="navbar">
        <div class="navbar-brand">
          <router-link :to="{ name: 'home' }" class="navbar-item">
            <img src="https://placehold.it/64x64" alt="social-ui"/>&nbsp;social-ui
          </router-link>

          <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
          <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
          <div class="navbar-burger" @click="toggleMenu" :class="navMenuClass">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="navbar-menu" :class="navMenuClass">
          <div class="navbar-start">
            <!-- Nothing here but required to get middle centered -->
          </div>
          <div class="navbar-middle">
            <span class="nav-item is-hidden-mobile">
              Profile style &nbsp;
              <profile-switcher></profile-switcher>
            </span>
          </div>
          <div class="navbar-end">
            <router-link :to="{ name: 'chatroomListing' }" class="navbar-item">
              <span class="icon">
                <i class="fa fa-envelope"></i>
              </span>
              &nbsp;
              <span>
                Messages
              </span>
            </router-link>

            <router-link :to="{ name: 'profile', params: { profileId: 'me' } }" class="navbar-item">
              <span class="icon">
                <i class="fa fa-user"></i>
              </span>
              &nbsp;
              <span>
                Profile
              </span>
            </router-link>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import ProfileSwitcher from './ProfileSwitcher';

export default {
  name: 'profile',
  components: {
    ProfileSwitcher,
  },
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
.header-wrapper {
  position: relative;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
}
</style>
