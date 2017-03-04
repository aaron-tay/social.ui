import lodash from 'lodash';

const PROFILE_LAYOUT_TOP_DOWN = 'top-down';
const PROFILE_LAYOUT_NARROW_WIDE = 'narrow-wide';
const PROFILE_LAYOUT_HERO_SIDEBAR = 'hero-sidebar';
const VALID_PROFILE_LAYOUT_STYLES = [
  PROFILE_LAYOUT_TOP_DOWN,
  PROFILE_LAYOUT_NARROW_WIDE,
  PROFILE_LAYOUT_HERO_SIDEBAR,
];

const localState = {
  layoutStyles: {
    profile: PROFILE_LAYOUT_TOP_DOWN,
  },
};

const localGetters = {
  profileLayoutStyle: state => state.layoutStyles.profile,
};

const UI_SET_PROFILE_LAYOUT_STYLE = 'UI:SET:PROFILE:LAYOUT_STYLE';

const localActions = {
  setProfileLayoutStyle({ commit }, { layoutStyle }) {
    const found = lodash.find(VALID_PROFILE_LAYOUT_STYLES, (item => item === layoutStyle));

    commit(UI_SET_PROFILE_LAYOUT_STYLE, {
      layoutStyle: found,
    });
  },
};

/* eslint-disable no-param-reassign */
const localMutations = {
  [UI_SET_PROFILE_LAYOUT_STYLE](state, { layoutStyle = PROFILE_LAYOUT_TOP_DOWN }) {
    state.layoutStyles.profile = layoutStyle;
  },
};
/* eslint-disable no-param-reassign */

export default {
  state: localState,
  actions: localActions,
  getters: localGetters,
  mutations: localMutations,
};
