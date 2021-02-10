<template>
  <div class="p-2">
    <div class="bg-gray-900 p-2 rounded text-white">
      <div>ID: {{ id }}</div>
      <div>Character Name: {{ name }}</div>
      <div>Level: {{ currentLevel }} [{{ currentExperience }}/{{ nextLevelExperience }}]</div>
      <div>Experience Until Next Level: {{ remainingLevelExperience }}</div>
      <h3>[Stats]</h3>
      <div>Available Stat Points: {{ availableStatPoints }}</div>
      <div v-if="stats">
        <div v-for="stat in namedStats" :key="stat.name" class="flex">
          <div class="w-1/2">{{ stat.name }}: {{ stat.value }}</div>
          <button class="bg-red-600" @click="removeStatPoint(stat.name)">
            -
          </button>
          <button class="bg-green-600" @click="addStatPoint(stat.name)">+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as uexp from '@/utilities/experience';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    tempStats: {
      dexterity: 0,
      intelligence: 0,
      stamina: 0,
      strength: 0,
    },
  }),
  computed: {
    ...mapGetters({
      experience: 'character/experience',
      id: 'character/id',
      name: 'character/name',
      stats: 'character/stats',
      usedStatPoints: 'character/usedStatPoints',
    }),
    availableStatPoints() {
      const remainingStatPoints = 4;
      const usedStatPoints =
        this.tempStats.dexterity +
        this.tempStats.intelligence +
        this.tempStats.stamina +
        this.tempStats.strength;
      return remainingStatPoints - usedStatPoints;
    },
    currentExperience() {
      const { experience } = this;
      return experience;
    },
    currentLevel() {
      const { experience } = this;
      return uexp.getLevel(experience).level;
    },
    experienceTable() {
      return uexp.EXPERIENCE_TABLE;
    },
    nextLevelExperience() {
      return uexp.getNextLevelExperience(this.currentLevel);
    },
    remainingLevelExperience() {
      return this.nextLevelExperience - this.experience;
    },
    namedStats() {
      return [
        { name: 'Dexterity', value: this.stats.dexterity },
        { name: 'Intelligence', value: this.stats.intelligence },
        { name: 'Stamina', value: this.stats.stamina },
        { name: 'Strength', value: this.stats.strength },
      ];
    },
  },
  methods: {
    getRemainingStatPoints() {
      const { usedStatPoints } = this;
      const remainingStatPoints = uexp.getRemainingStatPoints(this.currentLevel, usedStatPoints);
      return remainingStatPoints;
    },
    addStatPoint(stat) {
      const targetStat = stat.toLowerCase();
      if (this.availableStatPoints > 0) {
        this.tempStats[targetStat] += 1;
        this.stats[targetStat] += 1;
      }
    },
    removeStatPoint(stat) {
      const targetStat = stat.toLowerCase();
      if (this.tempStats[targetStat] > 0) {
        this.tempStats[targetStat] -= 1;
        this.stats[targetStat] -= 1;
      }
    },
  },
  mounted() {
    this.getRemainingStatPoints();
  },
};
</script>
