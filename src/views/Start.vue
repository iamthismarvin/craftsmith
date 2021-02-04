<template>
  <div class="p-4">
    <div v-if="!id">
      <input v-model="name" type="text" placeholder="Character Name" class="bg-gray-900" />
      <button @click="createUser()" class="bg-red-600 text-white">Create User</button>
    </div>
    <div v-else>
      Character already created.
    </div>
  </div>
</template>

<script>
import { createUser } from '@/utilities/database';
import { mapGetters } from 'vuex';

export default {
  name: 'Start',
  data: () => ({
    name: null,
  }),
  computed: {
    ...mapGetters({
      id: 'user/id',
    }),
  },
  methods: {
    createUser() {
      createUser(this.name);
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
