<template>
  <div class="text-white p-2">
    <Activity class="px-2 my-2" :entries="log" />
    <div class="flex flex-col just justify-center items-center">
      <h1 class="font-bold">Inventory</h1>
      <p>Materials: {{ inventory.materials }}</p>
      <p>Items: {{ inventory.items }}</p>
    </div>
    <button class="bg-green-600 hover:bg-green-700" @click="gatherMaterials">
      Gather Materials
    </button>
    <button class="bg-purple-600 hover:bg-purple-700" @click="craftItem">
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
    Activity: defineAsyncComponent(() => import('@/components/Activity.vue')),
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
