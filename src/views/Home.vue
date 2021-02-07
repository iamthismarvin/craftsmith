<template>
  <div class="p-2">
    <div class="bg-gray-900 p-2 rounded text-white">
      <div>ID: {{ id }}</div>
      <div>Character Name: {{ name }}</div>
      <div>Level: {{ currentLevel }} [{{ currentExperience }}/{{ nextLevelExperience }}]</div>
      <div>Experience Until Next Level: {{ remainingLevelExperience }}</div>
      <h3>[Stats]</h3>
      <div v-if="stats">
        <div>Dexterity: {{ stats.dexterity }}</div>
        <div>Intelligence: {{ stats.intelligence }}</div>
        <div>Stamina: {{ stats.stamina }}</div>
        <div>Strength: {{ stats.strength }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as uexp from '@/utilities/experience';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      experience: 'character/experience',
      id: 'character/id',
      name: 'character/name',
      stats: 'character/stats',
    }),
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
  },
};
</script>
