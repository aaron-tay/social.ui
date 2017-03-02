<template>
  <div class="profile-collection">
    <hr />
    <div class="columns is-mobile">
      <div class="column">
        <template v-for="person in personList">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64 sui-avatar">
                <img :src="person.avatarUrl" />
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ person.name }}</strong>
                  <br />
                  <span>
                    {{ person.bio }}
                  </span>
                </p>
              </div>
            </div>
            <div class="media-right">
              <button class="button is-primary is-outlined" v-if="person.isFollowed" @click="toggleFollowing(person)">following</button>
              <button class="button is-primary" v-else @click="toggleFollowing(person)">follow</button>
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
      personList: lodash.times(12, () => ({
        name: chance.name(),
        bio: chance.sentence({ words: 5 }),
        avatarUrl: 'https://placehold.it/256x256',
        isFollowed: chance.bool(),
      })),
    };
  },
  created() {
    // fetch data
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
