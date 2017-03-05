import lodash from 'lodash';
import Chance from 'chance';

function generateProfile({ profileId, chance }) {
  const profile = {
    profileId,
    name: chance.name(),
    bio: chance.paragraph(),
    avatarUrl: 'https://placehold.it/256x256',
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

  const listOfStats = lodash.map(profileIdPool, (profileId) => {
    // const profile = profiles[profileId];
    const relationship = relationships[profileId];
    return {
      profileId,
      followee: lodash.size(relationship.followeeIds),
      follower: 0,
    };
  });
  const stats = lodash.keyBy(listOfStats, 'profileId');

  return {
    profiles,
    relationships,
    stats,
  };
}

export default {
  generateSocialNetwork,
};
