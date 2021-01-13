<template>
  <div class="p-2">
    <div>This is the Storage view.</div>
    <ItemBlock v-for="item in weapons" :key="item.id" :item="weapons[item.id]" class="mb-2" />
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
      weapons: 'inventory/weapons',
    }),
  },
  mounted() {
    console.log('Asset Weapons', weapons);
    console.log('Inventory Weapons:', this.weapons);
  },
};
</script>
