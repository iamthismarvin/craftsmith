<template>
  <div class="p-2">
    <div class="bg-gray-900 p-2 rounded text-white">
      <div>Level: {{ currentLevel }} [{{ currentExperience }}/{{ nextLevelExperience }}]</div>
      <div>Experience Until Next Level: {{ remainingLevelExperience }}</div>
    </div>
    <div v-for="level in experienceTable" :key="level" class="font-mono">{{ level }}</div>
  </div>
</template>

<script>
import exp from '@/utilities/experience';

export default {
  name: 'Stats',
  data: () => ({ experience: 0 }),
  computed: {
    currentExperience() {
      const { experience } = this;
      return experience;
    },
    currentLevel() {
      const { experience } = this;
      return exp.getLevel(experience).level;
    },
    experienceTable() {
      return exp.EXPERIENCE_TABLE;
    },
    nextLevelExperience() {
      return exp.getNextLevelExperience(this.currentLevel);
    },
    remainingLevelExperience() {
      return this.nextLevelExperience - this.experience;
    },
  },
};
</script>
