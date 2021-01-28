<template>
  <div>
    <h3>Player:</h3>
    <Bar type="health" :percentage="player.health" />
    <Bar type="mana" :percentage="85" />
    <h3>Enemy:</h3>
    <Bar type="health" :percentage="enemy.health" />
    <h3>Location: {{ location }}</h3>
    <button v-if="currentCombatant === 'PLAYER' && !combatStatus" @click="basicAttack('enemy')">
      Attack Enemy
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Combat',
  data: () => ({
    turn: 0,
    combatStatus: null,
    speedCounters: {
      enemy: 0,
      player: 0,
    },
    attackSpeed: {
      enemy: 1,
      player: 1.25,
    },
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
      return this.getCurrentCombatant(this.speedCounters.player, this.speedCounters.enemy);
    },
    enemyHealth() {
      return this.enemy.health;
    },
    nextCombatants() {
      const speedCounters = { ...this.speedCounters };
      const turnOrder = [];
      for (let i = 0; i <= 5; i += 1) {
        const combatant = this.getCurrentCombatant(speedCounters.player, speedCounters.enemy);
        this.updateSpeedCounters(combatant, speedCounters);
        turnOrder.push(combatant);
      }
      turnOrder.shift();
      return turnOrder;
    },
    playerHealth() {
      return this.player.health;
    },
  },
  methods: {
    ...mapActions({
      CREATE_LOG_ENTRY: 'log/CREATE_LOG_ENTRY',
      SET_COMBAT_STATE: 'combat/SET_COMBAT_STATE',
      MODIFY_TARGET_HEALTH: 'combat/MODIFY_TARGET_HEALTH',
    }),
    basicAttack(target) {
      const damage = Math.floor(Math.random() * 30);
      this.MODIFY_TARGET_HEALTH([target, -damage]);
      this.CREATE_LOG_ENTRY(`Combatant dealt ${damage} damage.`);
      this.turn += 1;
    },
    getCurrentCombatant(playerSpeedCounter, enemySpeedCounter) {
      return playerSpeedCounter >= enemySpeedCounter ? 'PLAYER' : 'ENEMY';
    },
    updateSpeedCounters(combatant, speedCountersPointer) {
      const speedCounters = speedCountersPointer;
      if (combatant === 'PLAYER') {
        speedCounters.player -= 1;
        speedCounters.enemy += this.attackSpeed.enemy;
      } else {
        speedCounters.enemy -= 1;
        speedCounters.player += this.attackSpeed.player;
      }
    },
  },
  mounted() {
    this.SET_COMBAT_STATE({
      player: { health: 100, ready: true, weapon: 0 },
      enemy: { health: 100, ready: true, weapon: 0 },
      location: 100,
    });
    this.CREATE_LOG_ENTRY(`${this.currentCombatant}'s turn.`);
  },
  watch: {
    currentCombatant() {
      if (this.currentCombatant === 'ENEMY' && !this.combatStatus) {
        setTimeout(() => {
          this.basicAttack('player');
        }, 1500);
      }
    },
    enemyHealth(value) {
      if (value <= 0) {
        this.combatStatus = 'SUCCESS';
        this.CREATE_LOG_ENTRY(`ENEMY has been defeated.`);
      }
    },
    playerHealth(value) {
      if (value <= 0) {
        this.combatStatus = 'FAILURE';
        this.CREATE_LOG_ENTRY(`PLAYER has been defeated.`);
      }
    },
    turn() {
      if (!this.combatStatus) {
        this.updateSpeedCounters(this.currentCombatant, this.speedCounters);
        this.CREATE_LOG_ENTRY(`${this.currentCombatant}'s turn.`);
      }
    },
  },
};
</script>
