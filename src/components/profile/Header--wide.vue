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
      <div class="column is-two-thirds">
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
export default {
  props: {
    person: Object,
  },
  data() {
    return {
    };
  },
  methods: {
    toggleFollowing(iPerson) {
      const person = iPerson;
      person.isFollowed = !person.isFollowed;
    },
  },
};
</script>

<style lang="scss">
</style>
