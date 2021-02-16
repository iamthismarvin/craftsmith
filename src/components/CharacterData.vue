<template>
  <div class="flex w-full">
    <div class="bg-gray-800 flex flex-col items-center justify-center rounded-l w-1/3 md:w-1/5">
      <div>Level</div>
      <div class="leading-none text-6xl">{{ data.level }}</div>
    </div>
    <div class="bg-gray-900 p-4 rounded-r w-2/3 md:w-4/5">
      <div>Name: {{ data.name }}</div>
      <div>ID: {{ data.id }}</div>
      <div>Experience: {{ data.experience }} / {{ data.nextLevelExperience }}</div>
      <div>Experience Until Next Level: {{ data.remainingLevelExperience }}</div>
      <div>Available Stat Points: {{ data.availableStatPoints }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterData',
  props: {
    data: { type: Object, required: true },
  },
};
</script>
