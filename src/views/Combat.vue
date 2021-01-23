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
  data: () => ({
    turn: 10,
  }),
  computed: {
    ...mapGetters({
      location: 'combat/location',
      player: 'combat/player',
      enemy: 'combat/enemy',
    }),
    turnOrder() {
      const playerAttackSpeed = 1.25;
      const enemyAttackSpeed = 1;
      const turnOrder = [];
      let counter = 0;
      let playerTurn = 0;
      let enemyTurn = 0;
      while (counter < this.turn + 1) {
        playerTurn += playerAttackSpeed;
        enemyTurn += enemyAttackSpeed;
        while (playerTurn >= 1 || enemyTurn >= 1) {
          if (playerTurn >= enemyTurn) {
            turnOrder.push('p');
            playerTurn -= 1;
          }
          if (enemyTurn > playerTurn) {
            turnOrder.push('e');
            enemyTurn -= 1;
          }
        }
        counter += 1;
      }
      return turnOrder[this.turn];
    },
  },
  methods: {
    ...mapActions({
      CREATE_LOG_ENTRY: 'log/CREATE_LOG_ENTRY',
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
    this.CREATE_LOG_ENTRY(`Turn Order: ${this.turnOrder}`);
  },
};
</script>
