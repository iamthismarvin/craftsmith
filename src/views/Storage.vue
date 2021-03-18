<template>
  <div class="p-4">
    <h3 class="heading">Storage</h3>
    <Item v-for="item in items" :key="item.id" :item="item" class="mb-2" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex';
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
    }),
    items() {
      return this.inventory.map(item => this.getItemData(item));
    },
  },
  methods: {
    ...mapActions({
      UPDATE_INVENTORY: 'inventory/UPDATE_INVENTORY',
    }),
  },
  created() {
    this.UPDATE_INVENTORY();
  },
};
</script>
