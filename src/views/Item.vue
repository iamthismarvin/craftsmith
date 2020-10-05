<template>
  <div class="p-2">
    <!-- TODO: Create weapon image component. Include enchantment and rarity. -->
    <ItemPreview
      :enchantment="item.enchantment"
      :image="item.image"
      :rarity="item.rarity"
      class="flex justify-center items-center w-full"
    />
    <button @click="enchantItem" class="bg-purple-600 hover:bg-purple-700 mb-1">Enchant</button>
    <button @click="dismantleItem" class="bg-orange-600 hover:bg-orange-700 mb-1">Dismantle</button>
    <button @click="sellItem" class="bg-green-600 hover:bg-green-700 mb-1">Sell</button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Item',
  data: () => ({
    item: {
      enchantment: 0,
      image: 'sword.png',
      rarity: 0,
    },
  }),
  components: {
    ItemPreview: defineAsyncComponent(() => import('@/components/ItemPreview.vue')),
  },
  methods: {
    // Make the following methods mutations and actions.
    enchantItem() {
      console.log('Enchanting Item. There is a possibility it may fail and lower enchantment.');
      this.item.enchantment += 1;
    },
    dismantleItem() {
      console.log('Dismantling Item. You will gain item knowledge and get back some materials.');
      this.item.rarity += 1;
    },
    sellItem() {
      console.log('Selling Item. Money pleeease!');
      this.$router.push({ name: 'Storage' });
    },
  },
};
</script>
