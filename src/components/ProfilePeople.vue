<template>
  <div class="profile-collection">
    <div class="columns is-mobile">
      <div class="column">
        <template v-for="person in personList">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64 sui-avatar">
                <img :src="person.avatarUrl" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <router-link :to="{ name: 'profile', params: { profileId: person.profileId }}">
                    <strong>{{ person.name }}</strong>
                  </router-link>
                  <br />
                  <span>
                    {{ person.bio }}
                  </span>
                </p>
              </div>
            </div>
            <div class="media-right">
              <br />
              <button class="button is-primary is-outlined" v-if="person.isFollowed" @click="toggleFollowing(person)">following</button>
              <button class="button is-primary" v-else @click="toggleFollowing(person)">follow</button>
            </div>
          </article>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import lodash from 'lodash';
import store from '@/helpers/store';

export default {
  name: 'profileCollections',
  props: ['peopleListType', 'person'],
  data() {
    return {
      people: store.people,
    };
  },
  created() {
    // fetch data
  },
  computed: {
    personList() {
      return lodash.map(this.activePersonList, litePerson => (
        this.people[litePerson.profileId]
      ));
    },
    activePersonList() {
      if (this.peopleListType === 'followers') {
        return this.person.followersList;
      }
      return this.person.followingList;
    },
  },
  methods: {
    toggleFollowing(person) {
      store.toggleFollowState(person.profileId);
    },
  },
};
</script>

<style lang="scss">
</style>
