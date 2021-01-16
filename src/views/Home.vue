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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    inventory: {
      items: 0,
      materials: 0,
    },
  }),
  components: {
    Activity: defineAsyncComponent(() => import('@/components/Activity.vue')),
  },
  computed: {
    ...mapGetters({
      log: 'log/log',
    }),
  },
  methods: {
    ...mapActions({
      CREATE_LOG_ENTRY: 'log/CREATE_LOG_ENTRY',
    }),
    gatherMaterials() {
      const materials = Math.floor(Math.random() * 25);
      this.inventory.materials += materials;
      this.CREATE_LOG_ENTRY(`You gathered ${materials} materials!`);
    },
    craftItem() {
      const requiredMaterials = 25;
      if (this.inventory.materials >= requiredMaterials) {
        this.inventory.materials -= requiredMaterials;
        this.inventory.items += 1;
        this.CREATE_LOG_ENTRY('You crafted an item!');
      } else {
        this.CREATE_LOG_ENTRY('Insufficient materials to craft item.');
      }
    },
  },
};
</script>
