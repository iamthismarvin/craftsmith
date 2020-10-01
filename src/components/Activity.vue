<template>
  <div class="activity text-white">
    <div class="bg-gray-800 text-center rounded-t-lg h-10 flex justify-center items-center">
      Activity
    </div>
    <div ref="activity" class="bg-gray-900 overflow-auto h-32 px-1 rounded-b-lg shadow-xl">
      <div>
        Craftsmith by
        <a
          class="font-bold text-blue-500"
          href="http://github.com/iamthismarvin"
          target="_blank"
          rel="noopener noreferrer"
          >@iamthismarvin</a
        >
      </div>
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
