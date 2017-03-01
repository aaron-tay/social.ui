<template>
  <div class="profile">
    <sui-header></sui-header>

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

    <sui-footer></sui-footer>
  </div>
</template>

<script>
import SuiHeader from './Header';
import SuiFooter from './Footer';

export default {
  name: 'profile',
  components: {
    SuiHeader,
    SuiFooter,
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
</style>
