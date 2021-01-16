<template>
  <div class="p-2">
    <ItemBlock v-for="item in items" :key="item.id" :item="item" class="mb-2" />
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
      inventory: 'inventory/inventory',
    }),
    items() {
      return this.inventory.map(item => this.getItemData(item));
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
  created() {
    this.UPDATE_INVENTORY();
  },
};
</script>
