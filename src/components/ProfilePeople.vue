<template>
  <div class="profile-collection">
    <hr />
    <div class="columns is-mobile">
      <div class="column">
        <template v-for="i in 12">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64 sui-avatar">
                <img src="https://placehold.it/256x256" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>Name</strong>
                  <br />
                  Something I like
                </p>
              </div>
            </div>
            <div class="media-right">

            </div>
          </article>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profileCollections',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
</style>
