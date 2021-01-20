import { createRouter, createWebHistory } from 'vue-router';
import Default from '@/layouts/Default.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { layout: Default },
  },
  {
    path: '/combat',
    name: 'Combat',
    component: () => import('@/views/Combat.vue'),
    meta: { layout: Default },
  },
  {
    path: '/craft',
    name: 'Craft',
    component: () => import('@/views/Craft.vue'),
    meta: { layout: Default },
  },
  {
    path: '/storage',
    name: 'Storage',
    component: () => import('@/views/Storage.vue'),
    meta: { layout: Default },
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('@/views/Stats.vue'),
    meta: { layout: Default },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;