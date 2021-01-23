<template>
  <div>
    <h3>Health: {{ player.health }}</h3>
    <h3>Enemy Health: {{ enemy.health }}</h3>
    <h3>Location: {{ location }}</h3>
    <button @click="basicAttack('player')">Attack Player</button>
    <button @click="basicAttack('enemy')">Attack Enemy</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Combat',
  computed: {
    ...mapGetters({
      location: 'combat/location',
      player: 'combat/player',
      enemy: 'combat/enemy',
    }),
  },
  methods: {
    ...mapActions({
      SET_COMBAT_STATE: 'combat/SET_COMBAT_STATE',
      MODIFY_TARGET_HEALTH: 'combat/MODIFY_TARGET_HEALTH',
    }),
    basicAttack(target) {
      this.MODIFY_TARGET_HEALTH([target, -10]);
    },
  },
  mounted() {
    this.SET_COMBAT_STATE({
      player: { health: 100, ready: true, weapon: 0 },
      enemy: { health: 100, ready: true, weapon: 0 },
      location: 100,
    });
  },
};
</script>
