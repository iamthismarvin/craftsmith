<template>
  <div class="default min-h-screen bg-purple-900">
    <Navigation @handle-menu="$router.push('/')" class="absolute top-0 w-full" />
    <Activity :entries="log" class="px-4 pt-12" />
    <main class="overflow-auto text-white w-full absolute h-full">
      <slot />
    </main>
    <Menu class="absolute bottom-0" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Default',
  components: {
    Activity: defineAsyncComponent(() => import('@/components/Activity.vue')),
    Menu: defineAsyncComponent(() => import('@/components/Menu.vue')),
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
main {
  max-height: calc(100vh - 18.5rem);
  top: 14.5rem;
}
.default {
  background-image: url('~@/assets/images/topography.svg');
}
</style>
