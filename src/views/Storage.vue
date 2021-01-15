<template>
  <div class="p-2">
    <div>This is the Storage view.</div>
    <ItemBlock
      v-for="item in inventory"
      v-on:enchanted="UPDATE_INVENTORY"
      :key="item.id"
      :item="getItemData(item)"
      class="mb-2"
    />
    <button @click="addWeapon">Add</button>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
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
  },
  methods: {
    ...mapMutations({
      UPDATE_INVENTORY: 'inventory/UPDATE_INVENTORY',
    }),
    addWeapon() {
      createWeapon();
      this.UPDATE_INVENTORY();
    },
  },
  created() {
    this.UPDATE_INVENTORY();
  },
};
</script>
