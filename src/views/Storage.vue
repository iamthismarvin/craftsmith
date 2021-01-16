<template>
  <div class="p-2">
    <div>This is the Storage view.</div>
    <ItemBlock v-for="item in inventory" :key="item.id" :item="item" class="mb-2" />
    <button @click="addWeapon">Add</button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { createWeapon } from '@/utilities/database';
import helpers from '@/mixins/helpers';

export default {
  name: 'Storage',
  mixins: [helpers],
  components: {
    ItemBlock: defineAsyncComponent(() => import('@/components/ItemBlock.vue')),
  },
  computed: {
    ...mapGetters({
      inventoryState: 'inventory/inventory',
    }),
    inventory() {
      this.UPDATE_INVENTORY();
      return this.inventoryState.map(item => this.getItemData(item));
    },
  },
  methods: {
    ...mapActions({
      UPDATE_INVENTORY: 'inventory/UPDATE_INVENTORY',
    }),
    addWeapon() {
      createWeapon();
    },
  },
};
</script>
