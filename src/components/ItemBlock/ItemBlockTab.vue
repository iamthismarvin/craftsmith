<template>
  <div
    @click="toggleTab"
    class="bg-gray-900 cursor-pointer flex h-16 items-center justify-between p-2 rounded-md text-gray-300"
  >
    <div class="flex items-center mr-2">
      <ItemPreview :image="image" :rating="rating" size="small" class="mr-2" />
      <div class="font-bold" :style="{ color: getRatingColor(rating) }">
        {{ name }} + {{ enchantment }}
      </div>
    </div>
    <svg
      class="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="toggleImage"></path>
    </svg>
  </div>
</template>

<script>
import helpers from '@/mixins/helpers';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'ItemBlockTab',
  props: {
    name: String,
    enchantment: Number,
    rating: Number,
    image: String,
    active: Boolean,
  },
  mixins: [helpers],
  emits: ['toggle'],
  components: {
    ItemPreview: defineAsyncComponent(() => import('@/components/ItemPreview.vue')),
  },
  computed: {
    toggleImage() {
      return this.active ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7';
    },
  },
  methods: {
    toggleTab() {
      this.$emit('toggle');
    },
  },
};
</script>

<style lang="scss" scoped></style>
