import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/users';
import ui from './modules/ui';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  // actions,
  getters: {
    routeQueryParams: (state, allGetters, rootState) => rootState.route.query,
    routeParams: (state, allGetters, rootState) => rootState.route.params,
  },
  modules: {
    users,
    ui,
  },
  strict: debug,
});
