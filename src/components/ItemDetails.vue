<template>
  <div class="bg-gray-900 flex justify-start">
    <ItemPreview
      :enchantment="details.enchantment"
      :image="details.image"
      :rating="details.rating"
      class="flex justify-center items-center w-full"
    />
    <div class="p-2">
      <p>
        Name:
        <span class="font-bold" :style="`color: ${getRatingColor(details.rating)}`"
          >[{{ details.name }}]</span
        >
      </p>
      <p>
        Rating:
        <span class="font-bold" :style="`color: ${getRatingColor(details.rating)}`"
          >[{{ getRatingName(details.rating) }}]</span
        >
      </p>
      <p>Type: [{{ details.type }}]</p>
      <p v-if="details.attack">Attack: {{ details.attack.min }} ~ {{ details.attack.max }}</p>
      <p class="italic mt-4">{{ details.description }}</p>
      <button @click="add"></button>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'ItemDetails',
  props: {
    details: Object,
  },
  components: {
    ItemPreview: defineAsyncComponent(() => import('@/components/ItemPreview.vue')),
  },
  methods: {
    getRatingColor(rating) {
      const colors = ['#ffffff', '#4299e1', '#805ad5', '#dd6b20', '#ffff00', '#ff0000'];
      return colors[rating];
    },
    getRatingName(rating) {
      const names = ['Common', 'Rare', 'Epic', 'Unique', 'Legendary', 'Myth'];
      return names[rating];
    },
  },
};
</script>

<style lang="scss" scoped></style>
