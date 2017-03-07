import lodash from 'lodash';
import moment from 'moment';
import Chance from 'chance';

function imageUrl(width, height, category = '', stabilityHash = lodash.uniqueId('r')) {
  return [
    `https://placehold.it/${width}x${height}?text=${category}+${stabilityHash}`,
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

function generateCollection({ itemIds, chance }) {
  const collectionId = chance.hash({ length: 12 });
  const collection = {
    collectionId,
    name: chance.word(),
    description: chance.paragraph({ sentences: 3 }),
    itemIds,
  };

  return collection;
}

function generateCuratedContent({ profileIds, seed = 5330 } = {}) {
  const chance = new Chance(seed);

  const listContent = lodash.map(profileIds, (profileId) => {
    const numberOfItems = chance.natural({ max: 30 });
    const numberOfCollections = chance.natural({ max: numberOfItems / 2 });

    const items = lodash.times(numberOfItems, () => generateItem({ chance }));
    const collections = lodash.times(numberOfCollections, () => {
      const itemsForCollection = chance.pickset(items, chance.natural({ max: numberOfItems }));
      const itemIds = lodash.map(itemsForCollection, 'itemId');
      return generateCollection({
        itemIds,
        chance,
      });
    });

    const content = {
      profileId,
      items,
      collections,
    };
    return content;
  });
  const contents = lodash.keyBy(listContent, 'profileId');

  return {
    contents,
  };
}

function generateChatMessage({ profileId, chance }) {
  const messageId = chance.hash();
  return {
    messageId,
    ownerProfileId: profileId,
    timestamp: moment().unix(),
    content: chance.paragraph(),
  };
}

function generateChatRoom({ profileIds, chance }) {
  const chatId = chance.hash({ length: 16 });
  const numberOfMessages = chance.natural({ max: lodash.size(profileIds) * 2 });
  return {
    chatId,
    title: chance.word(),
    messages: lodash.times(numberOfMessages, () => {
      const profileId = chance.pickone(profileIds);
      return generateChatMessage({ profileId, chance });
    }),
    participants: profileIds,
  };
}

function generateChats({ profileIds, seed = 5330 } = {}) {
  const chance = new Chance(seed);

  const numberOfChatRooms = chance.natural({ max: 10 });
  const listChatRooms = lodash.times(numberOfChatRooms, () => {
    const numberOfPeople = chance.natural({ max: lodash.size(profileIds) });
    const participants = chance.pickset(profileIds, numberOfPeople);
    return generateChatRoom({ profileIds: participants, chance });
  });
  const chatRooms = lodash.keyBy(listChatRooms, 'chatId');

  return {
    chatRooms,
  };
}

export default {
  generateSocialNetwork,
  generateCuratedContent,
  generateChats,
};
