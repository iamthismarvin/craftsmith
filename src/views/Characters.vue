<template>
  <div class="p-2">
    <h2>Characters</h2>
    <button
      v-for="character in characters"
      :key="character.id"
      @click="selectCharacter(character.id)"
      class="bg-gray-600 text-white"
    >
      {{ character.name }}
    </button>
    <h2>Create New Character</h2>
    <input v-model="name" type="text" placeholder="Character Name" class="bg-gray-900" />
    <button @click="createCharacter()" class="bg-red-600 text-white">Create Character</button>
  </div>
</template>

<script>
import * as udb from '@/utilities/database';
import { mapActions } from 'vuex';
import { db } from '@/database';

export default {
  name: 'Characters',
  data: () => ({
    name: null,
    characters: [],
  }),
  methods: {
    ...mapActions({
      SET_CHARACTER_FROM_DB: 'character/SET_CHARACTER_FROM_DB',
    }),
    createCharacter() {
      udb.createCharacter(this.name);
      this.clearNameField();
      this.getCharactersFromDB();
    },
    clearNameField() {
      this.name = null;
    },
    async getCharactersFromDB() {
      const characters = await db.character.toArray();
      this.characters = characters;
    },
    async selectCharacter(id) {
      localStorage.setItem('id', id);
      await this.SET_CHARACTER_FROM_DB();
      this.$router.push({ name: 'Home' });
    },
  },
  mounted() {
    this.getCharactersFromDB();
  },
};
</script>
