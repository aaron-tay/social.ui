import Vue from 'vue';
import lodash from 'lodash';
import api from '@/helpers/api';
// import * as MUTATIONS from './../mutation-types';

const localState = {
  // <userId>: {}
  users: {},
  following: [],
  followedBy: [],
  activeUserId: 'me',
  meUserId: null,
};

const localGetters = {
  isLoading: state => (state.meUserId === null),
  userById: state => (userId => state.users[userId]),
  realUserId: state => (meOrUserId) => {
    const userId = (meOrUserId === 'me' ? state.meUserId : meOrUserId);
    return userId;
  },
  activeUser: (state, getters) => {
    const userId = getters.realUserId(state.activeUserId);
    const user = getters.userById(userId);
    return user;
  },
  activeFollowing: (state, getters) => {
    const userFollowingList = lodash.map(state.following, (followeeId =>
      getters.userById(followeeId)
    ));
    return userFollowingList;
  },
  activeFollowers: (state, getters) => {
    const userFollowersList = lodash.map(state.followedBy, (followerId =>
      getters.userById(followerId)
    ));
    return userFollowersList;
  },
};

const USER_MAKE_ACTIVE = 'USER:MAKE_ACTIVE';
const USER_RETRIEVED = 'USER:RETRIEVED';
const USER_RETRIEVED_FOLLOWING = 'USER:RETRIEVED:FOLLOWING';
const USER_RETRIEVED_FOLLOWED_BY = 'USER:RETRIEVED:FOLLOWING_BY';
const USER_RETRIEVED_MY_RELATIONSHIPS = 'USER:RETRIEVED:MY_RELATIONSHIPS';
const USER_FOLLOW_USER = 'USER:FOLLOW:USER';
const USER_UNFOLLOW_USER = 'USER:UNFOLLOW:USER';

const localActions = {
  // TODO(ajt): The wrapped profileId is kind of annoying
  // TODO(ajt): pick a term; ['person', 'profile', 'user'] and stick with it! (user)
  setActiveUserId({ commit }, { profileId }) {
    commit(USER_MAKE_ACTIVE, {
      userId: profileId,
    });
  },
  fetchUserById({ commit }, { profileId }) {
    // simulate future
    // const userId = realUserId(profileId);
    const response = api.getUserById(profileId);
    response.then(({ data }) => {
      const user = data;
      commit(USER_RETRIEVED, {
        user,
      });
    });
  },
  fetchUserFollowingList({ commit }, { profileId }) {
    const response = api.getFollowingList(profileId);
    response.then(({ data }) => {
      const followingList = data;
      lodash.forEach(followingList, (followee) => {
        commit(USER_RETRIEVED, {
          user: followee,
        });
      });

      const followingIdList = lodash.map(followingList, 'profileId');
      commit(USER_RETRIEVED_FOLLOWING, {
        followingIdList,
      });
    });
  },
  fetchUserFollowedByList({ commit }, { profileId }) {
    const response = api.getFollowersList(profileId);
    response.then(({ data }) => {
      const followersList = data;
      lodash.forEach(followersList, (follower) => {
        commit(USER_RETRIEVED, {
          user: follower,
        });
      });

      const followerIdList = lodash.map(followersList, 'profileId');
      commit(USER_RETRIEVED_FOLLOWED_BY, {
        followerIdList,
      });
    });
  },
  followUser({ commit }, { profileId }) {
    const response = api.followUser(profileId);

    response.then(({ data }) => {
      const followedUser = data;

      commit(USER_FOLLOW_USER, {
        objectId: profileId,
      });

      commit(USER_RETRIEVED, {
        user: followedUser,
      });
    });
  },
  unfollowUser({ commit }, { profileId }) {
    const response = api.unfollowUser(profileId);

    response.then(({ data }) => {
      const unfollowedUser = data;

      commit(USER_UNFOLLOW_USER, {
        objectId: profileId,
      });

      commit(USER_RETRIEVED, {
        user: unfollowedUser,
      });
    });
  },
};

/* eslint-disable no-param-reassign */
const localMutations = {
  [USER_MAKE_ACTIVE](state, { userId }) {
    state.activeUserId = userId;
  },
  [USER_RETRIEVED](state, { user }) {
    const userId = user.profileId;
    Vue.set(state.users, userId, user);
    if (user.isMe) {
      state.meUserId = user.profileId;
    }
  },
  [USER_RETRIEVED_FOLLOWING](state, { followingIdList }) {
    state.following = followingIdList;
  },
  [USER_RETRIEVED_FOLLOWED_BY](state, { followerIdList }) {
    state.followedBy = followerIdList;
  },
  [USER_RETRIEVED_MY_RELATIONSHIPS](state, { followingIdList }) {
    lodash.forEach(followingIdList, (followeeId) => {
      Vue.set(state.relationship, followeeId, true);
    });
  },
  [USER_FOLLOW_USER](state, { objectId }) {
    const meUserId = state.meUserId;
    state.users[meUserId].stats.followee += 1;
    state.users[objectId].stats.follower += 1;
  },
  [USER_UNFOLLOW_USER](state, { objectId }) {
    const meUserId = state.meUserId;
    state.users[meUserId].stats.followee -= 1;
    state.users[objectId].stats.follower -= 1;
  },
};
/* eslint-disable no-param-reassign */

export default {
  state: localState,
  actions: localActions,
  getters: localGetters,
  mutations: localMutations,
};
