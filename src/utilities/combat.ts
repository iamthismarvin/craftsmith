import dungeons from '@/assets/data/dungeons';
import monsters from '@/assets/data/monsters';
import weapons from '@/assets/data/weapons';

export const getDungeonData = (id: number) => {
  return dungeons.find(dungeon => dungeon.id === id);
};

export const getMonsterData = (id: number) => {
  return monsters.find(monster => monster.id === id);
};

export const getWeaponData = (id: number) => {
  return weapons.find(weapon => weapon.id === id);
};

export const getHealthValue = (stamina: number) => {
  const BASE_HEALTH = 100;
  return BASE_HEALTH + stamina * 20;
};
