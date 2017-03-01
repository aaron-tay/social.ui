<template>
  <div class="profile-items">
    <div class="columns is-multiline is-mobile">
      <template v-for="i in 12">
        <div class="column is-one-third">
          <div class="image is-1by1">
            <img src="https://placehold.it/256x256" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profileItems',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
</style>
