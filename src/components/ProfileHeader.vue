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
            <span class="button is-primary is-outlined is-fullwidth">follow</span>
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
            <span class="button is-primary is-outlined">follow</span>
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
};
</script>

<style lang="scss">
</style>
