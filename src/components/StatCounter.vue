<template>
  <div class="flex flex-col h-32 items-center justify-between w-1/2">
    <div class="flex flex-col h-full items-center w-full">
      <div class="flex h-8 items-center justify-center rounded-t w-full bg-gray-800">
        {{ stat.name }}
      </div>
      <div class="flex h-full items-center justify-center text-4xl w-full bg-gray-900">
        {{ stat.value }}
      </div>
    </div>
    <div class="flex items-center h-8 rounded rounded-t-none w-full bg-blue-500">
      <button
        class="bg-red-600 h-full p-0 rounded-none rounded-bl"
        @click="$emit('remove-stat', stat.name)"
      >
        -
      </button>
      <button
        class="bg-green-600 h-full p-0 rounded-none rounded-br"
        @click="$emit('add-stat', stat.name)"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCounter',
  props: {
    stat: { type: Object, required: true },
  },
  emits: ['remove-stat', 'add-stat'],
};
</script>
