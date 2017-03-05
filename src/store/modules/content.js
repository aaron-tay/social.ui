// import Vue from 'vue';
import api from '@/helpers/api';
// import * as MUTATIONS from './../mutation-types';

const localState = {
  content: [],
  collections: [],
  contentOwnerUserId: null,
};

const localGetters = {
  items: state => state.content,
  collections: state => state.collections,
  itemOwner: (state, getters) => getters.userById(state.contentOwnerUserId),
};

const USER_RETRIEVED_CONTENT = 'USER:RETRIEVED:CONTENT';
const USER_RETRIEVED_COLLECTIONS = 'USER:RETRIEVED:COLLECTIONS';

const localActions = {
  fetchContentByUserId({ commit }, { profileId }) {
    const response = api.getContentByUserId(profileId);
    response.then(({ data }) => {
      const content = data;
      commit(USER_RETRIEVED_CONTENT, {
        userId: profileId,
        content,
      });
    });
  },
  fetchCollectionsByUserId({ commit }, { profileId }) {
    const response = api.getCollectionsByUserId(profileId);
    response.then(({ data }) => {
      const collections = data;
      commit(USER_RETRIEVED_COLLECTIONS, {
        userId: profileId,
        collections,
      });
    });
  },
};

/* eslint-disable no-param-reassign */
const localMutations = {
  [USER_RETRIEVED_CONTENT](state, { userId, content }) {
    state.contentOwnerUserId = userId;
    state.content = content;
  },
  [USER_RETRIEVED_COLLECTIONS](state, { userId, collections }) {
    state.contentOwnerUserId = userId;
    state.collections = collections;
  },
};
/* eslint-disable no-param-reassign */

export default {
  state: localState,
  actions: localActions,
  getters: localGetters,
  mutations: localMutations,
};
