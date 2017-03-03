<template>
  <div class="profile">
    <sui-header></sui-header>

    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-one-third">
            <div class="is-hidden-mobile">
              <profile-header-narrow :person="person"></profile-header-narrow>
            </div>
            <div class="is-hidden-tablet">
              <profile-header-mobile :person="person"></profile-header-mobile>
            </div>
          </div>
          <div class="column is-two-thirds">
            <div class="container">
              <div class="columns">
                <div class="column level is-mobile">
                  <router-link :to="{ name: 'profile/items', params: { profileId } }" class="level-item has-text-centered">
                    <div>
                      <p>{{ person.stats.item }}</p>
                      <p>Items</p>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'profile/collections', params: { profileId } }" class="level-item has-text-centered">
                    <div>
                      <p>{{ person.stats.collection }}</p>
                      <p>Collections</p>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'profile/following', params: { profileId } }" class="level-item has-text-centered">
                    <div>
                      <p>{{ person.stats.followee }}</p>
                      <p>Following</p>
                    </div>
                  </router-link>
                  <router-link :to="{ name: 'profile/followers', params: { profileId } }" class="level-item has-text-centered">
                    <div>
                      <p>{{ person.stats.follower }}</p>
                      <p>Followers</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
            <!--  -->
            <div class="container">
              <router-view></router-view>
            </div>
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
import ProfileHeaderNarrow from './profile/Header--narrow';
import ProfileHeaderMobile from './profile/Header--mobile';

export default {
  name: 'profile--narrow-wide',
  props: ['profileId'],
  components: {
    SuiHeader,
    SuiFooter,
    ProfileHeaderNarrow,
    ProfileHeaderMobile,
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
