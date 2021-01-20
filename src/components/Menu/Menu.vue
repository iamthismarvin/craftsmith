<template>
  <div class="flex justify-around bg-gray-900 h-16 w-screen text-white">
    <MenuItem name="Combat" route="Combat" icon="M13 10V3L4 14h7v7l9-11h-7z" />
    <MenuItem
      name="Craft"
      route="Craft"
      icon="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
    <MenuItem
      name="Storage"
      route="Storage"
      icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
    <MenuItem
      name="Stats"
      route="Stats"
      icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Menu',
  components: {
    MenuItem: defineAsyncComponent(() => import('@/components/Menu/MenuItem.vue')),
  },
};
</script>
