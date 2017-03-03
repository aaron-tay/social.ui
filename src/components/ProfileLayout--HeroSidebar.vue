<template>
  <div class="profile">
    <sui-header></sui-header>

    <div class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <div class="is-hidden-mobile">
            <profile-header-hero :person="person"></profile-header-hero>
          </div>
          <div class="is-hidden-tablet">
            <profile-header-mobile :person="person"></profile-header-mobile>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <div class="panel">
              <p class="panel-heading">
                Explore {{ person.name }}
              </p>
              <router-link :to="{ name: 'profile/items', params: { profileId } }" active-class="is-active" class="panel-block">
                <span class="panel-icon">
                  <i class="fa fa-th"></i>
                </span>
                Items -
                {{ stats.item }}
              </router-link>
              <router-link :to="{ name: 'profile/collections', params: { profileId } }" active-class="is-active" class="panel-block">
                <span class="panel-icon">
                  <i class="fa fa-list"></i>
                </span>
                Collections -
                {{ stats.collection }}
              </router-link>
              <router-link :to="{ name: 'profile/following', params: { profileId } }" active-class="is-active" class="panel-block">
                <span class="panel-icon">
                  <i class="fa fa-eye"></i>
                </span>
                  Following -
                  {{ stats.followee }}
              </router-link>
              <router-link :to="{ name: 'profile/followers', params: { profileId } }" active-class="is-active" class="panel-block">
                <span class="panel-icon">
                  <i class="fa fa-users"></i>
                </span>
                Followers -
                {{ stats.follower }}
              </router-link>
            </div>
          </div>
          <div class="column is-two-third">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>

    <sui-footer></sui-footer>
  </div>
</template>

<script>
import numeral from 'numeral';
import chance from '@/helpers/chance';
import SuiHeader from './Header';
import SuiFooter from './Footer';
import ProfileHeaderHero from './profile/Header--hero';
import ProfileHeaderMobile from './profile/Header--mobile';

const MAX_NUMBER = (10 ** 9);

export default {
  name: 'profile--top-down',
  props: ['profileId'],
  components: {
    SuiHeader,
    SuiFooter,
    ProfileHeaderMobile,
    ProfileHeaderHero,
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
