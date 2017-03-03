import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Profile from '@/components/Profile';
import ProfileItems from '@/components/ProfileItems';
import ProfileCollections from '@/components/ProfileCollections';
import ProfilePeople from '@/components/ProfilePeople';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/u/:profileId',
      component: Profile,
      props: true,
      children: [
        {
          path: 'i',
          name: 'profile/items',
          component: ProfileItems,
          props: true,
        },
        {
          path: 'c',
          name: 'profile/collections',
          component: ProfileCollections,
          props: true,
        },
        {
          path: 'e',
          name: 'profile/following',
          component: ProfilePeople,
          props: route => ({
            profileId: route.params.profileId,
            peopleListType: 'following',
          }),
        },
        {
          path: 'r',
          name: 'profile/followers',
          component: ProfilePeople,
          props: route => ({
            profileId: route.params.profileId,
            peopleListType: 'followers',
          }),
        },
        {
          // This is the default child
          path: '',
          name: 'profile',
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
