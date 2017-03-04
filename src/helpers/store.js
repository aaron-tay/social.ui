// Poor-mans implementation of a store/api service with data
import Vue from 'vue';
import lodash from 'lodash';
import numeral from 'numeral';
import chance from './chance';

const MAX_NUMBER = (10 ** 9);
const localState = {
  people: {},
};

function setPerson(person) {
  Vue.set(localState.people, person.profileId, person);
}

function prettyNumber(number) {
  return numeral(number).format('0.0a');
}

function generateCollection() {
  return {
    name: chance.word(),
    snippet: chance.sentence({ words: 5 }),
    stats: {
      count: chance.natural({ max: 100 }),
    },
  };
}

function generateProfileId() {
  // This short length gives us some collisions
  return chance.hash({ length: 6 });
}

function generateLiteProfile() {
  const profileId = generateProfileId();

  const existingProfile = localState.people[profileId];
  if (existingProfile) {
    return existingProfile;
  }

  const liteProfile = {
    profileId,
    name: chance.name(),
    bio: chance.paragraph(),
    avatarUrl: 'https://placehold.it/256x256',
    isFollowed: chance.bool(),
    isLite: true,
  };

  setPerson(liteProfile);
  return liteProfile;
}

function generateProfile({ profileId, name, bio, avatarUrl, isFollowed }) {
  const theProfileId = profileId || generateProfileId();

  const existingProfile = localState.people[theProfileId];
  if (existingProfile && !existingProfile.isLite) {
    return existingProfile;
  }

  const profile = {
    profileId: theProfileId,
    name: name || chance.name(),
    bio: bio || chance.paragraph(),
    avatarUrl: avatarUrl || 'https://placehold.it/256x256',
    isFollowed: isFollowed || chance.bool(),
    isLite: false,
    stats: {
      item: prettyNumber(chance.natural({ max: MAX_NUMBER })),
      collection: prettyNumber(chance.natural({ max: MAX_NUMBER })),
      followee: prettyNumber(chance.natural({ max: MAX_NUMBER })),
      follower: prettyNumber(chance.natural({ max: MAX_NUMBER })),
    },
    collectionList: lodash.times(5, generateCollection),
    followersList: lodash.times(10, generateLiteProfile),
    followingList: lodash.times(10, generateLiteProfile),
  };

  setPerson(profile);
  return profile;
}

// NOTE(ajt): We'll run out of memory by storing too many things but for
// the purposes of a prototype, this is probably fine ;)
function getProfileById(profileId) {
  console.log('DEPRECATED - Migrating to VUEX', 'store.js:getProfileById', profileId);
  let profile = localState.people[profileId];

  // Does a 'lazy load'
  if (!profile) {
    profile = generateProfile({ profileId });
  } else if (profile && profile.isLite) {
    const existingLiteProfile = profile;
    profile = generateProfile(existingLiteProfile);
  }
  return profile;
}

function toggleFollowState(profileId) {
  localState.people[profileId].isFollowed = !localState.people[profileId].isFollowed;
}

export default {
  getProfileById,
  toggleFollowState,
  people: localState.people,
};
