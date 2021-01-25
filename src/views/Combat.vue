<template>
  <div>
    <h3>Player:</h3>
    <Bar type="health" :percentage="player.health" />
    <Bar type="mana" :percentage="85" />
    <h3>Enemy:</h3>
    <Bar type="health" :percentage="enemy.health" />
    <h3>Location: {{ location }}</h3>
    <button @click="basicAttack('player')">Attack Player</button>
    <button @click="basicAttack('enemy')">Attack Enemy</button>
    <button @click="turn += 1">Add Turn</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Combat',
  data: () => ({
    turn: 0,
  }),
  components: {
    Bar: defineAsyncComponent(() => import('@/components/Combat/Bar.vue')),
  },
  computed: {
    ...mapGetters({
      location: 'combat/location',
      player: 'combat/player',
      enemy: 'combat/enemy',
    }),
    currentCombatant() {
      return this.getTurnOrder(this.turn, 1.25, 1)[this.turn] === 'p' ? 'Player' : 'Enemy';
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
    getTurnOrder(currentTurn, playerAttackSpeed, enemyAttackSpeed) {
      const turnOrder = [];
      let counter = 0;
      let playerCounter = 0;
      let enemyCounter = 0;
      while (counter < currentTurn + 1) {
        playerCounter += playerAttackSpeed;
        enemyCounter += enemyAttackSpeed;
        while (playerCounter >= 1 || enemyCounter >= 1) {
          if (playerCounter >= enemyCounter) {
            turnOrder.push('p');
            playerCounter -= 1;
          }
          if (enemyCounter > playerCounter) {
            turnOrder.push('e');
            enemyCounter -= 1;
          }
        }
        counter += 1;
      }
      return turnOrder;
    },
    getTurnInfo() {
      this.CREATE_LOG_ENTRY(`Current Turn #: ${this.turn}`);
      this.CREATE_LOG_ENTRY(`Turn Order: ${this.getTurnOrder(this.turn, 1.25, 1)}`);
      this.CREATE_LOG_ENTRY(`Current Combatant: ${this.currentCombatant}`);
    },
  },
  mounted() {
    this.SET_COMBAT_STATE({
      player: { health: 100, ready: true, weapon: 0 },
      enemy: { health: 100, ready: true, weapon: 0 },
      location: 100,
    });
    this.getTurnInfo();
  },
  watch: {
    turn() {
      this.getTurnInfo();
    },
  },
};
</script>
