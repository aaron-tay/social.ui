<template>
  <div class="profile">
    <sui-header></sui-header>

    <div class="section">
      <div class="container">
        <profile-header></profile-header>
      </div>
      <div class="container">
        <hr />
      </div>
      <div class="container">
        <div class="columns">
          <div class="column level is-mobile">
            <router-link to="/i" class="level-item has-text-centered">
              <div>
                <p>3,456</p>
                <p>Items</p>
              </div>
            </router-link>
            <router-link to="/c" class="level-item has-text-centered">
              <div>
                <p>789</p>
                <p>Collections</p>
              </div>
            </router-link>
            <router-link to="/e" class="level-item has-text-centered">
              <div>
                <p>123</p>
                <p>Following</p>
              </div>
            </router-link>
            <router-link to="/r" class="level-item has-text-centered">
              <div>
                <p>456K</p>
                <p>Followers</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </div>

    <sui-footer></sui-footer>
  </div>
</template>

<script>
import SuiHeader from './Header';
import SuiFooter from './Footer';
import ProfileHeader from './ProfileHeader';

export default {
  name: 'profile',
  components: {
    SuiHeader,
    SuiFooter,
    ProfileHeader,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
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

a.level-item {
  color: #363636;
}

a.level-item.router-link-active {
  color: #00d1b2;
}
</style>
