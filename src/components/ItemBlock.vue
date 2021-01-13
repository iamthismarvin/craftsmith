<template>
  <div>
    <div
      @click="toggleTab"
      class="bg-gray-900 cursor-pointer flex h-16 items-center justify-between p-2 rounded-md text-gray-300"
    >
      <div class="flex mr-2">
        <img src="#" alt="image" class="mr-2" />
        <div class="font-bold" :style="{ color: ratingColor }">
          {{ item.name }} + {{ item.enchantment }}
        </div>
      </div>
      <svg
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="toggleImage"
        ></path>
      </svg>
    </div>
    <div v-if="active" class="bg-gray-900 justify-start p-2 mt-2 rounded-md">
      <ItemPreview
        :image="item.image"
        :rating="item.rating"
        class="flex justify-center items-center p-4"
      />
      <div class="text-gray-400">
        <div>
          Name:
          <span class="font-bold" :style="`color: ${getRatingColor(item.rating)}`"
            >[{{ item.name }}]
            <span v-if="item.enchantment > 0">+{{ item.enchantment }}</span></span
          >
        </div>
        <div>
          Rating:
          <span class="font-bold" :style="`color: ${getRatingColor(item.rating)}`"
            >[{{ getRatingName(item.rating) }}]</span
          >
        </div>
        <div>Type: [{{ getWeaponType(item.type) }}]</div>
        <div v-if="item.attack">Attack: {{ item.attack.min }} ~ {{ item.attack.max }}</div>
        <div class="italic mt-4">{{ item.description }}</div>
      </div>
      <div class="flex my-2">
        <button @click="enchantEquipment(item.id)" class="bg-purple-600 hover:bg-purple-700">
          Enchant
        </button>
        <button class="bg-orange-600 hover:bg-orange-700 mx-1">
          Dismantle
        </button>
        <button class="bg-green-600 hover:bg-green-700">Sell</button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import ratingMixins from '@/mixins/rating';
import { mapMutations } from 'vuex';

export default {
  name: 'ItemBlock',
  props: {
    item: Object,
  },
  mixins: [ratingMixins],
  components: {
    ItemPreview: defineAsyncComponent(() => import('@/components/ItemPreview.vue')),
  },
  data: () => ({
    active: false,
  }),
  computed: {
    toggleImage() {
      return this.active ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7';
    },
  },
  methods: {
    ...mapMutations({
      enchantEquipment: 'inventory/enchantEquipment',
    }),
    toggleTab() {
      this.active = !this.active;
    },
  },
};
</script>
