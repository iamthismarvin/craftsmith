<template>
  <div class="flex justify-around bg-gray-900 h-16">
    <MenuItem
      name="Craft"
      route="Craft"
      icon="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
    <MenuItem name="Gather" route="Gather" icon="M13 10V3L4 14h7v7l9-11h-7z" />
    <MenuItem name="Shop" route="Shop" icon="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    <MenuItem
      name="Stats"
      route="Stats"
      icon="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Menu',
  components: {
    MenuItem: defineAsyncComponent(() => import('@/components/MenuItem.vue')),
  },
};
</script>

<style lang="scss" scoped></style>
