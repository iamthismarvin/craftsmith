<template>
  <div class="relative flex justify-center h-48 items-center w-48">
    <img
      :src="require(`@/assets/items/${image}`)"
      alt="item"
      class="item-preview__image absolute bg-gray-900 border-solid h-40 rounded-sm w-40"
      :style="{ 'border-color': ratingColor }"
    />
    <div
      v-if="enchantment > 0"
      class="item-preview__enchantment absolute bg-purple-600 flex font-bold justify-center h-10 items-center rounded-full w-10"
      :style="{ 'background-color': ratingColor }"
    >
      {{ enchantment }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemPreview',
  props: {
    enchantment: Number,
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
  &__enchantment {
    transform: translate(-4.5rem, -4.5rem);
  }
  &__image {
    border-width: 0.5rem;
  }
}
</style>
