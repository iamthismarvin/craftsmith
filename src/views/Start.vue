<template>
  <div v-if="!id">
    <button @click="createUser" class="bg-red-600 text-white">Create User</button>
  </div>
</template>

<script>
import { createUser } from '@/utilities/database';
import { mapGetters } from 'vuex';

export default {
  name: 'Start',
  computed: {
    ...mapGetters({
      id: 'user/id',
    }),
  },
  methods: {
    createUser() {
      createUser();
      this.$router.push({ name: 'Home' });
    },
  },
};
</script>
