<template>
  <div class="app bg-purple-900 flex flex-col justify-between min-h-full">
    <Navigation />
    <div class="flex flex-col landscape:flex-row">
      <Activity :entries="log" class="p-4 landscape:w-2/5" />
      <main
        ref="main"
        class="overflow-auto text-white landscape:w-3/5"
        :style="{ height: appHeight }"
      >
        <slot />
      </main>
    </div>
    <Menu />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  }),
  components: {
    Activity: defineAsyncComponent(() => import('@/components/Activity.vue')),
    Menu: defineAsyncComponent(() => import('@/components/Menu/Menu.vue')),
    Navigation: defineAsyncComponent(() => import('@/components/Navigation.vue')),
  },
  computed: {
    ...mapGetters({
      log: 'log/log',
    }),
    appHeight() {
      const { windowHeight } = this;
      const { windowWidth } = this;
      const navigationHeight = 3;
      const activityHeight = 12.5;
      const menuHeight = 4;
      const portraitHeight = `calc(${windowHeight}px - ${navigationHeight}rem - ${activityHeight}rem - ${menuHeight}rem)`;
      const landscapeHeight = `calc(${windowHeight}px - ${navigationHeight}rem - ${menuHeight}rem)`;
      return windowHeight >= windowWidth ? portraitHeight : landscapeHeight;
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
    scrollToTop() {
      const { main } = this.$refs;
      main.scrollTop = 0;
    },
  },
  watch: {
    $route() {
      this.scrollToTop();
    },
  },
};
</script>
<style lang="scss" scoped>
.app {
  background-image: url('~@/assets/images/topography.svg');
}
</style>
