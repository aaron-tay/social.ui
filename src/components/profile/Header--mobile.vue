<template>
  <!-- Optimised for use on mobile sizes -->
  <div>
    <div class="columns is-mobile">
      <div class="column">
        <div class="image is-1by1 sui-avatar">
          <img :src="person.avatarUrl" />
        </div>
      </div>
      <div class="column is-two-thirds">
        <h1 class="title is-bold">
          {{ person.name }}
        </h1>
        <p v-if="!person.isMe">
          <button class="button is-outlined is-fullwidth" v-if="person.isFollowed" @click="unfollowPerson(person)">following</button>
          <button class="button is-primary is-fullwidth" v-else @click="followPerson(person)">follow</button>
        </p>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p>
          <span class="subtitle">
            <small>{{ person.bio }}</small>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    person: Object,
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions([
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
  },
};
</script>

<style lang="scss">
</style>
