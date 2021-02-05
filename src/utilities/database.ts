import { db } from '@/database';
import createStore from '@/store/index';
import weapons from '@/assets/data/weapons';
import { generateRating } from '@/utilities/generator';

const updateInventory = async () => {
  await createStore.dispatch('inventory/UPDATE_INVENTORY');
};

export const createCharacter = async (name: string) => {
  await db.character.add({
    name,
    experience: 0,
    stats: {
      dexterity: 0,
      intelligence: 0,
      stamina: 0,
      strength: 0,
    },
  });
};

export const createWeapon = async (character: number) => {
  await db.inventory.add({
    character,
    baseItem: Math.floor(Math.random() * Object.keys(weapons).length),
    enchantment: 0,
    rating: generateRating(),
    skills: [],
  });
  await updateInventory();
};

export const enchantItem = async (id: number) => {
  const items = await db.inventory.toArray();
  const targetItem = items.find(item => item.id === id);
  if (targetItem) {
    const currentEnchantment = targetItem.enchantment;
    const enchantmentValidity = currentEnchantment >= 0 && currentEnchantment <= 9;
    if (enchantmentValidity) {
      const probabilityTable = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
      const probabilityRoll = Math.floor(Math.random() * 100);
      const enchantmentResult = probabilityRoll >= probabilityTable[currentEnchantment];
      if (enchantmentResult) {
        const newEnchantment = currentEnchantment + 1;
        await db.inventory.update(id, { enchantment: newEnchantment });
        await updateInventory();
        return 'ESUCCESS';
      }
      return 'EFAILURE';
    }
    return 'EMAX';
  }
  return 'IDNOTFOUND';
};
