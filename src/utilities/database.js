import db from '@/database';

const createWeapon = () => {
  db.inventory.add({
    baseItem: 2,
    enchantment: 0,
    rating: 0,
    skills: [],
  });
};

const enchantItem = async id => {
  const items = await db.inventory.toArray();
  const currentEnchantment = items.find(item => item.id === id).enchantment;
  const enchantmentValidity = currentEnchantment >= 0 && currentEnchantment <= 9;
  if (enchantmentValidity) {
    const probabilityTable = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
    const probabilityRoll = Math.floor(Math.random() * 100);
    const enchantmentResult = probabilityRoll >= probabilityTable[currentEnchantment];
    if (enchantmentResult) {
      const newEnchantment = currentEnchantment + 1;
      await db.inventory.update(id, { enchantment: newEnchantment });
      return 'ESUCCESS';
    }
    return 'EFAILURE';
  }
  return 'EMAX';
};

export { createWeapon, enchantItem };
