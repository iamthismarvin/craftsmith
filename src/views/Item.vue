<template>
  <div class="p-2">
    <!-- TODO: Create weapon image component. Include enchantment and rarity. -->
    <ItemPreview
      :enchantment="item.enchantment"
      :image="item.image"
      :rarity="item.rarity"
      class="flex justify-center items-center w-full"
    />
    <button @click="enchantItem(item.enchantment)" class="bg-purple-600 hover:bg-purple-700 mb-1">
      Enchant
    </button>
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
    enchantItem(currentEnchantment) {
      const enchantmentValidity = currentEnchantment >= 0 && currentEnchantment <= 9;
      if (enchantmentValidity) {
        console.log('Enchanting Item. There is a possibility it may fail and lower enchantment.');
        console.log(`Your current enchantment is: +${currentEnchantment}`);
        const probabilityTable = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
        const probabilityRoll = Math.floor(Math.random() * 100);
        const enchantmentResult = probabilityRoll >= probabilityTable[currentEnchantment];
        if (enchantmentResult) {
          this.item.enchantment += 1;
          console.log(
            `Item Enchantment Successful! Current Enchantment: +${this.item.enchantment}.`,
          );
        } else {
          console.log(`Item Enchanment Failed. Current Enchantment: +${this.item.enchantment}.`);
        }
      } else {
        console.log('Further enchantment on this item is not possible.');
      }
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
