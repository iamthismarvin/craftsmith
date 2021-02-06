import { createRouter, createWebHistory } from 'vue-router';
import createStore from '@/store/index';
import { CharacterState } from '@/utilities/interfaces';
import App from '@/layouts/App.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { layout: App, requiresAuth: true },
  },
  {
    path: '/combat',
    name: 'Combat',
    component: () => import('@/views/Combat.vue'),
    meta: { layout: App, requiresAuth: true },
  },
  {
    path: '/craft',
    name: 'Craft',
    component: () => import('@/views/Craft.vue'),
    meta: { layout: App, requiresAuth: true },
  },
  {
    path: '/storage',
    name: 'Storage',
    component: () => import('@/views/Storage.vue'),
    meta: { layout: App, requiresAuth: true },
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('@/views/Stats.vue'),
    meta: { layout: App, requiresAuth: true },
  },
  {
    path: '/characters',
    name: 'Characters',
    component: () => import('@/views/Characters.vue'),
    meta: { layout: App, requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const checkCharacterStateID = (store: any) => {
  return store.state.character.id ? store.state.character.id : false;
};

const checkLocalStorageID = () => {
  return localStorage.getItem('id') ? localStorage.getItem('id') : false;
};

router.beforeEach(async (to, from, next) => {
  const store = createStore;
  const characterStateID: CharacterState = checkCharacterStateID(store);
  const localStorageID = checkLocalStorageID();

  if (to.meta.requiresAuth) {
    if (characterStateID) {
      next();
    } else if (localStorageID) {
      await store.dispatch('character/SET_CHARACTER_FROM_DB');
      next();
    } else {
      next({ name: 'Characters' });
    }
  } else {
    next();
  }
});

export default router;
