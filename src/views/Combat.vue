<template>
  <div class="p-4">
    <h3 class="heading">{{ dungeonName }}</h3>
    <div class="mb-6">
      <div class="mb-2">
        <h3>{{ dungeonMonster }}</h3>
        <Bar type="health" :percentage="enemyHealth" />
      </div>
      <div>
        <h3>{{ name }}</h3>
        <Bar type="health" :percentage="playerHealth" />
        <Bar type="mana" :percentage="85" />
      </div>
    </div>
    <div v-if="currentCombatant === 'PLAYER' && !combatStatus">
      <h3 class="heading">Skills</h3>
      <button @click="basicAttack('enemy')" class="skill">
        Basic Attack
      </button>
      <button
        v-for="skill in playerSkills"
        :key="skill.id"
        @click="skillAttack('enemy', skill)"
        class="skill"
      >
        {{ skill.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { defineAsyncComponent } from 'vue';
import skills from '@/assets/data/skills';
import * as udb from '@/utilities/database';
import * as ucbt from '@/utilities/combat';

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
      characterID: 'character/id',
      name: 'character/name',
    }),
    currentCombatant() {
      return this.getCurrentCombatant(this.speedCounters.player, this.speedCounters.enemy);
    },
    dungeonName() {
      return ucbt.getDungeonData(this.location).name;
    },
    dungeonMonster() {
      return ucbt.getMonsterData(ucbt.getDungeonData(this.location).monsterID).name;
    },
    enemyHealth() {
      return (this.enemy.health.remaining / this.enemy.health.max) * 100;
    },
    nextCombatants() {
      const speedCounters = { ...this.speedCounters };
      const nextCombatants = [];
      for (let i = 0; i <= 5; i += 1) {
        const combatant = this.getCurrentCombatant(speedCounters.player, speedCounters.enemy);
        this.updateSpeedCounters(combatant, speedCounters);
        nextCombatants.push(combatant);
      }
      nextCombatants.shift();
      return nextCombatants;
    },
    playerHealth() {
      return (this.player.health.remaining / this.player.health.max) * 100;
    },
    playerSkills() {
      const availableSkills = [0, 1];
      return skills.map(skill => (availableSkills.includes(skill.id) ? skill : null));
    },
  },
  methods: {
    ...mapActions({
      CREATE_LOG_ENTRY: 'log/CREATE_LOG_ENTRY',
      SET_COMBAT_STATE: 'combat/SET_COMBAT_STATE',
      MODIFY_TARGET_HEALTH: 'combat/MODIFY_TARGET_HEALTH',
      SET_CHARACTER_FROM_DB: 'character/SET_CHARACTER_FROM_DB',
    }),
    async addExperience(experience) {
      await udb.updateExperience(this.characterID, experience);
      this.SET_CHARACTER_FROM_DB();
      this.CREATE_LOG_ENTRY(`You have gained ${experience} experience.`);
    },
    basicAttack(target) {
      const damage = Math.floor(Math.random() * 30);
      this.MODIFY_TARGET_HEALTH([target, -damage]);
      this.CREATE_LOG_ENTRY(`Combatant dealt ${damage} damage.`);
      this.turn += 1;
    },
    createLoot(characterID) {
      const probabilityRoll = Math.floor(Math.random() * 100);
      if (probabilityRoll >= 50) {
        udb.createWeapon(characterID);
        this.CREATE_LOG_ENTRY('You received a new weapon! Check your Storage.');
      }
    },
    getCurrentCombatant(playerSpeedCounter, enemySpeedCounter) {
      return playerSpeedCounter >= enemySpeedCounter ? 'PLAYER' : 'ENEMY';
    },
    skillAttack(target, skill) {
      const damage = skill.effect(20);
      this.MODIFY_TARGET_HEALTH([target, -damage]);
      this.CREATE_LOG_ENTRY(`Combatant used ${skill.name} and dealt ${damage} damage.`);
      this.turn += 1;
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
    this.CREATE_LOG_ENTRY(`${this.currentCombatant}'s turn.`);
  },
  beforeRouteLeave(to, from, next) {
    if (this.combatStatus !== ('SUCCESS' || 'FAILURE')) {
      // eslint-disable-next-line no-alert
      const exitConfirmation = window.confirm(
        'Are you sure you want to leave combat? All combat progress will be lost.',
      );
      return exitConfirmation ? next() : next(false);
    }
    return next();
  },
  watch: {
    combatStatus(value) {
      if (value === 'SUCCESS') {
        this.createLoot(this.characterID);
        this.addExperience(100);
      }
    },
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

<style lang="scss" scoped>
.skill {
  @apply bg-gray-900 mb-2 rounded;
}
</style>
