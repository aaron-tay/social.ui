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
          &nbsp;
          <button class="button is-primary is-outlined" v-if="person.isFollowed" @click="toggleFollowing(person)">following</button>
          <button class="button is-primary" v-else @click="toggleFollowing(person)">follow</button>
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
import store from '@/helpers/store';

export default {
  props: {
    person: Object,
  },
  data() {
    return {
    };
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
