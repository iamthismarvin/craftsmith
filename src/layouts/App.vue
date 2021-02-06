<template>
  <div class="app bg-purple-900 min-h-screen">
    <Navigation @handle-menu="$router.push('/')" class="absolute top-0 w-full" />
    <Activity :entries="log" class="pt-12 px-4 " />
    <main class="app__body absolute h-full overflow-auto text-white w-full">
      <slot />
    </main>
    <Menu class="absolute bottom-0" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Activity: defineAsyncComponent(() => import('@/components/Activity.vue')),
    Menu: defineAsyncComponent(() => import('@/components/Menu/Menu.vue')),
    Navigation: defineAsyncComponent(() => import('@/components/Navigation.vue')),
  },
  computed: {
    ...mapGetters({
      log: 'log/log',
    }),
  },
};
</script>
<style lang="scss" scoped>
.app {
  background-image: url('~@/assets/images/topography.svg');

  &__body {
    max-height: calc(100vh - 18.5rem);
    top: 14.5rem;
  }
}
</style>
