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

const PROFILE_LAYOUT_NARROW_WIDE = 'narrow-wide';
const PROFILE_LAYOUT_TOP_DOWN = 'top-down';
let layoutType = PROFILE_LAYOUT_TOP_DOWN;

export default {
  props: ['profileId'],
  functional: true,
  render(createElement, iContext) {
    const context = iContext;
    const query = context.parent.$route.query;
    let profileComponent = ProfileTopDown;
    if (query) {
      layoutType = query.layout;
    }
    if (layoutType === PROFILE_LAYOUT_NARROW_WIDE) {
      profileComponent = ProfileNarrowWide;
    }
    return createElement(profileComponent, context.data, context.children);
  },
};
</script>
