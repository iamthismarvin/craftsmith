import { createRouter, createWebHistory } from 'vue-router';
import createStore from '@/store/index';
import Default from '@/layouts/Default.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { layout: Default, requiresAuth: true },
  },
  {
    path: '/combat',
    name: 'Combat',
    component: () => import('@/views/Combat.vue'),
    meta: { layout: Default, requiresAuth: true },
  },
  {
    path: '/craft',
    name: 'Craft',
    component: () => import('@/views/Craft.vue'),
    meta: { layout: Default, requiresAuth: true },
  },
  {
    path: '/storage',
    name: 'Storage',
    component: () => import('@/views/Storage.vue'),
    meta: { layout: Default, requiresAuth: true },
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('@/views/Stats.vue'),
    meta: { layout: Default, requiresAuth: true },
  },
  {
    path: '/characters',
    name: 'Characters',
    component: () => import('@/views/Characters.vue'),
    meta: { layout: Default, requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const checkStateId = (store: any) => {
  return store.state.user.id ? store.state.user.id : false;
};

const checkLocalStorageId = () => {
  return localStorage.getItem('id') ? localStorage.getItem('id') : false;
};

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const store = createStore;
    const stateId = checkStateId(store);
    if (stateId) {
      next();
    } else {
      const localStorageId = checkLocalStorageId();
      if (localStorageId) {
        await store.dispatch('user/UPDATE_USER');
        next();
      } else {
        next({ name: 'Characters' });
      }
    }
  } else {
    next();
  }
});

export default router;
