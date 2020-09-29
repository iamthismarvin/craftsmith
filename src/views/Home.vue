<template>
  <div class="home">
    <Console :entries="log" />
    <div class="flex flex-col just justify-center items-center">
      <h1 class="font-bold">Inventory</h1>
      <p>Materials: {{ inventory.materials }}</p>
      <p>Items: {{ inventory.items }}</p>
    </div>
    <button class="button bg-green-600 hover:bg-green-700" @click="gatherMaterials">
      Gather Materials
    </button>
    <button class="button bg-purple-600 hover:bg-purple-700" @click="craftItem">
      Craft Item
    </button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Home',
  data: () => ({
    log: [],
    inventory: {
      items: 0,
      materials: 0,
    },
  }),
  components: {
    Console: defineAsyncComponent(() => import('@/components/Activity.vue')),
  },
  methods: {
    gatherMaterials() {
      const materials = Math.floor(Math.random() * 25);
      this.inventory.materials += materials;
      this.log.push(`You gathered ${materials} materials!`);
    },
    craftItem() {
      const requiredMaterials = 25;
      if (this.inventory.materials >= requiredMaterials) {
        this.inventory.materials -= requiredMaterials;
        this.inventory.items += 1;
        this.log.push('You crafted an item!');
      } else {
        this.log.push('Insufficient materials to craft item.');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  @apply text-white w-full p-4;
}
</style>
