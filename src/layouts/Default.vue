<template>
  <div class="default bg-purple-900 min-h-screen">
    <Navigation @handle-menu="$router.push('/')" class="absolute top-0 w-full" />
    <main class="default__body absolute bottom-0 overflow-auto text-white w-full">
      <slot />
    </main>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Default',
  components: {
    Navigation: defineAsyncComponent(() => import('@/components/Navigation.vue')),
  },
};
</script>

<style lang="scss" scoped>
.default {
  background-image: url('~@/assets/images/topography.svg');

  &__body {
    height: calc(100vh - 3rem);
  }
}
</style>
