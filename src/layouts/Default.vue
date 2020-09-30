<template>
  <div class="min-h-screen bg-purple-900">
    <header class="absolute top-0 w-full">
      <Navigation @handle-menu="$router.push('/')" class="" />
      <Activity class="px-4 my-2" :entries="log" />
    </header>
    <main class="overflow-auto text-white w-full absolute">
      <slot />
    </main>
    <Menu class="absolute bottom-0" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Default',
  data: () => ({
    log: [],
    inventory: {
      items: 0,
      materials: 0,
    },
  }),
  components: {
    Activity: defineAsyncComponent(() => import('@/components/Activity.vue')),
    Menu: defineAsyncComponent(() => import('@/components/Menu.vue')),
    Navigation: defineAsyncComponent(() => import('@/components/Navigation.vue')),
  },
};
</script>
<style lang="scss" scoped>
main {
  max-height: calc(100vh - 18.5rem);
  top: 14.5rem;
}
</style>
