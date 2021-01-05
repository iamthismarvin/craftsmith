<template>
  <div class="bg-gray-900 border-solid p-2">
    <p>
      Name: <span class="font-bold" :style="`color: ${ratingColor}`">[{{ details.name }}]</span>
    </p>
    <p>
      Rating:
      <span class="font-bold" :style="`color: ${ratingColor}`"
        >[{{ getRatingName(details.rating) }}]</span
      >
    </p>
    <p>Type: [{{ details.type }}]</p>
    <p v-if="details.attack">Attack: {{ details.attack.min }} ~ {{ details.attack.max }}</p>
    <p class="italic mt-4">{{ details.description }}</p>
  </div>
</template>

<script>
export default {
  name: 'ItemDetails',
  props: {
    details: Object,
  },
  computed: {
    ratingColor() {
      let color;
      switch (this.details.rating) {
        case 0: {
          // color = '#4a5568';
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
          color = '#ff0000';
          break;
        }
        default:
          // color = '#4a5568';
          break;
      }
      return color;
    },
  },
  methods: {
    getRatingName(rating) {
      const names = ['Common', 'Rare', 'Epic', 'Unique', 'Legendary', 'Myth'];
      return names[rating];
    },
  },
};
</script>

<style lang="scss" scoped></style>
