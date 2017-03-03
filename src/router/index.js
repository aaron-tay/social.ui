import Vue from 'vue';
import lodash from 'lodash';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import ProfileTopDown from '@/components/ProfileLayout--TopDown';
import ProfileNarrowWide from '@/components/ProfileLayout--NarrowWide';
import ProfileItems from '@/components/ProfileItems';
import ProfileCollections from '@/components/ProfileCollections';
import ProfilePeople from '@/components/ProfilePeople';

Vue.use(Router);

// NOTE(ajt): Crude way to sample different profiles without adding more routes
// Need to find a way to do this toggling via query params, which might require
// an abstract 'wrapper' component
const TheProfile = lodash.sample([ProfileTopDown, ProfileNarrowWide]);

export default new Router({
  routes: [
    {
      path: '/u/:profileId',
      name: 'profile',
      component: TheProfile,
      props: true,
      children: [
        {
          path: 'i',
          name: 'profile/items',
          component: ProfileItems,
        },
        {
          path: 'c',
          name: 'profile/collections',
          component: ProfileCollections,
        },
        {
          path: 'e',
          name: 'profile/following',
          component: ProfilePeople,
        },
        {
          path: 'r',
          name: 'profile/followers',
          component: ProfilePeople,
        },
        {
          // Handle base case of directly accessing the root of a profile
          path: '',
          redirect: {
            name: 'profile/items',
          },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      props: true,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      props: true,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      props: true,
    },
  ],
});
