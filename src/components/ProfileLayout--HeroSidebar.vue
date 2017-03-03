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
          <div class="column is-one-quarter">
            <aside class="menu">
              <p class="menu-label">
                Explore {{ person.name }}
              </p>
              <ul class="menu-list">
                <li>
                  <router-link :to="{ name: 'profile/items', params: { profileId } }" active-class="is-active">
                    <span class="panel-icon">
                      <i class="fa fa-th"></i>
                    </span>
                    Items -
                    {{ person.stats.item }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'profile/collections', params: { profileId } }" active-class="is-active">
                    <span class="panel-icon">
                      <i class="fa fa-list"></i>
                    </span>
                    Collections -
                    {{ person.stats.collection }}
                  </router-link>
                </li>
              </ul>
              <p class="menu-label">
                People
              </p>
              <ul class="menu-list">
                <li>
                  <router-link :to="{ name: 'profile/following', params: { profileId } }" active-class="is-active">
                    <span class="panel-icon">
                      <i class="fa fa-eye"></i>
                    </span>
                    Following -
                    {{ person.stats.followee }}
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'profile/followers', params: { profileId } }" active-class="is-active">
                    <span class="panel-icon">
                      <i class="fa fa-users"></i>
                    </span>
                    Followers -
                    {{ person.stats.follower }}
                  </router-link>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>

    <sui-footer></sui-footer>
  </div>
</template>

<script>
import store from '@/helpers/store';
import SuiHeader from './Header';
import SuiFooter from './Footer';
import ProfileHeaderHero from './profile/Header--hero';
import ProfileHeaderMobile from './profile/Header--mobile';

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
      people: store.people,
    };
  },
  computed: {
    person() {
      return this.people[this.profileId];
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
