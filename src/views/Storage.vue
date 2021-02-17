<template>
  <div class="p-4">
    <Item v-for="item in items" :key="item.id" :item="item" class="mb-2" />
    <button @click="addWeapon">Add</button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import * as udb from '@/utilities/database';
import helpers from '@/mixins/helpers';

export default {
  name: 'Storage',
  mixins: [helpers],
  components: {
    Item: defineAsyncComponent(() => import('@/components/Item/Item.vue')),
  },
  computed: {
    ...mapGetters({
      inventory: 'inventory/inventory',
      characterId: 'character/id',
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
      udb.createWeapon(this.characterId);
    },
  },
  created() {
    this.UPDATE_INVENTORY();
  },
};
</script>
