import db from '@/database';

const createWeapon = () => {
  db.inventory.add({
    baseItem: 2,
    enchantment: 0,
    rating: 0,
    skills: [],
  });
};

export default createWeapon;
