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
        class="h-full p-0 rounded-none rounded-bl"
        :class="[tempStat > 0 ? 'bg-red-600' : 'bg-gray-700']"
        @click="$emit('remove-stat', stat.name)"
      >
        -
      </button>
      <button
        class="h-full p-0 rounded-none rounded-br"
        :class="[availableStatPoints > 0 ? 'bg-green-600' : 'bg-gray-700']"
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
    availableStatPoints: { type: Number, required: true },
    tempStat: { type: Number, required: true },
  },
  emits: ['remove-stat', 'add-stat'],
};
</script>
