<template>
  <div>
    <ItemBlockTab
      v-on:toggle="toggleDetails"
      :name="item.name"
      :enchantment="item.enchantment"
      :rating="item.rating"
      :image="item.image"
      :active="active"
    />
    <ItemBlockDetails v-if="active" :item="item" class="mt-2" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import helpers from '@/mixins/helpers';

export default {
  name: 'ItemBlock',
  props: {
    item: Object,
  },
  mixins: [helpers],
  components: {
    ItemBlockDetails: defineAsyncComponent(() => import('@/components/ItemBlock/ItemBlockDetails')),
    ItemBlockTab: defineAsyncComponent(() => import('@/components/ItemBlock/ItemBlockTab')),
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
