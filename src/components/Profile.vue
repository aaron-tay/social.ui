<template>
  <div>
    <component :is="activeComponent" :profileId="profileId" v-if="!isLoading"></component>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
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
      'routeParams',
      'routeQueryParams',
      'profileLayoutStyle',
      'isLoading',
    ]),
    activeComponent() {
      return this.profileLayoutStyle;
    },
  },
  methods: {
    ...mapActions([
      'setProfileLayoutStyle',
      'fetchUserById',
      'setActiveUserId',
    ]),
    maybeUpdateProfileLayoutStyle() {
      if (this.routeQueryParams && this.routeQueryParams.layout) {
        const layoutStyle = this.routeQueryParams.layout;
        this.setProfileLayoutStyle({ layoutStyle });
      }
    },
    fetchProfile(profileId) {
      this.fetchUserById({
        profileId,
      });
      this.setActiveUserId({
        profileId,
      });
    },
  },
  created() {
    this.maybeUpdateProfileLayoutStyle();
    this.fetchProfile('me');
    this.fetchProfile(this.routeParams.profileId);
  },
  watch: {
    routeQueryParams() {
      this.maybeUpdateProfileLayoutStyle();
    },
    routeParams(current, previous) {
      if (current.profileId !== previous.profileId) {
        this.fetchProfile(current.profileId);
      }
    },
  },
};
</script>
