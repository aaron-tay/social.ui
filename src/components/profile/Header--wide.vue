<template>
  <!-- Optimised for use in a wide column (on > tablet sizes) -->
  <div>
    <div class="columns is-mobile">
      <div class="column is-1"></div>
      <div class="column">
        <div class="image is-1by1 sui-avatar">
          <img :src="person.avatarUrl" />
        </div>
      </div>
      <div class="column is-1"></div>
      <div class="column is-two-thirds content">
        <p>
          <span class="title is-bold">
            {{ person.name }}
          </span>
          <template v-if="!person.isMe">
            &nbsp;
            <button class="button is-primary is-outlined" v-if="person.isFollowed" @click="unfollowPerson(person)">following</button>
            <button class="button is-primary" v-else @click="followPerson(person)">follow</button>
          </template>
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
