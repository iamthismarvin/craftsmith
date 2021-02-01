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
      return this.getLevel(experience).level;
    },
    experienceTable() {
      const experienceTable = [];
      const maxLevel = 500;
      for (let level = 0; level <= maxLevel; level += 1) {
        if (level <= 0) {
          const experience = 0;
          experienceTable.push({ level, experience });
        } else {
          const previousLevelExperience = experienceTable[experienceTable.length - 1].experience;
          const experience = this.getNextLevelExperience(level) + previousLevelExperience;
          experienceTable.push({ level, experience });
        }
      }
      return experienceTable;
    },
    nextLevelExperience() {
      return this.getNextLevelExperience(this.currentLevel);
    },
    remainingLevelExperience() {
      return this.nextLevelExperience - this.experience;
    },
  },
  methods: {
    getNextLevelExperience(level) {
      const baseExperience = 400;
      const experienceMultiplier = 1.03;
      return Math.floor(baseExperience * experienceMultiplier ** level);
    },
    getLevel(experience) {
      const { experienceTable } = this;
      return experienceTable.find(level => (level.experience > experience ? level : null));
    },
  },
};
</script>
