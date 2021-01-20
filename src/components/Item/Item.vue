<template>
  <div>
    <ItemTab
      v-on:toggle="toggleDetails"
      :name="item.name"
      :enchantment="item.enchantment"
      :rating="item.rating"
      :image="item.image"
      :active="active"
    />
    <ItemDetails v-if="active" :item="item" class="mt-2" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import helpers from '@/mixins/helpers';

export default {
  name: 'Item',
  props: {
    item: Object,
  },
  mixins: [helpers],
  components: {
    ItemDetails: defineAsyncComponent(() => import('@/components/Item/ItemDetails.vue')),
    ItemTab: defineAsyncComponent(() => import('@/components/Item/ItemTab.vue')),
  },
  data: () => ({
    active: false,
  }),
  methods: {
    toggleDetails() {
      this.active = !this.active;
    },
  },
};
</script>
