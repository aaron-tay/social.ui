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
              <div class="content max-lines--one-plus-three">
                <p>
                  <strong>{{ collection.name }}</strong> <small>({{ collection.counts.items }} items)</small>
                  <br />
                  {{ collection.description }}
                  <br />

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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'profileCollections',
  props: ['person'],
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters({
      collectionList: 'collections',
    }),
  },
  methods: {
    ...mapActions([
      'fetchCollectionsByUserId',
    ]),
    fetchData() {
      this.fetchCollectionsByUserId({
        profileId: this.person.profileId,
      });
    },
  },
  created() {
    this.fetchData();
  },
  watch: {
    person(current, previous) {
      if (current !== previous) {
        this.fetchData();
      }
    },
  },
};
</script>

<style lang="scss">
</style>
