import { db } from '@/database';
import createStore from '@/store/index';
import weapons from '@/assets/data/weapons';
import * as ugen from '@/utilities/generator';
import * as uexp from '@/utilities/experience';
import { Stats } from './interfaces';

const updateInventory = async () => {
  await createStore.dispatch('inventory/UPDATE_INVENTORY');
};

export const createCharacter = async (name: string) => {
  const BASE_STAT_VALUE = uexp.BASE_STAT_POINTS / 4;
  await db.character.add({
    name,
    experience: 0,
    stats: {
      dexterity: BASE_STAT_VALUE,
      intelligence: BASE_STAT_VALUE,
      stamina: BASE_STAT_VALUE,
      strength: BASE_STAT_VALUE,
    },
  });
};

export const createWeapon = async (character: number) => {
  await db.inventory.add({
    character,
    baseItem: Math.floor(Math.random() * Object.keys(weapons).length),
    enchantment: 0,
    rating: ugen.generateRating(),
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

export const updateExperience = async (character: number, experienceParam: number) => {
  const targetCharacter = await db.character.get(character);
  if (targetCharacter) {
    const newExperience = targetCharacter.experience + experienceParam;
    await db.character.update(character, { experience: newExperience });
  } else {
    console.log('Character not found.');
  }
};

export const updateStats = async (character: number, stats: Stats) => {
  await db.character.update(character, { stats }).then(updated => {
    if (updated) {
      console.log('Updated');
    } else {
      console.log('Not updated');
    }
  });
};

export const checkExistingCharacterName = async (characterName: string) => {
  const targetName = await db.character.get({ name: characterName });
  return targetName;
};
