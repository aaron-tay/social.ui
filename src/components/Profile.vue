<!--
This is a 'functional component' in that its completely abstract.
The actual component rendered is dependant on the query param;
 - layout=[narrow-wide, top-down]...
If valid, that layout will be used but only rendered first load. Route changes will
cause
The layout is only rendered that first time. This is useful for testing but not very practical long term
-->
<script>
import ProfileTopDown from '@/components/ProfileLayout--TopDown';
import ProfileNarrowWide from '@/components/ProfileLayout--NarrowWide';
import ProfileHeroSidebar from '@/components/ProfileLayout--HeroSidebar';

const PROFILE_LAYOUT_NARROW_WIDE = 'narrow-wide';
const PROFILE_LAYOUT_TOP_DOWN = 'top-down';
const PROFILE_LAYOUT_HERO_SIDEBAR = 'hero-sidebar';
let layoutType = PROFILE_LAYOUT_TOP_DOWN;

export default {
  props: ['profileId'],
  functional: true,
  render(createElement, context) {
    const query = context.parent.$route.query;
    let profileComponent = ProfileTopDown;
    if (query && query.layout && query.layout !== layoutType) {
      layoutType = query.layout;
    }
    if (layoutType === PROFILE_LAYOUT_NARROW_WIDE) {
      profileComponent = ProfileNarrowWide;
    } else if (layoutType === PROFILE_LAYOUT_HERO_SIDEBAR) {
      profileComponent = ProfileHeroSidebar;
    }
    return createElement(profileComponent, context.data, context.children);
  },
};
</script>
