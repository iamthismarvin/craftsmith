<template>
  <div class="p-2">
    <div>This is the Storage view.</div>
    <ItemBlock v-for="item in equipment" :key="item.id" :item="equipment[item.id]" class="mb-2" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';
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
  mounted() {
    console.log('Asset Weapons', weapons);
    console.log('Inventory Weapons:', this.equipment);
  },
};
</script>
