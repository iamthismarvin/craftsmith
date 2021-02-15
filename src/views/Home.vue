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
      <button @click="ADD_EXPERIENCE(100), getRemainingStatPoints">Add 100 Experience</button>
      <button @click="saveStats()">Save Stats</button>
      <button @click="resetTempStats()">Clear Changes</button>
    </div>
  </div>
</template>

<script>
import * as uexp from '@/utilities/experience';
import * as udb from '@/utilities/database';
import { mapGetters, mapActions } from 'vuex';

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
      const remainingStatPoints = this.getRemainingStatPoints();
      const tempStatPoints =
        this.tempStats.dexterity +
        this.tempStats.intelligence +
        this.tempStats.stamina +
        this.tempStats.strength;
      return remainingStatPoints - tempStatPoints;
    },
    currentExperience() {
      const { experience } = this;
      return experience;
    },
    currentLevel() {
      const { experience } = this;
      return uexp.getLevel(experience);
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
        { name: 'Dexterity', value: this.stats.dexterity + this.tempStats.dexterity },
        { name: 'Intelligence', value: this.stats.intelligence + this.tempStats.intelligence },
        { name: 'Stamina', value: this.stats.stamina + this.tempStats.stamina },
        { name: 'Strength', value: this.stats.strength + this.tempStats.strength },
      ];
    },
  },
  methods: {
    ...mapActions({
      ADD_EXPERIENCE: 'character/ADD_EXPERIENCE',
      SET_CHARACTER_FROM_DB: 'character/SET_CHARACTER_FROM_DB',
    }),
    getRemainingStatPoints() {
      const { usedStatPoints } = this;
      const remainingStatPoints = uexp.getRemainingStatPoints(this.currentLevel, usedStatPoints);
      return remainingStatPoints;
    },
    addStatPoint(stat) {
      const targetStat = stat.toLowerCase();
      if (this.availableStatPoints > 0) {
        this.tempStats[targetStat] += 1;
      }
    },
    removeStatPoint(stat) {
      const targetStat = stat.toLowerCase();
      if (this.tempStats[targetStat] > 0) {
        this.tempStats[targetStat] -= 1;
      }
    },
    resetTempStats() {
      this.tempStats = { dexterity: 0, intelligence: 0, stamina: 0, strength: 0 };
    },
    async saveStats() {
      const currentStats = this.stats;
      const { tempStats } = this;
      const newStats = {
        dexterity: currentStats.dexterity + tempStats.dexterity,
        intelligence: currentStats.intelligence + tempStats.intelligence,
        stamina: currentStats.stamina + tempStats.stamina,
        strength: currentStats.strength + tempStats.strength,
      };
      await udb.updateStats(this.id, newStats);
      await this.SET_CHARACTER_FROM_DB();
      this.resetTempStats();
    },
  },
};
</script>
