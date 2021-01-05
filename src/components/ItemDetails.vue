<template>
  <div class="bg-gray-900 justify-start p-2 rounded-md">
    <ItemPreview
      :image="details.image"
      :rating="details.rating"
      class="flex justify-center items-center p-4"
    />
    <div class="text-gray-400">
      <div>
        Name:
        <span class="font-bold" :style="`color: ${getRatingColor(details.rating)}`"
          >[{{ details.name }}]
          <span v-if="details.enchantment > 0">+{{ details.enchantment }}</span></span
        >
      </div>
      <div>
        Rating:
        <span class="font-bold" :style="`color: ${getRatingColor(details.rating)}`"
          >[{{ getRatingName(details.rating) }}]</span
        >
      </div>
      <div>Type: [{{ details.type }}]</div>
      <div v-if="details.attack">Attack: {{ details.attack.min }} ~ {{ details.attack.max }}</div>
      <div class="italic mt-4">{{ details.description }}</div>
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
