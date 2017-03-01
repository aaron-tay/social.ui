<template>
  <div class="profile">
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

    <div class="container">
      <div class="section">
        <div class="columns is-mobile">
          <div class="column is-1 is-hidden-touch"></div>
          <div class="column">
            <div class="image is-1by1 sui-avatar">
              <img src="https://placehold.it/256x256" />
            </div>
          </div>
          <div class="column is-1 is-hidden-touch"></div>
          <div class="column is-two-thirds">
            <h1 class="title is-bold">
              Name Here
            </h1>
            <p>
              <span class="button is-primary is-outlined is-fullwidth">follow</span>
            </p>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p>
              <span class="subtitle">
                this is where more stuff is
              </span>
            </p>
          </div>
        </div>
        <hr />
        <div class="level is-mobile">
          <div class="level-item has-text-centered">
            <div>
              <p>3,456</p>
              <p>Items</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p>789</p>
              <p>Collections</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p>123</p>
              <p>Following</p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p>456K</p>
              <p>Followers</p>
            </div>
          </div>
        </div>
        <div class="columns is-multiline is-mobile">
          <template v-for="i in 12">
            <div class="column is-one-third">
              <div class="image is-1by1">
                <img src="https://placehold.it/256x256" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <footer class="footer sui-footer">
      <div class="container">
        <div class="has-text-centered">
          <p>
            <strong>social-ui</strong> by aaron-tay
          </p>
        </div>
      </div>
    </footer>
  </div>
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
.sui-avatar {
  margin: auto;
}
.sui-avatar img {
  border-radius: 999px;
}

.sui-footer {
  padding-bottom: 3rem;
}
</style>
