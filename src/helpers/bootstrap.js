import lodash from 'lodash';
import Chance from 'chance';

function imageUrl(width, height, category = '', stabilityHash = lodash.uniqueId('r')) {
  const randomHash = `random=${stabilityHash}`;
  return [
    `https://placehold.it/${width}x${height}`,
    `http://loremflickr.com/${width}/${height}/${category}?${randomHash}`,
  ];
}

function generateProfile({ profileId, chance }) {
  const profile = {
    profileId,
    name: chance.name(),
    bio: chance.paragraph(),
    avatarUrl: chance.pickone(imageUrl(256, 256, 'people', profileId)),
  };

  return profile;
}

function generateSocialNetwork({ numberOfPeople = 20, seed = 5330 } = {}) {
  // People defines the expected number of people in the social network
  // All data is generated according to the seed for reproducibility
  const chance = new Chance(seed);

  // This pool ensures we have enough user Ids for the desired network.
  const profileIdPool = chance.unique(chance.hash, numberOfPeople, { length: 6 });

  // generate for each profile
  const listProfiles = lodash.map(profileIdPool, (profileId) => {
    const profile = generateProfile({
      profileId,
      chance,
      maxFollowees: numberOfPeople - 1,
    });
    return profile;
  });
  const profiles = lodash.keyBy(listProfiles, 'profileId');

  // For each profile, generate a 1-way relationship to other users
  // The inverse can be calculated later
  const listRelationships = lodash.map(profileIdPool, (profileId) => {
    const filteredProfileIdPool = lodash.reject(profileIdPool, (id => profileId === id));
    const profileIdGenerator = () => chance.pickone(filteredProfileIdPool);
    return {
      profileId,
      type: 'isFollowing',
      followeeIds: chance.unique(profileIdGenerator, chance.natural({ max: numberOfPeople - 1 })),
    };
  });
  const relationships = lodash.keyBy(listRelationships, 'profileId');

  return {
    profileIds: profileIdPool,
    profiles,
    relationships,
  };
}

function generateItem({ chance }) {
  const itemId = chance.hash({ length: 12 });
  const item = {
    itemId,
    type: 'image',
    content: chance.pickone(imageUrl(256, 256, '', itemId)),
    caption: chance.paragraph(),
  };

  return item;
}

function generateCuratedContent({ profileIds, seed = 5330 } = {}) {
  const chance = new Chance(seed);

  const listContent = lodash.map(profileIds, (profileId) => {
    const numberOfItems = chance.natural({ max: 10 });
    // const numberOfCollections = chance.natural({ max: numberOfItems / 2 });

    const items = lodash.times(numberOfItems, () => generateItem({ chance }));

    const content = {
      profileId,
      items,
    };
    return content;
  });
  const contents = lodash.keyBy(listContent, 'profileId');

  return {
    contents,
  };
}

export default {
  generateSocialNetwork,
  generateCuratedContent,
};
