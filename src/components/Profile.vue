<template>
  <div class="profile">
    <sui-header></sui-header>

    <div class="section">
      <div class="container">
        <profile-header :person="person"></profile-header>
      </div>
      <div class="container">
        <hr />
      </div>
      <div class="container">
        <div class="columns">
          <div class="column level is-mobile">
            <router-link :to="{ name: 'profile/items', params: { profileId } }" class="level-item has-text-centered">
              <div>
                <p>{{ stats.item }}</p>
                <p>Items</p>
              </div>
            </router-link>
            <router-link :to="{ name: 'profile/collections', params: { profileId } }" class="level-item has-text-centered">
              <div>
                <p>{{ stats.collection }}</p>
                <p>Collections</p>
              </div>
            </router-link>
            <router-link :to="{ name: 'profile/following', params: { profileId } }" class="level-item has-text-centered">
              <div>
                <p>{{ stats.followee }}</p>
                <p>Following</p>
              </div>
            </router-link>
            <router-link :to="{ name: 'profile/followers', params: { profileId } }" class="level-item has-text-centered">
              <div>
                <p>{{ stats.follower }}</p>
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
import Chance from 'chance';
import numeral from 'numeral';
import SuiHeader from './Header';
import SuiFooter from './Footer';
import ProfileHeader from './ProfileHeader';

const chance = new Chance();
const MAX_NUMBER = (10 ** 9);

export default {
  name: 'profile',
  props: ['profileId'],
  components: {
    SuiHeader,
    SuiFooter,
    ProfileHeader,
  },
  data() {
    return {
      name: chance.name(),
      bio: chance.paragraph(),
      avatarUrl: 'https://placehold.it/256x256',
      stats: {
        item: this.prettyNumber(chance.natural({ max: MAX_NUMBER })),
        collection: this.prettyNumber(chance.natural({ max: MAX_NUMBER })),
        followee: this.prettyNumber(chance.natural({ max: MAX_NUMBER })),
        follower: this.prettyNumber(chance.natural({ max: MAX_NUMBER })),
      },
    };
  },
  computed: {
    person() {
      return {
        name: this.name,
        bio: this.bio,
        avatarUrl: this.avatarUrl,
        isFollowed: false,
        profileId: this.profileId,
      };
    },
  },
  methods: {
    prettyNumber(number) {
      return numeral(number).format('0.0a');
    },
  },
  watch: {
    profileId() {
      // Simulate loading a new profile whenever the profileId changes
      this.name = chance.name();
      this.bio = chance.paragraph();
      this.avatarUrl = 'https://placehold.it/256x256';
      this.stats = {
        item: this.prettyNumber(chance.natural({ max: MAX_NUMBER })),
        collection: this.prettyNumber(chance.natural({ max: MAX_NUMBER })),
        followee: this.prettyNumber(chance.natural({ max: MAX_NUMBER })),
        follower: this.prettyNumber(chance.natural({ max: MAX_NUMBER })),
      };
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

a.level-item {
  color: #363636;
}

a.level-item.router-link-active {
  color: #00d1b2;
}
</style>
