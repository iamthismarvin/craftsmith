<template>
  <div class="flex flex-row justify-between items-center text-white font-bold w-full h-10">
    <div class="flex flex-row items-center">
      <img class="h-6 mr-1" src="@/assets/images/craftsmith-logo.svg" />
      <div>Craftsmith</div>
    </div>
    <svg
      @click="handleMenu"
      class="h-6 cursor-pointer  "
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.25"
        d="M4 6h16M4 12h16M4 18h16"
      ></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    user: Object,
  },
  methods: {
    handleMenu() {
      this.$emit('handle-menu');
    },
  },
};
</script>
