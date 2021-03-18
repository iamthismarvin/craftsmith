<template>
  <div class="p-4">
    <CharacterData :data="characterData" />
    <div v-if="stats" class="flex flex-wrap justify-evenly my-1">
      <StatCounter
        v-for="stat in namedStats"
        :key="stat.name"
        :stat="stat"
        :availableStatPoints="availableStatPoints"
        :tempStat="tempStats[stat.name.toLowerCase()]"
        @remove-stat="removeStatPoint($event)"
        @add-stat="addStatPoint($event)"
        class="my-1 px-1"
      />
    </div>
    <div class="bg-gray-900 p-2 rounded text-white">
      <button @click="saveStats()">Save Stats</button>
      <button @click="resetTempStats()">Clear Changes</button>
    </div>
  </div>
</template>

<script>
import * as uexp from '@/utilities/experience';
import * as udb from '@/utilities/database';
import { mapGetters, mapActions } from 'vuex';
import { defineAsyncComponent } from 'vue';

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
  components: {
    CharacterData: defineAsyncComponent(() => import('@/components/CharacterData.vue')),
    StatCounter: defineAsyncComponent(() => import('@/components/StatCounter.vue')),
  },
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
    characterData() {
      return {
        id: this.id,
        name: this.name,
        level: this.currentLevel,
        experience: this.currentExperience,
        previousLevelExperience: this.previousLevelExperience,
        nextLevelExperience: this.nextLevelExperience,
        remainingLevelExperience: this.remainingLevelExperience,
        availableStatPoints: this.availableStatPoints,
      };
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
    previousLevelExperience() {
      return uexp.getPreviousLevelExperience(this.currentLevel);
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
