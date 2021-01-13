<template>
  <div class="p-2">
    <div>This is the Storage view.</div>
    <ItemBlock :item="weapons[0]" />
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
      weapons: 'inventory/weapons',
    }),
  },
  methods: {
    ...mapMutations({
      enchantWeapon: 'inventory/enchantWeapon',
    }),
  },
  mounted() {
    console.log('Asset Weapons', weapons);
    console.log('Inventory Weapons:', this.weapons[0]);
    setTimeout(() => {
      this.enchantWeapon(0);
    }, 2000);
  },
};
</script>
