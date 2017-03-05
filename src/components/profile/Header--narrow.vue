<template>
  <!-- Optimised for use in a narrow column (on > tablet sizes) -->
  <div>
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column">
        <div class="image is-1by1 sui-avatar">
          <img :src="person.avatarUrl" />
        </div>
      </div>
      <div class="column is-2"></div>
    </div>
    <div class="columns">
      <div class="column content">
        <p>
          <span class="title is-bold">
            {{ person.name }}
          </span>
        </p>
        <p v-if="!person.isMe">
          <button class="button is-primary is-medium is-fullwidth is-outlined" v-if="person.isFollowed" @click="unfollowPerson(person)">following</button>
          <button class="button is-primary is-medium is-fullwidth" v-else @click="followPerson(person)">follow</button>
        </p>
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
