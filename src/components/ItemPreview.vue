<template>
  <div class="item-preview">
    <img
      :src="require(`@/assets/items/${image}`)"
      alt="item"
      class="bg-gray-900 border-solid rounded-md"
      :class="[dimensions]"
      :style="{ 'border-color': getRatingColor(rating) }"
    />
  </div>
</template>

<script>
import helpers from '@/mixins/helpers';

export default {
  name: 'ItemPreview',
  props: {
    image: String,
    rating: Number,
    size: String,
  },
  mixins: [helpers],
  computed: {
    dimensions() {
      return this.size === 'small' ? 'h-12 w-12 border-4' : 'h-32 w-32 border-8';
    },
  },
};
</script>
