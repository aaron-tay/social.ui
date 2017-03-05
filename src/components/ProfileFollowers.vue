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
              <button class="button is-outlined" v-if="person.isFollowed" @click="unfollowPerson(person)">following</button>
              <button class="button is-primary" v-else @click="followPerson(person)">follow</button>
            </div>
          </article>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'profileFollowers',
  props: ['person'],
  data() {
    return {
    };
  },
  created() {
    this.fetchUserList();
  },
  computed: {
    ...mapGetters({
      personList: 'activeFollowers',
    }),
  },
  methods: {
    ...mapActions([
      'fetchUserFollowedByList',
      'followUser',
      'unfollowUser',
    ]),
    followPerson(person) {
      this.followUser({
        profileId: person.profileId,
      });
    },
    unfollowPerson(person) {
      this.unfollowUser({
        profileId: person.profileId,
      });
    },
    fetchUserList() {
      this.fetchUserFollowedByList({
        profileId: this.person.profileId,
      });
    },
  },
  watch: {
    peopleListType(current, previous) {
      if (current !== previous) {
        this.fetchUserList();
      }
    },
  },
};
</script>

<style lang="scss">
</style>
