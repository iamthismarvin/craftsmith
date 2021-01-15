<template>
  <div class="item-preview">
    <img
      :src="require(`@/assets/items/${image}`)"
      alt="item"
      class="item-preview__image bg-gray-900 border-solid h-32 md:h-48 rounded-md w-32 md:w-48"
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
  },
  mixins: [helpers],
};
</script>

<style lang="scss" scoped>
.item-preview {
  &__image {
    border-width: 0.5rem;
  }
}
</style>
