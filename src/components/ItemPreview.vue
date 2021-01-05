<template>
  <div class="item-preview">
    <img
      :src="require(`@/assets/items/${image}`)"
      alt="item"
      class="item-preview__image bg-gray-900 border-solid h-32 md:h-48 rounded-md w-32 md:w-48"
      :style="{ 'border-color': ratingColor }"
    />
  </div>
</template>

<script>
export default {
  name: 'ItemPreview',
  props: {
    image: String,
    rating: Number,
  },
  computed: {
    ratingColor() {
      return this.getRatingColor(this.rating);
    },
  },
  methods: {
    getRatingColor(rating) {
      const colors = ['#ffffff', '#4299e1', '#805ad5', '#dd6b20', '#ffff00', '#ff0000'];
      return colors[rating];
    },
  },
};
</script>

<style lang="scss" scoped>
.item-preview {
  &__image {
    border-width: 0.5rem;
  }
}
</style>
