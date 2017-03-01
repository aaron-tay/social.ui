import Vue from 'vue';
import Router from 'vue-router';
import Profile from '@/components/Profile';
import ProfileItems from '@/components/ProfileItems';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Profile',
      component: Profile,
      children: [
        {
          path: '',
          component: ProfileItems,
        },
      ],
    },
  ],
});
