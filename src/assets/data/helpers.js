const enchantItem = targetItem => {
  if (targetItem) {
    const currentEnchantment = targetItem.enchantment;
    const enchantmentValidity = currentEnchantment >= 0 && currentEnchantment <= 9;
    if (enchantmentValidity) {
      const probabilityTable = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95];
      const probabilityRoll = Math.floor(Math.random() * 100);
      const enchantmentResult = probabilityRoll >= probabilityTable[currentEnchantment];
      if (enchantmentResult) {
        return 'ESUCCESS';
      }
      return 'EFAILURE';
    }
    return 'EMAX';
  }
  return 'IDNOTAVAILABLE';
};

export default enchantItem;
