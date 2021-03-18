<template>
  <div class="p-4">
    <h3 class="heading">Dungeons</h3>
    <button
      v-for="dungeon in dungeons"
      :key="dungeon.name"
      class="bg-gray-900 mb-2 rounded"
      @click="createDungeonInstance(dungeon.id)"
    >
      {{ dungeon.name }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import dungeons from '@/assets/data/dungeons';
import * as ucbt from '@/utilities/combat';

export default {
  name: 'Dungeons',
  data: () => ({
    dungeons,
  }),
  computed: {
    ...mapGetters({
      equipment: 'inventory/equipment',
      stats: 'character/stats',
    }),
  },
  methods: {
    ...mapActions({
      SET_COMBAT_STATE: 'combat/SET_COMBAT_STATE',
    }),
    createDungeonInstance(dungeonID) {
      const dungeon = ucbt.getDungeonData(dungeonID);
      const monster = ucbt.getMonsterData(dungeon.monsterID);
      const player = { equipment: this.equipment, stats: this.stats };

      this.SET_COMBAT_STATE({
        player: {
          health: {
            max: ucbt.getHealthValue(player.stats.stamina),
            remaining: ucbt.getHealthValue(player.stats.stamina),
          },
          ready: true,
          weapon: ucbt.getWeaponData(player.equipment.weapon),
        },
        enemy: {
          health: { max: 100, remaining: 100 },
          ready: true,
          weapon: ucbt.getWeaponData(monster.weaponID),
        },
        location: dungeon.id,
      });
      this.$router.push({ name: 'Combat' });
    },
  },
};
</script>
