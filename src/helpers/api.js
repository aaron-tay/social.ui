import lodash from 'lodash';
import bootstrap from '@/helpers/bootstrap';

// TODO(ajt): This is our 'fake' API which is backed by random bootstrapped data
const bsSocialNetwork = bootstrap.generateSocialNetwork();
const meUserId = lodash.sample(bsSocialNetwork.profiles).profileId;
console.log('api:meUserId', meUserId);

function realUserId(meOrUserId) {
  const userId = (meOrUserId === 'me' ? meUserId : meOrUserId);
  return userId;
}

// All API responses follow this format (based on IG format)
function envelope(data, meta = { code: 200 }, pagination = {}) {
  return {
    data,
    meta,
    pagination,
  };
}

function isThisUserFollowingThatUser(thisUserId, thatUserId) {
  const followeeIds = bsSocialNetwork.relationships[thisUserId].followeeIds;
  return (followeeIds.indexOf(thatUserId) !== -1);
}

function isMeUserFollowingUser(userId) {
  return isThisUserFollowingThatUser(meUserId, userId);
}

function userIdsFollowingThisUser(userId) {
  return bsSocialNetwork.relationships[userId].followeeIds;
}

function userIdsFollowedByThisUser(userId) {
  const networkUserIdList = lodash.keys(bsSocialNetwork.relationships);
  return lodash.filter(networkUserIdList, (followerId =>
    isThisUserFollowingThatUser(followerId, userId)
  ));
}

function getUserById(iUserId) {
  const userId = realUserId(iUserId);
  const user = bsSocialNetwork.profiles[userId];
  const stats = {
    item: 0,
    collection: 0,
    followee: lodash.size(userIdsFollowingThisUser(userId)),
    follower: lodash.size(userIdsFollowedByThisUser(userId)),
  };
  const isFollowed = isMeUserFollowingUser(userId) || false;
  const isMe = (userId === meUserId);
  const result = {
    ...user,
    isFollowed,
    isMe,
    stats,  // DEPRECATED: use counts
    counts: stats,
  };
  return envelope(result);
}

function getFollowingList(iUserId) {
  const userId = realUserId(iUserId);
  const followeeIds = bsSocialNetwork.relationships[userId].followeeIds;
  const followingList = lodash.map(followeeIds, (followeeId) => {
    const followee = getUserById(followeeId).data;
    return followee;
  });
  const result = followingList;
  return envelope(result);
}

function getFollowersList(iUserId) {
  const userId = realUserId(iUserId);
  // NOTE(ajt): This is a bit more complicated since its calculated based on the inverse
  const followerIds = userIdsFollowedByThisUser(userId);
  const followerList = lodash.map(followerIds, (followerId) => {
    const follower = getUserById(followerId).data;
    return follower;
  });

  const result = followerList;
  return envelope(result);
}

function followUser(iUserId) {
  const userId = realUserId(iUserId);
  const followeeIds = bsSocialNetwork.relationships[meUserId].followeeIds;
  const updated = lodash.uniq(lodash.concat(followeeIds, [userId]));
  bsSocialNetwork.relationships[meUserId].followeeIds = updated;

  const result = getUserById(userId).data;
  return envelope(result);
}

function unfollowUser(iUserId) {
  const userId = realUserId(iUserId);
  const followeeIds = bsSocialNetwork.relationships[meUserId].followeeIds;
  const updated = lodash.reject(followeeIds, (followeeId => followeeId === userId));
  bsSocialNetwork.relationships[meUserId].followeeIds = updated;

  const result = getUserById(userId).data;
  return envelope(result);
}

// turns a function into one which returns a promise.resolve
function promiseApi(fn) {
  return (args => Promise.resolve(fn(args)));
}

export default {
  getUserById: promiseApi(getUserById),
  getFollowingList: promiseApi(getFollowingList),
  getFollowersList: promiseApi(getFollowersList),
  followUser: promiseApi(followUser),
  unfollowUser: promiseApi(unfollowUser),
};
