<template>
  <div class="profile-collection">
    <hr />
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
import Chance from 'chance';
import lodash from 'lodash';

const chance = new Chance();

export default {
  name: 'profileCollections',
  data() {
    return {
      collectionList: lodash.times(5, () => ({
        name: chance.word(),
        snippet: chance.sentence({ words: 5 }),
        stats: {
          count: chance.natural({ max: 100 }),
        },
      })),
    };
  },
  created() {
    // fetch data
  },
};
</script>

<style lang="scss">
</style>
