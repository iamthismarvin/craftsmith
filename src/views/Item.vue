<template>
  <div class="p-4">
    <ItemDetails :details="item" class="mb-4" />
    <div class="flex mb-1">
      <button @click="enchantItem(item.enchantment)" class="bg-purple-600 hover:bg-purple-700">
        Enchant
      </button>
      <button @click="dismantleItem" class="bg-orange-600 hover:bg-orange-700 mx-1">
        Dismantle
      </button>
      <button @click="sellItem" class="bg-green-600 hover:bg-green-700">Sell</button>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Item',
  data: () => ({
    item: {
      name: 'Sword of Beginnings',
      image: 'sword.png',
      rating: 0,
      type: 'Sword',
      attack: { min: 100, max: 200 },
      enchantment: 0,
      description: `Every adventurer has a beginning. This sword will get you started.`,
    },
  }),
  components: {
    ItemDetails: defineAsyncComponent(() => import('@/components/ItemDetails.vue')),
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
      this.item.rating += 1;
    },
    sellItem() {
      console.log('Selling Item. Money pleeease!');
      this.$router.push({ name: 'Storage' });
    },
  },
};
</script>
