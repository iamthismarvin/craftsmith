<template>
  <div class="relative flex justify-center h-20 items-center w-20">
    <img
      :src="require(`@/assets/items/${image}`)"
      alt="item"
      class="item-preview__image absolute bg-gray-900 border-solid rounded-md"
      :style="{ 'border-color': rarityColor }"
    />
    <div
      v-if="enchantment > 0"
      class="item-preview__enchantment absolute bg-purple-600 flex justify-center h-6 items-center rounded-full w-6"
      :style="{ 'background-color': rarityColor }"
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
    rarity: Number,
  },
  computed: {
    rarityColor() {
      let color;
      switch (this.rarity) {
        case 0: {
          color = '#4a5568';
          break;
        }
        case 1: {
          color = '#38a169';
          break;
        }
        case 2: {
          color = '#4299e1';
          break;
        }
        case 3: {
          color = '#805ad5';
          break;
        }
        case 4: {
          color = '#dd6b20';
          break;
        }
        case 5: {
          color = 'red';
          break;
        }
        default:
          color = '#4a5568';
          break;
      }
      return color;
    },
  },
};
</script>

<style lang="scss" scoped>
.item-preview {
  &__enchantment {
    transform: translate(-1.8rem, -1.8rem);
  }
  &__image {
    border-width: 0.25rem;
  }
}
</style>
