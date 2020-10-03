<template>
  <div class="default min-h-screen bg-purple-900">
    <Navigation @handle-menu="$router.push('/')" class="absolute top-0 w-full" />
    <main class="overflow-auto text-white w-full absolute h-full">
      <slot />
    </main>
    <Menu class="absolute bottom-0" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Default',
  components: {
    Menu: defineAsyncComponent(() => import('@/components/Menu.vue')),
    Navigation: defineAsyncComponent(() => import('@/components/Navigation.vue')),
  },
};
</script>
<style lang="scss" scoped>
main {
  max-height: calc(100vh - 7rem);
  top: 3rem;
}
.default {
  background-image: url('~@/assets/images/topography.svg');
}
</style>
