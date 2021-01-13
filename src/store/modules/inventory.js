import enchantItem from '@/assets/data/helpers';

export default {
  namespaced: true,
  state: {
    equipment: [
      {
        id: 0,
        name: 'Sword of Beginnings',
        image: 'sword.png',
        rating: 4,
        type: 0,
        attack: { min: 100, max: 200 },
        enchantment: 0,
        description: `Every adventurer has a beginning. This sword will get you started.`,
      },
      {
        id: 1,
        name: 'Greatsword of Beginnings',
        image: 'sword.png',
        rating: 5,
        type: 1,
        attack: { min: 150, max: 250 },
        enchantment: 0,
        description: `Every adventurer has a beginning. This greatsword will get you started.`,
      },
    ],
    items: [],
  },
  getters: {
    equipment: state => {
      return state.equipment;
    },
    items: state => {
      return state.items;
    },
  },
  mutations: {
    enchantEquipment(state, id) {
      const targetItem = state.equipment.find(item => item.id === id);
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
