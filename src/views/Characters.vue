<template>
  <div class="flex flex-col landscape:flex-row p-2">
    <section class="characters__section">
      <h3 class="heading">Characters</h3>
      <button
        v-for="character in characters"
        :key="character.id"
        @click="selectCharacter(character.id)"
        class="bg-gray-900 text-white mb-2"
      >
        {{ character.name }} [Level {{ getLevel(character.experience) }}]
      </button>
    </section>
    <section class="characters__section">
      <h3 class="heading">Create New Character</h3>
      <input
        v-model="name"
        type="text"
        placeholder="Character Name"
        class="bg-gray-900 h-12 mb-2 p-2 rounded-md w-full"
      />
      <button @click="createCharacter()" class="bg-purple-700 text-white">Create Character</button>
    </section>
  </div>
</template>

<script>
import * as udb from '@/utilities/database';
import * as uexp from '@/utilities/experience';
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
    checkNameValidity(name) {
      return name.length < 2 ||
        name.length > 15 ||
        name.match(/[|\\/~^:,;?!&%$@*+]/) ||
        name.indexOf(' ') >= 0
        ? false
        : name;
    },
    async createCharacter() {
      const characterName = this.name;
      const nameValid = this.checkNameValidity(characterName);
      if (nameValid) {
        const nameExists = await udb.checkExistingCharacterName(characterName);
        if (nameExists) {
          console.log('Name is already being used.');
        } else {
          udb.createCharacter(characterName);
          this.clearNameField();
          this.getCharactersFromDB();
        }
      } else {
        console.log('Name is not valid.');
      }
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
    getLevel(experience) {
      return uexp.getLevel(experience);
    },
  },
  mounted() {
    this.getCharactersFromDB();
  },
};
</script>

<style lang="scss" scoped>
.characters {
  &__section {
    @apply p-2;
    @apply w-full;
  }
}
</style>
