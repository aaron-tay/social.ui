<template>
  <div class="profile-collection">
    <div class="columns is-mobile">
      <div class="column">
        <template v-for="collection in collectionList">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="https://placehold.it/256x256" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ collection.name }}</strong>
                  <br />
                  {{ collection.snippet }}
                  <br />
                  {{ collection.stats.count }} items
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
  props: ['person'],
  data() {
    return {
    };
  },
  created() {
    // fetch data
  },
  computed: {
    collectionList() {
      return this.person.collectionList;
    },
  },
};
</script>

<style lang="scss">
</style>
