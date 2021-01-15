<template>
  <div class="p-2">
    <div>This is the Storage view.</div>
    <ItemBlock v-for="item in inventory" :key="item.id" :item="getItemData(item)" class="mb-2" />
    <button @click="addWeapon">Add</button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import db from '@/database';
import createWeapon from '@/utilities/database';
import ratingMixins from '@/mixins/rating';

export default {
  name: 'Storage',
  mixins: [ratingMixins],
  data: () => ({
    inventory: null,
  }),
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
    addWeapon() {
      createWeapon();
      this.updateInventory();
    },
    async updateInventory() {
      this.inventory = await db.inventory.toArray();
    },
  },
  created() {
    this.updateInventory();
  },
};
</script>
