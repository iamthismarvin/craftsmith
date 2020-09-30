<template>
  <div class="min-h-screen bg-purple-900">
    <div>
      <header>
        <Navigation @handle-menu="null" class="p-2 absolute top-0" />
      </header>
      <main class="overflow-auto top-auto text-white w-full">
        <Console class="p-4" :entries="log" />
        <slot />
      </main>
    </div>
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
    Console: defineAsyncComponent(() => import('@/components/Activity.vue')),
    Menu: defineAsyncComponent(() => import('@/components/Menu.vue')),
    Navigation: defineAsyncComponent(() => import('@/components/Navigation.vue')),
  },
};
</script>
<style lang="scss" scoped>
main {
  max-height: calc(100vh - 7rem);
  position: absolute;
  top: 2.5rem;
}
</style>
