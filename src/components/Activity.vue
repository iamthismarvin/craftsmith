<template>
  <div class="activity text-white">
    <div class="bg-gray-800 p-2 text-center rounded-t-lg">Activity</div>
    <div ref="activity" class="bg-gray-900 overflow-auto h-32 px-1 rounded-b-lg shadow-xl">
      <div v-for="entry in entries" :key="entry.id">
        {{ entry }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'activity',
  props: {
    entries: Array,
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    scrollToBottom() {
      const { activity } = this.$refs;
      activity.scrollTop = activity.scrollHeight;
    },
  },
};
</script>
