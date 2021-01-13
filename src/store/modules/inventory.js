import enchantItem from '@/assets/data/helpers';

export default {
  namespaced: true,
  state: {
    armor: [],
    items: [],
    weapons: [
      {
        id: 0,
        name: 'Sword of Beginnings',
        image: 'sword.png',
        rating: 4,
        type: 'Sword',
        attack: { min: 100, max: 200 },
        enchantment: 5,
        description: `Every adventurer has a beginning. This sword will get you started.`,
      },
    ],
  },
  getters: {
    armor: state => {
      return state.armor;
    },
    items: state => {
      return state.items;
    },
    weapons: state => {
      return state.weapons;
    },
  },
  mutations: {
    enchantArmor(state, id) {
      const targetItem = state.armor.find(armor => armor.id === id);
      const enchantment = enchantItem(targetItem);
      switch (enchantment) {
        case 'ESUCCESS':
          targetItem.enchantment += 1;
          console.log('Enchantment Success');
          break;
        case 'EFAILURE':
          console.log('Enchantment Failure');
          break;
        case 'EMAX':
          console.log('This item has reached max enchantment.');
          break;
        case 'IDNOTAVAILABLE':
          console.log('Item is not available.');
          break;
        default:
          break;
      }
    },
    enchantWeapon(state, id) {
      const targetItem = state.weapons.find(weapon => weapon.id === id);
      const enchantment = enchantItem(targetItem);
      switch (enchantment) {
        case 'ESUCCESS':
          targetItem.enchantment += 1;
          console.log('Enchantment Success');
          break;
        case 'EFAILURE':
          console.log('Enchantment Failure');
          break;
        case 'EMAX':
          console.log('This item has reached max enchantment.');
          break;
        case 'IDNOTAVAILABLE':
          console.log('Item is not available.');
          break;
        default:
          break;
      }
    },
  },
};
