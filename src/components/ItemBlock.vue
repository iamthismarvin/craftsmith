<template>
  <div v-if="item">
    <ItemBlockTab
      v-on:toggle="toggleDetails"
      :name="item.name"
      :enchantment="item.enchantment"
      :rating="item.rating"
      :active="active"
    />
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
        <button @click="enchantEquipment" class="bg-purple-600 hover:bg-purple-700">
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
import { mapActions } from 'vuex';
import { enchantItem } from '@/utilities/database';
import helpers from '@/mixins/helpers';

export default {
  name: 'ItemBlock',
  props: {
    item: Object,
  },
  mixins: [helpers],
  components: {
    ItemBlockTab: defineAsyncComponent(() => import('@/components/ItemBlockTab')),
    ItemPreview: defineAsyncComponent(() => import('@/components/ItemPreview.vue')),
  },
  data: () => ({
    active: false,
  }),
  methods: {
    ...mapActions({
      CREATE_LOG_ENTRY: 'log/CREATE_LOG_ENTRY',
    }),
    async enchantEquipment() {
      const result = await enchantItem(this.item.id);
      switch (result) {
        case 'ESUCCESS':
          this.CREATE_LOG_ENTRY(
            `Successfuly enchanted ${this.item.name} to +${this.item.enchantment}.`,
          );
          break;
        case 'EFAILURE':
          this.CREATE_LOG_ENTRY(`Failed to enchant ${this.item.name}.`);
          break;
        case 'EMAX':
          this.CREATE_LOG_ENTRY(`${this.item.name} has reached max enchantment.`);
          break;
        default:
          this.CREATE_LOG_ENTRY(`Error: result = ${result}`);
          break;
      }
    },
    toggleDetails() {
      this.active = !this.active;
    },
  },
};
</script>
