<template>
  <div class="p-4">
    <h2>Characters</h2>
    <button
      v-for="user in users"
      :key="user.id"
      @click="selectUser(user.id)"
      class="bg-gray-600 text-white"
    >
      {{ user.name }}
    </button>
    <h2>Create New Character</h2>
    <input v-model="name" type="text" placeholder="Character Name" class="bg-gray-900" />
    <button @click="createUser()" class="bg-red-600 text-white">Create User</button>
  </div>
</template>

<script>
import { createUser } from '@/utilities/database';
import { mapActions } from 'vuex';
import { db } from '@/database';

export default {
  name: 'Start',
  data: () => ({
    name: null,
    users: [],
  }),
  methods: {
    ...mapActions({
      UPDATE_USER: 'user/UPDATE_USER',
    }),
    createUser() {
      createUser(this.name);
      this.clearNameField();
      this.getUsersFromDB();
    },
    clearNameField() {
      this.name = null;
    },
    async getUsersFromDB() {
      const users = await db.user.toArray();
      this.users = users;
    },
    async selectUser(id) {
      localStorage.setItem('id', id);
      this.UPDATE_USER();
      this.$router.push({ name: 'Stats' });
    },
  },
  mounted() {
    this.getUsersFromDB();
  },
};
</script>
