<template>
  <div class="p-2">
    <!-- TODO: Create weapon image component. Include enchantment and rarity. -->
    <button @click="enchantItem" class="bg-purple-600 hover:bg-purple-700 mb-1">Enchant</button>
    <button @click="dismantleItem" class="bg-orange-600 hover:bg-orange-700 mb-1">Dismantle</button>
    <button @click="sellItem" class="bg-green-600 hover:bg-green-700 mb-1">Sell</button>
  </div>
</template>

<script>
export default {
  name: 'Item',
  methods: {
    // Make the following methods mutations and actions.
    enchantItem() {
      console.log('Enchanting Item. There is a possibility it may fail and lower enchantment.');
    },
    dismantleItem() {
      console.log('Dismantling Item. You will gain item knowledge and get back some materials.');
    },
    sellItem() {
      console.log('Selling Item. Money pleeease!');
      this.$router.push({ name: 'Storage' });
    },
  },
};
</script>
