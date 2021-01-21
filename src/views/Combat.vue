<template>
  <div>
    <h3>Health: {{ player.health }}</h3>
    <h3>Enemy Health: {{ enemy.health }}</h3>
    <h3>Location: {{ location }}</h3>
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
      SET_LOCATION: 'combat/SET_LOCATION',
    }),
  },
  mounted() {
    this.SET_COMBAT_STATE();
    this.SET_LOCATION(100);
  },
};
</script>
