<template>
  <div class="p-2">
    <div>This is the Storage view.</div>
    <ItemBlock
      v-for="item in equipment"
      :key="item.id"
      :item="equipment.find(x => x.id === item.id)"
      class="mb-2"
    />
    <button @click="createEquipment(3)">Add</button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import weapons from '@/assets/data/weapons';

export default {
  name: 'Storage',
  components: {
    ItemBlock: defineAsyncComponent(() => import('@/components/ItemBlock.vue')),
  },
  computed: {
    ...mapGetters({
      equipment: 'inventory/equipment',
    }),
  },
  methods: {
    ...mapMutations({
      createEquipment: 'inventory/createEquipment',
    }),
  },
  mounted() {
    console.log('Asset Weapons', weapons);
    console.log('Inventory Weapons:', this.equipment);
  },
};
</script>
