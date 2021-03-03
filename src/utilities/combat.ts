import monsters from '@/assets/data/monsters';
import weapons from '@/assets/data/weapons';

export const getMonsterData = (id: number) => {
  return monsters.find(monster => monster.id === id);
};

export const getWeaponData = (id: number) => {
  return weapons.find(weapon => weapon.id === id);
};
