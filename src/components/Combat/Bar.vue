<template>
  <div class="flex h-8 items-center relative">
    <div class="bar bg-gray-900 w-full"></div>
    <div class="bar" :style="[`background: ${foregroundColor}`, `width: ${progress}%`]"></div>
    <div class="absolute capitalize font-bold text-center w-full ">
      {{ type !== 'experience' ? type : `${percentage.toFixed(3)}%` }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: {
    percentage: { type: Number, required: true },
    type: { type: String, required: true },
  },
  computed: {
    foregroundColor() {
      switch (this.type) {
        case 'health':
          return '#c53030';
        case 'mana':
          return '#2b6cb0';
        case 'experience':
          return '#2f855a';
        default:
          return '#000000';
      }
    },
    progress() {
      return this.percentage < 0 ? 0 : this.percentage;
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  height: 2rem;
  position: absolute;
  transition: 1s all;
}
</style>
