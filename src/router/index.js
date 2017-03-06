import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Profile from '@/components/Profile';
import ProfileItems from '@/components/ProfileItems';
import ProfileCollections from '@/components/ProfileCollections';
import ProfileFollowing from '@/components/ProfileFollowing';
import ProfileFollowers from '@/components/ProfileFollowers';
import ChatRoom from '@/components/ChatRoom';

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
          component: ProfileFollowing,
          props: true,
        },
        {
          path: 'r',
          name: 'profile/followers',
          component: ProfileFollowers,
          props: true,
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
      path: '/c/:chatId',
      name: '/chatroom',
      component: ChatRoom,
      props: true,
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
