<template>
  <div class="p-2">
    <div class="bg-gray-900 p-2 rounded text-white">
      <div>ID: {{ id }}</div>
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
    <button @click="createUser" class="bg-red-600 text-white">Create User</button>
    <button @click="UPDATE_USER" class="bg-green-600 text-white">Update User</button>
  </div>
</template>

<script>
import * as exp from '@/utilities/experience';
import { createUser } from '@/utilities/database';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Stats',
  computed: {
    ...mapGetters({
      experience: 'user/experience',
      id: 'user/id',
      stats: 'user/stats',
    }),
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
  methods: {
    ...mapActions({
      UPDATE_USER: 'user/UPDATE_USER',
    }),
    createUser() {
      createUser();
    },
  },
};
</script>
