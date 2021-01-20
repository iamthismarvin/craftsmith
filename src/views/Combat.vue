<template>
  <div>
    <h3>Health: {{ player.health }}</h3>
    <h3>Enemy Health: {{ enemy.health }}</h3>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Combat',
  computed: {
    ...mapGetters({
      player: 'combat/player',
      enemy: 'combat/enemy',
    }),
  },
  methods: {
    ...mapActions({
      RESET_PLAYER_STATE: 'combat/RESET_PLAYER_STATE',
      RESET_ENEMY_STATE: 'combat/RESET_ENEMY_STATE',
    }),
  },
  mounted() {
    this.RESET_PLAYER_STATE();
    this.RESET_ENEMY_STATE();
  },
};
</script>
