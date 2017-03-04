<template>
  <div>
    <keep-alive>
      <component :is="activeComponent" :profileId="profileId"></component>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import store from '@/helpers/store';
import ProfileTopDown from '@/components/ProfileLayout--TopDown';
import ProfileNarrowWide from '@/components/ProfileLayout--NarrowWide';
import ProfileHeroSidebar from '@/components/ProfileLayout--HeroSidebar';

export default {
  props: ['profileId'],
  components: {
    'top-down': ProfileTopDown,
    'narrow-wide': ProfileNarrowWide,
    'hero-sidebar': ProfileHeroSidebar,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'routeQueryParams',
      'profileLayoutStyle',
    ]),
    activeComponent() {
      return this.profileLayoutStyle;
    },
  },
  methods: {
    ...mapActions([
      'setProfileLayoutStyle',
    ]),
    maybeUpdateProfileLayoutStyle() {
      if (this.routeQueryParams && this.routeQueryParams.layout) {
        const layoutStyle = this.routeQueryParams.layout;
        this.setProfileLayoutStyle({ layoutStyle });
      }
    },
  },
  created() {
    this.maybeUpdateProfileLayoutStyle();
  },
  watch: {
    routeQueryParams() {
      this.maybeUpdateProfileLayoutStyle();
    },
  },
  beforeRouteEnter(to, from, next) {
    store.getProfileById(to.params.profileId);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    store.getProfileById(to.params.profileId);
    next();
  },
};
</script>
