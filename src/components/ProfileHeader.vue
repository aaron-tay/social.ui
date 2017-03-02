<template>
  <div>
    <div class="is-hidden-tablet">
      <!-- Confusing, but this is only shown when in mobile view -->
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
          <p>
            <button class="button is-primary is-outlined is-fullwidth" v-if="person.isFollowed" @click="toggleFollowing(person)">following</button>
            <button class="button is-primary is-fullwidth" v-else @click="toggleFollowing(person)">follow</button>
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
    <div class="is-hidden-mobile">
      <!-- Confusing, but this is only shown when NOT in mobile view -->
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
