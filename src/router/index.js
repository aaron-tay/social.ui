import Vue from 'vue';
import Router from 'vue-router';
import Profile from '@/components/Profile';
import ProfileItems from '@/components/ProfileItems';
import ProfileCollections from '@/components/ProfileCollections';
import ProfilePeople from '@/components/ProfilePeople';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Profile',
      component: Profile,
      children: [
        {
          path: 'i',
          component: ProfileItems,
        },
        {
          path: 'c',
          component: ProfileCollections,
        },
        {
          path: 'e',
          component: ProfilePeople,
        },
        {
          path: 'r',
          component: ProfilePeople,
        },
      ],
    },
  ],
});
