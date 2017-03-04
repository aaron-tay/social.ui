<template>
  <div>
    <p class="control">
      <span class="select">
        <select v-model="selectedLayout">
          <template v-for="layoutStyle in layoutStyles">
            <option :value="layoutStyle">{{layoutStyle}}</option>
          </template>
        </select>
      </span>
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      layoutStyles: ['top-down', 'narrow-wide', 'hero-sidebar'],
    };
  },
  computed: {
    ...mapGetters([
      'profileLayoutStyle',
    ]),
    selectedLayout: {
      get() {
        return this.profileLayoutStyle;
      },
      set(layoutStyle) {
        this.setProfileLayoutStyle({ layoutStyle });
      },
    },
  },
  methods: {
    ...mapActions([
      'setProfileLayoutStyle',
    ]),
  },
};
</script>
