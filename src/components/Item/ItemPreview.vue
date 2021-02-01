<template>
  <div class="item-preview">
    <div
      class="bg-gray-900 border-solid rounded-md"
      :class="[dimensions]"
      :style="{ 'border-color': getRatingColor(rating) }"
    >
      <img :src="require(`@/assets/items/${image}`)" alt="item" class="item-preview__image" />
    </div>
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

<style lang="scss" scoped>
.item-preview {
  &__image {
    transform: rotateZ(35deg);
  }
}
</style>
